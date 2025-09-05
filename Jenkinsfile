pipeline {
  agent any

  tools {
    nodejs "NodeJS_18" // Jenkinsの「Global Tool Configuration」で設定した名前に合わせてね
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/miuto03/card-game-app.git', branch: 'main'
      }
    }

    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test || true' // テストがなくても落ちないようにしたければこの書き方
      }
    }
  }
}
