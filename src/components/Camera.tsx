import { useRef, useState, useEffect } from "react";
import { Camera as CameraIcon } from "lucide-react";

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      setStream(mediaStream);
      setIsCameraOn(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsCameraOn(false);
    }
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]); // Ensure this runs when stream updates

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={isCameraOn ? stopCamera : startCamera}
        className="p-2 bg-blue-500 text-white rounded-md"
      >
        <CameraIcon className="mr-2" />
        {isCameraOn ? "Stop Camera" : "Start Camera"}
      </button>

      {isCameraOn && stream && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="mt-4 w-80 border-2 border-black"
        />
      )}
    </div>
  );
};

export default Camera;
