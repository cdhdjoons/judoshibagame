'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { franklinGothic } from "../../../styles/fonts";
import { AnimatePresence, motion } from 'framer-motion';
import Alert from '@mui/material/Alert';


export default function Invite() {
    const [copied, setCopied] = useState(false);

    const handleCopyClick = () => {
        const link = "https://t.me/PDG_explorer_bot"; // 복사할 링크

        // 클립보드에 링크를 복사
        navigator.clipboard.writeText(link).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500); // 2초 후 복사 메시지 초기화
        }).catch((err) => {
            console.error('클립보드 복사 실패:', err);
        });
    };
    return (
        <AnimatePresence mode="wait">
            <motion.div className=" w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <div className=" w-full h-full max-w-[500px] py-[5%] gap-[3%] relative flex flex-col justify-evenly items-center " >
                    {copied ? <div className="absolute top-[10px] z-[999]"><Alert severity="success">Copy Complete.</Alert></div> : ''}
                    <div className={`w-full max-w-[500px] px-[5%] relative flex flex-col `} >
                        <p className="w-full text-left text-[5vmax] sm:text-[4vmin] font-bold text-white ">Invite Friends</p>
                        <p className="w-full text-left text-[1.5vmax] sm:text-[1.5vmin] text-black ">Invite friends, complete and earn more</p>
                    </div>
                    <div className="w-[90%] h-full flex flex-col justify-between pt-[5%] rounded-[23px] bg-boxBg">

                        <div className="w-full relative flex justify-center ">
                            <div className=" w-[30vmax] sm:w-[30vmin] aspect-[434/443] relative ">
                                <Image
                                    src="/image/pdg_invite_main.png"
                                    alt="scroll"
                                    layout="fill"
                                    objectFit="fill"
                                />
                            </div>
                        </div>
                        <div className=" w-full relative flex flex-col justify-around items-center font-bold drop-shadow-lg">
                            <div className="flex flex-col items-center pb-[5%]">
                                <p className=" text-white text-[8vmin] sm:text-[4vmin]">How it works</p>
                                <p className=" text-white text-[4vmin] sm:text-[2.3vmin]">Share your invitation link</p>
                                <p className=" text-white text-[3vmin] sm:text-[1.7vmin]">Get a play pass for each friends</p>
                            </div>
                            <div className="flex flex-col items-center pb-[5%]">
                                <p className=" text-white text-[4vmin] sm:text-[2.3vmin]">Your friends join JetFuel</p>
                                <p className=" text-white text-[3vmin] sm:text-[1.7vmin]">Get a play pass for each friends</p>
                            </div>
                            <p className=" text-white text-[4vmin] sm:text-[2.5vmin]">1 friends / 2000 PDG</p>
                        </div>
                        <div className="w-full flex justify-center relative  ">
                            <div onClick={handleCopyClick} className="w-[50%] flex flex-col justify-center items-center relative bg-[#00B560] active:scale-90 transition-transform duration-100">
                                <div className=" w-[4vmax] aspect-[1/1] relative flex items-center justify-center">
                                    <Image
                                        src="/image/pdg_invite_icon.png"
                                        alt="main logo"
                                        layout="fill"
                                        objectFit="fill"
                                    />
                                </div>
                                <p className=" text-white text-[3.5vmin] sm:text-[1.5vmin] z-10">Invite a friend</p>
                            </div>
                            <div onClick={handleCopyClick} className="w-[50%] flex flex-col justify-center items-center relative bg-[#007AFF] active:scale-90 transition-transform duration-100">
                                <div className=" w-[4vmax] aspect-[1/1] relative flex items-center justify-center">
                                    <Image
                                        src="/image/pdg_copy_icon.png"
                                        alt="main logo"
                                        layout="fill"
                                        objectFit="fill"
                                    />
                                </div>
                                <p className=" text-white text-[3.5vmin] sm:text-[1.5vmin]">Copy Link</p>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
