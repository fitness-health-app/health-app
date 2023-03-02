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
                mail( bcc: '', body: '''Hi,

                $PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS:

                Check console output at $BUILD_URL to view the results.

                ''', cc: '', from: '', replyTo: '', subject: 'New Build Created ', to: 'tarundagar2001@gmail.com'
                     )
            }
        }
    }
}
