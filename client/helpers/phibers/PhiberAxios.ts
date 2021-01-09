import {
  Response_ApiRootFailure,
  Response_RootNotification,
} from "./../../interfaces/responses/index";
import axios from "../scripts/axioser";
import * as AXIOS from "axios";
import * as toastr from "toastr";
import { Response_ApiRoot, Response_Root } from "./../../interfaces";
class PhiberAxios {
  static async post<T = Response_Root>(
    url,
    data,
    axiosOptions?: AXIOS.AxiosRequestConfig
  ): Promise<T> {
    try {
      const results = await axios.post(url, data, {
        ...axios.defaults,
        ...axiosOptions,
      });
      return results.data as T;
    } catch (err) {
      return { success: false, ...err };
    }
  }

  static async get<T>(
    url,
    axiosOptions?: AXIOS.AxiosRequestConfig
  ): Promise<T> {
    try {
      const results = await axios.get(url, {
        ...axios.defaults,
        ...axiosOptions,
      });
      return results.data as T;
    } catch (err) {
      return { success: false, ...err };
    }
  }
  static async delete<T = Response_RootNotification>(
    url,
    axiosOptions?: AXIOS.AxiosRequestConfig
  ): Promise<T> {
    try {
      const results = await axios.delete(url, {
        ...axios.defaults,
        ...axiosOptions,
      });

      return results.data as T;
    } catch (err) {
      return { success: false, ...err };
    }
  }
}

export default PhiberAxios;
