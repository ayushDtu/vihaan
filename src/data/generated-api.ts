/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** Body_create_picture_image_post */
export interface BodyCreatePictureImagePost {
  /**
   * Second Art
   * @format binary
   */
  second_art: File;
}

/** BuyTicket */
export interface BuyTicket {
  /** Jwt Token */
  jwt_token: string;
  /** Ticketquantity */
  ticketQuantity: number;
  /** Eventcontractaddress */
  eventContractAddress: string;
  /** Privatekey */
  privateKey: string;
}

/** Event */
export interface Event {
  /** Name */
  name: string;
  /** Description */
  description: string;
  /** Start Day */
  start_day: string;
  /** Finish Day */
  finish_day: string;
  /** Event Image */
  event_image: string;
  /** Preview Image */
  preview_image: string;
  /** Contract Address */
  contract_address: string;
  /** Ticket Quantity */
  ticket_quantity: number;
  /** Ticket Price */
  ticket_price: number;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** LoginResponse */
export interface LoginResponse {
  /** Accesstoken */
  accessToken: string;
}

/** User */
export interface User {
  /** User Email */
  user_email: string;
  /** User Name */
  user_name: string;
  /** User Password */
  user_password: string;
  /** Wallet Address */
  wallet_address: string;
  /** Wallet Private Key */
  wallet_private_key: string;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: any[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

export interface GetTicketTicketGetParams {
  /** Eventcontractaddress */
  eventContractAddress: string;
  /** Jwt Token */
  jwt_token: string;
}

export interface LogToAccountLoginPostParams {
  /** User Email */
  user_email: string;
  /** User Password */
  user_password: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, HeadersDefaults, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title FastAPI
 * @version 0.1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name RootGet
   * @summary Root
   * @request GET:/
   */
  rootGet = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/`,
      method: "GET",
      format: "json",
      ...params,
    });

  ticket = {
    /**
     * No description
     *
     * @name GetTicketTicketGet
     * @summary Get Ticket
     * @request GET:/ticket
     */
    getTicketTicketGet: (query: GetTicketTicketGetParams, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/ticket`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name BuyTicketTicketPost
     * @summary Buy Ticket
     * @request POST:/ticket
     */
    buyTicketTicketPost: (data: BuyTicket, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/ticket`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  event = {
    /**
     * No description
     *
     * @name GetEventEventGet
     * @summary Get Event
     * @request GET:/event
     */
    getEventEventGet: (params: RequestParams = {}) =>
      this.request<Event[], any>({
        path: `/event`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CreateEventEventPost
     * @summary Create Event
     * @request POST:/event
     */
    createEventEventPost: (data: Event, params: RequestParams = {}) =>
      this.request<object, HTTPValidationError>({
        path: `/event`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  image = {
    /**
     * @description Takes image file, returns url to IPFS Storage
     *
     * @name CreatePictureImagePost
     * @summary Create Picture
     * @request POST:/image
     */
    createPictureImagePost: (data: BodyCreatePictureImagePost, params: RequestParams = {}) =>
      this.request<string, HTTPValidationError>({
        path: `/image`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  account = {
    /**
     * No description
     *
     * @name CreteAccountAccountPost
     * @summary Crete Account
     * @request POST:/account
     */
    creteAccountAccountPost: (data: User, params: RequestParams = {}) =>
      this.request<LoginResponse, HTTPValidationError>({
        path: `/account`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @name LogToAccountLoginPost
     * @summary Log To Account
     * @request POST:/login
     */
    logToAccountLoginPost: (query: LogToAccountLoginPostParams, params: RequestParams = {}) =>
      this.request<LoginResponse, HTTPValidationError>({
        path: `/login`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
