pipeline {
    agent {
        // We use a Docker agent with Node.js so we don't have to install Node manually on Jenkins
        docker {
            image 'node:22-alpine'
            args '-u root' // In some Jenkins setups, root is needed to install dependencies globally if required
        }
    }

    environment {
        // Prevent npm from asking for interactive prompts
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                // Clean install is better for CI to ensure exactly what is in package-lock.json is installed
                sh 'npm ci'
                // Prisma client generation is needed before running linting/tests
                sh 'npx prisma generate'
            }
        }

        stage('Code Quality (Lint & Format)') {
            steps {
                echo 'Checking code formatting...'
                sh 'npm run format'
                
                echo 'Running linter...'
                sh 'npm run lint'
            }
        }

        stage('Testing') {
            steps {
                echo 'Running Unit Tests...'
                sh 'npm run test'
            }
        }

        stage('Build') {
            steps {
                echo 'Building NestJS Application...'
                sh 'npm run build'
            }
        }
    }

    post {
        always {
            echo 'Pipeline has finished.'
        }
        success {
            echo 'Pipeline succeeded! 🎉'
        }
        failure {
            echo 'Pipeline failed. Check the logs for more details. 🚨'
        }
    }
}
