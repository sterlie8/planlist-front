export default function Login({ setIsLoggedIn }) {
  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={() => setIsLoggedIn(true)}>Login</button>
    </div>
  );
}