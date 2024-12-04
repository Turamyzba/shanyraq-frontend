'use client';

import {useEffect, useState} from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import Card from "@/components/ui/Card";
import Sidebar from "@/components/ui/Sidebar";

export default function AnnouncementsPage() {
    const token = `eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9PV05FUiIsInR5cCI6ImFjY2VzcyIsInN1YiI6Im1pa29vb3NpYTAwNUBnbWFpbC5jb20iLCJpYXQiOjE3MzMyMTk2MzAsImV4cCI6MTczMzgyNDQzMH0.rOTk_6xnTxxW7p6MVTijbSGguzfa81bdMq25-1SwSYg`;
    const [activeItem, setActiveItem] = useState("myAnnouncements");
    const [activeButton, setActiveButton] = useState<'active' | 'archived'>('active');
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        profilePhoto: ''
    });
    const [announcements, setAnnouncements] = useState<any[]>([]);

    const handleArchiveClick = async (announcementId: number, isArchived: boolean) => {
        try {
            const action = isArchived ? 'restore-announcement' : 'archive-announcement';
            const response = await fetch(`http://localhost:8080/api/announcement/${action}/${announcementId}`, {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                // Update the announcements state with the new archived status
                setAnnouncements(prev =>
                    prev.map(item =>
                        item.id === announcementId ? { ...item, isArchived: !item.isArchived } : item
                    )
                );
            } else {
                console.error('Failed to update announcement status');
            }
        } catch (error) {
            console.error('Error updating announcement:', error);
        }
    };

    const handleDeleteClick = async (announcementId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/api/announcement/delete-announcement/${announcementId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setAnnouncements(prev => prev.filter(item => item.id !== announcementId)); // Remove deleted item
            } else {
                console.error('Failed to delete announcement');
            }
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };


    const handleShareClick = () => {
        console.log("Share clicked!");
    };

    const handleChevronClick = () => {
        console.log("Chevron clicked!");
    };

    const handlePhotoUpload = (newPhotoUrl: string) => {
        setProfileData((prev) => ({
            ...prev,
            profilePhoto: newPhotoUrl,
        }));
    };

    // Fetch profile data
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/profile', {
                    method: 'GET',
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const data = await response.json();
                setProfileData({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    profilePhoto: data.profilePhoto || '/profile.jpg'
                });
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    }, [token]);

    // Fetch announcements data based on active/archived button
    useEffect(() => {
        const fetchAnnouncements = async () => {
            const url = activeButton === 'active'
                ? 'http://localhost:8080/api/announcement/my-active-announcements'
                : 'http://localhost:8080/api/announcement/my-archive-announcements';

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const data = await response.json();
                setAnnouncements(data); // Store fetched announcements
            } catch (error) {
                console.error("Error fetching announcements data:", error);
            }
        };

        fetchAnnouncements();
    }, [activeButton, token]); // Trigger fetching when the button changes

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <Header/>

            {/* Main Content */}
            <div className="w-full max-w-[1440px] mx-auto px-4 flex-grow mt-[50px]">
                <div className="flex w-full gap-10 mt-[35px]">
                    {/* Sidebar */}
                    <Sidebar
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                        profileName={`${profileData.firstName} ${profileData.lastName}`}
                        profilePhoto={profileData.profilePhoto} // Pass profile photo URL
                        onPhotoUpload={handlePhotoUpload}
                    />

                    {/* Announcements */}
                    <div className="flex-auto bg-white rounded-[10px] border border-gray-300 w-full h-auto p-8">
                        <div className="flex justify-start mb-10">
                            {/* Active Button */}
                            <button
                                className={`${
                                    activeButton === 'active'
                                        ? 'border border-[#252525] hover:border-gray-500 text-[#252525]'
                                        : 'bg-white text-[#b5b7c0] border border-gray-300 border-r-0'
                                } text-sm font-semibold px-[70px] py-3 rounded-l-lg`}
                                onClick={() => setActiveButton('active')}
                            >
                                Активные
                            </button>

                            {/* Archived Button */}
                            <button
                                className={`${
                                    activeButton === 'archived'
                                        ? 'border border-[#252525] hover:border-gray-500 text-[#252525]'
                                        : 'bg-white text-[#b5b7c0]  border border-gray-300 border-l-0'
                                } text-sm font-semibold px-[70px] py-3 rounded-r-lg`}
                                onClick={() => setActiveButton('archived')}
                            >
                                Архивированные
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {announcements.map((announcement) => (
                                <Card
                                    key={announcement.id}
                                    id={announcement.id}
                                    imageUrl={announcement.imageUrl || '/room2.svg'}
                                    title={announcement.title}
                                    coords={announcement.coords}
                                    date={announcement.date}
                                    countOfRooms={announcement.countOfRooms}
                                    genderOfRoommate={announcement.genderOfRoommate}
                                    numberOfRoommates={announcement.numberOfRoommates}
                                    price={announcement.price}
                                    isArchived={announcement.isArchived}
                                    onShareClick={handleShareClick}
                                    onChevronClick={handleChevronClick}
                                    onArchiveClick={handleArchiveClick}
                                    onDeleteClick={handleDeleteClick}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer/>
        </div>
    );
}