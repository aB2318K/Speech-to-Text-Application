'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPassword() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [matchError, setMatchError] = useState('');
    const [reEnter, setReEnter] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const passwordValidator = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError(
                '*Your password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character'
            );
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    const passwordMatchValidator = () => {
        if (password !== reEnter) {
            setMatchError('*Passwords do not match');
            return false;
        } else {
            setMatchError('');
            return true;
        }
    };
 
    const handleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isPasswordValid = passwordValidator();
        const isMatching = passwordMatchValidator();
        if (isPasswordValid && isMatching) {
            //Before this update the password in the database
            setSuccessMessage('You have successfully updated your password. Redirecting to Log In page');

            setTimeout(() => {
                router.push('/login'); // Redirect to login page
            }, 3000); 
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-teal-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center mb-6 text-teal-700">
                    Create New Password
                </h2>
                <form onSubmit={handleSubmission} className="space-y-5">
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-teal-800"
                        >
                            New Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            placeholder="Enter your password"
                            className="mt-1 w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                        {passwordError && <p className="error_message text-red-700 text-[10px] inline-block">{passwordError}</p>}
                    </div>
                    <div>
                        <label
                            htmlFor="re-enter-password"
                            className="block text-sm font-medium text-teal-800"
                        >
                            Re-enter your password: 
                        </label>
                        <input
                            type="password"
                            id="re-enter-password"
                            value={reEnter}
                            placeholder="Re-enter your password"
                            onChange={(e) => setReEnter(e.target.value)}
                            name="re-enter-password"
                            className="mt-1 w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                        {matchError && <p className="empty_error text-red-700 text-[10px] inline-block">{matchError}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        Update Password
                    </button>
                    {successMessage && <p className="success_message bg-teal-100 text-teal-600 text-center mt-4 rounded-md">{successMessage}</p>}
                </form>
            </div>
        </div>
    );
}
