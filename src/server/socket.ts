import { io } from "socket.io-client";
import { SERVER_BASE_URL } from "./apiRoutes";

export const socket = io(SERVER_BASE_URL); 