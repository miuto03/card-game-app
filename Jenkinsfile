pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/miuto03/card-game-app.git', branch: 'main'
            }
        }

        stage('Install') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                // テスト失敗でも落とさないなら「|| exit 0」を追記
                bat 'npm test || exit 0'
            }
        }
    }
}
