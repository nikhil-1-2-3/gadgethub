pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/nikhil-1-2-3/gadgethub.git'
            }
        }

        stage('Debug Paths') {
            steps {
                bat 'echo Current directory:'
                bat 'cd'
                bat 'dir'
            }
        }

        stage('Build Containers') {
            steps {
                dir("${WORKSPACE}") {
                    bat 'docker-compose build'
                }
            }
        }

        stage('Stop Old Containers') {
            steps {
                dir("${WORKSPACE}") {
                    bat 'docker-compose down'
                }
            }
        }

        stage('Deploy') {
            steps {
                dir("${WORKSPACE}") {
                    bat 'docker-compose up -d'
                }
            }
        }

        stage('Verify') {
            steps {
                bat 'docker ps'
            }
        }
    }
}
