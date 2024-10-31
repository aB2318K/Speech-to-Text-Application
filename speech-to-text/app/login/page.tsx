'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogIn() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fieldValidator = (userInput: string, setError: React.Dispatch<React.SetStateAction<string>>) => {
        if (userInput.trim().length === 0) {
            setError('*This field is required');
            return false;
        } else {
            setError('');
            return true;
        }
    };

    const handleSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        const isEmailValid = fieldValidator(email, setEmailError);
        const isPasswordValid = fieldValidator(password, setPasswordError);

        if (isEmailValid && isPasswordValid) {
            try {
                const requestData = {
                    email,
                    password,
                };
          
                const response = await fetch('http://localhost:9000/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(requestData),
                });
          
                const data = await response.json();
                if (response.ok) {
                    setSuccessMessage('You have successfully logged in.');
                    localStorage.setItem('userID', data.userID);
                    localStorage.setItem('token', data.token);
                    const token = localStorage.getItem('token');
                    if (token) router.push('/dashboard');
                } else {
                  setEmailError(data.message || 'An error occurred while signing up.');
                }
              } catch (error) {
                console.error('Error:', error);
                setEmailError('An error occurred while trying to sign up.');
              }
           
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-teal-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center mb-6 text-teal-700">
                    Log In
                </h2>
                <form onSubmit={handleSubmission} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-teal-800"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            placeholder="Enter your email"
                            className="mt-1 w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                        {emailError && <p className="empty_error text-red-700 text-[10px] inline-block">{emailError}</p>}
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-teal-800"
                        >
                            Password: 
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
                        {passwordError && <p className="empty_error text-red-700 text-[10px] inline-block">{passwordError}</p>}                       
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        Log In
                    </button>
                </form>
                <div className="text-center mt-4">
                    <Link href="/reset-password" className="text-sm text-teal-600 hover:underline">
                        Forgotten Password?
                    </Link>
                </div>
                <p className="mt-4 text-center text-sm text-teal-800">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-teal-600 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}
