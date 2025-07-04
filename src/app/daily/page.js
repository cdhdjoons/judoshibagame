'use client'

import Image from "next/image";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Wallet from "../components/wallet";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

export default function DailyTask() {
    const router = useRouter(); // useRouter로 router 객체 가져오기
    //task list 버튼 관리
    const [disabledTask, setDisabledTask] = useState([true, true, true]);
    //daily reward 관리
    const [disabledDaily, setDisabledDaily] = useState([true, true]);
    //1/24 표시 관리
    const [remainHours, setRemainHours] = useState(null);
    //invite 버튼 5번 클릭 시 포인트 지급 및 비활성화 관리
    const [inviteCount, setInviteCount] = useState(0);

    const manifestUrl = "https://judoshibagame.vercel.app/tonconnect-manifest.json";


    useEffect(() => {
        // localStorage에서 task 버튼 상태 불러오기
        const storedState = localStorage.getItem("DisabledTask");
        // localStorage에서 daily 시간 가져오기 및 비교
        const lastUpdateDaily = localStorage.getItem("last_update_day1"); //daily
        const lastUpdateRetweet = localStorage.getItem("last_update_day2"); //retweet
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식
        // 현재 시간 표시
        const nowHours = new Date().getHours();
        //invite 카운트 가져오기
        const savedCount = localStorage.getItem("clickCount");
        // console.log(nowHours);
        setRemainHours(24 - nowHours);

        setDisabledDaily([
            lastUpdateDaily !== today,
            lastUpdateRetweet === today ? false : true
        ]);

        if (storedState) {
            setDisabledTask(JSON.parse(storedState));
        }

        if (savedCount) {
            setInviteCount(Number(savedCount));
        }
    }, []);

    //daily 클릭 시 상태 업데이트 
    const dailyHandleClick = (index, reward) => {
        if (disabledDaily[index] === false) {
            return;
        }
        const nowN2O = Number(localStorage.getItem("n2o"));
        setDisabledDaily(prev => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
        localStorage.setItem(`last_update_day${index + 1}`, new Date().toISOString().split("T")[0]); // 클릭한 날짜 저장
        localStorage.setItem("n2o", nowN2O + reward);
    }

    // task list 버튼 클릭 시 상태 업데이트 및 저장
    const handleClick = (index, reward) => {
        if (index === 1 && inviteCount < 5) {
            setInviteCount((prev) => {
                const newCount = prev + 1;
                localStorage.setItem("clickCount", newCount);
                // ✅ inviteCount가 4에서 5로 증가할 때 즉시 실행
                if (newCount === 5) {
                    setDisabledTask((prev) => {
                        const newState = [...prev];
                        newState[1] = false;
                        localStorage.setItem("DisabledTask", JSON.stringify(newState));
                        return newState;
                    });
                }
                return newCount;
            });
            // 이동을 위한 타이머를 설정
            router.push("/invite");
        } else {
            const nowN2O = Number(localStorage.getItem("n2o"));
            setDisabledTask((prev) => {
                const newState = [...prev];
                newState[index] = false; // 클릭된 버튼 비활성화
                localStorage.setItem("DisabledTask", JSON.stringify(newState)); // localStorage에 저장
                return newState;
            });
            localStorage.setItem("n2o", nowN2O + reward);
        }
    };

    return (
        <TonConnectUIProvider manifestUrl={manifestUrl}>
            <AnimatePresence mode="wait">
                <motion.div className={` w-full h-full flex flex-col items-center pb-[2%]`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className={`w-full max-w-[500px] px-[5%] relative flex flex-col `} >
                        <p className="w-full text-left text-[5vmax] sm:text-[4vmin] font-bold text-white ">Task List</p>
                        <p className="w-full text-left text-[1.5vmax] sm:text-[2vmin] text-black ">Earn JSB and Play AI</p>
                    </div>
                    <div className=" w-[90%] h-full max-w-[500px] pb-[10%] flex flex-col justify-center items-center bg-boxBg rounded-[23px]" >
                        <div className=" w-full flex flex-col gap-[2%] items-center relative ">
                            <div className=" w-[10vmax] sm:w-[20vmax] aspect-[1/1] relative ">
                                <Image
                                    src="/image/judo_intro_logo.png"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <p className=" text-[1.5vmax] sm:text-[1.3vmax] text-[#00FF08] font-bold">{remainHours}/24h</p>
                            <div className=" w-[90%] relative flex justify-between items-center">
                                <div className=" w-[11vmin] sm:w-[6vmin] aspect-[75/75] relative ">
                                    <Image
                                        src="/image/judo_big_logo.png"
                                        alt="meatIcon"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className=" flex flex-col items-start w-[55%] ">
                                    <p className=" text-[2.1vmax] xs:text-[2.3vmax] sm:text-[2.2vmin] font-bold text-white">Daily Task</p>
                                    <p className=" text-[1.5vmax] xs:text-[1.5vmax] sm:text-[1.9vmin] text-[#C0C0C0]">Earn Every day</p>
                                </div>
                                <p className=" w-[20%] text-center font-bold text-[#66B6FF] text-[2.5vmax] xs:text-[2.3vmax] sm:text-[2.2vmin] ">+</p>
                            </div>
                            <div className=" w-[90%] px-[5%] flex flex-col justify-center items-center bg-white rounded-[23px]">
                                <div className=" w-full flex justify-between items-center border-b-[0.5px] border-b-black py-[5%]">
                                    <div className=" w-[11vmin] sm:w-[6vmin] aspect-[75/75] relative ">
                                        <Image
                                            src="/image/judo_big_logo.png"
                                            alt="meatIcon"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className=" flex flex-col items-start w-[55%] ">
                                        <p className=" text-[2.1vmax] xs:text-[2.3vmax] sm:text-[2.2vmin] font-bold text-black">Daily Reward</p>
                                        <p className=" text-[1.8vmax] xs:text-[1.5vmax] sm:text-[1.9vmin] text-[#C0C0C0]">100 JSB</p>
                                    </div>
                                    <div className={` w-[20%] bg-[#767DFF] h-[50%] rounded-3xl relative duration-300 transition-all ${disabledDaily[0] ? 'opacity-100' : 'opacity-20'}`}>
                                        <div onClick={() => dailyHandleClick(0, 100)} className={`w-[40%] duration-300 aspect-[1/1] transition-all rounded-full bg-white absolute top-[50%] -translate-y-[50%] ${disabledDaily[0] ? "-translate-x-[100%] left-full" : "translate-x-0 left-0"}`}></div>
                                    </div>
                                </div>
                                <div className=" w-full flex justify-between items-center py-[5%] ">
                                    <div className=" w-[11vmin] sm:w-[6vmin] aspect-[75/75] relative ">
                                        <Image
                                            src="/image/judo_big_logo.png"
                                            alt="meatIcon"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className=" flex flex-col items-start w-[55%] ">
                                        <p className=" text-[2.1vmax] xs:text-[2.3vmax] sm:text-[2.2vmin] font-bold text-black">RT our Post</p>
                                        <p className=" text-[1.8vmax] xs:text-[1.5vmax] sm:text-[1.9vmin] text-[#C0C0C0]">1k JSB</p>
                                    </div>
                                    <a href="https://x.com/Judo_Shiba" target="_blank" rel="noopener noreferrer" className={` w-[20%] bg-[#767DFF] h-[50%] rounded-3xl relative duration-300 transition-all ${disabledDaily[1] ? 'opacity-100' : 'opacity-20'}`}>
                                        <div onClick={() => dailyHandleClick(1, 1000)} className={`w-[40%] duration-300 aspect-[1/1] transition-all rounded-full bg-white absolute top-[50%] -translate-y-[50%] ${disabledDaily[1] ? "-translate-x-[100%] left-full" : "translate-x-0 left-0"}`}></div>
                                    </a>
                                </div>
                            </div>

                            <div className=" w-[90%] relative flex justify-between items-center">
                                <div className=" w-[11vmin] sm:w-[6vmin] aspect-[75/75] relative ">
                                    <Image
                                        src="/image/judo_big_logo.png"
                                        alt="meatIcon"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className=" flex flex-col items-start w-[55%] ">
                                    <p className=" text-[2.1vmax] xs:text-[2.3vmax] sm:text-[2.2vmin] font-bold text-white">Option Task</p>
                                    
                                </div>
                                <p className=" w-[20%] text-center font-bold text-[#66B6FF] text-[2.5vmax] xs:text-[2.3vmax] sm:text-[2.2vmin] ">+</p>
                            </div>
                            <div className=" w-[90%] px-[5%] flex flex-col justify-center items-center bg-white rounded-[23px]">
                                <div className=" w-full flex justify-between items-center border-b-[0.5px] border-b-black py-[5%]">
                                    <div className=" w-[11vmin] sm:w-[6vmin] aspect-[75/75] relative ">
                                        <Image
                                            src="/image/judo_big_logo.png"
                                            alt="meatIcon"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className=" flex flex-col items-start w-[55%] ">
                                        <p className=" text-[2.1vmax] xs:text-[2.3vmax] sm:text-[2.2vmin] font-bold text-black">Follow X</p>
                                        <p className=" text-[1.8vmax] xs:text-[1.5vmax] sm:text-[1.9vmin] text-[#C0C0C0]">1K JSB</p>
                                    </div>
                                    <a href="https://x.com/Judo_Shiba" target="_blank" rel="noopener noreferrer" className={` w-[20%] bg-[#767DFF] h-[50%] rounded-3xl relative duration-300 transition-all ${disabledTask[0] ? 'opacity-100' : 'opacity-20'}`}>
                                        <div onClick={() => handleClick(0, 1000)} className={`w-[40%] duration-300 aspect-[1/1] transition-all rounded-full bg-white absolute top-[50%] -translate-y-[50%] ${disabledTask[0] ? "-translate-x-[100%] left-full" : "translate-x-0 left-0"}`}></div>
                                    </a>
                                </div>
                                <div className=" w-full flex justify-between items-center py-[5%] ">
                                    <div className=" w-[11vmin] sm:w-[6vmin] aspect-[75/75] relative ">
                                        <Image
                                            src="/image/judo_big_logo.png"
                                            alt="meatIcon"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className=" flex flex-col items-start w-[55%] ">
                                        <p className=" text-[2.1vmax] xs:text-[2.3vmax] sm:text-[2.2vmin] font-bold text-black">Invite 5 users</p>
                                        <p className=" text-[1.8vmax] xs:text-[1.5vmax] sm:text-[1.9vmin] text-[#C0C0C0]">5k JSB | {inviteCount}/5users</p>
                                    </div>
                                    <div className={` w-[20%] bg-[#767DFF] h-[50%] rounded-3xl relative duration-300 transition-all ${disabledTask[1] ? 'opacity-100' : 'opacity-20'}`}>
                                        <div onClick={() => handleClick(1, 5000)} className={`w-[40%] duration-300 aspect-[1/1] transition-all rounded-full bg-white absolute top-[50%] -translate-y-[50%] ${disabledTask[1] ? "-translate-x-[100%] left-full" : "translate-x-0 left-0"}`}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </TonConnectUIProvider>
    );
}
