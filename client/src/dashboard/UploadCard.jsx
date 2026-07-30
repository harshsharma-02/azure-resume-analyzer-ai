import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileCheck2 } from "lucide-react";
import { motion } from "framer-motion";
import API from "../api/axios";

function UploadCard({ refreshResumes }){
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");
  const [fileName, setFileName] = useState("");

  const handleUpload = async (file) => {
    try {
      setUploading(true);
      setStatus("Uploading resume");
      setFileName(file.name);
      const formData = new FormData();
      formData.append("resume", file);
      const uploadResponse = await API.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const resumeId = uploadResponse.data.resume._id;
      setStatus("Analyzing resume");
      await API.post(`/resume/analyze/${resumeId}`);
      setStatus("Generating AI feedback…");
      await API.post(`/ai/${resumeId}`);
      await refreshResumes();
      setStatus("Resume analyzed successfully");
    } catch (error) {
      setStatus(error.response?.data?.message || error.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    onDrop: (files) => files.length > 0 && handleUpload(files[0]),
  });

  return (
    <motion.div
      {...getRootProps()}
      whileHover={{ y: -3 }}
      data-testid="upload-card"
      className={`glass hover-lift cursor-pointer p-8 text-center  transition ${
        isDragActive ? "!border-[#7ea8ff] bg-[#7ea8ff]/5" : ""
      }`}
      
    >
      <input {...getInputProps()} />

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4a7dff]/20 to-[#22d3ee]/20 border border-white/10 relative">
        <UploadCloud size={28} className="text-[#7ea8ff]" />
        {!uploading && <span className="absolute inset-0 rounded-2xl pulse-ring" />}
      </div>

      <h2 className="mt-6 font-display text-3xl text-white">Upload Resume</h2>
      <p className="mt-2 text-sm text-[#a5b4d0]">Drag & drop your PDF here, or click to browse</p>

      <button type="button" className="btn-primary mt-6 mx-auto !py-3 !text-sm">Browse files</button>

      {fileName && (
        <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-[#a5b4d0] bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
          <FileCheck2 size={13} className="text-[#67e8f9]" /> {fileName}
        </div>
      )}
      {status && (
        <p className="mt-4 text-sm text-[#67e8f9] font-mono">{status}{uploading && "…"}</p>
      )}
    </motion.div>
  );
}

export default UploadCard;
