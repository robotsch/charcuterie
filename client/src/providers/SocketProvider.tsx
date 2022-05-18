import { createContext } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001", {
  query: { restaurant: 1, table: 2, name: "pls", order: null },
});

export const socketContext = createContext<any>(socket);

export default function SocketProvider(props: any) {
  return (
    <socketContext.Provider value={{ socket }}>
      {props.children}
    </socketContext.Provider>
  );
}
