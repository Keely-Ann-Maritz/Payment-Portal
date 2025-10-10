import { useNavigate } from 'react-router-dom'
import { useLayoutEffect } from 'react'

import '../App.css'

import Head from './Head.jsx'
import iconComplete from '../assets/icon-complete.svg'

// Thank You Page (dangelo,2022)
// Hiding navigation bar (sahilatahar, 2023)
export default function FormThankYou({ setShowNavbar }) {
    // Navigating to the next page 
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/paymentHistory');
    }

    // Hiding the navigation bar on this page (sahilatahar, 2023)
    useLayoutEffect(() => {
        setShowNavbar(false);
    }, [])

    // Thank you message body and button (dangelo,2022)
    return (
        <section className='thank-you max-md:mt-[91px] lg:ml-[349px] flex flex-col items-center'>
            <img src={iconComplete} alt='check mark complete logo' className='mb-[35px]'></img>
            <br />
            <h1 >THANK YOU!</h1>
            <h2 style={{ color: "var(--second-font-color)", fontSize: "24px" }} >Your payment has been processed and will be reviewed!</h2>
            <br />
            <button className='submit-btn bg-second-color text-main-color w-full lg:w-[381px] min-h-[53px] rounded-lg' aria-label='continue button' onClick={handleClick}>Continue</button>
        </section>
    )
}

// References 
// dangelo, E.2022.Interactive Card Details Form- React, Tailwind, Vite. [Source code] Available at: <Frontend Mentor | Interactive Card Details Form- React, Tailwind, Vite coding challenge solution> [Accessed 17 September 2025].
// sahilatahar, 2023.In React, how to have a navbar on specific pages only. [online] Available at: < https://stackoverflow.com/questions/76942172/in-react-how-to-have-a-navbar-on-specific-pages-only> [Accessed 4 October 2025].
