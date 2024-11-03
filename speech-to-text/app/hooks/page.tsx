import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setIsAuthenticated(true);
        }
        else {
            setIsAuthenticated(false);
            router.push('/login');
        }
    }, [router])

    return isAuthenticated;
}

const useLogout = () => {
    const router = useRouter();

    const logout = useCallback(() => {
        // Remove token and userID from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("userID");
        
        // Redirect the user to the login page
        router.push("/login");
    }, [router]);

    return logout;
};

export { useAuth, useLogout };