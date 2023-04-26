import Head from "next/head";
import { getUserData } from "../utils/firebase";
import { uploadAvatar } from "@/utils/fileUpload";
import { deleteTask } from "@/utils/taskManagement";
import { Open_Sans } from "next/font/google";
import { useState, useEffect } from "react";
import Link from "next/link";
import AddTaskModal from "@/components/addTaskModal";
import useAuth from "@/hooks/useAuth";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const { logout, user, isAuthChecked } = useAuth();

  const handleAvatarChange = (event) => {
    setAvatarFile(event.target.files[0]);
  };

  const handleAvatarUpload = async () => {
    if (avatarFile) {
      const userId = user.uid;
      const url = await uploadAvatar(avatarFile, userId);
      setAvatarURL(url);
    }
  };

  const handleAddTask = () => {
    setIsAddTaskModalOpen(!isAddTaskModalOpen);
  };

  const handleCloseAddTaskModal = () => {
    setIsAddTaskModalOpen(false);
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const handleDeleteTask = async (event, task) => {
    event.preventDefault();
    await deleteTask(task);
    fetchData();
  };

  const fetchData = () => {
    getUserData(user.uid).then((data) => {
      console.log(data);
      setUserData(data);
    });
  };

  function handleLogout() {
    logout().catch((error) => {
      console.error("Logout failed:", error);
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
          {isAuthChecked ? (
            user ? (
              <div>
                <h1>Welcome, {user.email}!</h1>
                <div>{userData && userData.email}</div>
                <button onClick={handleLogout}>Logout</button>
                <h1>Profile</h1>
                {avatarURL ? (
                  <img width={300} height={300} src={avatarURL} alt="Avatar" />
                ) : userData ? (
                  <img width={300} height={300} src={userData.avatar} />
                ) : (
                  <img src={"default-avatar.png"} />
                )}
                <div>
                  <input type="file" onChange={handleAvatarChange} />
                  <button onClick={handleAvatarUpload}>Upload Avatar</button>
                </div>

                <button onClick={handleAddTask}>Add task</button>
                <AddTaskModal
                  isModalOpen={isAddTaskModalOpen}
                  handleCloseModal={handleCloseAddTaskModal}
                  fetchData={fetchData}
                />

                {userData &&
                  userData.tasks &&
                  userData.tasks.map((task, index) => {
                    return (
                      <div key={index}>
                        <h1>{task.taskName}</h1>
                        <button
                          onClick={(event) => handleDeleteTask(event, task)}
                        >
                          X
                        </button>
                        <p>{task.taskDescription}</p>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div>
                <h1>Please log in to continue.{user}</h1>
                <Link href="login">
                  <button>Login</button>
                </Link>
                <Link href="register">
                  <button>Register</button>
                </Link>
              </div>
            )
          ) : (
            <div>Loading</div>
          )}
        </div>
      </main>
    </>
  );
}
