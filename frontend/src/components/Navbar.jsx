import React, { useState } from 'react'
import LogoFull from '../assets/LogoFull.svg?react'
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="w-full flex items-center justify-between px-6 py-4 bg-gray-900 shadow-md">
            <div className="flex items-center">
                <LogoFull className="h-8 w-auto" />
            </div>

            <div className="flex items-center space-x-6">
                <a
                    href="/"
                    className="text-gray-200 hover:text-blue-400 font-medium transition-colors"
                    title='Home'
                >
                    Home
                </a>
                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white px-0.5 rounded-md font-semibold hover:text-blue-400 hover:cursor-pointer transition-colors"
                        title='Menu'
                    >
                        <MenuIcon />
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                            <a
                                href="/saved-recipes"
                                className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                            >
                                Saved Recipes
                            </a>
                            <button
                                onClick={() => {/* Add logout logic here */}}
                                className="block w-full text-left px-4 py-2 text-md text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}