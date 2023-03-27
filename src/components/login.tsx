import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default Login;

// https://accounts.spotify.com/authorize?client_id=001b06764d764b0f93a2e407f08a84a2&response_type=code&redirect_uri=http://localhost:3000/callback&scope=user-read-currently-playing+user-top-read
