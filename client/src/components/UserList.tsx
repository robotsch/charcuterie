import Typography from "@mui/material/Typography";

export default function UserList(props: any) {
  console.log(props);
  const generate = props.users && props.users !== null;
  return (
    <div>
      {generate &&
        props.users.map((user: string) => {
          return <h6 key={user}>{user}</h6>;
        })}
    </div>
  );
}
