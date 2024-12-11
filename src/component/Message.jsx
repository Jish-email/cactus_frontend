import React from 'react';

const Message = () => {
    return (
        <div className="container mx-auto p-8 min-h-screen flex items-center justify-center">
            <div className="text-center">
                <img src="chill.png" alt="chat" className="w-1/4 mx-auto" />
                <p className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-serif mt-4 bebas-neue-regular  ">
                    "GOOD CONVERSATIONS TAKE TIME TO BREW! GET READY TO CHAT, CONNECT, AND SHARE— <span className='text-message'>CACTUS IS BRINGING THE BUZZ SOON!"</span>    </p>
            </div>
        </div>
    );
};

export default Message;