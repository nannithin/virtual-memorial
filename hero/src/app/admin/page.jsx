"use client";

import { useAdmin } from "@/context/admincontext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);
    const { refreshAdmin, admin, loading } = useAdmin();
    const router = useRouter();

    useEffect(() => {
        if (admin?.islogin) {
        return router.push('/');
    }
    },[admin])

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        
        if (!username || !password) {
            alert("All fields are required");
            setLoginLoading(false);
            return;
        }

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/checklog`, 
                { name: username, password }, 
                { withCredentials: true }
            );
            
            await refreshAdmin();
            router.push('/');
        } catch (err) {
            console.error("Login failed:", err);
            alert("Login failed. Please try again.");
        } finally {
            setLoginLoading(false);
        }
    };

    

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div>
                        <h1 className="text-3xl text-center font-bold py-20">Login</h1>
                    </div>
                    <form onSubmit={submitHandler} className="max-w-2xl shadow-md mx-auto grid gap-3 p-5">
                        <input 
                            type="text" 
                            placeholder="Username" 
                            className="h-13 rounded-md border outline-none px-5" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="h-13 rounded-md border outline-none px-5" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <button 
                            className="h-13 rounded-md border outline-none px-5 bg-lime-700 text-white font-semibold" 
                            type="submit"
                            disabled={loginLoading}
                        >
                            {loginLoading ? "Logging in..." : "Submit"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}