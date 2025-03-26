"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import * as Images from "@/public/images";
import Progress from "@/components/progress";
import ProfilePage from "./profile";
import MyAnnouncements from "@/app/profile/my-announcements";
import MenuItem from "@/components/ui/MenuItem";
import axiosInstance from "@/axiosInstance/axios";
import { useRouter } from "next/navigation";
import { ProfilePhotoModal } from "@/components/profile-photo-modal";
import Skeleton from "@mui/material/Skeleton";

export default function ProfilesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    photo: "",
    hasPassword: false,
  });
  const [isModalShow, setIsModalShow] = useState(false);
  const [activeItem, setActiveItem] = useState("profile");
  const [value, setValue] = useState(0);
  const [isPhotoModalShow, setIsPhotoModalShow] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    new: false,
    confirm: false,
  });

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get("/profile");
      const data = response.data;

      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phoneNumber || "",
        birthDate: data.birthDate || "",
        gender: data.gender || "",
        photo: data.profilePhoto || "",
        hasPassword: data.isPasswordHas || false,
      });

      if (!data.isPasswordHas) openModal();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    setValue(calculateProfileProgress(formData));
  }, [formData]);

  const calculateProfileProgress = (profile) => {
    const weights = {
      firstName: 15,
      lastName: 15,
      email: 20,
      gender: 10,
      birthDate: 5,
      phone: 5,
      photo: 10,
      hasPassword: 20,
    };

    let progress = 0;
    Object.keys(weights).forEach((key) => {
      if (profile[key]) progress += weights[key];
    });

    return Math.min(progress, 100);
  };

  const openModal = () => setIsModalShow(true);
  const closeModal = () => setIsModalShow(false);

  const openPhotoModal = () => setIsPhotoModalShow(true);
  const closePhotoModal = () => setIsPhotoModalShow(false);

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col gap-[35px]">
        <Header isFilterResults={true} />
        <div className="w-full max-w-[1300px] mx-auto px-4 flex-grow mt-[35px]">
          <Skeleton variant="rectangular" height={20} className="mb-6" />
          <div className="flex gap-10">
            <Skeleton
              variant="rectangular"
              width={300}
              height={500}
              className="rounded-[10px]"
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={500}
              className="rounded-[10px]"
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="min-h-screen flex flex-col gap-[35px] items-center justify-center">
  //       <Header isFilterResults={true} />
  //       <div className="text-center">
  //         <h1 className="text-xl font-bold mb-4">Error</h1>
  //         <p>{error}</p>
  //         <button
  //           onClick={fetchProfile}
  //           className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
  //         >
  //           Retry
  //         </button>
  //       </div>
  //       <Footer />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen flex flex-col gap-[35px]">
      <Header isFilterResults={true} />
      <div className="w-full max-w-[1300px] mx-auto px-4 flex-grow mt-[35px]">
        <Progress value={value} />
        <div className="flex flex-col md:flex-row w-full gap-10 mt-[35px]">
          <div className="flex flex-col md:block bg-white rounded-[10px] border-[1px] border-[#B5B7C0] md:w-[300px] max-h-[500px] md:sticky top-[40px]">
            <div className="flex justify-center mt-[30px]">
              <div className="w-[120px] h-[120px] rounded-full overflow-hidden relative">
                {formData.photo ? (
                  <img
                    src={formData.photo}
                    alt="User Photo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Images.userPhoto h={"120"} w={"120"} />
                )}

                <button
                  onClick={openPhotoModal}
                  className="absolute bottom-[14px] right-[8px] bg-[#252525] p-[4px] rounded-full text-white shadow-lg"
                >
                  <Images.userPhotoEdit />
                </button>
              </div>
            </div>
            <div className="flex justify-center mt-5 mb-2 md:mb-20">
              <p className="font-circular font-medium text-[#252525] leading-[20px] tracking-[0.2px] text-left">
                {`${formData.firstName || "User"}`}
              </p>
            </div>
            <nav className="flex md:flex-col w-full justify-around md:space-y-7">
              <MenuItem
                label="Профиль"
                isactive={activeItem === "profile"}
                onClick={() => setActiveItem("profile")}
              >
                <Image
                  src={"/user.svg"}
                  alt="Profile Icon"
                  width={20}
                  height={20}
                />
              </MenuItem>
              <MenuItem
                label="Мои объявления"
                isactive={activeItem === "my-announcements"}
                onClick={() => setActiveItem("my-announcements")}
              >
                <Image
                  src={"/announcement.svg"}
                  alt="Announcement Icon"
                  width={20}
                  height={20}
                />
              </MenuItem>
            </nav>
          </div>
          {activeItem === "profile" && (
            <ProfilePage
              formData={formData}
              setFormData={setFormData}
              fetchProfile={fetchProfile}
            />
          )}
          {activeItem === "my-announcements" && <MyAnnouncements />}
        </div>
      </div>
      <ProfilePhotoModal
        isPhotoModalShow={isPhotoModalShow}
        closePhotoModal={closePhotoModal}
        setFormData={setFormData}
      />
      <Footer />
    </div>
  );
}
