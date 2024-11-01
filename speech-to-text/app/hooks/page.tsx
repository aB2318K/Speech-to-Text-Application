import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

export default useAuth;