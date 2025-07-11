"use client";

import Editor from "@/components/proj/edittool";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Home, HomeIcon, MapPin, Medal, Shield, User, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";


const Publish = () => {
    const [data, setData] = useState(null);
    const [basicData, setBasicData] = useState(null);
    const router = useRouter();
    const handleEditorChange = (content) => {
        console.log("Editor data:", content);
        setData(content);
    };


    useEffect(() => {
        const storedData = localStorage.getItem("basicData");
        if (storedData) {
            setBasicData(JSON.parse(storedData));
        }
    }, []);
    console.log(basicData);

    const Infotext = ({ label, value, icon }) => {
        return (
            <div className='flex items-center gap-4  pl-5 pr-2'>
                <div className='text-white'>{icon}</div>
                <div className="grid">
                    <p className="text-[#eee] text-[14px]">{label}</p>
                    <p className="font-semibold text-white text-[16px]">
                        {value}
                    </p>
                </div>
            </div>
        )
    }

    const publishData = () => {
        if (!basicData || !data) {
            toast.error("basicData or content is missing");
            return;
        }

        const finalData = {
            ...basicData,
            content: data
        };

        console.log("Sending:", finalData);

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/add`, finalData)
            .then((res) => {
                console.log(res.data);
                localStorage.removeItem('basicData');
                router.push('/');
            })
            .catch((err) => {
                console.error("Axios error:", err.response?.data || err.message);
            });
    }



    return (
        <div>
            <div className="h-20 flex justify-between items-center px-5 md:px-8 shadow ">
                <div><ArrowLeft /></div>
                <Button onClick={publishData}>Publish</Button>
            </div>
            <div className=" flex md:flex-row flex-col md:p-20 p-3 gap-20">
                <div className="border bg-gray-500 md:w-[350px] w-full p-5">
                    <div className="shadow-md w-[200px] h-[250px] mx-auto"><img className="w-full h-full object-cover" src={basicData?.image}/></div>
                    <div className='space-y-3 pt-5 md:pb-10 pb-5 pl-2'>
                        <Infotext label={"Name"} value={basicData && basicData.name} icon={<User />} />
                        <Infotext label={"Service"} value={basicData && basicData.service} icon={<Shield />} />
                        <Infotext label={"Rank"} value={basicData && basicData.rank} icon={<Medal />} />
                        <Infotext label={"Place of Birth"} value={basicData && basicData.pob} icon={<MapPin />} />
                        <Infotext label={"Date of Birth"} value={basicData && basicData.dob} icon={<Calendar />} />
                        <Infotext label={"Unit"} value={basicData && basicData.unit} icon={<Users />} />
                        <Infotext label={"Army Reg"} value={basicData && basicData.armreg} icon={<HomeIcon />} />
                        <Infotext label={"Martyrdom"} value={basicData && basicData.martyrdom} icon={<Calendar />} />
                    </div>
                </div>
                <div>
                    <Editor data={data} onChange={handleEditorChange} />
                </div>
            </div>
        </div>
    )
}

export default Publish;