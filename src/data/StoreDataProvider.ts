
const API_ENDPOINT = "https://aje2xtl46m.execute-api.us-west-2.amazonaws.com/Prod/";

function getData(what: string,
                 query: Object,
                 onSuccess: (arg0: any) => void) {

    let queryString;

    if (query == null) {
        queryString = ""
    } else {
        queryString = "?" + Object.keys(query).map(function(key: string,value: number,index: string[]) {
            // @ts-ignore
            return key + "=" + query[key]
        }).join("&");
    }

    return fetch(API_ENDPOINT + what + queryString)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            onSuccess(data)
        })
        .catch(console.log)
}

export default getData