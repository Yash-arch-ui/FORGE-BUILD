import React from 'react'
import Navbar from './components/Navbar'
const page = () => {
  return (
   <div className="min-h-screen bg-transparent text-white">
  <div className="flex flex-col items-center justify-center text-center px-6 mt-32">
    <h1 className="text-5xl font-extrabold tracking-tight">
      No middlemen <span className="text-indigo-400">Just code.</span>
    </h1>
    <p className="mt-6 text-lg text-gray-400 max-w-6xl">
      A decentralized Vault where transparency replaces trust.
      Your funds. Your funds enforced by smart contracts.
    </p>
    <div
      style={{
        backgroundImage: "url('https://plus.unsplash.com/premium_photo-1671260683519-ca85b0d346a9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "90vh",
  }}
></div>
     
      </div>
    </div>
  )
}

export default page
