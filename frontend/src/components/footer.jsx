import React from 'react';
import {assets} from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8  ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">

        <div className="mb-4 text-orange-600 md:mb-0 text-4xl font-semibold">
          Tomato.
        </div>

        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="/" className="hover:text-gray-400">Home</a>
          <a href="/about" className="hover:text-gray-400">About Us</a>
          <a href="/services" className="hover:text-gray-400">Services</a>
          <a href="/contact" className="hover:text-gray-400">Contact</a>
        </div>

        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <img src={assets.facebook_icon} />
          </a>
          <a href="https://www.linkedin.com/in/anirudh-saroha-765431292/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
             <img src={assets.linkedin_icon} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <img src={assets.twitter_icon} />
          </a>
        </div>
      </div>

      <div className="text-center mt-8 text-white">
        © {new Date().getFullYear()} YourWebsiteName. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
