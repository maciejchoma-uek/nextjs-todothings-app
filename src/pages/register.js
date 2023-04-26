import useAuth from "@/hooks/useAuth";
import { loginUserWithGoogle } from "@/utils/googleAuth";
import { registerUser } from "@/utils/register";
import { useState } from "react";
import { useRouter } from "next/router";

const Register = () => {
  const { user, isAuthChecked } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await registerUser(email, password);
    } catch (error) {
      setError(`Registration failed: ${error}`);
    }
  };

  const handleLoginWithGoogle = async (event) => {
    try {
      await loginUserWithGoogle();
    } catch (error) {
      setError(`Loggining with google failed: ${error}`);
    }
  };
  if (!isAuthChecked) {
    return <div>Loading</div>;
  } else {
    if (!user) {
      return (
        <>
          <form onSubmit={handleRegister}>
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
            <button type="submit">Register</button>
          </form>
          {error.length != 0 && <div>{error}</div>}
          <button type="button" onClick={handleLoginWithGoogle}>
            Log in with Google
          </button>
        </>
      );
    } else {
      router.push("/");
    }
  }
};

export default Register;
