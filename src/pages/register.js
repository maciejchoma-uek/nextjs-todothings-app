import {
  registerUser,
  loginUserWithGoogle,
  getCurrentUser,
} from "../utils/firebase";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const user = await registerUser(email, password);
      console.log("User registered:", user);
      // Redirect to a success page
    } catch (error) {
      console.error("Registration failed:", error);
      // Show an error message
    }
  };

  const handleRegisterWithGoogle = async (event) => {
    try {
      const user = await loginUserWithGoogle();
      console.log("Logged in: ", user);
    } catch (error) {
      console.error("Failed: ", error);
    }
  };

  return (
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
      <button type="button" onClick={handleRegisterWithGoogle}>
        Register with Google
      </button>
    </form>
  );
};

export default Register;
