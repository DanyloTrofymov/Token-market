import axios from 'axios';

class HttpService {
  baseUrl: string;

  fetchingService: any;

  apiVersion: string;

  constructor(
    baseUrl = process.env.REACT_APP_API_URL || '',
    fetchingService = axios,
    apiVersion = 'api'
  ) {
    this.baseUrl = baseUrl;
    this.fetchingService = fetchingService;
    this.apiVersion = apiVersion;
  }

  getFullApiUrl(url: string) {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  populateTokenToHeaderConfig() {
    return {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
  }

  extractUrlAndDataFromConfig({ data, url, ...configWithoutDataAndUrl }: any) {
    return configWithoutDataAndUrl;
  }

  get(config: { [x: string]: any; headers?: any; url: any; data?: any }, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService
      .get(this.getFullApiUrl(config.url), this.extractUrlAndDataFromConfig(config))
      .then((res: any) => res.data);
  }

  post(config: { [x: string]: any; headers?: any; url: any; data: any }, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService.post(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
  }

  patch(config: { [x: string]: any; headers?: any; url: any; data: any }, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService.patch(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
  }

  delete(config: { [x: string]: any; headers?: any; url: any; data: any }, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService.delete(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
  }
}

export default HttpService;
