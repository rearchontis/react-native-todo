import { RequestConfig } from "./types";

export class HTTP {
  static HEADERS = { "Content-Type": "application/json" };

  static async get(url: string) {
    try {
      return await request(url, "GET");
    } catch (e) {
      console.error(e);
    }
  }

  static async post(url: string, data = {}) {
    try {
      return await request(url, "POST", data);
    } catch (e) {
      console.error(e);
    }
  }

  static async delete(url: string) {
    try {
      return await request(url, "DELETE");
    } catch (e) {
      console.error(e);
    }
  }

  static async patch(url: string, data = {}) {
    try {
      return await request(url, "PATCH", data);
    } catch (e) {
      console.error(e);
    }
  }
}

async function request(url: string, method = "GET", data?: object) {
  const config: RequestConfig = {
    method,
    headers: HTTP.HEADERS,
  };

  if (method === "POST" || method === "PATCH") {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);
  return await response.json();
}
