
import Image from 'next/image';
import vikrambatra from '../../../../public/Vikram_Batra_PVC.jpg'
import { Calendar, Home, HomeIcon, MapPin, Medal, Share, ShareIcon, Shield, User, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import TriContent from '@/components/proj/tri_content';
import TriContentQuo from '@/components/proj/tri_qu';



async function getOne(id) {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getone/${id}`);
        return res.data;
    } catch (err) {
        console.error('getOne error:', err);
        throw err;
    }
}


export async function generateStaticParams() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getall`);
    const posts = res.data;

    return posts.map((post) => ({
        slog: post._id.toString(),
    }));
}

const Prof = async ({ params }) => {
    
    const { slog } = await params;

    const post = await getOne(slog);
    console.log(post)
    const hasQuotes = post.content[0].blocks.some(block => block.type === 'quote');
    const gridCol = `grid-cols-${hasQuotes ? 2 : 1}`;
    const { name, service, lastrank, pob, dob, unit, armreg, martyrdom } = post;
    const infoList = [
        { label: 'Name', value: name, icon: <User /> },
        { label: 'Service', value: service, icon: <Shield /> },
        { label: 'Rank', value: lastrank, icon: <Medal /> },
        { label: 'Place of Birth', value: pob, icon: <MapPin /> },
        { label: 'Date of Birth', value: dob, icon: <Calendar /> },
        { label: 'Unit', value: unit, icon: <Users /> },
        { label: 'Army Reg', value: armreg, icon: <HomeIcon /> },
        { label: 'Martyrdom', value: martyrdom, icon: <Calendar /> },
    ]

    return (
        <div className=" flex md:flex-row flex-col h-screen md:overflow-hidden ">
            <div className="md:w-[350px] w-full pt-19 bg-[#33401c] md:h-full h-auto md:pb-10">
                <div className='md:sticky md:top-0 md:h-[calc(100vh-80px)]'>
                    <div className='h-full md:overflow-y-auto py-5 px-2'>
                        <div className='max-md:w-full flex items-center justify-center px-4'><img src={post?.image} alt='vikrambatra' /></div>
                        <div className='space-y-3 pt-5 md:pb-10 pb-5 pl-2'>
                            {infoList.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 pl-5 pr-2">
                                    <div className="text-white">{item.icon}</div>
                                    <div className="grid">
                                        <p className="text-[#eee] text-[14px]">{item.label}</p>
                                        <p className="font-semibold text-white text-[16px]">{item.value}</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
            <div className='md:flex-1 md:overflow-y-scroll md:pt-28 p-10 max-md:px-3 '>
                <div className='space-y-1'>
                    <h1 className='text-4xl text-[#53682d] font-bold'>{post?.name}</h1>
                    <p className='text-[#333] text-[17px]'>Indian Army • {post?.armreg} </p>
                </div>
                <Tabs defaultValue="Content" className="w-full py-5">
                    <TabsList className={`grid w-full ${gridCol} mb-4`}>
                        <TabsTrigger value="Content">Content</TabsTrigger>
                        {hasQuotes && <TabsTrigger value="Quote">Quotes</TabsTrigger>}
                    </TabsList>
                    <TabsContent value="Content" className=" rounded-md shadow-md">
                        <div className='max-md:p-2 space-y-5 text-sm leading-[22px]'>
                            {
                                post.content[0].blocks.map((item, ind) => {
                                    return <TriContent key={ind} content={item} />
                                })
                            }
                        </div>
                    </TabsContent>
                    {hasQuotes && <TabsContent value="Quote" className="rounded-md shadow-md">
                        <div className='p-5 space-y-5 text-sm leading-[25px]'>
                            {post.content[0].blocks
                                .filter(block => block.type === 'quote')
                                .map((block, index) => (

                                    <TriContentQuo key={index} content={block} />
                                ))}
                        </div>
                    </TabsContent>}
                </Tabs>
                <div>
                    <div className='text-white'>
                        <Button> <ShareIcon />Share His Story</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Prof;