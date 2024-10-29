'use client'
import Link from "next/link"
import { useState } from "react";

// TODO Get actual user info from database
const user = { firstName: 'First', lastName: 'Last' };

export default function Profile() {
    // Main state variables
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    // Temporary state variables for modals
    const [tempFirstName, setTempFirstName] = useState(firstName);
    const [tempLastName, setTempLastName] = useState(lastName);
    const [firstNameModalOpened, setFirstNameModalOpened] = useState(false);
    const [lastNameModalOpened, setLastNameModalOpened] = useState(false);
    const [passwordModalOpened, setPasswordModalOpened] = useState(false);

    // New state variables for password validation
    const [passwordError, setPasswordError] = useState('');
    const [matchError, setMatchError] = useState('');

    const passwordValidator = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
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
        if (newPassword !== rePassword) {
            setMatchError('*Passwords do not match');
            return false;
        } else {
            setMatchError('');
            return true;
        }
    };

    const handlePasswordChange = () => {
        const isPasswordValid = passwordValidator();
        const isMatching = passwordMatchValidator();
        if (isPasswordValid && isMatching) {
            // Logic to update password in the database goes here

            // Close the modal after successful update
            setPassword('');  // Clear current password
            setNewPassword(''); // Clear new password
            setRePassword(''); // Clear re-entered password
            setPasswordModalOpened(false);
            setPasswordModalOpened(false);
        }
    }


    // Handlers for saving changes
    //ToDO update these functions to actually update the database:
    const handleFirstNameChange = () => {
        setFirstName(tempFirstName);
        setFirstNameModalOpened(false);
    }

    const handleLastNameChange = () => {
        setLastName(tempLastName);
        setLastNameModalOpened(false);
    }

    // Modal for editing first name
    const editFirstNameModal = (
        <div className="edit_first_modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg w-1/4">
                <label htmlFor="first_name" className="block text-sm font-medium text-teal-800">
                    First Name:
                </label> 
                <input
                    type="text"
                    id="first_name"
                    value={tempFirstName}
                    onChange={(e) => setTempFirstName(e.target.value)} 
                    placeholder="Enter your first name"
                    maxLength={50}
                    required
                    className="mt-1 w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <div className="flex justify-end mt-4">
                    <button
                        onClick={() => {
                            setTempFirstName(firstName); // Reset temp to original
                            setFirstNameModalOpened(false);
                        }}
                        className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mr-2">
                        Cancel
                    </button>
                    <button
                        onClick={handleFirstNameChange}
                        className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );

    // Modal for editing last name
    const editLastNameModal = (
        <div className="edit_last_modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg w-1/4">
                <label htmlFor="last_name" className="block text-sm font-medium text-teal-800">
                    Last Name:
                </label> 
                <input
                    type="text"
                    id="last_name"
                    value={tempLastName}
                    onChange={(e) => setTempLastName(e.target.value)} 
                    placeholder="Enter your last name"
                    maxLength={50}
                    required
                    className="mt-1 w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <div className="flex justify-end mt-4">
                    <button
                        onClick={() => {
                            setTempLastName(lastName); // Reset temp to original
                            setLastNameModalOpened(false);
                        }}
                        className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mr-2">
                        Cancel
                    </button>
                    <button
                        onClick={handleLastNameChange}
                        className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );

    // Modal for changing password
    const changePasswordModal = (
        <div className="password_modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg w-1/4">
                <h3 className="text-lg mb-2 text-center text-teal-700 font-semibold">Change Password</h3>
                <label htmlFor="current_password" className="block text-sm font-medium text-teal-800">
                    Current Password:
                </label>
                <input
                    type="password"
                    id="current_password"
                    placeholder="Enter your current password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <label htmlFor="new_password" className="block text-sm font-medium text-teal-800 mt-4">
                    New Password:
                </label>
                <input
                    type="password"
                    id="new_password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="mt-1 w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                {passwordError && <p className="error_message text-red-700 text-[10px]">{passwordError}</p>}
                <label htmlFor="re_password" className="block text-sm font-medium text-teal-800 mt-4">
                    Re-enter New Password:
                </label>
                <input
                    type="password"
                    id="re_password"
                    placeholder="Re-enter your new password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    required
                    className="mt-1 w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                {matchError && <p className="match_error text-red-700 text-[10px]">{matchError}</p>}
                <div className="flex justify-end mt-4">
                    <button
                        onClick={() => {
                            setPasswordModalOpened(false);
                            setPassword('');
                            setNewPassword('');
                            setRePassword('');
                            setPasswordError('');
                            setMatchError('');
                        }}
                        className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mr-2">
                        Cancel
                    </button>
                    <button
                        onClick={handlePasswordChange}
                        className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-teal-50">
            {/* Sidebar */}
            <div className="side_bar w-1/6 bg-white text-black p-4 rounded-lg shadow-lg ">
                <p className="text-sm font-semibold mb-4 text-teal-800 text-center">Speech to Text Application</p>
                <ul className="space-y-2">
                    <li>
                        <Link href={`/dashboard/0`}>
                            <button className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-2">
                                Home
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link href="/create">
                        <button className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-2">
                            Create New
                        </button>
                        </Link>
                    </li>
                    <li>
                        <Link href="/collaborate">
                            <button className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-2">
                                Collaborate
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link href="/login">
                            <button className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                                Log Out
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center p-10">
                <h2 className="text-2xl font-semibold text-center mb-4 text-teal-700">
                    Profile
                </h2>
                <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
                    <ul className="space-y-6 text-teal-900">
                        <li className="first_name flex items-center justify-between">
                            <span className="text-lg">First Name: {firstName}</span>
                            <button onClick={() => {
                                setTempFirstName(firstName); // Initialize temp with current value
                                setFirstNameModalOpened(true);
                            }} className="edit_first_name text-sm py-1 px-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                                Edit
                            </button>
                        </li>
                        <li className="last_name flex items-center justify-between">
                            <span className="text-lg">Last Name: {lastName}</span>
                            <button onClick={() => {
                                setTempLastName(lastName); // Initialize temp with current value
                                setLastNameModalOpened(true);
                            }} className="edit_last_name text-sm py-1 px-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                                Edit
                            </button>
                        </li>
                        <li className="flex justify-center">
                            <button onClick={() => setPasswordModalOpened(true)} className="text-sm py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                                Change Password
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            {firstNameModalOpened && editFirstNameModal}
            {lastNameModalOpened && editLastNameModal}
            {passwordModalOpened && changePasswordModal}
        </div>
    );
}
