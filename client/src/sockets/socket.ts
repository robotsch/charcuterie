import {io} from "socket.io-client"

const ENDPOINT = process.env.CLIENT_ORIGIN!

export default io(ENDPOINT)