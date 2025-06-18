'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TICKETS_UPDATE_EVENT } from '../components/clientOnlyWarpper';
import Alert from '@mui/material/Alert';

export default function Balance() {
  const [pop, setPop] = useState(false);
  const [n2o, setN2O] = useState(0);
  const [tickets, setTickets] = useState(0);


  useEffect(() => {
    // 초기 n2o 값 불러오기
    const storedN2O = localStorage.getItem("n2o");
    if (storedN2O !== null) {
      setN2O(Number(storedN2O));
    }
    // 초기 티켓 값 불러오기
    const storedTickets = localStorage.getItem("tickets");
    if (storedTickets !== null) {
      setTickets(Number(storedTickets));
    }
  }, []);

  const getTicket = (ticketNum, price) => {
    //티켓 가격보다 n2o가 작으면 팝업
    // console.log(n2o);
    if (n2o < Number(price)) {
      setPop(true);
      setTimeout(() => setPop(false), 1500); // 1.5초 후 복사 메시지 초기화
      return;
    }
    //가격이 성립하면 n2o 가격만큼 줄이고, 티켓 갯수만큼 늘어남(로컬스토리지, state 모두 업뎃)
    setN2O((prevN2O) => {
      const newN2O = prevN2O - price;
      if (newN2O < 0) {
        return prevN2O;
      }
      localStorage.setItem("n2o", newN2O);  // 로컬스토리지 업데이트
      return newN2O;  // 상태 업데이트
    });

    setTickets((prevTickets) => {
      const newTickets = prevTickets + ticketNum;
      localStorage.setItem("tickets", newTickets);  // 로컬스토리지 업데이트
      return newTickets;  // 상태 업데이트
    });

  }

  // 상태가 변경된 후에 로컬스토리지와 이벤트 디스패치 처리
  useEffect(() => {
    // tickets 상태가 변경될 때만 실행
    window.dispatchEvent(new Event(TICKETS_UPDATE_EVENT)); // footer에 ticket 값 변경 알림
  }, [tickets]);  // tickets 상태가 변경될 때만 실행

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className=" w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full h-full max-w-[500px] relative flex flex-col justify-evenly " >
          <div className=" w-full h-[25%] flex justify-center items-center relative mb-[5%] ">
            <div className=" flex flex-col justify-center items-center w-[90%] h-full bg-boxBg rounded-[23px]">
              <div className=" w-[90%] h-[50%] relative flex justify-between items-center border-b-[0.5px] border-b-white  ">
                <div className=" w-[11vmin] sm:w-[6vmin] aspect-[75/75] relative ">
                  <Image
                    src="/image/p_icon.png"
                    alt="meatIcon"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className=" flex flex-col items-start w-[55%] ">
                  <p className=" text-[2.5vmax] xs:text-[2.3vmax] sm:text-[2.2vmin] font-bold text-white">PDG</p>
                  <p className=" text-[2vmax] xs:text-[1.5vmax] sm:text-[1.9vmin] text-[#C0C0C0]">PRODIGI Connect</p>
                </div>
                <p className=" w-[20%] text-center font-bold text-white text-[2.5vmax] xs:text-[2.3vmax] sm:text-[2.2vmin] ">{n2o >= 1000000 ? `${n2o / 1000000}m` : n2o >= 1000 ? `${n2o / 1000}k` : n2o}</p>
              </div>
              <div className=" w-[90%] h-[50%] relative flex justify-between items-center ">
                <div className=" w-[10vmin] sm:w-[6vmin] aspect-[65/75] relative ">
                  <Image
                    src="/image/pdg_ticket.png"
                    alt="meatIcon"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className=" flex flex-col w-[55%] items-start ">
                  <p className=" text-[2.5vmax] xs:text-[2.3vmax] sm:text-[2.2vmin] font-bold text-white">Tickets</p>
                  <p className=" text-[2vmax] xs:text-[1.5vmax] sm:text-[1.9vmin] text-[#C0C0C0]">Gaming Tickets</p>
                </div>
                <p className=" w-[20%] text-center font-bold text-white text-[2.5vmax] xs:text-[2.3vmax] sm:text-[2.2vmin] ">{tickets}</p>
              </div>
            </div>
          </div>
          <p className="w-full pl-[10%] text-left text-[4.3vmax] xs:text-[4vmax] sm:text-[4.5vmin] text-black font-bold ">Get Tickets</p>
          <div className=" w-full h-[55%] py-[1vmin] flex gap-3 flex-col items-center justify-center">
            <div  className=" w-[90%] px-[5%] h-[30%] flex flex-col items-center relative  bg-boxBg rounded-[23px] ">
              <div className="w-full h-[60%] flex items-center border-b-[0.5px] border-b-white">
                <div className=" w-[10vmin] sm:w-[6vmin] aspect-[65/75] relative ">
                  <Image
                    src="/image/pdg_ticket.png"
                    alt="meatIcon"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="w-[80%] flex flex-col ">
                  <p className=" text-white text-[2.5vmax] xs:text-[2vmax] sm:text-[2.2vmin] text-end">Get 1 Ticket for Gaming</p>
                  <div className=" flex justify-end gap-1 " >
                    <p className="text-white text-[2.5vmax] xs:text-[2vmax] sm:text-[2.2vmin] text-right font-bold ">500</p>
                    <p className=" text-center text-[2.5vmax] xs:text-[2vmax] sm:text-[2.2vmin] 
        bg-gradient-to-r from-[#BADA8E] to-[#3daeb2] bg-clip-text text-transparent font-bold ">PDG</p>
                  </div>
                </div>
              </div>
              <div onClick={() => getTicket(1, 500)} 
              className=" w-full text-center h-[40%] flex justify-center items-center text-[#00FF08]
               text-[2vmax] xs:text-[1.5vmax] sm:text-[1.7vmin] active:scale-90 transition-transform duration-200"> Get now</div>
            </div>
            <div  className=" w-[90%] px-[5%] h-[30%] flex flex-col items-center relative  bg-boxBg rounded-[23px] ">
              <div className="w-full h-[60%] flex items-center border-b-[0.5px] border-b-white">
                <div className=" w-[10vmin] sm:w-[6vmin] aspect-[65/75] relative ">
                  <Image
                    src="/image/pdg_ticket.png"
                    alt="meatIcon"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="w-[80%] flex flex-col ">
                  <p className=" text-white text-[2.5vmax] xs:text-[2vmax] sm:text-[2.2vmin] text-end">Get 1 Ticket for Gaming</p>
                  <div className=" flex justify-end gap-1 " >
                    <p className="text-white text-[2.5vmax] xs:text-[2vmax] sm:text-[2.2vmin] text-right font-bold ">1300</p>
                    <p className=" text-center text-[2.5vmax] xs:text-[2vmax] sm:text-[2.2vmin] 
        bg-gradient-to-r from-[#BADA8E] to-[#3daeb2] bg-clip-text text-transparent font-bold ">PDG</p>
                  </div>
                </div>
              </div>
              <div onClick={() => getTicket(3, 1300)} 
              className=" w-full text-center h-[40%] flex justify-center items-center
               text-[#00FF08] text-[2vmax] xs:text-[1.5vmax] sm:text-[1.7vmin] active:scale-90 transition-transform duration-200"> Get now</div>
            </div>
            <div className=" w-[90%] px-[5%] h-[30%] flex flex-col items-center relative  bg-boxBg rounded-[23px] ">
              <div className="w-full h-[60%] flex items-center border-b-[0.5px] border-b-white">
                <div className=" w-[10vmin] sm:w-[6vmin] aspect-[65/75] relative ">
                  <Image
                    src="/image/pdg_ticket.png"
                    alt="meatIcon"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="w-[80%] flex flex-col ">
                  <p className=" text-white text-[2.5vmax] xs:text-[2vmax] sm:text-[2.2vmin] text-end">Get 1 Ticket for Gaming</p>
                  <div className=" flex justify-end gap-1 " >
                    <p className="text-white text-[2.5vmax] xs:text-[2vmax] sm:text-[2.2vmin] text-right font-bold ">2000</p>
                    <p className=" text-center text-[2.5vmax] xs:text-[2vmax] sm:text-[2.2vmin] 
        bg-gradient-to-r from-[#BADA8E] to-[#3daeb2] bg-clip-text text-transparent font-bold ">PDG</p>
                  </div>
                </div>
              </div>
              <div onClick={() => getTicket(5, 2000)}
               className=" w-full text-center h-[40%] flex justify-center items-center
                text-[#00FF08] text-[2vmax] xs:text-[1.5vmax] sm:text-[1.7vmin] active:scale-90 transition-transform duration-200"> Get now</div>
            </div>
            
          </div>
          {pop && (
            <div className=" absolute top-[10px] left-1/2 -translate-x-1/2 z-[999] "><Alert severity="error">Need more PDG.</Alert></div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
