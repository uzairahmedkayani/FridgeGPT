import React from 'react'
import LogoFull from '../assets/LogoFull.svg?react'

export default function Navbar() {
    return (
        <nav className="w-full flex items-center justify-between px-6 py-4 bg-gray-900 shadow-md">
            {/* Left: Logo */}
            <div className="flex items-center">
                <LogoFull className="h-8 w-auto" />
            </div>

            {/* Right: Options */}
            <div className="flex items-center space-x-6">
                <a
                    href="/"
                    className="text-gray-200 hover:text-blue-600 font-medium transition-colors"
                >
                    Return to Home
                </a>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-500 hover:cursor-pointer transition-colors"
                >
                    Switch Mode
                </button>
            </div>
        </nav>
    );
}