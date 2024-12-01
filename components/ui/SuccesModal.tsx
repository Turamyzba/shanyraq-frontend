import {FC} from "react";

interface SuccessModalProps {
    onClose: () => void; // Function to handle modal closure
}

const SuccessModal: FC<SuccessModalProps> = ({onClose}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* Modal container */}
            <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 text-center">
                {/* Icon */}
                <div className="flex justify-center items-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex justify-center items-center">
                        <svg
                            className="w-8 h-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Поздравляем! Вы можете сделать свой профиль открытым!
                </h2>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                    Данная функция позволяет вам сделать свой профиль видным для всех во
                    вкладке “В поисках жилья”. При использовании этой функции, вам
                    необходимо выбрать нужный район, бюджет и дату когда вы можете
                    заселиться чтобы найти нужного арендодателя.
                </p>

                {/* Button */}
                <button
                    onClick={onClose}
                    className="bg-green-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-600"
                >
                    Готово
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
