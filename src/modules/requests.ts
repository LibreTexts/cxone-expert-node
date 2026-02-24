import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthObject } from "../types";
import type { Debugger } from 'debug';
import { createDebugLogger } from "../utils";

const API_BASE_URL = '/@api/deki';

export default class Requests {
    private axiosInstance: AxiosInstance = axios.create();
    private format: 'json' | 'xml' = 'json';
    private debug: Debugger;

    constructor(tld?: string, authObject?: AuthObject, format: 'json' | 'xml' = 'json', debugEnabled?: boolean) {
        this.debug = createDebugLogger('cxone-expert:requests', debugEnabled);
        if (!tld) {
            this.debug('TLD is required to initialize Requests module');
            throw new Error('TLD is required');
        }
        if (!authObject) {
            this.debug('Auth object is required to initialize Requests module');
            throw new Error('Auth object is required');
        }

        // Ensure protocol is present
        let parsedTLD = tld;
        if (!parsedTLD.startsWith('http://') && !parsedTLD.startsWith('https://')) {
            parsedTLD = `https://${parsedTLD}`;
        }

        // Remove trailing slash
        if (parsedTLD.endsWith('/')) {
            parsedTLD = parsedTLD.slice(0, parsedTLD.length - 1);
        }

        this.format = format;

        this.axiosInstance = axios.create({
            baseURL: `${parsedTLD}${API_BASE_URL}`,
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...authObject,
            },
        });

        // Setup axios interceptors for debugging
        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor
        this.axiosInstance.interceptors.request.use(
            (config) => {
                this.debug(`→ ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
                if (config.params && Object.keys(config.params).length > 0) {
                    this.debug('  Query params:', JSON.stringify(config.params));
                }
                if (config.data && config.headers?.['Content-Type'] !== 'application/octet-stream') {
                    const dataStr = typeof config.data === 'string' ? config.data : JSON.stringify(config.data);
                    if (dataStr.length > 200) {
                        this.debug('  Body:', dataStr.substring(0, 200) + '... (truncated)');
                    } else if (dataStr.length > 0) {
                        this.debug('  Body:', dataStr);
                    }
                }
                return config;
            },
            (error) => {
                this.debug('✗ Request error:', error.message);
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.axiosInstance.interceptors.response.use(
            (response) => {
                this.debug(`← ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
                if (response.data && response.headers['content-type']?.includes('application/json')) {
                    const dataStr = JSON.stringify(response.data);
                    if (dataStr.length > 200) {
                        this.debug('  Response:', dataStr.substring(0, 200) + '... (truncated)');
                    } else {
                        this.debug('  Response:', dataStr);
                    }
                } else if (response.headers['content-type']?.includes('text/')) {
                    this.debug('  Response: [text content]');
                } else if (response.data) {
                    this.debug('  Response: [binary content]');
                }
                return response;
            },
            (error) => {
                if (error.response) {
                    this.debug(`✗ ${error.response.status} ${error.config?.method?.toUpperCase()} ${error.config?.url}`);
                    this.debug('  Error:', error.response.statusText);
                    if (error.response.data) {
                        const dataStr = typeof error.response.data === 'string' 
                            ? error.response.data 
                            : JSON.stringify(error.response.data);
                        if (dataStr.length > 200) {
                            this.debug('  Error details:', dataStr.substring(0, 200) + '... (truncated)');
                        } else {
                            this.debug('  Error details:', dataStr);
                        }
                    }
                } else if (error.request) {
                    this.debug('✗ No response received:', error.message);
                } else {
                    this.debug('✗ Request setup error:', error.message);
                }
                return Promise.reject(error);
            }
        );
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