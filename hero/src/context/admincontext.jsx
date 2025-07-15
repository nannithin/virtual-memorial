"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const fetchAdmin = async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/isadmin`, 
                { withCredentials: true }
            );
            setAdmin(res.data);
        } catch (err) {
            console.error("Failed to fetch admin data");
            setAdmin(null);
        } finally {
            setLoading(false);
        }
    };

    const refreshAdmin = async () => {
        setLoading(true);
        await fetchAdmin();
    };

    useEffect(() => {
        fetchAdmin();
    }, []);

    return (
        <AdminContext.Provider value={{ admin, setAdmin, loading, refreshAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);