import {Auth} from "aws-amplify";

const AuthSessionManager = {

    accessToken(): Promise<string | null> {
        return Auth.currentSession()
                   .then(session => session.getAccessToken().getJwtToken())
                   .catch(() => null)
    }
};

export default AuthSessionManager
