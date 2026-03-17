import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const userContext = createContext();

export function UserProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const saveUser = localStorage.getItem("user");
    if (saveUser) {
      return JSON.parse(saveUser)
    }
    return null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      const currentTime = Date.now();
      if (decode.exp * 1000 < currentTime) {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <userContext.Provider value={{ user, setUser, loading, setLoading, logout }}>
      {children}
    </userContext.Provider>
  );
}

export default function useUserContext() {
  const user = useContext(userContext);
  return user;
}
