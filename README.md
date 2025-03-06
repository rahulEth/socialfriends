![Logo](docs/SFRND.svg)


## 🌍 Empowering Change: Rewarding Eco-Friendly Actions with $SFRND Tokens 🌱

## Overview

This Solution Build on [Ethereum Blockchain](https://ethereum.org). At EarthFriends, we reward users for eco-friendly actions like planting trees, adopting sustainable practices, eco-friendly products, managing waste, or raising environmental awareness. Users simply upload proof of their activity, and after successful verification by Environment Auditors, they earn $SFRND tokens directly in their wallet that supports [Ethereum Blockchain](https://ethereum.org).

## Problem Solved

Environmental conservation often struggles with a lack of tangible incentives, discouraging individuals and communities from adopting eco-friendly habits. Traditional systems do not recognize or reward small yet impactful activities like planting trees, managing waste, or spreading awareness. This gap limits participation in environmental initiatives and slows down the collective effort to combat climate change.

## Solution

EarthFriends bridges this gap by creating a rewards-based system that incentivizes users to contribute to a greener planet through verified, tokenized recognition. 
We are utilizing [Ethereum Blockchain](https://ethereum.org) for this solution as it promot sustainability and carbon nutrility. We have deployed Auditor and ERC20 Token contract on [Ethereum Blockchain](https://ethereum.org).
If User do any activity like waste managment, planting tree, awareness campaign etc, he just simply upload the photos of the activity as proof and create an token transaction. On the Other side admin will review and verify the activity and approve the token transaction and mint the $SFRND token to user's wallet.

## Architecture

![top](./docs/social-friends-architecture.drawio.png)

## Getting Started on local 

To run daap locally, you will need

- Node.js (v18 or above)
- Chrome Browser Or Chromium based browser
- Metamask Extension on Chrome Browser (Chromium based browser)

# back-end

1. clone this repo

```
git clone https://github.com/rahulEth/socialfriends.git
```

2.  go to back-end folder

```
cd back-end
```

3. copy .env.example to .env 

4. setup evn variable like db_url, db_name.

5. 
```
npm install

npm run start

```
server would start on localhost:3001

# User dashboard

1. go into front-end folder

```
cd front-end

copy .env.example to .env 

npm install

npm run build

npm run dev

```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Admin dashboard

1. go into admin folder

```
cd admin

copy .env.example to .env 

npm install

npm run build

npm run start

```
Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.


Ta-da You are good to go and explore earthFriends Admin Portal!

# Landing Page
![top](./docs/user-dashboard.png)


# Admin Dashboard
![top](./docs/admin-dashboard.png)




## Description

At earthFrineds we insetivise users for doing any eco-friendy activity weather it is planting a new tree, adopting eco-friendly aggriculture methods, doing waste managment, using eco-friendly products, running environemnt awareness campaign. Any one can earn $SFRND token just doing good things for betterment of the world. 


## Contract Addresses

```
Auditor: https://sepolia.etherscan.io/address/0xA7A5B7e2E0EC51f7D7f9d66Bf085e948cac4B690#code

Token: https://sepolia.etherscan.io/address/0x0DcE86D5D4cf0f5DDE110802620Cb84312dBe67c#code 

```