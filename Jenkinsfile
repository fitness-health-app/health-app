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
        }
        stage('Build') {
            steps {
                sh 'sudo python3 /home/ubuntu/JenkinsAutomation/createBuild.py'
            }
        }
        stage('Deploy') {
            steps {
                sh 'sudo python3 /home/ubuntu/JenkinsAutomation/deployBuild.py'
            }
        }
        stage('Test') {
            steps {
                sh 'sudo python3 /home/ubuntu/JenkinsAutomation/testBuild.py'
            }
        }
        stage('Send Email Notification') {
            steps {
                mail( bcc: '', body: '''
                
                ${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
                recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}
                
                ''', cc: '', from: '', replyTo: '', subject: 'New Build Created ', to: 'tarundagar2001@gmail.com'
                     )
            }
        }
    }
}
