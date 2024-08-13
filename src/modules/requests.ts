import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthObject } from "../types";

const API_BASE_URL = '/@api/deki';

export default class Requests {
    private axiosInstance: AxiosInstance = axios.create();
    private format: 'json' | 'xml' = 'json';

    constructor(tld?: string, authObject?: AuthObject, format: 'json' | 'xml' = 'json') {
        if (!tld) {
            throw new Error('TLD is required');
        }
        if (!authObject) {
            throw new Error('Auth object is required');
        }
        const parsedTLD = tld.endsWith('/') ? tld.slice(
            0,
            tld.length - 1
        ) : `${tld}`;

        this.format = format;

        this.axiosInstance = axios.create({
            baseURL: `${parsedTLD}${API_BASE_URL}`,
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...authObject,
            },
        });
    }

    private getFormatParam() {
        return {
            'dream.out.format': this.format
        }
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return await this.axiosInstance.get<T>(url, {
            ...config, params: {
                ...config?.params,
                ...this.getFormatParam()
            }
        });
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return await this.axiosInstance.post<T>(url, data, { ...config });
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return await this.axiosInstance.put<T>(url, data, { ...config });
    }

    public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return await this.axiosInstance.patch<T>(url, data, { ...config });
    }

    public async del<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return await this.axiosInstance.delete<T>(url, { ...config });
    }

    public async head<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return await this.axiosInstance.head<T>(url, { ...config });
    }
}