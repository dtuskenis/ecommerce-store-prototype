import {Auth} from "aws-amplify";

export class UserInfo {
    constructor(public email: string) { }
}

const UserManager = {

    getUserInfo(): Promise<UserInfo | null> {
        return Auth.currentAuthenticatedUser()
                   .then(user => new UserInfo(user.attributes.email))
                   .catch(() => null)
    }
};

export default UserManager;
