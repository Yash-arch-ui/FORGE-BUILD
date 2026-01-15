import React from 'react'
import Link from "next/link";
const Navbar =() => {
    return (
        <div className='px -7 py-3 flex items-center justify-between bg-blue-950'>
            <h2>Assidious</h2>
            <div className='flex items-center gap-7'></div>
            <Link href='/'>Home</Link>
            <Link href='/about'>About</Link>
            <Link href='/project'>Project</Link>
        </div>
    )
}
export default Navbar