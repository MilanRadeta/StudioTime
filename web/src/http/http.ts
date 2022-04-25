import { useCallback } from "react";
import { useAuth } from "../auth/AuthContext";

export const useHttp = () => {
    const baseUrl = "http://localhost:3000/"
    const { token } = useAuth();
    const http = useCallback(async <T>(resource: RequestInfo, config?: RequestInit) => {
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

        if (token) {
            config = config ?? {};
            config.headers = new Headers({ ...config.headers ?? {}, 'Authorization': `Bearer ${token}` });
        }
        const response = await fetch(resource, config);

        return { ...response, data: await response.json() as T };
    }, [token]);
    return http;
}