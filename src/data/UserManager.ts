import {Auth} from "aws-amplify";
import {defer, Observable, of, Subject} from "rxjs";
import {concatAll} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";
import {CognitoUser} from "amazon-cognito-identity-js";

export class User {
    constructor(public info: UserInfo,
                public accessToken: string) { }
}

export class UserInfo {
    constructor(public id: string,
                public email: string) { }
}

const userUpdates = new Subject<User | null>();

function mapCognitoUser(cognitoUser: CognitoUser | any): Promise<User | null> {
    const cognitoUserAttributes = cognitoUser.attributes;
    const userInfo = new UserInfo(cognitoUserAttributes.sub,
                                  cognitoUserAttributes.email);
    return Auth.currentSession()
                .then(session => session.getAccessToken().getJwtToken())
                .then(accessToken => new User(userInfo, accessToken))
                .catch(() => null)
}

const UserManager = {

    /**
     * @deprecated
     */
    getUser(): Promise<User | null> {
        return Auth.currentAuthenticatedUser()
                   .then(cognitoUser => mapCognitoUser(cognitoUser))
                   .catch(() => null)
    },

    user(): Observable<User | null> {
        return of(defer(() => fromPromise(this.getUser())), this.onUserChanged())
            .pipe(
                concatAll()
            )
    },

    signIn(email: string,
           password: string): Promise<User | any> {
        return Auth.signIn({
                               username: email,
                               password: password
                           })
                    .then(cognitoUser => mapCognitoUser(cognitoUser))
                    .then(user => {
                        userUpdates.next(user);
                        return user
                    })
    },

    signUp(email: string,
           password: string): Promise<any> {
        return Auth.signUp({
                               username: email,
                               password: password
                           })
                    .then(cognitoUser => {
                        console.log(cognitoUser);
                        return mapCognitoUser(cognitoUser.user)
                    })
                    .then(user => {
                        userUpdates.next(user);
                        return user
                    })
    },

    onUserChanged(): Observable<User | null> {
        return userUpdates
    },

    updateUser() {
        this.getUser().then(user => userUpdates.next(user));
    },

    logout(): Promise<any> {
        return Auth.signOut().then(() => userUpdates.next(null))
    }
};

UserManager.updateUser();

export default UserManager;
