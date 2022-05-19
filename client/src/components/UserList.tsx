export default function UserList(props: any) {
  console.log(props)
  return (
    <div>
      {props.users !== "null" && props.users.map((user: string) => {
        return <h6 key={user}>{user}</h6>;
      })}
    </div>
  );
}
