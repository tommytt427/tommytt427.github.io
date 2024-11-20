import React, { useState } from 'react';

const SlidingContactForm = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="fixed bottom-8 left-8 z-50 flex items-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Contact Button */}
      <button 
        className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all duration-300 ease-in-out hover:scale-105"
        aria-label="Contact Form"
      >
        <i className="fas fa-envelope text-2xl"></i>
      </button>

      {/* Sliding Panel */}
      <div className={`absolute left-16 bottom-0 bg-white rounded-lg shadow-lg p-6 w-96 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
        <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
        
        <form action="https://api.web3forms.com/submit" method="POST" className="space-y-4">
          <input type="hidden" name="access_key" value="e52531c3-0d82-4041-8805-a10f0a1665dd" />
          
          <div className="relative">
            <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="relative">
            <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input 
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:border-blue-500 focus:outline-none"
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            required
            className="w-full p-4 border border-gray-200 rounded-md focus:border-blue-500 focus:outline-none min-h-[100px]"
          ></textarea>

          {/* Honeypot field */}
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            Send Message
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SlidingContactForm;
