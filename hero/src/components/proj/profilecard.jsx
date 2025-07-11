import Image from "next/image";
import vikramsir from "../../../public/Vikram_Batra_PVC.jpg"
import Link from "next/link";

const ProfileCard = ({item}) => {
    return (
        <Link href={`/profile/${item._id}`}>
            <div className="border rounded-md p-3 space-y-1 cursor-pointer">
                <img src={`${item?.image}`} alt="cap vikram batra" className="w-[200px] h-[230px] object-cover" />
                <div>
                    <p className="text-[#444] text-center">{item.name}</p>
                    <p className="text-sm text-[#666]">9 Sep 1974 – 7 Jul 1999</p>
                </div>
            </div>
        </Link>
    )
}

export default ProfileCard;