import {Auth} from "aws-amplify";

export class User {
    constructor(public info: UserInfo,
                public accessToken: string) { }
}

export class UserInfo {
    constructor(public id: string,
                public email: string) { }
}

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
    }
};

export default UserManager;
