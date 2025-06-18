'use client'

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { TicketContext } from "./clientOnlyWarpper";
import { TICKETS_UPDATE_EVENT } from '../components/clientOnlyWarpper';
import { AnimatePresence, motion } from 'framer-motion';


export default function Footer() {
    const { hasTickets } = useContext(TicketContext);
    // console.log(hasTickets);

    const useTickets = () => {
        const nowTickets = localStorage.getItem("tickets");
        localStorage.setItem("tickets", Number(nowTickets) - 1);
        window.dispatchEvent(new Event(TICKETS_UPDATE_EVENT));

    }

    return (
        <AnimatePresence mode="wait">
            <motion.div className="  w-full max-w-[500px] flex justify-center items-center "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className=" w-full pt-[3vmin] pb-[6vmin] sm:pt-[1vmin] sm:pb-[2.3vmin] flex justify-evenly items-center bg-footerBg">
                    <Link href="/daily">
                        <div className="w-[13vmin] sm:w-[6vmin] aspect-[58/58] relative active:scale-90 transition-transform duration-200 ">
                            <Image
                                src="/image/pdg_task.png"
                                alt="meatIcon"
                                fill
                                style={{ objectFit: "cover" }}
                                priority
                            />
                            <p className=" absolute bottom-[-40%] left-1/2 -translate-x-1/2 font-normal text-white text-[1.2vmax] sm:text-[1.2vmin] text-center">Task</p>
                        </div>
                    </Link>
                    <Link href="/">
                        <div className="w-[13vmin] sm:w-[6vmin] aspect-[58/58] relative active:scale-90 transition-transform duration-200">
                            <p className=" absolute bottom-[-40%] left-1/2 -translate-x-1/2 font-normal text-white text-[1.2vmax] sm:text-[1.2vmin] text-center">Home</p>

                            <Image
                                src="/image/pdg_home.png"
                                alt="meatIcon"
                                fill
                                style={{ objectFit: "cover" }}
                                priority

                            />
                        </div>
                    </Link>
                    {hasTickets ? <Link href="/games">
                        <div onClick={useTickets} className="w-[15vmin] sm:w-[8vmin] aspect-[76/77] relative active:scale-90 transition-transform duration-200">
                            <p className=" absolute bottom-[-25%] left-1/2 -translate-x-1/2 font-normal text-white text-[1.2vmax] sm:text-[1.2vmin] text-center">Play</p>
                            <Image
                                src="/image/pdg_game.png"
                                alt="meatIcon"
                                fill
                                style={{ objectFit: "cover" }}
                                priority

                            />
                        </div>
                    </Link> :
                        <div className="w-[15vmin] sm:w-[8vmin] aspect-[76/77] relative active:scale-90 transition-transform duration-200">
                            <p className=" absolute bottom-[-25%] left-1/2 -translate-x-1/2 font-normal text-white text-[1.2vmax] sm:text-[1.2vmin] text-center">Play</p>
                            <Image
                                src="/image/pdg_game_off.png"
                                alt="meatIcon"
                                fill
                                style={{ objectFit: "cover" }}
                                priority

                            />
                        </div>
                    }

                    <Link href="/invite">
                        <div className="w-[13vmin] sm:w-[6vmin] aspect-[58/58] relative active:scale-90 transition-transform duration-200">
                            <p className=" absolute bottom-[-40%] left-1/2 -translate-x-1/2 font-normal text-white text-[1.2vmax] sm:text-[1.2vmin] text-center">Invite</p>

                            <Image
                                src="/image/pdg_invite.png"
                                alt="meatIcon"
                                fill
                                style={{ objectFit: "cover" }}
                                priority

                            />
                        </div>
                    </Link>
                    <Link href="/leaderboard">
                        <div className="w-[13vmin] sm:w-[6vmin] aspect-[58/58] relative active:scale-90 transition-transform duration-200">
                            <p className=" absolute bottom-[-40%] left-1/2 -translate-x-1/2 font-normal text-white text-[1.2vmax] sm:text-[1.2vmin] text-center">Rank</p>

                            <Image
                                src="/image/pdg_rank.png"
                                alt="meatIcon"
                                fill
                                style={{ objectFit: "cover" }}
                                priority

                            />
                        </div>
                    </Link>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}