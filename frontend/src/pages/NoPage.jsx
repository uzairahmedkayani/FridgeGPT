import React from 'react'

export default function NoPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-2">Oops! No Page Found</p>
        <a
          href="/"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Go Home
        </a>
      </div>
    </>
  )
}
