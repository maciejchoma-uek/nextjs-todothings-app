import useAuth from "@/hooks/useAuth";
import { loginUserWithGoogle } from "@/utils/googleAuth";
import { registerUser } from "@/utils/register";
import { useState } from "react";
import { useRouter } from "next/router";
import { MoonLoader } from "react-spinners";

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
      error = error.toString();
      if (error.includes("auth/invalid-email")) {
        setError("You've provided an incorrect e-mail. Please try again.");
      } else if (error.includes("auth/weak-password")) {
        setError("Password should be at least 6 characters long.");
      } else if (error.includes("auth/invalid-password")) {
        setError("Invalid password. Please try again.");
      } else if (error.includes("auth/email-already-exists")) {
        setError("User with specified e-mail already exists.");
      } else if (error.includes("auth/internal-error")) {
        setError("An internal error has occured.");
      } else {
        setError(error);
      }
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
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="m-2">
          <MoonLoader color="#ffffff" loading={true} size={32} />
        </div>
        <div className="font-light text-xs">Loading...</div>
      </div>
    );
  } else {
    if (!user) {
      return (
        <div className="w-screen bg-neutral-800 flex flex-col items-center min-h-screen justify-center">
          <div className="sm:bg-neutral-700 w-3/4 sm:w-8/12 sm:bg-opacity-25 rounded-2xl px-8 py-16 flex flex-col gap-2 items-center">
            <form
              className="flex flex-col items-center text-center gap-2 sm:w-3/4"
              onSubmit={handleRegister}
            >
              <div className="flex flex-col w-full sm:text-left">
                <label className="font-bold text-sm m-1" htmlFor="email">
                  Email:
                </label>
                <input
                  className="!outline-none text-sm placeholder:leading-normal transition-all placeholder:text-xs pb-1.5 placeholder:text-neutral-200 px-3 py-1 rounded-2xl bg-neutral-700 focus:bg-neutral-600 hover:bg-neutral-600"
                  type="email"
                  placeholder="Enter your e-mail..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full sm:text-left">
                <label className="font-bold text-sm m-1" htmlFor="password">
                  Password:
                </label>
                <input
                  className="!outline-none text-sm placeholder:leading-normal transition-all placeholder:text-xs pb-1.5 placeholder:text-neutral-200 px-3 py-1 rounded-2xl bg-neutral-700 focus:bg-neutral-600 hover:bg-neutral-600"
                  type="password"
                  placeholder="Enter your password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error.length != 0 && (
                <div className="text-xs font-light text-red-600">{error}</div>
              )}
              <button
                className="text-sm py-1 px-4 sm:w-2/4 px-1 m-1 rounded-3xl bg-neutral-700 transition-all hover:bg-neutral-600"
                type="submit"
              >
                Register
              </button>
            </form>
            <div className="w-3/4 flex flex-col items-center">
              <button
                className="text-sm py-1 px-4 sm:w-2/4 rounded-3xl bg-red-500 transition-all hover:bg-red-400"
                type="button"
                onClick={handleLoginWithGoogle}
              >
                Log in with Google
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      router.push("/");
    }
  }
};

export default Register;
