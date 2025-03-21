import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-center items-center py-3 mt-20">
      <p className="flex items-center text-sm text-gray-500">
        Made with ❤️ by
        <a
          href="https://rishul-portfolio.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-2xl ml-1 px-2 rounded-md transition duration-300 transform hover:scale-110 hover:text-black hover:shadow-[0px_0px_15px_rgba(255,255,255,0.8)"
        >
          Rishul
        </a>
      </p>
    </div>
  );
};

export default Footer;
