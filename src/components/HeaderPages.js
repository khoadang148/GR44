import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderPages = () => {
    const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/home');
  };
  return (
<div className="z-50 flex bg-white dark:bg-gray-900 text-black dark:text-white h-[65px] w-full drop-shadow-lg fixed">
      <div>
        <button
          onClick={handleBackClick}
          className="bg-white text-black border  py-1.5 px-4 rounded-full hover:bg-black hover:text-white transition duration-300 text-base ml-[150px]"
        >
          Back to Cursus
        </button>
      </div>
      <div>
        <button onClick={handleBackClick} className="ml-22">
          <img
            className="w-[120px] h-[30px]"
            src={require("../assets/logo.png")}
            alt="hehe"
          />
        </button>
      </div>
      <div className='pr-[180px] '>
        <img
          className="w-[40px] h-[40px] rounded-full border border-gray-300 ml-8 shadow-xl"
          src="https://gambolthemes.net/html-items/cursus-new-demo/images/left-imgs/img-1.jpg"
          alt="Cursus"
        />
      </div>
    </div>
  );
}

export default HeaderPages