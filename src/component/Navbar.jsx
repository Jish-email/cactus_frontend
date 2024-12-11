import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <>
            <div className='py-2'>
                <div className='flex justify-between items-center ml-5'>
                    <div className='flex gap-2'>
                        <img className="w-12 h-12 md:w-14 md:h-14 rounded-full cursor-pointer" src="/cactus logo.jpg" alt="profile" />
                        <div className='flex flex-col'>
                            <h1 className='text-xl md:text-xl my-auto'>Cactus</h1>
                            <p className='text-xs md:text-sm ioet'>"Ioet ki Mahfil"</p>
                        </div>
                    </div>
                    <div className='relative md:hidden'>
                        <button onClick={toggleDropdown} className='focus:outline-none'>
                            <span className="material-symbols-outlined">
                                more_vert
                            </span>            </button>
                        {dropdownOpen && (
                            <div className='absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg py-2 z-50'>
                                <Link to="/updatepassword" className='block px-4 py-2 text-white hover:text-gray-200'>Update Password</Link>
                                <Link to="/logout" className='block px-4 py-2 text-white hover:text-gray-200'>Logout</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;