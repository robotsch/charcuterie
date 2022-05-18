import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";

export default function setSocket() {
  const ws = useRef<null | any>(null);
  const [user, setUser] = useState<any>({});
  const [users, setUsers] = useState<any>([]);
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    ws.current = io("http://localhost:3001");
  }, []);

  useEffect(() => {
    if (ws.current) {
      ws.current.on("NEW_USER", (msg: any) => {
        console.log("NEW_USER users", users, msg);
        setUsers((prev: any) => [...prev, msg]);
      });
    }

    return () => {
      ws.current.off("NEW_USER");
    };
    
  }, [ws.current]);

  const setName = (name: string) => {
    ws.current.emit("SET_NAME", { name });
  };

  return { user, users, setName };
}
