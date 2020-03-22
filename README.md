# Opiod Use Disorder Senior Design Project

# Setup Instructions
Clone repository to local machine. Make sure NodeJS is installed. <br/>
To install all modules, run `npm install`. <br/>
To run the application, run `npm run build-start`. <br/>
All other npm scripts can be found in package.json under "scripts" <br/>

## Database Credentials
Database credentials are set up in `config/database.js` <br/>
Configuration works by reading environment variables found in `.env` <br/>
The `.env` file must be set up and have `NODE_ENV=[env name]`

## Twilio Cli
The twilio cli is required to recieve messages on a testing environment <br/>
Instructions can be found here: https://www.twilio.com/docs/sms/quickstart/node#install-nodejs-and-the-twilio-module <br/>
To run the webhook, use the command `twilio phone-numbers:update "+12064663486" --sms-url="http://localhost:3000/sms"`
