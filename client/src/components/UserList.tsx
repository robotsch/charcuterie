export default function UserList(props: any) {
  return (
    <div>
      {props.users.map((user: string) => {
        return <h6 key={user}>{user}</h6>;
      })}
    </div>
  );
}
