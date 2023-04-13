import Head from "next/head";
import {
  getCurrentUser,
  getUserData,
  logout,
  uploadAvatar,
  getAvatar,
} from "../utils/firebase";
import { Open_Sans } from "next/font/google";
import { useState, useEffect } from "react";
import Link from "next/link";
const openSans = Open_Sans({ subsets: ["latin"] });

export default function Home() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);

  const handleAvatarChange = (event) => {
    setAvatarFile(event.target.files[0]);
  };

  const handleAvatarUpload = async () => {
    const userId = getCurrentUser().uid;
    const url = await uploadAvatar(avatarFile, userId);
    setAvatarURL(url);
  };

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, []);

  useEffect(() => {
    if (user) {
      getUserData(user.uid)
        .then((data) => {
          getAvatar(user.uid)
            .then((data) => {
              setAvatarURL(data);
              console.log(data);
            })
            .catch((error) => console.error(error));
          setUserData(data);
        })
        .catch((error) => console.error(error));
    }
  }, [user]);

  function handleLogout() {
    logout()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        // Show an error message
      });
  }

  return (
    <>
      <Head>
        <title>thingstodo</title>
        <meta name="description" content="thingstodo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={openSans.className}>
        {" "}
        <div>
          {user ? (
            <div>
              <h1>Welcome, {user.email}!</h1>
              <div>{userData && userData.email}</div>
              <button onClick={handleLogout}>Logout</button>
              <h1>Profile</h1>
              {avatarURL && <img src={avatarURL} alt="Avatar" />}
              <div>
                <input type="file" onChange={handleAvatarChange} />
                <button onClick={handleAvatarUpload}>Upload Avatar</button>
              </div>
            </div>
          ) : (
            <div>
              <h1>Please log in to continue.</h1>
              <Link href="login">
                <button>Login</button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
