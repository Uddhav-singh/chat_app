import { useState } from "react";
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState(
        {
            name: "",
            email: "",
            phone_number: "",
            password: ""
        }
    );

    const [message, setMessage] = useState("");
    // const [messageType, setMessageType] = useState(""); // 'success' or 'error'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
            setMessage(response.data.message);
            // setMessageType("success"); // Set message type to success
        } catch (error) {
            setMessage(error.response?.data?.message || "Error signing up");
            // setMessageType("error"); // Set message type to error
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="p-6 bg-gray-200 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Sign Up</h2>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} className="p-2 border w-full mb-2" required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="p-2 border w-full mb-2" required />
                <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} className="p-2 border w-full mb-2" required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} className="p-2 border w-full mb-2" required />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
                {message && <p className="mt-2 text-red-500">{message}</p>}
            </form>
          
        </div>
    );


};

export default SignUp;