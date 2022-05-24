import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";

import { useTheme } from "@mui/material/styles";

export default function UserList(props: any) {
  const theme = useTheme();

  const generate = props.users && typeof props.users !== 'string';
  
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {generate &&
        props.users.map((user: string) => {
          return <Typography key={user}>{user}</Typography>;
        })}
    </Box>
  );
}
