pipeline {
    agent any

    environment {
        IMAGE_NAME    = "amdp-registry.skala-ai.com/skala26a-ai2/sk041-vue"
        IMAGE_TAG     = "latest"
        K8S_NAMESPACE = "class-2"
        APP_NAME      = "sk041-vue"
    }

    stages {
        stage('build') {
            steps {
                echo 'building the application...'
            }
        }

        stage('test') {
            steps {
                echo 'testing the application...'
            }
        }

        stage('deploy') {
            steps {
                echo 'deploying the application...'

                sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'

                withCredentials([usernamePassword(
                    credentialsId: 'harbor-login',
                    usernameVariable: 'HARBOR_USERNAME',
                    passwordVariable: 'HARBOR_PASSWORD'
                )]) {
                    sh '''
                        echo "$HARBOR_PASSWORD" | docker login amdp-registry.skala-ai.com -u "$HARBOR_USERNAME" --password-stdin
                        docker push ${IMAGE_NAME}:${IMAGE_TAG}
                        docker logout amdp-registry.skala-ai.com
                    '''
                }

                sh '''
                    cp k8s/deployment.yaml k8s/deployment-rendered.yaml
                    sed "s|__IMAGE__|${IMAGE_NAME}:${IMAGE_TAG}|g" k8s/deployment-rendered.yaml > k8s/deployment-final.yaml

                    kubectl apply -f k8s/deployment-final.yaml
                    kubectl apply -f k8s/service.yaml

                    kubectl rollout status deployment/${APP_NAME} -n ${K8S_NAMESPACE} --timeout=300s
                    kubectl get pods -n ${K8S_NAMESPACE}
                '''
            }
        }
    }
}