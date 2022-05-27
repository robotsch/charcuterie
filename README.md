## Charcuterie

Charcuterie is an in-restaurant web platform that gives your customers a digital menu and ordering interface at their fingertips, just by scanning a QR code with their phone.

Built with React, MaterialUI, Express, MongoDB and SocketIO.

Created by Christian Humble, Francesca Ho, and Elroy Hui.

## Usage - Restaurant Patron

After you are seated at a table at a restaurant enrolled with Charcuterie, simply scan the provided QR code and open the link to be directed to a table lobby.

<p align="center">
    <img src="https://github.com/robotsch/charcuterie/blob/main/docs/menu_landing.png?raw=true">
</p>

Enter your name in the prompt, and click the button to be sent to the restaurant's interactive menu.

<p align="center">
    <img src="https://github.com/robotsch/charcuterie/blob/main/docs/menu_page.png?raw=true">
</p>

After your table has added everything they want to order, anyone at the table can click Submit Order to send it to the restaurant.

<p align="center">
    <img src="https://github.com/robotsch/charcuterie/blob/main/docs/current_order.png?raw=true">
</p>

After placing your table's order, you can view your bill in-app by clicking the Bill button in the top menu. Payments can either be made through the application, or directly to the restaurant after your meal.

<p align="center">
    <img src="https://raw.githubusercontent.com/robotsch/charcuterie/main/docs/bill_page.png">
</p>

## Usage - Restaurant Employee

After your restaurant is enrolled with Charcuterie, log in to your account here: https://charcuterie-lhl.herokuapp.com/employee

![Login Page](https://github.com/robotsch/charcuterie/blob/main/docs/signin.png?raw=true)


After logging in, any incoming orders will be automatically be populated into the Live Order Feed on the right-hand side of the page.

![Employee Landing](https://github.com/robotsch/charcuterie/blob/main/docs/orders.png?raw=true)

If a user pays in-app, orders will automatically be marked as 'Completed'. If they pay outside of the app, the restaurant can click a button on the order itself to complete it.

## Dependencies

Server

    "bcrypt": "^5.0.1",
    "body-parser": "^1.20.0",
    "connect-mongo": "^4.6.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "express-session": "^1.17.3",
    "module-alias": "^2.2.2",
    "mongo-sanitize": "^1.1.0",
    "morgan": "^1.10.0",
    "nodemon": "^2.0.16",
    "qrcode": "^1.5.0",
    "socket.io": "^4.5.0"

Client

    "@emotion/react": "^11.9.0",
    "@emotion/styled": "^11.8.1",
    "@fontsource/roboto": "^4.5.7",
    "@mui/icons-material": "^5.6.2",
    "@mui/material": "^5.7.0",
    "axios": "^0.27.2",
    "dotenv": "^16.0.1",
    "node-sass": "^7.0.1",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-overlays": "^5.1.2",
    "react-router-dom": "^6.3.0",
    "sass": "^1.51.0",
    "socket.io-client": "^4.5.1",
    "styled-components": "^5.3.5"