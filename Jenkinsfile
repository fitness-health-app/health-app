pipeline {
    agent any
    triggers {
        githubPush()
    }

    stages {
        stage('Fetch') {
            steps {
                sh 'sudo python3 /home/ubuntu/JenkinsAutomation/deployQA.py'
            }
        }
        stage('Build') {
            steps {
                sh 'sudo python3 /home/ubuntu/JenkinsAutomation/deployQA.py'
            }
        }
        stage('Deploy') {
            steps {
                sh 'sudo python3 /home/ubuntu/JenkinsAutomation/deployQA.py'
            }
        }
        stage('Test') {
            steps {
                sh 'sudo python3 /home/ubuntu/JenkinsAutomation/deployQA.py'
            }
        }
    }
}
