// Importing effects, Head and payment form and styling (dangelo,2022)
import { useState, useEffect } from 'react'
import { useLayoutEffect } from 'react'
import '../App.css'
import Head from './Head.jsx'
import Form from './Form.jsx'
import FormThankYou from './FormThankYou.jsx'
import {
  createPayment,
} from "../services/apiService.js";

// Payment Form (dangelo,2022)
// Hiding navigation bar (sahilatahar, 2023)
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
    name: '',
    username: '',
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
    name: '',
  })
  const [formattedCardNumber, setFormattedCardNumber] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  
  // Hiding the navigaiton bar on this page (sahilatahar, 2023)
  useLayoutEffect(() => {
        setShowNavbar(false);
    }, [])

  // Adding spaces between the card number (dangelo,2022)
  useEffect(() => {
    setFormattedCardNumber(prevFormat => {
      prevFormat = formData.cardNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()
      return prevFormat
    })
  }, [formData.cardNumber])

  // Regex (dangelo,2022)
  function containsOnlyLettters(str) {
    return /^[a-zA-Z]+$/.test(str);
  }

  // Regex (dangelo,2022)
  function containsLetttersAndSpaces(str) {
    return /^[a-zA-Z\s]+$/.test(str);
  }

  // Regex (dangelo,2022)
  function containsOnlyNumbers(str) {
    const removedSpaces = str.replace(/\s/g, '')
    return /^\d+$/.test(removedSpaces);
  }

  // SQL Injection Prevention, using Regex
  // Validating the input fields, which are only numbers or only letters (dangelo,2022)
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

    // Validation for paymentTitle 
    if (!values.paymentTitle) {
      errors.paymentTitle = "Payment title can't be blank";
    } else if (!regexPaymentTitle) {
      errors.paymentTitle = "Wrong format, letters and spaces only";
    }

    // Validation for provider dropdown 
    if (!values.provider) {
      errors.provider = "Please select a provider";
    }

    // Validation for currency dropdown 
    if (!values.currency) {
      errors.currency = "Please select a currency";
    }

    // Validation for Card Name (dangelo,2022)
    if (!values.name) {
      errors.name = "Name can't be blank";
    }
    else if (!regexCardHolderName) {
      errors.name = "Wrong format, letters and spaces only";
    }

    // Validation for Amount 
    if (!values.amount) {
      errors.amount = "Amount can't be blank";
    } else if (!regexAmount) {
      errors.amount = "Wrong format, numbers only";
    }

    // Validation for SwiftCode 
    if (!values.swiftCode) {
      errors.swiftCode = "Swfit Code can't be blank";
    } else if (!regexSwiftCode) {
      errors.swiftCode = "Wrong format, letters only";
    } else if (values.swiftCode.length < 8) {
      errors.swiftCode = "Swift code length must be atleast 8 letters"
    }

    // Validation for Card Number (dangelo,2022)
    if (!values.cardNumber) {
      errors.cardNumber = "Card number can't be blank";
    } else if (!regexCardNumber) {
      errors.cardNumber = "Wrong format, numbers only";
    } else if (values.cardNumber.length == 16) {
      errors.cardNumber = "Card number length must be 16"
    }

    // Validation for month (dangelo,2022)
    if (!values.month) {
      errors.month = "Can't be blank";
    } else if (!regexMonth) {
      errors.month = "Wrong format, numbers only"
    } else if (values.month > 12) {
      errors.month = "Must be less then 12"
    }

    // Validation for year (dangelo,2022)
    if (!values.year) {
      errors.year = "Can't be blank";
    } else if (!regexYear) {
      errors.year = "Wrong format, numbers only"
    } else if (values.year < lastTwoDigitsOfYear) {
      errors.year = "year can't be less then current year"
    }

    // Validation for cvc/cvv (dangelo,2022)
    if (!values.cvc) {
      errors.cvc = "Can't be blank"
    } else if (!regexCvc) {
      errors.cvc = "Wrong format, numbers only"
    } else if (values.cvc.length != 3) {
      errors.year = "must be three numbers long"
    }
    return errors;
  };

  
  // Handle Input method (dangelo,2022)
  const handleInput = (e) => {
    const { name, value } = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: e.target.value
      }
    })
  }
  
  // Submit method (dangelo,2022)
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Form validation 
    const formErrors = validate(formData)

    // Stopping the form from submitting, if there are empty fields and validation errors displaying (Dzik, 2023)
    if (Object.keys(formErrors).length > 0) {
      setFormErrors(formErrors);
      return;
    }

    const username= sessionStorage.getItem("username")
    formData.username = username
    
    await createPayment(formData);
    const dateMonth = formData.month
    const dateYear = formData.year
    const cardName = formData.name
    setFormData({ paymentTitle: "", provider: "", currency: "", amount: "", swiftCode: "", cardNumber: "#### #### #### ####", month: dateMonth, year: dateYear, cvc: "***", name: cardName })

    setFormSubmitted(true)
  }

  // Bank Card display 
  return (
    <div className="App min-h-screen w-full bg-white">
      <div className="flex flex-col lg:flex-row lg:min-h-screen">
        {/* Cards Section (dangelo,2022)*/}
        <div className="lg:w-1/2 lg:bg-gradient-to-b from-purple-900 to-purple-800">
          <Head
            formattedCardNumber={formattedCardNumber}
            formData={formData}
          />
        </div>

        {/* Form Section (dangelo,2022)*/}
        {/* Hiding Navigation bar (sahilatahar, 2023)*/}
        <div className="lg:w-1/2 flex items-center justify-center lg:px-20 py-8 lg:py-0">
          {!formSubmitted ?
            <Form
              formSubmitted={formSubmitted}
              handleSubmit={handleSubmit}
              formattedCardNumber={formattedCardNumber}
              formData={formData}
              handleInput={handleInput}
              formErrors={formErrors}
            />
            :
            <FormThankYou setShowNavbar={setShowNavbar}/>
          }
        </div>
      </div>
    </div>
  )
}

// References 
// dangelo, E.2022.Interactive Card Details Form- React, Tailwind, Vite. [Source code] Available at: <Frontend Mentor | Interactive Card Details Form- React, Tailwind, Vite coding challenge solution> [Accessed 17 September 2025].
// Dzik, D., 2023.Handling Forms in React: Validation and Error Handling. [online] Available at: <https://medium.com/@ddzik09/handling-forms-in-react-validation-and-error-handling-7c9391e2046b> [Accessed 8 October 2025].
// sahilatahar, 2023.In React, how to have a navbar on specific pages only. [online] Available at: < https://stackoverflow.com/questions/76942172/in-react-how-to-have-a-navbar-on-specific-pages-only> [Accessed 4 October 2025].
