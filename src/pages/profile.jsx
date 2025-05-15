import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_URL;

    const [UserData, setUserData] = useState({});
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone_number: '',
        address: '',
    });

    const [editMode, setEditMode] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const refreshUserData = () => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch(`${baseURL}/getusers`, {
                headers: {
                    'auth-token': token
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        const userData = {
                            name: data.name,
                            email: data.email,
                            phone_number: data.phone_number,
                            address: data.address
                        };
                        setUserData(userData);
                    }
                })
                .catch(err => console.error("Error fetching user data:", err));
        }
    };



    useEffect(() => {
        refreshUserData();
    }, []);

    useEffect(() => {
        if (UserData.name) {
            setProfile({
                name: UserData.name || '',
                email: UserData.email || '',
                phone_number: UserData.phone_number || '',
                address: UserData.address || '',
            });
        }
    }, [UserData]);

    const updateUserData = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            if (token) {
                const response = await fetch(`${baseURL}/Updateuser`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    },
                    body: JSON.stringify(profile),
                });

                const responseData = await response.json();
                console.log(responseData.success);
                if (responseData.success) {
                    refreshUserData();
                    setEditMode(false);
                    alert('Profile updated successfully!');
                } else {
                    console.log(responseData.error || responseData.errors);
                }
            }
        } catch (err) {
            console.error("An error occurred. Please try again.", err);
        }
    };

    const updatePassword = async () => {
        if (passwordData.newPassword === passwordData.confirmPassword) {
            try {
                const token = localStorage.getItem('auth-token');
                if (token) {
                    const response = await fetch(`${baseURL}/updatepassword`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'auth-token': token,
                        },
                        body: JSON.stringify({
                            currentPassword: passwordData.currentPassword,
                            newPassword: passwordData.newPassword,
                            confirmPassword: passwordData.confirmPassword,
                        }),
                    });

                    const responseData = await response.json();
                    console.log(responseData.success);
                    if (responseData.success) {
                        refreshUserData();
                        setPasswordData({
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                        });
                        alert('Password updated successfully!');
                    } else {
                        alert(responseData.error || 'Failed to update password.');
                        console.log(responseData.error || responseData.errors);
                    }
                }
            } catch (err) {
                console.error("An error occurred. Please try again.", err);
            }
        } else {
            alert("New password and confirm password do not match.");
        }
    };

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    return (
        <div className="mx-auto px-4 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Manage Profile</h2>

            {/* Profile Info */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Profile Info</h3>
                <div className="space-y-2">
                    <div>
                        <label htmlFor="name" className="text-gray-700 font-medium">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            disabled={!editMode}
                            value={profile.name}
                            onChange={handleProfileChange}
                            className="w-full p-2 mt-2 border rounded-md"
                            placeholder="Full Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            disabled={!editMode}
                            value={profile.email}
                            onChange={handleProfileChange}
                            className="w-full p-2 mt-2 border rounded-md"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone_number" className="text-gray-700 font-medium">Phone Number</label>
                        <input
                            type="text"
                            name="phone_number"
                            disabled={!editMode}
                            value={profile.phone_number}
                            onChange={handleProfileChange}
                            className="w-full p-2 mt-2 border rounded-md"
                            placeholder="Phone"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="text-gray-700 font-medium">Delivery Address</label>
                        <input
                            type="text"
                            name="address"
                            disabled={!editMode}
                            value={profile.address}
                            onChange={handleProfileChange}
                            className="w-full p-2 mt-2 border rounded-md"
                            placeholder="Delivery Address"
                        />
                    </div>
                </div>
                <div className="mt-4 flex gap-4">
                    {editMode ? (
                        <>
                            <button
                                onClick={updateUserData}
                                className="px-4 py-2 bg-amber-500 text-white rounded-md"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditMode(false)}
                                className="px-4 py-2 border border-gray-400 rounded-md"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setEditMode(true)}
                            className="px-4 py-2 bg-gray-800 text-white rounded-md"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>

            <hr className="my-6" />

            {/* Change Password */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Change Password</h3>
                <div className="space-y-4">
                    <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full p-2 border rounded-md"
                        placeholder="Current Password"
                    />
                    <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full p-2 border rounded-md"
                        placeholder="New Password"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full p-2 border rounded-md"
                        placeholder="Confirm New Password"
                    />
                </div>
                <button
                    onClick={updatePassword}
                    className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-md"
                >
                    Update Password
                </button>
            </div>

            <hr className="my-6" />

            <div className="text-center">
                <button
                    onClick={() => {
                        localStorage.removeItem('auth-token');
                        navigate('/');
                        window.location.reload();
                    }}
                    className='rounded-2xl bg-dark border-2 py-2 px-3 hover:border-amber-500'
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
