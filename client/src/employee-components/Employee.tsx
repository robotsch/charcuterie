import LiveOrderList from "./LiveOrderList";
import SideBar from "./SideBar";
import Box from "@mui/material/Box";
import TablesStatus from "./TablesStatus";
import axios from 'axios'
import { useEffect, useState } from "react";

export default function Employee() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    
    const origin = '/api/session'
    // const origin = 'http://localhost:3001/asdf'

    axios.get(origin, {withCredentials: true})
      .then((data) => {
        if(data.data.isLoggedIn) {
          setLoading(false)
        } else {
          alert('Alerted')
        }
      })
      .catch((err) => console.log(err))
  }, [])

  if(loading){
    return <div>Loading</div>
  }

  return (
    <SideBar>
      <Box component="main" sx={{ bgcolor: "background.default", p: 3 }}>
        <TablesStatus />
      </Box>
      <LiveOrderList />
    </SideBar>
  );
}
