pipeline {
    agent any
    triggers {
        githubPush()
    }

    stages {
        stage('Fetch') {
            steps {
                sh 'sudo python3 /home/ubuntu/JenkinsAutomation/fetchBuild.py'
            }
            post {
                 always {
                     jiraSendBuildInfo site: 'cs691-team4.atlassian.net'
                 }
             }
        }
        stage('Build') {
            steps {
                sh 'sudo python3 /home/ubuntu/JenkinsAutomation/createBuild.py'
            }
            post {
                 always {
                     jiraSendDeploymentInfo environmentId: 'us-stg-1', environmentName: 'us-stg-1', environmentType: 'staging'
                 }
             }

        }
        stage('Deploy') {
            steps {
                sh 'sudo python3 /home/ubuntu/JenkinsAutomation/deployBuild.py'
            }
            post {
                 always {
                     jiraSendDeploymentInfo environmentId: 'us-stg-1', environmentName: 'us-stg-1', environmentType: 'production'
                 }
             }

        }
        stage('Test') {
            steps {
                sh 'sudo python3 /home/ubuntu/JenkinsAutomation/testBuild.py'
            }
        }
    }
    post {
        always {
                mail body: "Hello Team,\n\n${currentBuild.currentResult}: Job ${env.JOB_NAME}\nBuild Number: ${env.BUILD_NUMBER}\nBuild ID: ${env.BUILD_ID}\n\nMore info at: ${env.BUILD_URL}\n\n-Jenkins Team 4", cc: '', from: '', replyTo: '', subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}", to: 'tarundagar2001@gmail.com'   
                jiraSendBuildInfo()
        }
    }
}
