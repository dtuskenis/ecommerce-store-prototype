const API_ENDPOINT = "https://o2ajbgf1q6.execute-api.us-west-2.amazonaws.com/Prod/";

const RemoteApi = {

    get(what: string, query: Object, accessToken: string | null): Promise<any> {
        return performRequest(what, query, accessToken, "GET", null)
                .then(response => response.json())
    },

    post(what: string, query: object, data: object, accessToken: string | null): Promise<any> {
        return performRequest(what, query, accessToken, "POST", data)
    }
};

function performRequest(what: string,
                        query: Object,
                        accessToken: string | null,
                        method: string,
                        body: object | null): Promise<any> {
    const queryString = toQueryString(query);
    const headers = new Headers();

    if (accessToken) {
        headers.append("Authorization", accessToken)
    }

    const requestInit: RequestInit = {
        method: method,
        headers: headers
    };

    if (body) {
        requestInit.body = JSON.stringify(body)
    }

    return fetch(API_ENDPOINT + what + queryString, requestInit)
            .catch(console.log)
}

function toQueryString(query: any | null): string {
    if (query) {
        return  "?" + Object.keys(query).map(key => key + "=" + query[key]).join("&");
    } else {
        return  ""
    }
}

export default RemoteApi;
