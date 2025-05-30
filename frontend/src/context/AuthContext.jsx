import {createContext, useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => { 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // <- ADD THIS
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('token');    
        if(token){
            try {
                const decodedUser = jwtDecode(token); // Decode user info
                console.log(decodedUser); // Logs user details from the token
                setUser(decodedUser);
              } catch (error) {
                console.error("Invalid token:", error);
                localStorage.removeItem("token");
              }
        }
        setLoading(false); // <- Done loading
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
    //    navigate("/chat"); //redirect after login
    };

    const logout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("messages");
        setUser(null);
        navigate("/login");
    };


    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );

};


export const useAuth = () => useContext(AuthContext);