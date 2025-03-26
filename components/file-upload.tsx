"use client";

import React, { useState, useEffect } from "react";
import * as Images from "@/public/images";
import axiosInstance from "@/axiosInstance/axios";

const mockData = [
  {
    fileName: "image1.jpg",
    url: "https://example.com/uploads/image1.jpg",
    size: "120 KB",
    uploadedAt: "2025-03-26T10:00:00Z"
  },
  {
    fileName: "image2.jpg",
    url: "https://example.com/uploads/image2.jpg",
    size: "230 KB",
    uploadedAt: "2025-03-26T10:05:00Z"
  },
  {
    fileName: "image3.png",
    url: "https://example.com/uploads/image3.png",
    size: "150 KB",
    uploadedAt: "2025-03-26T10:10:00Z"
  },
  {
    fileName: "image4.jpeg",
    url: "https://example.com/uploads/image4.jpeg",
    size: "175 KB",
    uploadedAt: "2025-03-26T10:15:00Z"
  },
  {
    fileName: "image5.jpg",
    url: "https://example.com/uploads/image5.jpg",
    size: "200 KB",
    uploadedAt: "2025-03-26T10:20:00Z"
  }
];

export const FileUpload = ({
                             photos,
                             setPhotos,
                           }: {
  photos: string[];
  setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [fileEnter, setFileEnter] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For demonstration purposes, using mock data
    setPhotos(mockData.map((item) => item.url));
  }, [setPhotos]);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      setUploading(true);
      setError(null);

      const response = await axiosInstance.post("/file/upload", formData);
      const uploadedUrls: string[] = response.data;

      setPhotos((prev) => [...prev, ...uploadedUrls]);
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError("Не удалось загрузить файлы. Пожалуйста, попробуйте позже.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileEnter(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileEnter(true);
  };

  const handleDragLeave = () => {
    setFileEnter(false);
  };

  const handleDelete = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setPhotos([]);
  };

  return (
      <div className="w-full mx-auto flex flex-col">
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`${
                fileEnter ? "border-4" : "border-2"
            } mx-auto bg-white flex flex-col w-full h-72 border-dashed items-center justify-center transition-border duration-300`}
        >
          <label htmlFor="file" className="h-full w-[200px] flex flex-col justify-center text-center items-center gap-[15px] cursor-pointer">
            <Images.upload />
            <span className="text-[14px] font-normal text-[#252525]">
            <span className="text-[#1AA683]">Нажмите</span>, чтобы загрузить, или перетащите.
          </span>
            <span className="text-[14px] font-normal text-[#B5B7C0]">
            Минимум количество 5
          </span>
          </label>
          <input
              id="file"
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileChange}
          />
        </div>

        {uploading && <div className="mt-4 text-center text-blue-500">Загрузка...</div>}

        {error && <div className="mt-4 text-center text-red-500">{error}</div>}

        {photos.length > 0 && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Загруженные фотографии</h3>
                <button onClick={handleReset} className="text-sm text-red-500 hover:underline">
                  Удалить все
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {photos.map((url, index) => (
                    <div key={index} className="flex flex-col items-center relative">
                      <img className="rounded-md w-full max-w-xs h-48 object-cover" src={url} alt={`Uploaded ${index + 1}`} />
                      <button onClick={() => handleDelete(index)} className="absolute top-0 right-0 bg-[#1c181999] text-white px-[10px] py-[5px] rounded-[5px]">&times;</button>
                    </div>
                ))}
              </div>
            </div>
        )}
      </div>
  );
};

export default FileUpload;
