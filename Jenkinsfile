pipeline {
  environment {
    registry = "czakoilevente/mallac-lev"
    dockerCred = 'czakoilevente-docker'
    dockerImage = ''
  }
  agent any
  stages {
    stage('Testing') {
      steps {
        sh 'npm init -y'
        sh 'npm install'        
        }
      }
    stage('Building image') {
      steps{
        script {
          dockerImage=docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry( '', dockerCred ) {
            dockerImage.push()
            dockerImage.push('latest')
          }
        }
      }
    }
    stage('Deploy to EB') {
      when {
        branch 'master'
      }
      steps{
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'bubuska-eb', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
          sh 'pip install awsebcli --upgrade --user'
          sh 'echo "1" | eb init bubuska --region us-east-2 && eb use Bubuska-env && eb deploy Bubuska-env'
        }
      }
    }
    stage('Cleanup') {
      steps{
        sh 'docker rmi $registry:$BUILD_NUMBER'
        sh 'rm -r node_modules'
        sh 'rm package.json'
      }
    }
  }
}
