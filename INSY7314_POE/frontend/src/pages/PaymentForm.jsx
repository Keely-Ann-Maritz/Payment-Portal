import { useState, useEffect } from 'react'
import { useLayoutEffect } from 'react'

import '../App.css'
import Head from './Head.jsx'
import Form from './Form.jsx'
import FormThankYou from './FormThankYou.jsx'
import {
  createPayment,
} from "../services/apiService.js";

export default function PaymentForm({ setShowNavbar }) {
  const [formData, setFormData] = useState({
    paymentTitle: '',
    provider: '',
    currency: '',
    amount: '',
    swiftCode: '',
    cardNumber: '',
    month: '',
    year: '',
    cvc: '',
    name: ''
  })
  const [formErrors, setFormErrors] = useState({
    paymentTitle: '',
    provider: '',
    currency: '',
    amount: '',
    swiftCode: '',
    cardNumber: '',
    month: '',
    year: '',
    cvc: '',
    name: ''
  })
  const [formattedCardNumber, setFormattedCardNumber] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  
  useLayoutEffect(() => {
        setShowNavbar(false);
    }, [])

  useEffect(() => {
    setFormattedCardNumber(prevFormat => {
      prevFormat = formData.cardNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()
      return prevFormat
    })
  }, [formData.cardNumber])

  function containsOnlyLettters(str) {
    return /^[a-zA-Z]+$/.test(str);
  }

  function containsLetttersAndSpaces(str) {
    return /^[a-zA-Z\s]+$/.test(str);
  }

  function containsOnlyNumbers(str) {
    const removedSpaces = str.replace(/\s/g, '')
    return /^\d+$/.test(removedSpaces);
  }
  const validate = (values) => {
    const errors = {};
    const regexPaymentTitle = containsLetttersAndSpaces(values.paymentTitle)
    const regexCardHolderName = containsLetttersAndSpaces(values.name)
    const regexCardNumber = containsOnlyNumbers(values.cardNumber)
    const regexSwiftCode = containsOnlyLettters(values.swiftCode)
    const regexAmount = containsOnlyNumbers(values.amount)
    const regexMonth = containsOnlyNumbers(values.month)
    const regexYear = containsOnlyNumbers(values.year)
    const regexCvc = containsOnlyNumbers(values.cvc)
    const currentYear = new Date().getFullYear();
    const lastTwoDigitsOfYear = currentYear.toString().slice(-2);

    if (!values.paymentTitle) {
      errors.paymentTitle = "Payment title can't be blank";
    } else if (!regexPaymentTitle) {
      errors.paymentTitle = "Wrong format, letters and spaces only";
    }

    if (!values.provider) {
      errors.provider = "Please select a provider";
    }

    if (!values.currency) {
      errors.currency = "Please select a currency";
    }

    if (!values.name) {
      errors.name = "Name can't be blank";
    }
    else if (!regexCardHolderName) {
      errors.name = "Wrong format, letters and spaces only";
    }

    if (!values.amount) {
      errors.amount = "Amount can't be blank";
    } else if (!regexAmount) {
      errors.amount = "Wrong format, numbers only";
    }

    if (!values.swiftCode) {
      errors.swiftCode = "Swfit Code can't be blank";
    } else if (!regexSwiftCode) {
      errors.swiftCode = "Wrong format, letters only";
    } else if (values.swiftCode.length < 8) {
      errors.swiftCode = "Swift code length must be atleast 8 letters"
    }

    if (!values.cardNumber) {
      errors.cardNumber = "Card number can't be blank";
    } else if (!regexCardNumber) {
      errors.cardNumber = "Wrong format, numbers only";
    } else if (values.cardNumber.length == 16) {
      errors.cardNumber = "Card number length must be 16"
    }

    if (!values.month) {
      errors.month = "Can't be blank";
    } else if (!regexMonth) {
      errors.month = "Wrong format, numbers only"
    } else if (values.month > 12) {
      errors.month = "Must be less then 12"
    }

    if (!values.year) {
      errors.year = "Can't be blank";
    } else if (!regexYear) {
      errors.year = "Wrong format, numbers only"
    } else if (values.year < lastTwoDigitsOfYear) {
      errors.year = "year can't be less then current year"
    }

    if (!values.cvc) {
      errors.cvc = "Can't be blank"
    } else if (!regexCvc) {
      errors.cvc = "Wrong format, numbers only"
    } else if (values.cvc.length != 3) {
      errors.year = "must be three numbers long"
    }
    return errors;
  };

  const noErrors = Object.values(formErrors).every(err => err === "");

  const handleInput = (e) => {
    const { name, value } = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: e.target.value
      }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormErrors(validate(formData))
    await createPayment(formData);
    const dateMonth = formData.month
    const dateYear = formData.year
    const cardName = formData.name
    setFormData({ paymentTitle: "", provider: "", currency: "", amount: "", swiftCode: "", cardNumber: "#### #### #### ####", month: dateMonth, year: dateYear, cvc: "***", name: cardName })

    setFormSubmitted(true)
  }

  return (
    <div className="App min-h-screen w-full bg-white">
      <div className="flex flex-col lg:flex-row lg:min-h-screen">
        {/* Cards Section */}
        <div className="lg:w-1/2 lg:bg-gradient-to-b from-purple-900 to-purple-800">
          <Head
            formattedCardNumber={formattedCardNumber}
            formData={formData}
          />
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 flex items-center justify-center lg:px-20 py-8 lg:py-0">
          {!formSubmitted || !noErrors ?
            <Form
              formSubmitted={formSubmitted}
              handleSubmit={handleSubmit}
              formattedCardNumber={formattedCardNumber}
              formData={formData}
              handleInput={handleInput}
              formErrors={formErrors}
            />
            :
            <FormThankYou />
          }
        </div>
      </div>
    </div>
  )
}
