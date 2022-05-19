import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";

export default function setSocket() {
  const ws = useRef<null | any>(null);
  const [user, setUser] = useState<string | null>(null);
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    ws.current = io("http://localhost:3001");
  }, []);

  useEffect(() => {
    if (ws.current) {
      ws.current.on("SUBMIT_NAME", (names: string[]) => {
        console.log("names in useSocket from SUBMIT_NAME", names);
        setUsers(names);
      });

      ws.current.on("USER_DISCONNECT", (removedUser: string) => {
        setUsers((prev: any) =>
          prev.filter((user: string) => user !== removedUser)
        );
      });
    }

    return () => {
      ws.current.off("SUBMIT_NAME");
      ws.current.off("USER_DISCONNECT");
    };
  }, [ws.current]);

  const setName = (name: string) => {
    setUser(name);
    ws.current.emit("SUBMIT_NAME", { name });
  };

  return { user, users, setName };
}
