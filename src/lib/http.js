import axios from "axios";
import config from "./config"
import {debug} from "./util";
import {tokenCache} from "./cache";

export default function (service, options, conf) {
  let baseParams = config.base_params,
    data = {
      service,
      ...baseParams,
      ...options
    },
    token = tokenCache.get();
  token && (data.token = token);

  let axiosConfig = {
    url: data.mock ? "/api" : config.api_url,
    method: "post",
    headers: {
      "sign": "test",
      "Content-Type": "application/json"
    },
    data: data
  }

  if (conf) {
    axiosConfig = Object.assign({}, axiosConfig, conf);
  }

  debug("==>" + service);
  return axios(axiosConfig)
    .then((res) => {
      if (res.status == 200) {
        debug("<==" + service, res.data);
        return res.data;
      }
    });
}
