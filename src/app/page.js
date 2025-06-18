'use client'

import Image from "next/image";
import Link from "next/link";
import ClaimTimer from "./components/claimtimer";
import Intro from "./components/intro";
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  return (
    <div className=" w-full h-full">
      <div className=" w-full h-full max-w-[500px] pt-[3%] relative flex flex-col gap-1 " >
        <Intro />
        <AnimatePresence mode="wait">
          <motion.div className="w-full flex justify-center  relative "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <a href="https://x.com/PDG_official_X" target="_blank" rel="noopener noreferrer" className="w-[90%] block">
              <div className="w-full max-w-[450px] px-[3%] bg-boxBg rounded-[23px] flex items-center aspect-[342/75] relative active:scale-95 transition-transform duration-100 ">
                <div className="w-[9vmin] sm:w-[8vmin] aspect-[59/59] relative">
                  <Image
                    src="/image/x_icon.png"
                    alt="main logo"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className=" w-full flex flex-col px-[5%]">
                  <div className="flex justify-between">
                    <p className="text-white text-[4vmin] sm:text-[2vmin] xs:text-[4vmin]">X</p>
                    <p className="text-white text-[4vmin] sm:text-[2vmin] xs:text-[4vmin] opacity-20">Lets start</p>
                  </div>
                  <div className=" flex justify-around">
                    <p className="w-full text-[4vmin] sm:text-[1.6vmin] xs:text-[3.5vmin] -rotate-0 text-white bg-clip-text text-transparent ">To earn PDG, Join in our X.</p>
                    <div className="w-[7vmin] sm:w-[4vmin] xs:w-[6vmin] aspect-[75/75] relative">
                      <Image
                        src="/image/p_icon.png"
                        alt="main logo"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </motion.div>
        </AnimatePresence>
        <ClaimTimer />

      </div>
    </div>
  );
}
