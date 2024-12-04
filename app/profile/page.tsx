'use client';

import React, {useEffect, useState} from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import MenuItem from "../../components/ui/MenuItem";
import FormInput from "../../components/ui/FormInput";
import FormSelect from "../../components/ui/FormSelect";
import Sidebar from "@/components/ui/Sidebar";
import PasswordUpdateModal from "@/components/ui/PasswordUpdateModal";

export default function ProfilePage() {
    const token = `eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9PV05FUiIsInR5cCI6ImFjY2VzcyIsInN1YiI6Im1pa29vb3NpYTAwNUBnbWFpbC5jb20iLCJpYXQiOjE3MzMyMTk2MzAsImV4cCI6MTczMzgyNDQzMH0.rOTk_6xnTxxW7p6MVTijbSGguzfa81bdMq25-1SwSYg`;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passwordFields, setPasswordFields] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        showOldPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [activeItem, setActiveItem] = useState("profile");
    const [selectedOption, setSelectedOption] = useState("");
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        birthDate: '',
        gender: '',
        profilePhoto: ''
    });
    const [editMode, setEditMode] = useState(false);

    // State to manage the loading and error states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handlePhotoUpload = (newPhotoUrl: string) => {
        setProfileData((prev: any) => ({
            ...prev,
            photo: newPhotoUrl,
        }));
    };

    // Toggle edit mode
    const handleEditToggle = () => {
        if (editMode) {
            // Save data when switching back from edit mode
            saveProfileData().then(r => console.log("Profile data saved successfully!"));
        }
        setEditMode(!editMode);
    };

    // Handle input change for editable fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;

        console.log("name:", name);
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log('Form 2:', profileData.firstName);

    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Function to save updated profile data
    const saveProfileData = async () => {
        setLoading(true);
        setError("");

        try {
            // Format the birthDate field to match the backend expectation (yyyy-MM-dd)
            const formDataToSend = {
                ...profileData,
                birthDate: profileData.birthDate
                    ? new Date(profileData.birthDate).toISOString().split('T')[0] // Formats to "yyyy-MM-dd"
                    : new Date().toISOString().split('T')[0],  // Default to current date if not provided
            };


            console.log('Sending form data:', JSON.stringify(formDataToSend));

            const response = await fetch('http://localhost:8080/api/profile/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formDataToSend),  // Send updated form data
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(`Error: ${errorData.message || 'Something went wrong.'}`);
                return;
            }

            // Assuming the API returns updated profile data
            const data = await response.json();
            console.log('Profile old:', profileData);
            console.log('Profile updated:', data);

            setProfileData((prevData) => ({
                ...prevData,
                ...data,  // Assuming the response contains updated fields
            }));

            setEditMode(false);  // Exit edit mode after saving
        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/profile', {
                    method: 'GET',
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9PV05FUiIsInR5cCI6ImFjY2VzcyIsInN1YiI6Im1pa29vb3NpYTAwNUBnbWFpbC5jb20iLCJpYXQiOjE3MzMyMjk1MjMsImV4cCI6MTczMzgzNDMyM30.LibDIQvp0VitQnh5P_YOMiJ8oMDKbdyiHy-75R6pDD0`,
                    }
                });
                const data = await response.json();
                setProfileData({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    phoneNumber: data.phoneNumber || '',
                    birthDate: data.birthDate || '',
                    gender: data.gender || 'NOT_PROVIDED',
                    profilePhoto: data.profilePhoto || '/profile.jpg'
                });
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData().then(r => console.log("Profile data fetched successfully!"));
    }, []);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setPasswordFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePasswordVisibilityToggle = (field: string) => {
        setPasswordFields((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSubmitPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordFields.newPassword !== passwordFields.confirmPassword) {
            setError('Новый пароль и подтверждение пароля не совпадают');
            return;
        }
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/profile/update-password', {
                method: 'PATCH',
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9PV05FUiIsInR5cCI6ImFjY2VzcyIsInN1YiI6Im1pa29vb3NpYTAwNUBnbWFpbC5jb20iLCJpYXQiOjE3MzMyMjk1MjMsImV4cCI6MTczMzgzNDMyM30.LibDIQvp0VitQnh5P_YOMiJ8oMDKbdyiHy-75R6pDD0`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldPassword: passwordFields.oldPassword,
                    newPassword: passwordFields.newPassword,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Ошибка при обновлении пароля');
            } else {
                setSuccessMessage('Пароль успешно изменен');
                setPasswordFields({
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                    showOldPassword: false,
                    showNewPassword: false,
                    showConfirmPassword: false,
                });
                setTimeout(() => setSuccessMessage(''), 5000); // Clear success message after 5 seconds
            }
        } catch (error) {
            setError('Ошибка на сервере. Попробуйте позже.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordFields.newPassword !== passwordFields.confirmPassword) {
            alert("Пароли не совпадают!");
            return;
        }
        console.log("Password changed successfully:", passwordFields);
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <Header/>

            {/* Main Content */}
            <div className="w-full max-w-[1440px] mx-auto px-4 flex-grow mt-[35px]">
                {/* Progress Section */}
                <div className="w-full">
                    <div className="flex items-center space-x-4">
                        <div
                            className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full">
                            <span className="font-bold text-lg">!</span>
                        </div>
                        <div className="w-full">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-gray-800">25%</span>
                                <span className="text-sm text-gray-500">
                                    Заполните полностью профиль и получите доступ к функции "Поделиться профилем"
                                </span>
                            </div>
                            <div className="w-full h-2 bg-gray-300 rounded-full">
                                <div className="h-2 bg-green-500 rounded-full transition-all duration-300 ease-in-out"
                                     style={{width: "55%"}}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex w-full gap-10 mt-[35px]">
                    {/* Sidebar */}
                    <Sidebar
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                        profileName={`${profileData.firstName} ${profileData.lastName}`}
                        profilePhoto={profileData.profilePhoto} // Pass profile photo URL
                        onPhotoUpload={handlePhotoUpload}
                    />

                    {/* Profile Form */}
                    <div className="flex-auto bg-white rounded-[10px] border border-gray-300 w-full p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                                label="Имя"
                                name="firstName"
                                defaultValue={profileData.firstName}
                                disabled={!editMode}
                                onChange={handleInputChange}
                            />
                            <FormInput
                                label="Фамилия"
                                name="lastName"
                                defaultValue={profileData.lastName}
                                disabled={!editMode}
                                onChange={handleInputChange}
                            />
                            <FormInput
                                label="Email"
                                name="email"
                                type="email"
                                defaultValue={profileData.email}
                                disabled={!editMode}
                                onChange={handleInputChange}
                            />
                            <FormInput
                                label="Номер телефона"
                                name="phoneNumber"
                                type="text"
                                defaultValue={profileData.phoneNumber}
                                disabled={!editMode}
                                onChange={handleInputChange}
                            />
                            <FormInput
                                label="Дата рождения"
                                name="birthDate"
                                type="date"
                                defaultValue={profileData.birthDate}
                                disabled={!editMode}
                                onChange={handleInputChange}
                            />
                            <FormSelect
                                label="Гендер"
                                name="gender"
                                value={profileData.gender}
                                onChange={handleSelectChange}
                                options={[
                                    {value: "MALE", label: "Мужской"},
                                    {value: "FEMALE", label: "Женский"},
                                    {value: "NOT_PROVIDED", label: "Не указано"}
                                ]}
                                disabled={!editMode}
                            />
                        </div>
                        {error && <div className="text-red-600 mt-4">{error}</div>}
                        <div className="flex justify-end space-x-4 mt-52">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100"
                            >
                                Изменить пароль
                            </button>
                            <button
                                onClick={handleEditToggle}
                                className='bg-gray-900 hover:bg-gray-700 text-white px-6 py-2 rounded-lg'
                                disabled={loading}
                            >
                                {loading ? 'Сохранение...' : editMode ? 'Сохранить' : 'Редактировать'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <PasswordUpdateModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>

            {/* Footer */}
            <Footer/>
        </div>
    );
}