// Importing the Bank card images ((dangelo,2022))
import cardBack from '../assets/bg-card-back.png'
import cardFront from '../assets/bg-card-front.png'

// Displaying the Bank card ((dangelo,2022))
export default function Head({ formData, formattedCardNumber }) {
    const { name, cardNumber, month, year, cvc } = formData
    return (
        <header className='head--container relative flex flex-col items-center justify-center min-h-[240px] w-full lg:h-full lg:bg-gradient-to-b from-purple-900 to-purple-800'>
            <div className='header--cards_image_container w-[343px] h-[251px] lg:w-[541px] lg:h-[527px] flex flex-col lg:flex-col-reverse relative'>
                <div className="header--image_container_back w-[286px] lg:w-[447px] self-end relative z-10">
                    <img className='header--card_back w-full' src={cardBack} alt="back of credit card" />
                    <p className='header--security_numbers absolute top-[73px] left-[228px] lg:top-[111px] lg:left-[358px]'>{!cvc ? '000' : cvc}</p>
                </div>

                <div className="header--image_container_front w-[286px] lg:w-[447px] relative bottom-[68px] lg:bottom-[32px] z-20">
                    <img className='header--card_front w-full' src={cardFront} alt="front of credit card" />
                    <div className=' circle--container absolute top-[17.6px] left-[19px] lg:top-[28px] lg:left-[32px] flex items-center'>
                        <div className="header--circle_large w-[30px] h-[30px] bg-main-color rounded-[15px] mr-[10px] lg:mr-4 lg:w-[47px] lg:h-[47px] lg:rounded-[23.5px]"></div>
                        <div className="header--circle_small w-[14px] h-[14px] border-main-color border rounded-[7px] lg:w-[21px] lg:h-[21px] lg:rounded-[10.5px]"></div>
                    </div>

                    <div className='header--card_info_container absolute top-[84px] left-[19px] right-[19px] lg:top-[139px] lg:left-[32px] lg:right-[32px]'>
                        <h1 className='header--card_numbers mb-[17px] lg:mb-[25.5px]'>{!cardNumber ? '0000 0000 0000 0000' : formattedCardNumber}</h1>
                        <div className='header--card_name_and_expiration_date_container flex justify-between items-center w-full pr-[6px]'>
                            <p className='header--card_name'>{!name ? 'jane appleseed' : name}</p>
                            <p className='header--expiration_date text-right'>{!month ? '00/' : `${month}/`}{!year ? '00' : `${year}`}</p>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    )
}

// References 
// dangelo, E.2022.Interactive Card Details Form- React, Tailwind, Vite. [Source code] Available at: <Frontend Mentor | Interactive Card Details Form- React, Tailwind, Vite coding challenge solution> [Accessed 17 September 2025].
