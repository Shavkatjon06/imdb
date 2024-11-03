import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-4 bg-[#121212] text-white">
      <a
        href="https://github.com/Shavkatjon06"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-3 hover:text-gray-400"
        aria-label="GitHub"
      >
        <FaGithub size={24} />
      </a>
      <a
        href="https://www.linkedin.com/in/shavkatjon-jurayev-767489213/"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-3 hover:text-gray-400"
        aria-label="LinkedIn"
      >
        <FaLinkedin size={24} />
      </a>
    </div>
  );
};

export default Footer