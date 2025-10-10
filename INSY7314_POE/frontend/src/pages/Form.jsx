// Importing Navigation 
import { useNavigate } from 'react-router-dom'

// Payment Form (dangelo,2022)
export default function Form({ formData, handleInput, formattedCardNumber, handleSubmit, formErrors }) {
    const { paymentTitle, provider, currency, amount, swiftCode, name, month, year, cvc } = formData;
    const navigate = useNavigate();
    return (
        <form
            aria-label="credit card form" onSubmit={handleSubmit} className="form flex flex-col w-full max-w-[327px] lg:max-w-[381px] px-4 lg:px-0 mx-auto"
        >
            {/* Payment Title */}
            <div className="flex flex-col mb-6">
                <label htmlFor="paymentTitle" className="form--label mb-1">
                    PAYMENT TITLE
                </label>
                <input
                    className="form--input border border-gray-300 rounded-lg px-3 w-full lg:w-[381px] min-h-[45px]"
                    name="paymentTitle"
                    value={paymentTitle}
                    id="paymentTitle"
                    aria-label="paymentTitle"
                    onChange={handleInput}
                    placeholder="e.g. Subscription Payment"
                />
                <div className="form--error text-error-color mt-1 text-xs">{formErrors.paymentTitle}</div>
            </div>

            <br />

            {/* Provider Dropdown */}
            <div className="flex flex-col mb-6">
                <label htmlFor="provider" className="form--label mb-1">
                    PROVIDER
                </label>
                <select
                    className="form--select border border-gray-300 rounded-lg px-3 text-sm text-black w-full lg:w-[381px] min-h-[45px]"
                    name="provider"
                    value={provider}
                    id="provider"
                    aria-label="provider"
                    onChange={handleInput}
                >
                    <option value="" disabled className="text-gray-400">-- Select Provider --</option>
                    <option value="absa" className="text-black">ABSA BANK</option>
                    <option value="fnb" className="text-black">FNB BANK</option>
                    <option value="standard" className="text-black">STANDARD BANK</option>
                    <option value="capitec" className="text-black">CAPITEC BANK</option>
                    <option value="netbank" className="text-black">NETBANK BANK</option>
                </select>
                <div className="form--error text-error-color mt-1 text-xs block">{formErrors.provider}</div>
            </div>

            <br />

            {/* Currency Dropdown */}
            <div className="flex flex-col mb-6">
                <label htmlFor="currency" className="form--label mb-1">
                    CURRENCY
                </label>
                <select
                    className="form--select border border-gray-300 rounded-lg px-3 text-sm text-black w-full lg:w-[381px] min-h-[45px]"
                    name="currency"
                    value={currency}
                    id="currency"
                    aria-label="currency"
                    onChange={handleInput}
                >
                    <option value="" disabled className="text-gray-400">-- Select Currency --</option>
                    <option value="usd" className="text-black">USD</option>
                    <option value="aud" className="text-black">AUD</option>
                    <option value="eur" className="text-black">EUR</option>
                    <option value="gbp" className="text-black">GBP</option>
                    <option value="zar" className="text-black">ZAR</option>
                </select>
                <div className="form--error text-error-color mt-1 text-xs block">{formErrors.currency}</div>
            </div>

            <br />

            {/* Swift Code */}
            <div className="flex flex-col mb-6">
                <label htmlFor="swiftCode" className="form--label mb-1">
                    Swift Code
                </label>
                <input
                    className="form--input border border-gray-300 rounded-lg px-3 w-full lg:w-[381px] min-h-[45px]"
                    name="swiftCode"
                    value={swiftCode}
                    id="swiftCode"
                    aria-label="swiftCode"
                    onChange={handleInput}
                    placeholder="e.g. SCBLLBBEXXX"
                />
                <div className="form--error text-error-color mt-1 text-xs">{formErrors.swiftCode}</div>
            </div>

            <br />

            {/* Amount */}
            <div className="flex flex-col mb-6">
                <label htmlFor="amount" className="form--label mb-1">
                    AMOUNT
                </label>
                <input
                    className="form--input border border-gray-300 rounded-lg px-3 w-full lg:w-[381px] min-h-[45px]"
                    name="amount"
                    type="number"
                    min="0"
                    value={amount}
                    id="amount"
                    aria-label="amount"
                    onChange={handleInput}
                    placeholder="e.g. 500"
                />
                <div className="form--error text-error-color mt-1 text-xs">{formErrors.amount}</div>
            </div>

            <br />

            {/* Cardholder Name (dangelo,2022)*/}
            <div className="flex flex-col mb-6">
                <label htmlFor="name" className="form--label mb-1">
                    CARDHOLDER NAME
                </label>
                <input
                    className="form--input border border-gray-300 rounded-lg px-3 w-full lg:w-[381px] min-h-[45px]"
                    name="name"
                    value={name}
                    id="name"
                    aria-label="name"
                    onChange={handleInput}
                    placeholder="e.g. Mrs B Benson"
                />
                <div className="form--error text-error-color mt-1 text-xs">{formErrors.name}</div>
            </div>

            <br />

            {/* Card Number (dangelo,2022)*/}
            <div className="flex flex-col mb-6">
                <label htmlFor="cardNumber" className="form--label mb-1">
                    CARD NUMBER
                </label>
                <input
                    className="form--input border border-gray-300 rounded-lg px-3 w-full lg:w-[381px] min-h-[45px]"
                    name="cardNumber"
                    value={formattedCardNumber}
                    id="cardNumber"
                    aria-label="cardNumber"
                    onChange={handleInput}
                    placeholder="e.g. #### #### #### ####"
                    maxLength={19}
                />
                <div className="form--error text-error-color mt-1 text-xs">{formErrors.cardNumber}</div>
            </div>


            {/* Expiration + CVC/CVV (dangelo,2022)*/}
            <div className="form--exp_container flex w-full mt-4 mb-6 gap-x-4">
                <div className="form--month_container mr-1">
                    <label htmlFor="month" className="form--label block mb-1">EXP. DATE</label>
                    <input
                        className="form--input border border-gray-300 rounded-lg px-3 w-[72px] lg:w-[80px]"
                        name="month"
                        value={month}
                        id="month"
                        aria-label="month"
                        onChange={handleInput}
                        placeholder="MM"
                        maxLength={2}
                    />
                    <div className="form--error text-error-color mt-1 text-xs">{formErrors.month}</div>
                </div>

                <div className="form--year_container mr-2">
                    <label htmlFor="year" className="form--label block mb-1">MM/YY</label>
                    <input
                        className="form--input border border-gray-300 rounded-lg px-3 w-[72px] lg:w-[80px]"
                        name="year"
                        value={year}
                        id="year"
                        aria-label="year"
                        onChange={handleInput}
                        placeholder="YY"
                        maxLength={2}
                    />
                    <div className="form--error text-error-color mt-1 text-xs">{formErrors.year}</div>
                </div>

                <div className="form--cvc_container">
                    <label htmlFor="cvc" className="form--label block mb-1">CVC/CVV</label>
                    <input
                        className="form--input border border-gray-300 rounded-lg px-3 w-[120px] lg:w-[150px]"
                        name="cvc"
                        value={cvc}
                        id="cvc"
                        aria-label="cvc"
                        onChange={handleInput}
                        placeholder="e.g. ***"
                        maxLength={3}
                    />
                    <div className="form--error text-error-color mt-1 text-xs">{formErrors.cvc}</div>
                </div>
            </div>
            <br />

            <div className="flex gap-4 mt-6">
                {/* Submit (dangelo,2022)*/}
                <button
                    type="submit"
                    className="submit-btn bg-second-color text-main-color w-full lg:w-[381px] min-h-[53px] rounded-lg"
                    aria-label="confirm button"
                >
                    Pay Now
                </button>

                <br />

                {/* Back button*/}
                <button
                    type="button"
                    onClick={() => navigate("/paymentHistory")}
                    className="back-btn bg-gray-600 text-white w-full lg:w-[381px] min-h-[53px] rounded-lg"
                    aria-label="confirm button"
                >
                    Skip
                </button>
            </div>
        </form>
    );
}

// References 
// dangelo, E.2022.Interactive Card Details Form- React, Tailwind, Vite. [Source code] Available at: <Frontend Mentor | Interactive Card Details Form- React, Tailwind, Vite coding challenge solution> [Accessed 17 September 2025].
