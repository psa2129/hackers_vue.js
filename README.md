# Jenkins 기반 최종 CI/CD Pipeline 구성

## 1. Jenkinsfile

```groovy
pipeline {
    agent any

    environment {
        APP_NAME        = 'sk041-vue'
        HARBOR_REGISTRY = 'amdp-registry.skala-ai.com'
        HARBOR_PROJECT  = 'skala26a-ai2'
        IMAGE_REPO      = "${HARBOR_REGISTRY}/${HARBOR_PROJECT}/${APP_NAME}"
        IMAGE_TAG       = "latest"
        FULL_IMAGE      = "${IMAGE_REPO}:${IMAGE_TAG}"

        K8S_NAMESPACE   = 'skala3-ai2'
        HARBOR_CRED     = 'harbor-login'
    }

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'building the application...'
            }
        }

        stage('Test') {
            steps {
                echo 'testing the application...'
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t ${FULL_IMAGE} .
                '''
            }
        }

        stage('Push Image to Harbor') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${HARBOR_CRED}",
                    usernameVariable: 'HARBOR_USERNAME',
                    passwordVariable: 'HARBOR_PASSWORD'
                )]) {
                    sh '''
                        echo "${HARBOR_PASSWORD}" | docker login ${HARBOR_REGISTRY} -u "${HARBOR_USERNAME}" --password-stdin
                        docker push ${FULL_IMAGE}
                        docker logout ${HARBOR_REGISTRY}
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    cp k8s/deployment.yaml k8s/deployment-rendered.yaml
                    sed "s|__IMAGE__|${FULL_IMAGE}|g" k8s/deployment-rendered.yaml > k8s/deployment-final.yaml

                    kubectl apply -f k8s/deployment-final.yaml
                    kubectl apply -f k8s/service.yaml

                    kubectl rollout status deployment/${APP_NAME} -n ${K8S_NAMESPACE} --timeout=300s
                    kubectl get pods -n ${K8S_NAMESPACE}
                '''
            }
        }
    }

    post {
        success {
            echo "CI/CD Pipeline succeeded: ${FULL_IMAGE}"
        }
        failure {
            echo "CI/CD Pipeline failed"
        }
        always {
            sh 'docker image prune -f || true'
        }
    }
}