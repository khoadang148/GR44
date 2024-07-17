import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const logoUrl = 'https://gambolthemes.net/html-items/cursus-new-demo/images/logo.svg';
const signBackgroundUrl = 'https://gambolthemes.net/html-items/cursus-new-demo/images/sign.svg';
const signLogoUrl = 'https://gambolthemes.net/html-items/cursus-new-demo/images/sign_logo.png';

const SignupStep = () => {
  const [isInstructor, setIsInstructor] = useState(true);
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login');
  };

  const handleSignup = async () => {
    // Gửi dữ liệu lên API với vai trò đã chọn (instructor hoặc student)
    if (isInstructor) {
      // Gửi dữ liệu lên API với role là "teacher"
    } else {
      // Gửi dữ liệu lên API với role là "student"
    }

    // Sau khi gửi thành công, điều hướng về trang chủ hoặc trang khác
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <img src={signBackgroundUrl} alt="Sign Background" className="w-full h-full object-cover opacity-5" />
      </div>

      <div className="z-10 relative flex flex-col items-center py-8 max-w-md w-full">
        <img src={logoUrl} alt="Cursus Logo" className="w-32 h-8" />

        <div className="bg-white p-8 rounded-lg shadow-lg mt-8 w-full">
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setIsInstructor(true)}
              className={`py-2 px-4 font-semibold ${isInstructor ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'}`}
            >
              Instructor Sign Up
            </button>
            <button
              onClick={() => setIsInstructor(false)}
              className={`py-2 px-4 font-semibold ${!isInstructor ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'}`}
            >
              Student Sign Up
            </button>
          </div>

          {isInstructor ? (
            <div>
              <h2 className="text-center text-sm font-thin text-gray-900 mb-4">Sign Up and Create Course!</h2>
              <div className="mb-4">
                <select className="w-full px-3 py-2 border rounded">
                  <option>Select Category</option>
                  <option>Development</option>
                  <option>Business</option>
                  <option>Finance & Accounting </option>
                  <option>IT & Software</option>
                  <option>Office Productivity</option>
                  <option>Personal Development</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Lifestyle</option>
                  <option>Photography</option>
                  <option>Health & Fitness</option>
                  <option>Music</option>
                  <option>Teaching & Academics</option>
                </select>
              </div>
              <div className="mb-4">
                <textarea
                  id="description"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Write a little description about you..."
                ></textarea>
              </div>
              <p className="text-gray-500 mb-4">Your biography should have at least 12000 characters.</p>
              <button onClick={handleSignup} className="w-full bg-red-500 text-white py-2 rounded">Instructor Sign Up Now</button>
            </div>
          ) : (
            <div>
              <h2 className="text-center text-sm font-thin text-gray-900 mb-4">Sign Up and Start Learning!</h2>
              <div className="mb-4">
                <textarea
                  id="description"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Write a little description about you..."
                ></textarea>
              </div>

              <p className="text-xxs font-thin text-gray-500 mb-4">Your biography should have at least 12000 characters.</p>
              <button onClick={handleSignup} className="w-full bg-red-500 text-white py-2 rounded">Student Sign Up Now</button>
            </div>
          )}

          <p className="text-center my-4 text-xs">
            Already have an account?{' '}
            <span className="text-blue-600 cursor-pointer" onClick={goToLogin}>
              Log In
            </span>
          </p>
        </div>
      </div>

      <div className="mt-4 text-center mb-auto z-10">
        <img src={signLogoUrl} alt="Sign Logo" className="h-10 inline-block mr-2" />
        <p className="text-sm inline-block">© 2024 Cursus. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default SignupStep;
