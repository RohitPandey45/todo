import React from "react";
import {atom,selector} from 'recoil'

export const Navbar=()=>{
    return(
        <>
        <nav className='flex justify-between bg-slate-700 text-white py-2'>
            <div className="logo">
                <span className='font-bold text-xl mx-8'>Todolist</span>
            </div>
            <ul className="flex gap-8 mx-9">
            <li className="cursor-pointer hover:font-bold transition-all">Home</li>
            <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>

            </ul>
        </nav>
        </>
    )
}
export const addAtom=atom({
    key:'addAtom',
    default:0
})
