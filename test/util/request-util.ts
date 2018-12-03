import * as request from "superagent";
import {currentEnv} from "../../src/config/config";

export function get(endpoint) {
  return request.get(`http://${currentEnv().host.name}:${currentEnv().host.port}/v1/` + endpoint);
}

export function post(endpoint, body) {
  return request.post(`http://${currentEnv().host.name}:${currentEnv().host.port}/v1/` + endpoint).send(body);
}

export function _delete(endpoint) {
  return request.delete(`http://${currentEnv().host.name}:${currentEnv().host.port}/v1/` + endpoint);
}

export function put(endpoint, body) {
  return request.put(`http://${currentEnv().host.name}:${currentEnv().host.port}/v1/` + endpoint).send(body);
}
