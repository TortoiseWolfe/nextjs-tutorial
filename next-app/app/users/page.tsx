interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default async function UsersPage() {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/users'
  );
  const users: User[] = await response.json();

  return (
    <>
      <h1>Users</h1>
      <p>{new Date().toLocaleTimeString()}</p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
