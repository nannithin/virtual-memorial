"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import supaBase from "@/utils/supabase";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const Create = () => {
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState("");
    const router = useRouter();
    const [basicData, setBasicData] = useState({
        name: "",
        service: "",
        dob: "",
        pob: "",
        lastrank: "",
        armreg: "",
        unit: "",
        martyrdom: "",
        image: ""
    })
    const handleChange = (field) => (e) => {
        setBasicData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFile(file);
        setPreview(URL.createObjectURL(file));

    };

    const validateForm = () => {
        const { name, service, dob, pob, lastrank, armreg, unit, martyrdom } = basicData;

        if (!name || !service || !dob || !pob || !lastrank || !armreg || !unit || !martyrdom || !file) {
            return false;
        }

        return true;
    };

    const nextHandler = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("All fields are required");
            return;
        }

        const upurl = await supaBase(file, basicData.name);

        if (!upurl) {
            toast.error("Something went wrong");
            return;
        }

        setBasicData(prev => {
            const updated = { ...prev, image: upurl };
            localStorage.setItem("basicData", JSON.stringify(updated));
            return updated;
        });

        if (preview) URL.revokeObjectURL(preview);

        router.push("/create/publish"); 
    };

    return (
        <div>
            <div className="h-20 flex justify-between items-center px-5 md:px-8 ">
                <div><ArrowLeft /></div>
                <Button onClick={nextHandler}>Next</Button>
            </div>
            <div className="flex flex-col items-center py-5 w-full">
                <div
                    onClick={() => fileInputRef.current.click()}
                    className="w-[200px] h-[250px] bg-gray-100 rounded-md cursor-pointer flex items-center justify-center overflow-hidden border border-gray-300"
                >
                    {preview && <img src={preview} alt="previe" className="h-full w-full object-cover" />}

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 place-content-center md:gap-4 gap-6 max-md:w-full py-8 max-md:px-5">
                    <div><Input value={basicData.name} onChange={handleChange('name')} placeholder="Name *" className="w-full md:min-w-[350px] h-12" type="text" /></div>
                    <div><Input value={basicData.service} onChange={handleChange('service')} placeholder="Service" className="w-full md:min-w-[350px] h-12" type="text" /></div>
                    <div><Input value={basicData.dob} onChange={handleChange('dob')} placeholder="Date of Birth" className="w-full md:min-w-[350px] h-12" type="date" /></div>
                    <div><Input value={basicData.pob} onChange={handleChange('pob')} placeholder="Place of Birth" className="w-full md:min-w-[350px] h-12" type="text" /></div>
                    <div><Input value={basicData.lastrank} onChange={handleChange('lastrank')} placeholder="Last Rank" className="w-full md:min-w-[350px] h-12" type="text" /></div>
                    <div><Input value={basicData.armreg} onChange={handleChange('armreg')} placeholder="Arm/Reg" className="w-full md:min-w-[350px] h-12" type="text" /></div>
                    <div><Input value={basicData.unit} onChange={handleChange('unit')} placeholder="Unit" className="w-full md:min-w-[350px] h-12" type="text" /></div>
                    <div><Input value={basicData.martyrdom} onChange={handleChange('martyrdom')} placeholder="Martyrdom" className="w-full md:min-w-[350px] h-12" type="text" /></div>
                </div>
            </div>
        </div>
    )
}

export default Create;