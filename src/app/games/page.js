import Image from "next/image";
import Link from "next/link";

export default function Games() {
    return (
        <div className=" w-full h-full">
            <div className=" w-full h-full max-w-[500px] relative flex flex-col justify-evenly bg-cover bg-no-repeat " >
                <div className={`w-full max-w-[500px] px-[5%] relative flex flex-col `} >
                    <p className="w-full text-left text-[5vmax] sm:text-[4vmin] font-bold text-white ">AI Center</p>
                    <p className="w-full text-left text-[1.5vmax] sm:text-[1.5vmin] text-black ">Play AI</p>
                </div>
                <div className="w-full h-[85%] flex justify-center items-center relative">
                    <iframe
                        className={` bg-black h-full w-[95%] p-[1%] rounded-[23px] flex flex-col gap-[2%] justify-between`}
                        src="https://www.aighibli.io/chat/ai_tele" // 원하는 웹사이트 URL
                        title="External Website"
                    />
                </div>
            </div>
        </div>
    );
}