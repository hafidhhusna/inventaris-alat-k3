"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const UploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      console.error("No file provided");
      return;
    }

    setLoading(true);
    const filePath = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from("bucket_name")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading file:", error.message);
      setLoading(false);
      return;
    }

    console.log("File uploaded successfully:", data);

    const { data: publicURLData } = supabase.storage
      .from("bucket_name")
      .getPublicUrl(filePath);

    setFileUrl(publicURLData.publicUrl);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={uploadFile}
        disabled={!file || loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload File"}
      </button>
      {fileUrl && (
        <div className="mt-4">
          <p>File berhasil diunggah:</p>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {fileUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
