import axios from "axios";

export default interface HttpClient {
    get (resource: string): Promise<Output>;
    post (resource: string, body: any, headers?: any ): Promise<Output>;
}

type Output = {
    status: number,
    statusText: string,
    data: any
}

function concatUrls(baseUrl: string, resource: string) {
    // Remover a barra final de baseUrl, se existir
    if (baseUrl.endsWith('/')) {
        baseUrl = baseUrl.slice(0, -1);
    }  
    // Remover a barra inicial de resource, se existir
    if (resource.startsWith('/')) {
        resource = resource.slice(1);
    }
    // Concatenar baseUrl e resource com uma única barra
    return `${baseUrl}/${resource}`;
}
export class AxiosAdapter implements HttpClient {
    
    constructor(readonly baseUrl: string) {}
    
    async get(resource: string): Promise<Output> {
        const url = concatUrls(this.baseUrl, resource);
        const response = await axios.get(url);
        return { status: response.status, 
                 statusText: response.statusText,
                 data: response.data};
    }

    async post(resource: string, body: any, headers?: any): Promise<Output> {
        const url = concatUrls(this.baseUrl, resource);
        const config = { headers };
        // config.headers["content-type"] = "application/json";
        const response = await axios.post(url, body, config);
        return { 
            status: response.status, 
            statusText: response.statusText,
            data: response.data
        };
    }
}

export class FetchAdapter implements HttpClient {

    constructor(readonly baseUrl: string) {}

    async get(resource: string): Promise<Output> {
        const url = concatUrls(this.baseUrl, resource);
        const response = await fetch(url);
        return { 
            status: response.status, 
            statusText: response.statusText,
            data: await response.json()
        };
    }

    async post(resource: string, body: any, headers?: any): Promise<Output> {
        const url = concatUrls(this.baseUrl, resource);
        headers["content-type"] = "application/json";
        const response = await fetch(url, {
            method: "post",
            headers: headers,
            body: JSON.stringify(body)
        }); 
        return { 
            status: response.status, 
            statusText: response.statusText,
            data: await response.json()
        };
   }
}
