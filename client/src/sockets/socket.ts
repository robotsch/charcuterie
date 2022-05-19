import {io} from "socket.io-client"

const ENDPOINT = "http://localhost:3001"

export default io(ENDPOINT)