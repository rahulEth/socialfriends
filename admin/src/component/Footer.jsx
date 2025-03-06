// components/Footer.js
import React from "react";

function Footer() {
  return (
    <footer className="flex items-center justify-between bg-green-200 p-4">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          Logo
        </div>
      </div>
      <span>T & C</span>
    </footer>
  );
}

export default Footer;
