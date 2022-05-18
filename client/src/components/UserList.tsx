export default function UserList(props: any) {
  return (
    <div>
      {props.users.map((user: any) => {
        console.log(user);
        return <h6 key={user.name}>{user.name}</h6>;
      })}
    </div>
  );
}
