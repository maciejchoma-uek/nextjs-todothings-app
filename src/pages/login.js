import { useState } from "react";
import {
  loginUser,
  loginUserWithGoogle,
  getCurrentUser,
} from "../utils/firebase";

import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginUser(email, password);
      router.push("/");
      console.log("User logged in:", user);
      // Redirect to a success page
    } catch (error) {
      console.error("Login failed:", error);
      // Show an error message
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await loginUserWithGoogle();
      console.log("User logged in with Google:", user);
      // Redirect to a success page
    } catch (error) {
      console.error("Google login failed:", error);
      // Show an error message
    }
  };

  return (
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
      <button type="button" onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </form>
  );
};

export default Login;
