import Head from "next/head";
import { getUserData } from "../utils/firebase";
import { uploadAvatar } from "@/utils/fileUpload";
import { deleteTask, editTask } from "@/utils/taskManagement";
import { Open_Sans } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AddTaskModal from "@/components/addTaskModal";
import useAuth from "@/hooks/useAuth";
import EditTaskModal from "@/components/editTaskModal";
import PhotoModal from "@/components/photoModal";
import MoonLoader from "react-spinners/MoonLoader";
import { MdLogout, MdCameraAlt, MdFileUpload } from "react-icons/md";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/perspective-subtle.css";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);
  const [passedTask, setPassedTask] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [userCity, setUserCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isTakePhotoModalOpen, setIsTakePhotoModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const { logout, user, isAuthChecked } = useAuth();

  const handlePassedTask = (task) => {
    setPassedTask(task);
    setIsEditTaskModalOpen(true);
  };

  const handleAvatarChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/jpeg"
    ) {
      const userId = user.uid;
      const url = await uploadAvatar(selectedFile, userId);
      setAvatarURL(url);
    } else {
      // handle error for unsupported file type
      console.log("Unsupported file type");
    }
  };

  const handleCompleteTask = async (task) => {
    let updatedTask = { ...task, isCompleted: !task.isCompleted };
    let updatedUserData = {
      ...userData,
      tasks: userData.tasks.map((t) =>
        t.taskName === task.taskName ? updatedTask : t
      ),
    };
    setUserData(updatedUserData);
  };

  const handleDeleteTask = async (event, task) => {
    event.preventDefault();
    const updatedTasks = userData.tasks.filter(
      (localTask) => localTask.taskName !== task.taskName
    );

    setUserData({
      ...userData,
      tasks: updatedTasks,
    });
    await deleteTask(task);
  };

  const handleAddTask = () => {
    setIsAddTaskModalOpen(!isAddTaskModalOpen);
  };

  const handleCloseAddTaskModal = () => {
    setIsAddTaskModalOpen(false);
  };

  const handleCloseTakePhotoModal = () => {
    setIsTakePhotoModalOpen(false);
  };

  const handleCloseEditTaskModal = () => {
    setIsEditTaskModalOpen(false);
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [isAddTaskModalOpen, isEditTaskModalOpen, isTakePhotoModalOpen]);

  useEffect(() => {
    if (user) {
      const fetchUserCity = async (latitude, longitude) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          if (data.address) {
            const address = {
              amenity: data.address.amenity,
              road: data.address.road,
              house_number: data.address.house_number,
              postcode: data.address.postcode,
              city: data.address.city,
              town: data.address.town,
            };

            const joinedAddress = Object.values(address)
              .filter((value) => value !== undefined && value !== null) // Filter out undefined values
              .join(", ");

            setUserCity(joinedAddress);
            fetchData();
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user city: ", error);
        }
      };
      // Fetch user's location using browser's geolocation API
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
            try {
              fetchUserCity(latitude, longitude);
            } catch (error) {
              console.error("Error getting user's city:", error);
            }
          },
          (error) => {
            setIsLoading(false);
            console.error("Error getting user's location:", error);
          }
        );
      }
    }
  }, [user]);

  const handleTakePhoto = () => {
    setIsTakePhotoModalOpen(true);
  };

  const fetchData = () => {
    getUserData(user.uid).then((data) => {
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
      <div className="w-screen bg-neutral-800 flex flex-col items-center">
        {isAuthChecked ? (
          user ? (
            !isLoading ? (
              <div>
                <div className="w-screen flex flex-col items-center sm:flex-row bg-neutral-700 sm:items-center sm:justify-between px-1">
                  <div className="text-sm m-2 text-center">
                    Welcome, {user.email}!
                  </div>
                  <div className="flex items-center">
                    <Tippy
                      content="Capture a new profile picture with camera"
                      animation="perspective-subtle"
                      followCursor="true"
                      plugins={[followCursor]}
                      placement="bottom"
                    >
                      <button
                        className="rounded-full w-min h-min p-2 m-2 transition-all hover:bg-neutral-400 hover:bg-opacity-25"
                        onClick={handleTakePhoto}
                      >
                        <MdCameraAlt />
                      </button>
                    </Tippy>
                    {/* <div>
                        {JSON.stringify(userLocation)}
                        {userCity}
                      </div> */}
                    <Tippy
                      content="Upload new profile picture"
                      animation="perspective-subtle"
                      followCursor="true"
                      placement="bottom"
                      plugins={[followCursor]}
                    >
                      <button
                        className="rounded-full w-min h-min p-2 m-2 transition-all hover:bg-neutral-400 hover:bg-opacity-25"
                        onClick={() => {
                          document.getElementById("uploadFile").click();
                        }}
                      >
                        <MdFileUpload />
                      </button>
                    </Tippy>
                    <Tippy
                      content="Log out"
                      animation="perspective-subtle"
                      followCursor="true"
                      placement="bottom"
                      plugins={[followCursor]}
                    >
                      <button
                        className="rounded-full w-min h-min p-2 m-2 transition-all hover:bg-neutral-400 hover:bg-opacity-25"
                        onClick={handleLogout}
                      >
                        <MdLogout />
                      </button>
                    </Tippy>
                    <div className="overflow-hidden flex w-10 h-10 rounded-full m-2">
                      {avatarURL ? (
                        <img src={avatarURL} alt="Avatar" />
                      ) : userData ? (
                        <img
                          src={
                            userData.avatar
                              ? userData.avatar
                              : "default-avatar.png"
                          }
                        />
                      ) : (
                        <img
                          width={300}
                          height={300}
                          src={"default-avatar.png"}
                        />
                      )}
                      <input
                        className="hidden"
                        id="uploadFile"
                        type="file"
                        onChange={handleAvatarChange}
                      />
                    </div>
                  </div>
                </div>
                <main
                  className={`flex ${openSans.className} min-h-screen bg-stone-800 max-w-lg flex-col items-center`}
                >
                  <button onClick={handleAddTask}>Add task</button>
                  <AddTaskModal
                    isModalOpen={isAddTaskModalOpen}
                    handleCloseModal={handleCloseAddTaskModal}
                    fetchData={fetchData}
                    userCity={userCity}
                    userLocation={userLocation}
                  />
                  <EditTaskModal
                    isModalOpen={isEditTaskModalOpen}
                    handleCloseModal={handleCloseEditTaskModal}
                    fetchData={fetchData}
                    passedTask={passedTask}
                  />
                  <PhotoModal
                    isModalOpen={isTakePhotoModalOpen}
                    handleCloseModal={handleCloseTakePhotoModal}
                    user={user}
                  />
                  {userData &&
                    userData.tasks &&
                    userData.tasks.map((task, index) => {
                      return (
                        <div
                          onClick={() => {
                            handlePassedTask(task);
                          }}
                          key={index}
                        >
                          <button
                            onClick={async (event) => {
                              event.stopPropagation();
                              await handleCompleteTask(task);
                              await editTask(
                                task,
                                task,
                                task.isCompleted ? false : true
                              );
                            }}
                          >
                            Task {task.isCompleted ? "done" : "to be done"}
                          </button>
                          <h1>{task.taskName}</h1>
                          <p>{task.isCompleted ? "true" : "false"}</p>
                          <p>{task.taskDescription}</p>
                          <p>{task.userCity}</p>
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              handleDeleteTask(event, task);
                            }}
                          >
                            X
                          </button>
                        </div>
                      );
                    })}
                </main>
              </div>
            ) : (
              <div className="w-screen h-screen flex flex-col justify-center items-center">
                <div className="m-2">
                  <MoonLoader color="#ffffff" loading={true} size={32} />
                </div>
                <div className="font-light text-xs">
                  Calculating user location...
                </div>
              </div>
            )
          ) : (
            <div>
              <h1>Please log in to continue.</h1>
              <Link href="login">
                <button>Login</button>
              </Link>
              <Link href="register">
                <button>Register</button>
              </Link>
            </div>
          )
        ) : (
          <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="m-2">
              <MoonLoader color="#ffffff" loading={true} size={32} />
            </div>
            <div className="font-light text-xs">Loading...</div>
          </div>
        )}
      </div>
    </>
  );
}
