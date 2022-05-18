import { useState, createContext } from "react";

export const tableContext = createContext<any | null>(null);

export default function TableProvider(props: any) {
  const [table, setTable] = useState();

  return (
    <tableContext.Provider value={{ table, setTable }}>
      {props.children}
    </tableContext.Provider>
  );
}
