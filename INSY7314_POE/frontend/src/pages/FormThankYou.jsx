import { useNavigate } from 'react-router-dom'
import { useLayoutEffect } from 'react'

import '../App.css'

import Head from './Head.jsx'
import iconComplete from '../assets/icon-complete.svg'
export default function FormThankYou({ setShowNavbar }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/paymentHistory');
    }

    useLayoutEffect(() => {
        setShowNavbar(false);
    }, [])

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