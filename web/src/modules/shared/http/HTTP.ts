import { useCallback } from "react";
import { useAuth } from "../../auth/contexts/AuthContext";
import { HTTPStatusCode } from "./HTTPStatusCode";

const normalizeUrl = (resource: RequestInfo) => {
    const baseUrl = "http://localhost:3000/"
    let url: string = '';
    if (typeof (resource) !== "string") {
        url = resource.url;
    } else {
        url = resource;
    }

    if (!url.startsWith(baseUrl)) {
        url = `${baseUrl}/${url}`.replace(/\/\//g, "/").replace(":/", "://");
    }

    if (typeof (resource) !== "string") {
        resource = { ...resource, url };
    } else {
        resource = url;
    }
    return resource;
}

export const useHttp = () => {
    const { token, setToken } = useAuth();
    const http = useCallback(async <T>(resource: RequestInfo, config?: RequestInit) => {
        resource = normalizeUrl(resource);

        if (token) {
            config = config ?? {};
            config.headers = new Headers({ ...config.headers ?? {}, 'Authorization': `Bearer ${token}` });
        }
        const response = await fetch(resource, config);
        
        if (response.status === HTTPStatusCode.UNAUTHORIZED) {
            setToken('');
        } else if (!response.ok) {
            throw await response.json();
        }


        return { ...response, data: await response.json() as T };
    }, [token, setToken]);
    return http;
}