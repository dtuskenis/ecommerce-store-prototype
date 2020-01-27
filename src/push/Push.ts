import {Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken} from "@capacitor/core";

const { PushNotifications } = Plugins;

const Push = {

    register() {
        console.log('Initializing push notifications service...');

        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register()
            .then(() => {
                // On success, we should be able to receive notifications
                PushNotifications.addListener('registration',
                    (token: PushNotificationToken) => {
                        console.log('Push registration success, token: ' + token.value);
                    }
                );

                // Some issue with our setup and push will not work
                PushNotifications.addListener('registrationError',
                    (error: any) => {
                        console.log('Error on registration: ' + JSON.stringify(error));
                    }
                );

                // Show us the notification payload if the app is open on our device
                PushNotifications.addListener('pushNotificationReceived',
                    (notification: PushNotification) => {
                        console.log('Push received: ' + JSON.stringify(notification));
                    }
                );

                // Method called when tapping on a notification
                PushNotifications.addListener('pushNotificationActionPerformed',
                    (notification: PushNotificationActionPerformed) => {
                        console.log('Push action performed: ' + JSON.stringify(notification));
                    }
                );
            }).catch(error => {
                console.log(error);
        });
    }
};

export default Push;
