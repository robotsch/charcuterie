import { io } from "socket.io-client";

<<<<<<< HEAD
// const ENDPOINT = process.env.CLIENT_ORIGIN!
=======
//const ENDPOINT = process.env.CLIENT_ORIGIN!;
>>>>>>> 5c19144a10a4525ee78066aff80c5f8fbb62f451
const ENDPOINT = "http://localhost:3001";

export default io(ENDPOINT);
