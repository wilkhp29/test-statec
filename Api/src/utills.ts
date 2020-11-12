import request from "supertest";
import App from "./App";

const api = request(App);


export default api;