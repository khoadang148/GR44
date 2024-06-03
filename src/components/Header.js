import React from 'react'
import { MdNotifications, MdApps } from 'react-icons/md'
import { Image } from 'react-bootstrap';
const Header = ({handleToggleSidebar}) => {
  return (
    <div className=" z-50 flex bg-white h-[65px] w-full drop-shadow-lg">
      <div className="flex">
        <button onClick={() => handleToggleSidebar()}>
          <Image
            className="w-[65px] h-[65px] border-2 border-[#ED2A26] bg-[#ED2A26] items-center p-[18px] "
            src={require("../assets/menu.png")}
          ></Image>
        </button>
        <button>
          <Image
            className="w-[147px] h-[35px] ml-6 items-center justify-center text-center mt-2"
            src={require("../assets/logo.png")}
            alt="hehe"
          ></Image>
        </button>
      </div>
      <div className="group flex ml-20">
        <div className="mt-4 mb-5 text-[#D5D5D5]  border-2 border-[#F7F7F7] bg-[#F7F7F7] px-4text-base w-[348px] h-[33px]  relative pt-1">
          <input
            type="text"
            placeholder="Search for Tuts Videos, Tutors, Tests and more.."
            className="focus:outline-none w-[248px] text-xs ml-8 text-[black] bg-[#F7F7F7] group-active:text-[#847E7E]"
          />
          <button type="submit" className="top-0 left-3 absolute">
            <Image
              className="max-w-none mt-2"
              src={require("../assets/search.png")}
              width={12}
              height={12}
              alt="Search"
            ></Image>
          </button>
        </div>
      </div>
      <div className="absolute right-0 mr-10 flex justify-around items-center">
        <button
          type="submit"
          className="items-center mr-4 text-center justify-center text-white bg-[#ED2A26] hover:bg-black font-semibold text-sm  px-[14px] py-[8px] mt-4 border-none focus:border-none"
        >
          Create New Course
        </button>
        <Image
          className="max-w-none mt-2 mr-4"
          src={require("../assets/shopping-cart.png")}
          width={24}
          height={24}
          alt="Search"
        ></Image>
        <Image
          className="max-w-none mt-2 mr-4"
          src={require("../assets/email.png")}
          width={24}
          height={24}
          alt="Search"
        ></Image>
        <Image
          className="max-w-none mt-2 mr-4"
          src={require("../assets/bell.png")}
          width={24}
          height={24}
          alt="Search"
        ></Image>
        <img
          className="rounded-full border  w-[40px] h-[40px] object-contain mx-[10px]"
          src={""}
          alt="ava"
        />
      </div>
    </div>
  );
}

export default Header