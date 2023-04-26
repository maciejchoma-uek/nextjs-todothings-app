import { useState } from "react";
import { loginUser } from "@/utils/login";
import { loginUserWithGoogle } from "@/utils/googleAuth";

import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { user, isAuthChecked } = useAuth();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await loginUser(email, password);
      router.push("/");
    } catch (error) {
      setError(`Login failed: ${error}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginUserWithGoogle();
      router.push("/");
    } catch (error) {
      setError(error);
    }
  };

  if (!isAuthChecked) {
    return <div>Loading</div>;
  } else {
    if (!user) {
      return (
        <>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          {error.length != 0 && <div>{error}</div>}
          <button type="button" onClick={handleGoogleLogin}>
            Login with Google
          </button>
        </>
      );
    } else {
      router.push("/");
    }
  }
};

export default Login;
