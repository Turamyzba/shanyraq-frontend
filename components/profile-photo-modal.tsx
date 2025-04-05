"use client";

import React, { useState } from "react";
import * as Images from "@/public/images"; // Import your images/icons
import axiosInstance from "@/axiosInstance/axios";

export const ProfilePhotoModal = ({
  isPhotoModalShow,
  closePhotoModal,
  setFormData,
}: {
  isPhotoModalShow: boolean;
  closePhotoModal: () => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>; // Adjust the type based on your formData structure
}) => {
  const [tempPhoto, setTempPhoto] = useState<string | null>(null); // Temporary photo preview
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [fileEnter, setFileEnter] = useState(false); // Track drag events

  // Handle file drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFileEnter(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFileEnter(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Optional: Additional visual feedback can be added here
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFileEnter(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  // Handle the file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  // Process the selected file
  const handleFile = (file: File) => {
    // Optional: Validate file type and size here
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setPhotoError(
        "Неподдерживаемый тип файла. Пожалуйста, выберите изображение."
      );
      return;
    }

    const maxSizeInBytes = 5 * 1024 * 1024 * 50; // 50MB
    if (file.size > maxSizeInBytes) {
      setPhotoError("Файл слишком большой. Максимальный размер 50MB.");
      return;
    }

    const photoUrl = URL.createObjectURL(file);
    setTempPhoto(photoUrl);
    setPhotoError(null);
  };

  // Handle the photo upload when confirmed
  const handleConfirmPhoto = async () => {
    if (!tempPhoto) return; // No photo to upload

    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = fileInput?.files?.[0];
    if (!file) {
      setPhotoError("Файл не выбран.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Ensure 'file' matches backend expectation

    try {
      setUploadingPhoto(true);
      setPhotoError(null);

      const response = await axiosInstance.post(
        "/profile/upload-photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Удалено
          },
        }
      );

      // Assuming the backend returns the URL directly
      const uploadedUrl: string = response.data.url || response.data; // Adjust based on actual response
      // console.log(uploadedUrl);

      // Update the form data with the uploaded photo URL
      setFormData((prev: any) => ({
        ...prev,
        photo: uploadedUrl,
      }));

      closePhotoModal(); // Close the modal after the upload
    } catch (error: any) {
      console.error("Upload failed:", error);
      setPhotoError(
        error.response?.data?.message ||
          "Не удалось загрузить фото. Пожалуйста, попробуйте позже."
      );
    } finally {
      setUploadingPhoto(false);
    }
  };

  if (!isPhotoModalShow) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-6 text-[#252525]">
          Изменить фото
        </h2>

        {/* Drag-and-drop area */}
        <div
          className={`mb-4 border-2 border-dashed p-6 rounded-lg text-center cursor-pointer ${
            fileEnter
              ? "border-blue-500 bg-gray-100"
              : "border-gray-300 bg-gray-50"
          }`}
          onClick={() => document.getElementById("file-input")?.click()}>
          {tempPhoto ? (
            <img
              src={tempPhoto}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-full mx-auto"
            />
          ) : (
            <p className="text-gray-500">
              Перетащите фото сюда или выберите файл
            </p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-input"
          />
        </div>

        {/* Display upload status */}
        {uploadingPhoto && (
          <div className="mb-4 text-center text-blue-500">Загрузка...</div>
        )}

        {/* Display error message */}
        {photoError && (
          <div className="mb-4 text-center text-red-500">{photoError}</div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={handleConfirmPhoto}
            className="bg-[#1132F5] text-white px-6 py-2 rounded-lg hover:bg-[#158f72] w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!tempPhoto || uploadingPhoto}>
            Подтвердить
          </button>
          <button
            type="button"
            onClick={closePhotoModal}
            className="text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 w-full text-center">
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};
