import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const AuthPage = () => {
    // State to toggle between login and signup
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate(); // Hook to programmatically navigate

    // State to store form data
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        phone_no: '',
        add_phone_no: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            alert("Please fill in all required fields");
            return false;
        }
        return true;
    };

    const handleSignup = async () => {
        if (!validateForm()) return;
        if (formData.password !== formData.confirm_password) {
            alert("Passwords do not match");
            return;
        }
        const userInfo = {
            name: formData.name,
            age: formData.age,
            gender: formData.gender,
            phone_no: formData.phone_no,
            add_phone_no: formData.add_phone_no,
            email: formData.email,
            password: formData.password,
        };
        try {
            const res = await axios.post("http://localhost:3001/user/signup", userInfo);
            console.log(res.data);
            if (res.data) {
                alert("Signup Successful");
            }
        } catch (err) {
            console.error(err);
            alert("Error: " + (err.response?.data.message || err.message || "Unknown error"));
        }
    };

    const handleLogin = async () => {
        if (!validateForm()) return;
        const userInfo = {
            email: formData.email,
            password: formData.password,
        };
        try {
            const res = await axios.post("http://localhost:3001/user/login", userInfo);
            console.log(res.data);
            if (res.data) {
                alert("Login Successful");
                navigate("/dashboard");
            }
        } catch (err) {
            console.error(err);
            alert("Error: " + (err.response?.data.message || err.message || "Unknown error"));
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            handleLogin();
        } else {
            handleSignup();
        }
    };

    return (
        <div className='relative flex w-full h-screen bg-bgbase font-base font-bold'>
            <div className="flex flex-col items-center justify-center h-screen bg-level1 px-20">
                <h2 className="text-4xl font-bold mb-6">
                    {isLogin ? 'Login' : 'Signup'}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {isLogin ? (
                        // For Login: Email and Password fields
                        <>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="px-10 py-3 text-xl border rounded-[30px] text-level4 bg-white border-none"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="px-10 py-3 text-xl border rounded-[30px] text-level4 bg-white border-none"
                                required
                            />
                        </>
                    ) : (
                        // For Signup: Name, Age, Gender, Phone numbers, Email, and Password fields
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="px-10 py-3 text-xl border rounded-[30px] text-level4 bg-white border-none"
                                required
                            />
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={formData.age}
                                onChange={handleChange}
                                className="px-10 py-3 text-xl border rounded-[30px] text-level4 bg-white border-none"
                                required
                            />
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="px-10 py-3 text-xl border rounded-[30px] text-level4 bg-white border-none"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <input
                                type="text"
                                name="phone_no"
                                placeholder="Phone Number"
                                value={formData.phone_no}
                                onChange={handleChange}
                                className="px-10 py-3 text-xl border rounded-[30px] text-level4 bg-white border-none"
                                required
                            />
                            <input
                                type="text"
                                name="add_phone_no"
                                placeholder="Additional Phone Number"
                                value={formData.add_phone_no}
                                onChange={handleChange}
                                className="px-10 py-3 text-xl border rounded-[30px] text-level4 bg-white border-none"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="px-10 py-3 text-xl border rounded-[30px] text-level4 bg-white border-none"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="px-10 py-3 text-xl border rounded-[30px] text-level4 bg-white border-none"
                                required
                            />
                            <input
                                type="password"
                                name="confirm_password"
                                placeholder="Confirm Password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                className="px-10 py-3 text-xl border rounded-[30px] text-level4 bg-white border-none"
                                required
                            />
                        </>
                    )}
                    <button type="submit" className="btn bg-level4 text-white px-10 py-3 text-xl rounded-full">
                        {isLogin ? 'Login' : 'Signup'}
                    </button>
                </form>
                <p className="mt-4">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <span
                        className="text-level4 cursor-pointer px-4 py-2 bg-color1 rounded-full"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Sign up' : 'Log in'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
