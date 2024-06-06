import type { AxiosError, AxiosInstance } from 'axios'
import axios from 'axios'

// Config
import { appConfig } from '@/config'

class ApiService {
  private apiClient: AxiosInstance

  constructor() {
    this.apiClient = axios.create({
      baseURL: appConfig.appApiUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  public async createTinyUrl(url: string): Promise<{ tinyUrl?: string; errorMessage?: string }> {
    try {
      const response = await this.apiClient.post('/', { url })
      const generatedUrl = new URL(response.data.url, appConfig.appBaseUrl)
      return { tinyUrl: generatedUrl.href }
    } catch (e) {
      const axiosError = e as AxiosError<any, any>
      return { errorMessage: axiosError.response?.data?.message }
    }
  }

  public async getDomainViewData(limit?: number): Promise<any> {
    try {
      const response = await this.apiClient.get('/domain-visits', { params: { limit } })
      return { data: response.data.data }
    } catch (e) {
      const axiosError = e as AxiosError<any, any>
      return { errorMessage: axiosError.response?.data?.message }
    }
  }
}

export default new ApiService()
