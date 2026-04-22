pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/nikhil-1-2-3/gadgethub.git'
            }
        }

        stage('Build Containers') {
            steps {
                bat 'docker-compose build'
            }
        }

        stage('Stop Old Containers') {
            steps {
                bat 'docker-compose down'
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker-compose up -d'
            }
        }

        stage('Verify') {
            steps {
                bat 'docker ps'
            }
        }
    }
}
