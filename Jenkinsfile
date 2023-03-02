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
    }
}
