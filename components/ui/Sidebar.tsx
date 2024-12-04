'use client';

import {useState} from "react";
import Image from "next/image";
import MenuItem from "../../components/ui/MenuItem";

interface SidebarProps {
    activeItem: string;
    setActiveItem: (item: string) => void;
    profileName: string;
    profilePhoto: string;
    onPhotoUpload: (newPhotoUrl: string) => void;  // Callback to update the parent state
}

const Sidebar: React.FC<SidebarProps> = ({activeItem, setActiveItem, profileName, profilePhoto, onPhotoUpload}) => {
    const [isUploading, setIsUploading] = useState(false);

    const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            // if (!token) {
            //     throw new Error("No token found");
            // }

            const response = await fetch('http://localhost:8080/api/profile/upload-photo', {
                method: 'PATCH',
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9PV05FUiIsInR5cCI6ImFjY2VzcyIsInN1YiI6Im1pa29vb3NpYTAwNUBnbWFpbC5jb20iLCJpYXQiOjE3MzMyMjI1OTQsImV4cCI6MTczMzgyNzM5NH0.L9qLiI9WbZ858pWECKH8GCX9k8adrczflX-s6L3Ink8`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to upload photo: ${errorMessage}`);
            }

            const uploadedPhotoUrl = await response.text();

            onPhotoUpload(uploadedPhotoUrl);

            alert('Profile photo updated successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error uploading photo:', error);
            alert('Failed to upload photo');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex-none bg-white rounded-[10px] border border-gray-300 w-1/4 min-h-full h-[600px]">
            <div className="relative flex justify-center mt-[30px]">
                <div className="w-[130px] h-[130px] rounded-full overflow-hidden relative">
                    <Image
                        src={profilePhoto || "/profile.jpg"} // Use passed profile photo URL
                        alt="Profile Image"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <button
                    className="absolute bottom-2 right-[110px] bg-[#252525] p-2 rounded-full text-white shadow-lg flex items-center justify-center"
                    onClick={() => document.getElementById("photo-upload")?.click()}
                >
                    <Image src="/pencil.svg" alt="Edit" width={14} height={14}/>
                </button>

                {/* Hidden file input */}
                <input
                    type="file"
                    accept="image/*"
                    id="photo-upload"
                    className="hidden"
                    onChange={handlePhotoChange}
                />
            </div>
            <div className="text-center mt-5 mb-20">
                <h2 className="text-base font-medium text-gray-900">{profileName}</h2>
            </div>

            <nav className="space-y-7 mt-6">
                <MenuItem
                    label="Профиль"
                    isActive={activeItem === "profile"}
                    href="/profile"
                    onClick={() => setActiveItem("profile")}
                >
                    <Image src="/user.svg" alt="Profile Icon" width={20} height={20}/>
                </MenuItem>
                <MenuItem
                    label="Мои отклики"
                    isActive={activeItem === "responses"}
                    onClick={() => setActiveItem("responses")}
                >
                    <Image src="/reply.svg" alt="Responses Icon" width={20} height={20}/>
                </MenuItem>
                <MenuItem
                    label="Мои объявления"
                    isActive={activeItem === "myAnnouncements"}
                    href="/myAnnouncements"
                    onClick={() => setActiveItem("myAnnouncements")}
                >
                    <Image src="/announcement.svg" alt="Announcement Icon" width={20} height={20}/>
                </MenuItem>
                <MenuItem
                    label="Анкета"
                    href="/questionnaire"
                    isActive={activeItem === "questionnaire"}
                    onClick={() => setActiveItem("questionnaire")}
                >
                    <Image src="/edit.svg" alt="Questionnaire Icon" width={20} height={20}/>
                </MenuItem>
            </nav>
        </div>
    );
};

export default Sidebar;
