import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const socketContext = createContext<any>(undefined);

export default function SocketProvider(props: any) {
  const [socket, setSocket] = useState<null | any>(null);

  useEffect(() => {
    setSocket(
      io("http://localhost:3001", {
        query: { restaurant: 1, table: 2 },
      })
    );
  }, []);

  return (
    <socketContext.Provider value={{ socket, setSocket }}>
      {props.children}
    </socketContext.Provider>
  );
}
