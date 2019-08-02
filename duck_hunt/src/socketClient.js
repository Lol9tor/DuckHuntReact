import socketIO from "socket.io-client";
import cfg from "./config/config";

const socket = socketIO(cfg.URL);

export default socket;