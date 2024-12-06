"use client";

import React from "react";
import { useState } from "react";
import * as Images from "@/public/images";
import axiosInstance from "@/axiosInstance/axios";

export const FileUpload = ({
  photos,
  setPhotos,
}: {
  photos: string[]; // Теперь photos — массив строк (URL)
  setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [fileEnter, setFileEnter] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Функция для обработки выбора или перетаскивания файлов
  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file); // Убедитесь, что имя поля совпадает с сервером
    });

    try {
      setUploading(true);
      setError(null);

      // Получите токен авторизации (например, из localStorage)
      const token = localStorage.getItem("token"); // Замените на ваш способ получения токена

      // Отправка POST запроса на /file/upload без ручной установки 'Content-Type'
      const response = await axiosInstance.post("/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Удалено
        },
      });

      // Предполагается, что response.data - массив URL
      const uploadedUrls: string[] = response.data;

      setPhotos((prev) => [...prev, ...uploadedUrls]);
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError("Не удалось загрузить файлы. Пожалуйста, попробуйте позже.");
    } finally {
      setUploading(false);
    }
  };

  // Обработчик изменения файла
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  // Обработчик события drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileEnter(false);
    handleFiles(e.dataTransfer.files);
  };

  // Обработчик события drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileEnter(true);
  };

  // Обработчик события drag leave
  const handleDragLeave = () => {
    setFileEnter(false);
  };

  // Обработчик удаления загруженной фотографии
  const handleDelete = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Обработчик сброса всех фотографий
  const handleReset = () => {
    setPhotos([]);
  };

  return (
    <div className="w-full mx-auto flex flex-col">
      {/* Область Drag and Drop */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`${
          fileEnter ? "border-4" : "border-2"
        } mx-auto bg-white flex flex-col w-full h-72 border-dashed items-center justify-center transition-border duration-300`}
      >
        <label
          htmlFor="file"
          className="h-full w-[200px] flex flex-col justify-center text-center items-center gap-[15px] cursor-pointer"
        >
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

      {/* Индикатор загрузки */}
      {uploading && (
        <div className="mt-4 text-center text-blue-500">Загрузка...</div>
      )}

      {/* Сообщение об ошибке */}
      {error && (
        <div className="mt-4 text-center text-red-500">{error}</div>
      )}

      {/* Отображение загруженных изображений */}
      {photos.length > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Uploaded Photos</h3>
            <button
              onClick={handleReset}
              className="text-sm text-red-500 hover:underline"
            >
              Reset
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {photos.map((url, index) => (
              <div key={index} className="flex flex-col items-center relative">
                <img
                  className="rounded-md w-full max-w-xs h-48 object-cover"
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                />
                {/* Кнопка удаления */}
                <button
                  onClick={() => handleDelete(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 rounded-full hover:bg-red-600"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
