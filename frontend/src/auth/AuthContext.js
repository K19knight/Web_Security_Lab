import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();



export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const {exp, id, sub: email, role} = decoded;
                if (exp * 1000 > Date.now()) {
                    setUser({id, email, role});
                } else {
                    setUser(null);
                    localStorage.removeItem("authToken");
                }
            } catch (err) {
                console.error("Invalid token", err)
                localStorage.removeItem("authToken")
            }
        }
        setLoading(false);

    }, []);

    const login = (token) => {
        try{
            const decoded = jwtDecode(token);
            const {exp, id, sub: email, role} = decoded;
            localStorage.setItem("authToken", token);
            const expires = new Date(exp * 1000).toUTCString();
            document.cookie = `authToken=${token}; expires=${expires};`;
            setUser({id, email, role});
            navigate("/");
        } catch (e) {
            console.error("Login error: invalid token", e)
        }

    }

    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;