import React, {useState} from 'react';
import FormInput from './FormInput';  // Import FormInput from where you define it

interface PasswordUpdateModalProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordUpdateModal: React.FC<PasswordUpdateModalProps> = ({isModalOpen, setIsModalOpen}) => {
    const [passwordFields, setPasswordFields] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        showOldPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setPasswordFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePasswordVisibilityToggle = (field: 'showOldPassword' | 'showNewPassword' | 'showConfirmPassword') => {
        setPasswordFields((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordFields.newPassword !== passwordFields.confirmPassword) {
            setError('Новый пароль и подтверждение пароля не совпадают');
            return;
        }
        setError('');
        setLoading(true);

        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9PV05FUiIsInR5cCI6ImFjY2VzcyIsInN1YiI6Im1pa29vb3NpYTAwNUBnbWFpbC5jb20iLCJpYXQiOjE3MzMyNTQ2NjMsImV4cCI6MTczMzg1OTQ2M30.euH8U3QeNBoYcvrbTJU7ksMGYC-bLpDGhY39of0Y4gw'; // Make sure you get this token from your app's auth system

        try {
            const response = await fetch('http://localhost:8080/api/profile/update-password', {
                method: 'PATCH',
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${token}`,
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
                setIsModalOpen(false);  // Close the modal after successful password change
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Ошибка при обновлении пароля');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Поменяйте свой пароль</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="relative">
                                    <FormInput
                                        label="Старый пароль"
                                        name="oldPassword"
                                        type={passwordFields.showOldPassword ? 'text' : 'password'}
                                        defaultValue={passwordFields.oldPassword}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handlePasswordVisibilityToggle('showOldPassword')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    >
                                        {passwordFields.showOldPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>

                                <div className="relative">
                                    <FormInput
                                        label="Новый пароль"
                                        name="newPassword"
                                        type={passwordFields.showNewPassword ? 'text' : 'password'}
                                        defaultValue={passwordFields.newPassword}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handlePasswordVisibilityToggle('showNewPassword')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    >
                                        {passwordFields.showNewPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>

                                <div className="relative">
                                    <FormInput
                                        label="Подтвердите пароль"
                                        name="confirmPassword"
                                        type={passwordFields.showConfirmPassword ? 'text' : 'password'}
                                        defaultValue={passwordFields.confirmPassword}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handlePasswordVisibilityToggle('showConfirmPassword')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    >
                                        {passwordFields.showConfirmPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                                    disabled={loading}
                                >
                                    {loading ? 'Загрузка...' : 'Подтвердить'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100"
                                >
                                    Отменить
                                </button>
                            </div>
                        </form>
                        {error && <p className="text-red-500 mt-4">{error}</p>}
                        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
                    </div>
                </div>
            )}
        </>
    );
};

export default PasswordUpdateModal;