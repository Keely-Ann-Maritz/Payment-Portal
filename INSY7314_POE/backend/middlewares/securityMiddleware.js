
const helmet = require('helmet');
const cors = require('cors');

const corsOptions = {
    // origin allows us to set where we will permit requests from (for now *, which allows everywhere and everyone!)
    origin: '*',
    // controlling what types of HTTP requests we will permit
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allow the flow of credentials between our backend API and out frontend web portal
    credentials: true,
};

// Setting the default Content Security Policy (CSP) to false (usefulcodes, 2025)
const securityMiddlewares = (app) => {
    app.use(helmet({
        contentSecurityPolicy: {
            useDefaults: false,
            directives: {
                // allow scripts from the website itself, but from nowhere else
                'default-src': ["'self'"],
                // implementing X-Frame Options to prevent Cross-Site Scripting 
                'frame-ancestors': ["'none'"],
            }
        },
        featurePolicy: {
            features: {
                // block any access to any location APIs, be it the built in Windows ones, or mobile oriented ones
                geolocation: ["'none'"],
                microphone: ["'none'"],
            }
        },
        // stop our API from telling people that it is an Express API (making it harder for people to tell what it is, to look up vulnerabilities)
        hidePoweredBy: true,
        // prevent our website from being put into an iframe
        frameguard: {
            action: 'deny'
        },
        // prevent IE users
        ieNoOpen: true,
    }));

    // Content Security Policy (CSP)
    // using the following directives and helmet to prevent Cross-Site Scripting (usefulcodes, 2025)
    app.use(
        helmet.contentSecurityPolicy({
            directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:"],
            connectSrc: ["'self'", "https://api.example.com"],
            },
        })
    );

    app.use(cors(corsOptions));
};

module.exports = { securityMiddlewares }

// References
// usefulcodes, 2025.Content Security Policy (CSP) Implementation in React. [online] Available at: <https://useful.codes/content-security-policy-csp-implementation-in-react/> [Accessed 7 October 2025].