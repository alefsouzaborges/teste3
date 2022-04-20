import { AiFillAccountBook } from 'react-icons/ai';
import { useState,useEffect,useContext } from 'react';
import { PagesContext } from '../Context/contextPages';
import './styles.css'

export default function Navbar(){

    const { pageActive } = useContext(PagesContext);

    return(
        <div className='navbar-content'>
           <div className='navbar-content-title'>
                <h3>{pageActive}</h3>
           </div>
        </div>
    )
}