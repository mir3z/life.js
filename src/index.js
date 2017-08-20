import fetch from "isomorphic-fetch";
import createApi from "./api";
import main from "./main";

const api = createApi(fetch.bind(window));
main(window, api);
