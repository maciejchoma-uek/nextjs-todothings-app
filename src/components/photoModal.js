import React, { useRef, useState } from "react";
import Modal from "react-modal";
import { uploadAvatar } from "@/utils/fileUpload";

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
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-blue-700 bg-opacity-25 backdrop-blur-sm z-0"
      className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 width-10/12 z-1 h-4/6 max-h-10/12 bg-blue-950 flex flex-col justify-center align-middle"
    >
      {content}
      {!uploadedPhotoUrl ? (
        <video ref={videoRef} autoPlay />
      ) : (
        <img src={uploadedPhotoUrl} />
      )}
      <button onClick={handleCapture}>Open camera</button>
      <button onClick={handleUpload}>Take photo</button>
    </Modal>
  );
}
