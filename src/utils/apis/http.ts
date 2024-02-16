import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
import storage from '../storage'

export type ResponeseV1<T = any> = {
  code?: number
  data?: T
  msg?: string
  reason?: any
  status?: boolean
}

class Http {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL
    })
    this.instance.interceptors.request.use(this.requestInterceptor, this.requestErrorInterceptor)
  }

  private requestInterceptor(config: InternalAxiosRequestConfig) {
    const token = storage.getToken()
    if (token) {
      config.headers.Authorization = 'bearer' + token
    }
    return config
  }

  private requestErrorInterceptor(error: any) {
    return Promise.reject(error)
  }

  private errorHandler(err: any): AxiosError {
    return err as AxiosError
  }

  public async get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    try {
      const response = await this.instance.get<T, R>(url, config)
      return response
    } catch (error: any) {
      throw this.errorHandler(error)
    }
  }

  public async post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    try {
      const response = await this.instance.post<T, R>(url, data, config)
      return response
    } catch (error: any) {
      throw this.errorHandler(error)
    }
  }

  public async put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    try {
      const response = await this.instance.put<T, R>(url, data, config)
      return response
    } catch (error: any) {
      throw new error() as AxiosError
    }
  }

  public async delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    try {
      const response = await this.instance.delete<T, R>(url, config)
      return response
    } catch (error: any) {
      throw new error() as AxiosError
    }
  }
}

export default new Http()
