'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const emailValidator = (event: React.MouseEvent) => {
        event.preventDefault(); 
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        if (!emailRegex.test(email)) {
            setEmailError('Please provide a valid email address in the format: example@domain.com.');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    }

    const passwordValidator = (event: React.MouseEvent) => {
        event.preventDefault();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError(
                'Your password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.'
            );
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    }

    const handleSubmission = (event: React.MouseEvent) => {
        event.preventDefault();
        emailValidator(event);
        passwordValidator(event);
        if(emailValidator(event) && passwordValidator(event)) {
            setSuccessMessage('You have successfully created an account. Redirecting to Log In page');

            setTimeout(() => {
                router.push('/login'); // Redirect to login page
            }, 2000); 
        }
        setEmail('');
        setPassword('');
    }

    return (
        <div>
            <form action="/submit" method="post">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {emailError && <p>{emailError}</p>}

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    pattern='(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {passwordError && <p>{passwordError}</p>}

                <button type="submit" onClick={(e) => {handleSubmission(e)}}>
                    Sign Up
                </button>
                {successMessage}
            </form>
        </div>
    );
}
