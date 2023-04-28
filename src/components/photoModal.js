import React, { useRef, useState } from "react";
import Modal from "react-modal";
import { uploadAvatar } from "@/utils/fileUpload";
import { MdCameraAlt } from "react-icons/md";

export default function PhotoModal({
  isModalOpen,
  handleCloseModal,
  content,
  user,
}) {
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(null);

  const handleCloseCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  };

  const handleCapture = async () => {
    try {
      setUploadedPhotoUrl(null);
      // Access the user's camera
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      // Play the camera stream on the video element
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      mediaStreamRef.current = mediaStream;
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleUpload = async () => {
    try {
      // Capture a photo from the video stream
      const canvas = document.createElement("canvas");
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        async (blob) => {
          if (blob) {
            // Call uploadAvatar function with captured file and user ID
            const userId = user.uid; // Replace with actual user ID
            const downloadURL = await uploadAvatar(blob, userId);
            setUploadedPhotoUrl(downloadURL);
          }
        },
        "image/jpeg",
        0.8
      );
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => {
        handleCloseModal();
        handleCloseCamera();
      }}
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 backdrop-blur-sm z-0"
      className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-10/12 sm:w-5/12 z-1 h-4/6 rounded-2xl max-h-10/12 bg-neutral-800"
    >
      <div className="flex flex-col h-full justify-center items-center">
        <h1 className="text-2xl font-bold text-center mb-4">
          Add a profile picture
        </h1>
        {!uploadedPhotoUrl ? (
          <video
            className="overflow-hidden rounded-2xl border-solid border-2 w-11/12"
            ref={videoRef}
            autoPlay
          />
        ) : (
          <img
            className="overflow-hidden rounded-2xl border-solid border-2 w-11/12"
            src={uploadedPhotoUrl}
          />
        )}
        <button
          className="text-sm mt-4 py-1 px-4 m-1 rounded-3xl bg-neutral-700 transition-all hover:bg-neutral-600 cursor-pointer"
          onClick={handleCapture}
        >
          Start the camera
        </button>
        <button
          className="rounded-full w-min h-min p-2 m-2 transition-all bg-neutral-700 hover:bg-neutral-600"
          onClick={handleUpload}
        >
          <MdCameraAlt />
        </button>
      </div>
    </Modal>
  );
}
