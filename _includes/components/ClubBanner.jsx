import React, { useState } from 'react';

const ClubBanner = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-64 mb-8 overflow-hidden rounded-lg shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Background */}
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/assets/videos/masa-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay that appears on hover */}
      <div 
        className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="p-6 text-white h-full flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-2">Michigan Autonomous Aerial Systems (MAAS)</h3>
          <p className="text-lg">
            Software Developer | 2023 - Present
          </p>
          <ul className="mt-4 list-disc list-inside">
            <li>Implemented autonomous drone navigation algorithms</li>
            <li>Developed computer vision systems for object detection</li>
            <li>Contributed to mission planning software</li>
          </ul>
        </div>
      </div>
      
      {/* Bottom gradient overlay for text visibility */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent opacity-75"></div>
      
      {/* Club name always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-xl font-semibold">MASA</h3>
      </div>
    </div>
  );
};

export default ClubBanner;
