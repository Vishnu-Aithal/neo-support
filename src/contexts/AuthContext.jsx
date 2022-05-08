import { createContext, useContext, useState, useEffect } from "react";
import { onAuthListener, getUserData } from "utils/firebase";

const AuthContext = createContext({ user: null });

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const listenerCleaner = onAuthListener(async (user) => {
            if (user) {
                const userData = await getUserData(user);
                setCurrentUser(userData);
            } else {
                setCurrentUser(null);
            }
        });
        return listenerCleaner;
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
