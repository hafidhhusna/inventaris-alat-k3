import { useRef, useState, useEffect } from "react";
import { Camera as CameraIcon } from "lucide-react";
import Image from "next/image";

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

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

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = videoRef.current?.videoWidth;
        canvas.height = videoRef.current?.videoHeight;

        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const imageUrl = canvas.toDataURL("image/png");
        setCapturedImage(imageUrl);
      }
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
        <div>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="mt-4 w-80 border-2 border-black"
          />
          <button
            type="button"
            onClick={captureFrame}
            className="mt-2 p-2 bg-green-500 text-white rounded-md"
          >
            Capture Frame
          </button>
        </div>
      )}
      {capturedImage && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Captured Image:</h3>
          <Image
            src={capturedImage}
            width={10000}
            height={10000}
            alt="Captured frame"
            className="mt-2 w-80 border-2 border-gray-500"
          />
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default Camera;
