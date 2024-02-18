
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

class HttpClient {

  protected initHttp(): AxiosInstance {
    const http = axios.create({ timeout: 30000, timeoutErrorMessage: 'CLIENT_TIMEOUT' });
    http.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const contentType = config.headers.get('Content-Type');
      if (!contentType) {
        config.headers.set('Content-type', 'application/json; charset=utf-8');
      }
      return config;
    });

    http.interceptors.response.use(
      (config: AxiosResponse): AxiosResponse => config,
      ({ response, message }: AxiosError) => {
        return Promise.reject({
          isError: true,
        } );
      },
    );
    return http;
  }

  async get<R>(endpoint: string, options: AxiosRequestConfig = {}) {
    return await this.initHttp()
      .get<R>(endpoint, options)
      .then((res) => res.data);
  }

  async post<T, R>(endpoint: string, body: T, options: AxiosRequestConfig = {}) {
    return await this.initHttp()
      .post<R>(endpoint, body, options)
      .then((res) => res.data);
  }

  async put<T, R>(endpoint: string, body: T, options: AxiosRequestConfig = {}) {
    return await this.initHttp()
      .put<R>(endpoint, body, options)
      .then((res) => res.data);
  }

  async delete<T, R>(endpoint: string, options: AxiosRequestConfig = {}) {
    return await this.initHttp()
      .delete<R>(endpoint, options)
      .then((res) => res.data);
  }

}

export default HttpClient;
