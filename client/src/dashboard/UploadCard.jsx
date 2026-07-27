import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import API from "../api/axios";

function UploadCard() {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");
  const [fileName, setFileName] = useState("");

  const handleUpload = async (file) => {
    try {
      setUploading(true);
      setStatus("Uploading resume...");
      setFileName(file.name);

      const formData = new FormData();

      formData.append("resume", file);

      const uploadResponse = await API.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const resumeId = uploadResponse.data.resume._id;

      setStatus("Analyzing resume...");

      await API.post(`/resume/analyze/${resumeId}`);

      setStatus("Generating AI feedback...");

      await API.post(`/ai/${resumeId}`);

      setStatus("Resume analyzed successfully ✅");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log("UPLOAD ERROR:", error);

      console.log("SERVER MESSAGE:", error.response?.data);

      setStatus(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },

    multiple: false,

    onDrop: (files) => {
      if (files.length > 0) {
        handleUpload(files[0]);
      }
    },
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="
      cursor-pointer
      rounded-3xl
      border-2
      border-dashed
      border-blue-300
      bg-white
      p-12
      text-center
      transition
      hover:border-blue-500
      hover:bg-blue-50
      "
      >
        <input {...getInputProps()} />

        <UploadCloud size={60} className="mx-auto text-blue-600" />

        <h2 className="mt-6 text-2xl font-bold">Upload Resume</h2>

        <p className="mt-3 text-slate-500">Drag & drop your PDF here</p>

        <button
          type="button"
          className="
        mt-8
        rounded-xl
        bg-blue-600
        px-6
        py-3
        text-white
        hover:bg-blue-700
        "
        >
          Browse Files
        </button>

        {fileName && <p className="mt-5 text-sm text-slate-600">{fileName}</p>}

        {uploading && (
          <p className="mt-3 text-blue-600 font-semibold">Processing...</p>
        )}

        {status && (
          <p className="mt-3 text-green-600 font-semibold">{status}</p>
        )}
      </div>
    </>
  );
}

export default UploadCard;
