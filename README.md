<h1 align="center"> Payment Portal </h1>

<br>

## Group Members
* [Keely-Ann Maritz](https://github.com/Keely-Ann/)
* [Wiehan Smalberger](https://github.com/wiehan007)

<br>

## YouTube video
* [Part 2 Demonstration Video]()

<br>

##  Implemented the following attack preventions, listed in Part 1:
- Frontend and Backend SSL Certificates 
- Regex
- Whitelisting Techniques
- Blacklisting Techniques
- JWT Token
- bcrypt (Salting and Hashing)
- helmet.js
- X-Frame-Options (DENY)
- Content Security Policy (CSP)
- Rate limiting
- DOMPurify
- Storing data into MongoDB

The following was not implemented : **express-mongo-sanitize package**

<br>

## Instructions for setting up the Environment Development
1. Install Visual Studio Code.
      -  Download link: [https://code.visualstudio.com/Download](https://code.visualstudio.com/Download)
2. Open GitHub Desktop and clone the repository.
3. Once, the repository is cloned, in GitHub Desktop, Open with Visual Studio Code.
4. Make sure you are in the root folder.
5. In the navigation bar, select the <b>Terminal</b> tab and open a new terminal.
6. Once, the terminal has opened at the bottom of the screen, navigate into the backend and frontend folder.
7. Run the following command in the backend and frontend, to install all packages: ```npm i```
8. Add the .env file into the project.
9. Run the commands to setup the SSL Certificates for the backend and frontend.
10. Copy the certificates into a certs folder in the backend and frontend.
11. Ensure you are in the backend folder, in the terminal and install the https package

<br>

## Instructions on how to run the application
1. In the terminal, ensure you are in the backend and frontend folders.
2. Run the following command, in both the frontend and backend: ```npm run dev```
3. If the user does not have an account, select the Register link to navigate to the Register page to create an account.
4. Once the user has created an account, they will be redirected to the Login, where the user will be able to login to their account.
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
   
<br>

## References

Full reference list is provided in the PDF document, submitted on ARC.

<br>




