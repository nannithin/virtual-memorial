"use client";

import ProfileCard from "@/components/proj/profilecard";
import { useAdmin } from "@/context/admincontext"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Admin() {
    const { admin, loading } = useAdmin();
    const [data, setData] = useState(null);
    const router = useRouter();
    useEffect(() => {
        if (!loading && !admin?.islogin) {
            router.push('/')
        }
    }, [admin])

    const fetchData = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/getall`, { withCredentials: true })
            .then((res) => setData(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            admin dashboard
            <div className="flex flex-wrap justify-center gap-8">
                {
                    data?.map((item, ind) => (
                        <ProfileCard key={ind} item={item} />
                    ))
                }
            </div>
        </div>
    )
}

