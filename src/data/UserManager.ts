import {Auth} from "aws-amplify";

export class UserInfo {
    constructor(public id: string,
                public email: string) { }
}

const UserManager = {

    getUserInfo(): Promise<UserInfo | null> {
        return Auth.currentAuthenticatedUser()
                   .then(cognitoUser => {
                       const cognitoUserAttributes = cognitoUser.attributes;
                       return new UserInfo(cognitoUserAttributes.sub,
                                           cognitoUserAttributes.email)
                   })
                   .catch(() => null)
    }
};

export default UserManager;
