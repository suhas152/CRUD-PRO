pipeline {
    agent any

    stages {

        stage('Build Frontend') {
            steps {
                // Corrected path. The Jenkins log showed the build was successful in 'frontend/func-app',
                // not 'NEWBACKEND/frontend/func-app'. This aligns the Jenkinsfile with the log's reality.
                dir('frontend/func-app') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\func-app" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\func-app"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\func-app"
                // Corrected path. The built files are in `frontend/func-app/dist`, not `NEWBACKEND/frontend/func-app/dist`.
                xcopy /E /I /Y frontend\\func-app\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\func-app"
                '''
            }
        }

        stage('Build Backend') {
            steps {
                // Corrected path. Assuming the backend directory is `backend/newBackapp`,
                // not `NEWBACKEND/backend/newBackapp`, for consistency.
                dir('backend/newBackapp') {
                    bat 'mvn clean package'
                }
            }
        }

        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\newBackApp.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\newBackApp.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\newBackApp" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\newBackApp"
                )
                // Corrected path. The built .war file should be in `backend/newBackapp/target`, not `NEWBACKEND/...`.
                copy "backend\\newBackapp\\target\\*.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\"
                '''
            }
        }

    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }

}
