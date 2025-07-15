"use client";

import Image from "next/image";
import mainbg from "../../public/wallpapersden.com_indian-army-soldier-with-gun_1920x1080.jpg"
import { Button } from "@/components/ui/button";
import indo65 from "../../public/Destroyed_Sherman_Tank_(1965_Indo-Pak_War).jpg"
import indo71 from "../../public/1971_Instrument_of_Surrender.jpg"
import indo47 from "../../public/Indian_soldiers_landing_at_Srinagar_airfield_during_the_1947–1948_war.jpg"
import ProfileCard from "@/components/proj/profilecard";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAdmin } from "@/context/admincontext";

const warinfo = [
  {
    title: "The Indo-Pakistani War of 1947",
    description: "A conflict between India and Pakistan over Kashmir that showcased the bravery of countless Indian soldiers. It ended with the Tashkent Agreement.",
    image: indo47,
  },
  {
    title: "The Indo-Pakistani War of 1965",
    description: "A conflict between India and Pakistan over Kashmir that showcased the bravery of countless Indian soldiers. It ended with the Tashkent Agreement.",
    image: indo65,
  },
  {
    title: "The Indo-Pakistani War of 1965",
    description: "A conflict between India and Pakistan over Kashmir that showcased the bravery of countless Indian soldiers. It ended with the Tashkent Agreement.",
    image: indo71,
  },

]

export default function Home() {
  const {admin, loading} = useAdmin();
  console.log(admin)
  const [data, setData] = useState([]);
  const [lloading, setLloading] = useState(false);
  const[page,setPage] = useState(1)
  const [hasNext,setHasNext] = useState(false);
  const limit = 10;


  const fetchdata = (page) => {
    setLloading(true)
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getlim?page=${page}&limit=${limit}`).then(({data}) => {
      setData(data.data);
      const {pagination} = data;
      setHasNext(pagination.hasNext);
      setPage(pagination.page)
      setLloading(false)
    }).catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchdata(1)
  }, [])

  const nextHandler = () => {
    if(hasNext){
      fetchdata(page+1);
    }
  }


  return (
    <div>
      <div className="w-screen h-screen relative">
        <Image
          src={mainbg}
          alt="bg"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-5xl font-bold mb-4">Honoring Our Bravehearts</h1>
          <p className="text-white text-lg max-w-xl">
            A tribute to the courageous souls who laid down their lives to protect our nation. Their sacrifice will never be forgotten.
          </p>
        </div>
      </div>
      <div>
        <div className="py-20 space-y-5 px-3">
          <h2 className="text-3xl font-bold text-center mb-4 text-[#53682d]">About This Tribute</h2>
          <p className="text-center max-w-3xl mx-auto text-[#666]">
            This platform is built to preserve the memories of our heroes — soldiers who gave everything for the nation.
            Here, you’ll find their stories, their legacy, and ways to honor their sacrifices.
          </p>
          <div className="text-center cursor-pointer"><Link href="/create"><Button className="">Share a Hero’s Story</Button></Link></div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-4 text-[#53682d]">Stories from the Battlefield</h1>
        <div className="md:px-10 px-5 grid md:grid-cols-3 grid-cols-1 gap-8">
          {
            warinfo.map((item, ind) => (
              <div key={ind} className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 max-w-[400px]">
                <div className="mb-3 space-y-1">
                  <Image src={item.image} alt="Indo-Pakistani War 1965" className="rounded-md h-48 w-full object-cover" />
                  <p className="text-xs">© Wikipedia (CC BY-SA 3.0)</p>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm mb-3">
                  {item.description}
                </p>
                <button className="mt-auto text-blue-600 font-medium hover:underline">
                  Read More →
                </button>
              </div>
            ))
          }

        </div>
        <div className="py-20 px-10">
          <h1 className="text-3xl font-bold text-center mb-4 text-[#53682d]">Profiles of Courage</h1>
          <div className="flex flex-wrap justify-center gap-8">
            {
              data.map((item, ind) => (
                <ProfileCard key={ind} item={item} />
              ))
            }
          </div>
          { lloading ? <p>Loading...</p> : hasNext && <button onClick={nextHandler}>Load more</button>}
        </div>
        <div className="bg-white py-10 px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-[#53682d]">Words That Inspire</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

            <div className="bg-gray-50 p-4 rounded-lg shadow text-center">
              <p className="italic text-gray-700">“Either I will come back after hoisting the Tricolor, or I will come back wrapped in it.”</p>
              <p className="mt-2 text-sm text-gray-500">– Captain Vikram Batra</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow text-center">
              <p className="italic text-gray-700">“Service before self.”</p>
              <p className="mt-2 text-sm text-gray-500">– Indian Army Motto</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow text-center">
              <p className="italic text-gray-700">“Real heroes don't have a name on the back of their jersey. They wear their country’s flag.”</p>
              <p className="mt-2 text-sm text-gray-500">– Anonymous</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
