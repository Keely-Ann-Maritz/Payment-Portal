<h1 align="center"> Payment Portal </h1>

<br>

## Group Members
* [Keely-Ann Maritz](https://github.com/Keely-Ann/)
* [Wiehan Smalberger](https://github.com/wiehan007)

<br>

| Student Number | Name | Roles |
| --------------- | ----- | ---------------- |
| ST10085428 | Keely-Ann Maritz | Frontend, Backend, Documentation |
| ST10085279 | Wiehan Smalberger | Frontend, Backend, Documentation |

<br>

## YouTube video
* [Part 2 Demonstration Video](https://youtu.be/CcHt6UGd3lw)
* [Part 3 Demonstration Video]()

<br>

## Introduction


<br>

## Features
 ### **Backend**
 - Connects to and stores user data in a database,
 - You can store account information in the database
 - You can store payment information in the database
 - Sensitive information gets hashed, salted and a pepper value is added to the password
 - Provides rate limiting for the login pages of up to 5 attempts to log in
 - Sanitises the inputs with DOM Purify and mongo express sanitize
 - Generates login tokens for the frontend
  
 ### **Frontend**
 - The user can login to their account
 - The user can register a new account
 - The user can make a payment
 - The user can view a history of all they payments they have made
 - The user can delete any of their payments
 - The user can log out of their account
  
 ### **Frontend-Admin**
 - The employee can login to their account
 - The employee can view a list of all the pending payments
 - The employee can change the status of the payment by accepting or rejecting they payment after reviewing the details of it.
 - The employee can view a list of all the accepted/ rejected payments
 - The employee can log out of their account
 - The super admin can login to their account.
 - The super admin can view a list of all employee accounts and their account information apart from the password.
 - The super admin can delete any employee account.
 - The super admin can create a new employee account.
 - The super admin can log out of their account

<br>

## Security Overview 

| Attacks | Preventions |
| -------- | ------------ |
| Secure input information | bcrypt (Salting, Hashing and Pepper) |
| Securing the data in transit | Frontend and Backend SSL Certificates |
| Session Jacking | HTTPOnly, JWT Token, Blacklisting Techniques |
| Clickjacking | X-Frame-Options (DENY), Content Security Policy (CSP), helmet.js |
| SQL injection | Express-mongo-sanitize package, Regex, Whitelisting Techniques, Mongoose Schema |
| Cross-Site Scripting | DOMPurify, helmet.js, X-Frame-Options (DENY) |
| Man in the Middle | Content Security Policy (CSP), Frontend and Backend SSL Certificates |
| Denial of Service (DDos) | Rate limiting |

All data is stored in the MongoDB database.

<br>

## Changelog
- Added Pepper to the bycrypt salting and hashing.
- Implemented the Express-mongo-sanitize package and HTTPOnly
- Implemented token validation

<br>

## Instructions for setting up the Environment Development
1. Install Visual Studio Code:
      -  Download link: [https://code.visualstudio.com/Download](https://code.visualstudio.com/Download)
2. Install GitHub Desktop:
      - Download link: [https://desktop.github.com/download/]
3. Open GitHub Desktop and clone the repository.
4. Once, the repository is cloned in GitHub Desktop, Select the button to Open with Visual Studio Code.
5. Ensure you are in the root folder.
6. In the navigation bar, select the <b>Terminal</b> navigation link and open a new terminal.
7. Once, the terminal has opened at the bottom of the screen, navigate into the backend and frontend folders.
8. Run the following command in the backend and frontend portals, to install all packages: ```npm i```
9. Add the <b>.env</b> file into the project.
10. Run the commands to setup the SSL Certificates for the backend and frontend portals.
11. Copy the certificates into a <b>certs</b> folder in the backend and frontend portals.
12. Ensure you are in the backend folder, in the terminal and install the https package.

<br>

## Instructions on how to run the application
 ### **User Portal**
 1. In the terminal, ensure you are in the backend and frontend folder.
 2. Run the following command, in both the frontend and backend: ```npm run dev```
 3. If the user does not have an account, select the Register link to navigate to the Register page to create an account.
 4. Once the user has created an account, they will be redirected to the Login, enter the login details to login to your account.
 5. If the user already has an account, enter the credentials to login to the Payment Portal.
 6. Once logged in, enter the payment information and card details.
 7. Select the <b>Pay Now</b> button to make the payment.
 8. The user will be redirected to a Thank You page, informing them their payment was successful. Select the <b>Continue</b> button to view the payment history.
 9. If the user does not want to make a payment, select the <b>Skip</b> button.
 10. View all the payments on the Payment History page.
 11. Select the <b>Delete</b> button, if you wish to delete a payment.
 12. Use the navigation bar to navigate to the different pages:
       - Make a payment
       - Payment History
       - Logout
 13. Select the <b>Logout</b> button to exit the application.
 
 ### **Employee Portal**
 1. In the terminal, ensure the backend is running.
 2. Run the following command, in the frontend-admin folder: : ```npm run dev```
 3. The user will be welcomed to a login page, upon opening the application. Enter the employee credentials (username and password).
 4. Select the <b>Login</b> to Login to the Employee Portal.
 5. View a list of pending payments.
 6. Select the <b>Accept</b> button to Accept the payment.
 7. Select the <b>Reject</b> button to Reject the payment.
 8. View the reviewed payments, where all the accepted and rejected payments history is displayed.
 9. Use the navigation bar to navigate to the different pages:
     - Pending Payments
     - Reviewed Payments
     - Logout
 10. Select the <b>Logout</b> button to exit the application.
 
 ### **Admin Portal**
 1. In the terminal, ensure the backend is running.
 2. Run the following command, in the frontend-admin folder: : ```npm run dev```
 3. The user will be welcomed to a login page, upon opening the application. Enter the Admin credentials (username and password).
 4. Select the <b>Login</b> to Login to the Admin Portal.
 5. View a list of Employee accounts.
 6. Select the Add Employee navigation bar tab, to navigate to the Add Employee Form.
 7. Enter Employee information.
 8. Select the <b>Register Employee</b> button to submit the form.
 9. Select the <b>Delete</b> button to delete an Employee account.
 10. Use the navigation bar to navigate to the different pages:
       - Add Employee
       - View Employees
       - Logout
 11. Select the <b>Logout</b> button to exit the application.
      
<br>

## References

Full reference list is provided in the PDF document, submitted on ARC.

<br>




