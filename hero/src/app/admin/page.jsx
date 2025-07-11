"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const submitHandler = (e) => {
        e.preventDefault;
        if(!username || !password){
            alert("req all fields")
        }else{
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/checklog`,{name : username, password},{withCredentials: true}).then((res) => {
                console.log(res)
            }).catch(err => console.log(err)).finally(() => {
                router.push('/')
            })
        }

    }

    return (
        <div>
            <div>
                <h1 className="text-3xl text-center font-bold py-20">Login</h1>
            </div>
            <form action={submitHandler} className="max-w-2xl shadow-md mx-auto grid gap-3 p-5">
                <input type="text" placeholder="Username" className="h-13 rounded-md border outline-none px-5" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="Password" className="h-13 rounded-md border outline-none px-5" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="h-13 rounded-md border outline-none px-5 bg-lime-700 text-white font-semibold" type="submit">Submit</button>
            </form>
        </div>
    )
}