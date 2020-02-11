pipeline {
    agent any

    options {
        parallelsAlwaysFailFast()
    }

    environment {
        PATH='/usr/local/bin:/usr/bin:/bin'
    }

    stages {

        stage('Checkout SCM') {
            steps {
                git 'git@github.com:dtuskenis/ecommerce-store-web.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Ionic') {
            steps {
                sh 'ionic build'
                sh 'ionic cap sync'
            }
        }

        stage('Run mobile app builds') {
            parallel {
                stage('Build iOS') {
                    steps {
                        sh '''
                        cd ios

                        sed "s/{BUILD_NUMBER_PLACE}/${BUILD_NUMBER}/g" exportOptions_template.plist > exportOptions.plist

                        xcodebuild -quiet -workspace App/App.xcworkspace -scheme App clean archive -archivePath out/ecommerce-store.xcarchive

                        xcodebuild -exportArchive -exportOptionsPlist ./exportOptions.plist  -archivePath out/ecommerce-store.xcarchive -exportPath out
                     '''
                    }
                }
                stage('Build Android') {
                    steps {
                        sh '''
                        cd android
                        ./gradlew assembleDebug
                     '''
                    }
                }
            }
        }

        stage('Upload to S3') {
            steps {
                withAWS(region:'us-west-2',credentials:'jenkins-local-s3') {
                    s3Upload(file: "android/app/build/outputs/apk/debug/app-debug.apk", bucket:"ecommerce-store-mobile-builds", path:"android/ecommerce-store-${BUILD_NUMBER}.apk", acl:'PublicRead');
                    s3Upload(file: "ios/out/App.ipa", bucket:"ecommerce-store-mobile-builds", path:"ios/${BUILD_NUMBER}/ecommerce-store-${BUILD_NUMBER}.ipa", acl:'PublicRead');
                    s3Upload(file: "ios/out/manifest.plist", bucket:"ecommerce-store-mobile-builds", path:"ios/${BUILD_NUMBER}/manifest.plist", acl:'PublicRead');
                    s3Upload(file: "public/assets/icon/favicon.png", bucket:"ecommerce-store-mobile-builds", path:"ios/${BUILD_NUMBER}/displayImage.png", acl:'PublicRead');
                    s3Upload(file: "public/assets/icon/icon.png", bucket:"ecommerce-store-mobile-builds", path:"ios/${BUILD_NUMBER}/fullSizeImage.png", acl:'PublicRead');
                }
            };
        }
    }

    //   post {
    //     always {
    //         mail bcc: '', body: 'Test', cc: '', from: '', replyTo: '', subject: 'Test', to: 'illuzive13@gmail.com'    
    //     }
    // }
}