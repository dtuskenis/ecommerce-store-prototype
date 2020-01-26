import {Auth} from "aws-amplify";
import {Observable, Subject} from "rxjs";

export class User {
    constructor(public info: UserInfo,
                public accessToken: string) { }
}

export class UserInfo {
    constructor(public id: string,
                public email: string) { }
}

const userUpdates = new Subject<User | null>();

const UserManager = {

    getUser(): Promise<User | null> {
        return Auth.currentAuthenticatedUser()
                   .then(cognitoUser => {
                       const cognitoUserAttributes = cognitoUser.attributes;
                       const userInfo = new UserInfo(cognitoUserAttributes.sub,
                                                     cognitoUserAttributes.email);
                       return Auth.currentSession()
                           .then(session => session.getAccessToken().getJwtToken())
                           .then(accessToken => new User(userInfo, accessToken))
                           .catch(() => null)
                   })
                   .catch(() => null)
    },

    onUserChanged(): Observable<User | null> {
        return userUpdates
    },

    updateUser() {
        this.getUser().then(user => userUpdates.next(user));
    }
};

UserManager.updateUser();

export default UserManager;
