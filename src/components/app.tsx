import Login from "./login";
import { useSession, signOut, getSession, getCsrfToken } from "next-auth/react";
import UserInfo from "./user-info";

const App = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <UserInfo />
      </>
    );
  }
  return (
    <>
      <h1>App</h1>
      <Login />
    </>
  );
};

export default App;
