pipeline {
    agent any

    environment {
        IMAGE_NAME = "amdp-registry.skala-ai.com/skala26a-ai2/sk041-vue"
        IMAGE_TAG = "latest"
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
                    '''
                }
            }
        }
    }
}