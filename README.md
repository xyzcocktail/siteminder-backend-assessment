Documentation
=============

## Table of Contents

- SiteMinder - Backend Engineer Tech Challenge
  - [Overview](#overview)
  - [Technical Overview](#technical-overview)
  - [Getting Started](#getting-started)
    - [1. Prerequisites](#1-prerequisites)
    - [2. Installation and Run](#2-installation-and-run)
  - [API Document](#api-document)
    - [1. Send Email](#1-send-email)
  - [Business Requirements](#business-requirements)
  - [Todos](#todos)
  - [Conclusion](#conclusion)

---
## Overview

This service is created to send an email using RESTful API via Mailgun and Sendgrid.

This application provides abstraction between Mailgun and Sendgrid hence if one of the service goes down,
the service can quickly failover to the other provider without affecting customers.

* Demo Site - [http://siteminder.ezion.com.au/demo](http://siteminder.ezion.com.au/demo)

![alt Demo](https://github.com/xyzcocktail/siteminder-backend-assessment/blob/master/docs/demo-page.png "Demo Page Screenshot")

---  
## Technical Overview

`Backend Technical Stack`

Here are lists of my choices for this project as follows:

- [NodeJS v12.x](https://nodejs.org/)
- [Express v4.16.4](https://expressjs.com/)
- [Typescript v3.2.2](https://www.typescriptlang.org/)
- [Jest v26.6.3](https://jestjs.io/)

---
## Getting Started

### Prerequisites
- You have to set up your account for [SendGrid](https://sendgrid.com/) and [Mailgun](https://www.mailgun.com/).
- You need a valid email for the from email each providers.
- You have to create your own .env file. (The example below)
  
```
NODE_ENV=development
PORT=8080

# Sendgrid
SENDGRID_BASE_URL=https://api.sendgrid.com/v3/
SENDGRID_API_KEY=YOUR_SENDGRID_API_KEY
SENDGRID_FROM_EMAIL=from_email@your.domain

# Mailgun
MAILGUN_BASE_URL=https://api.mailgun.net/v3/YOUR_DOMAIN/
MAILGUN_API_KEY=YOUR_MAILGUN_API_KEY
MAILGUN_FROM_EMAIL=from_email@your.domain
```

### Installation and Run

- Standalone

```shell
git clone https://github.com/xyzcocktail/siteminder-backend-assessment.git 
cd siteminder-backend-assessment/server
yarn (or npm install)
yarn dev (or npm run dev)
```

- with Docker

```shell
git clone https://github.com/xyzcocktail/siteminder-backend-assessment.git 
cd siteminder-backend-assessment
docker-compose up -d (RUN) 
docker-compose down (STOP)
```

- I have set it to the localhost with the port 8080, you can access at [http://localhost:8080/demo](http://localhost:8080/demo)

```shell
// Unit testing 
yarn test
```

![alt Unit testing](https://github.com/xyzcocktail/siteminder-backend-assessment/blob/master/docs/test-terminal.png "Unit testing with Jest")

---
## API Document

- Request Head

| property     | value              | type   | required |
| ------------ | ------------------ | ------ | -------- |
| Content-Type | `application/json` | string | required |

### 1. Send email

#### Request
- [POST] /api/mail/send

#### Body
- to: email (required)
- cc: eamil (optional)
- bcc: eamil (optional)
- subject: string (required)
- content: string (required)

#### Response example
200 
```json 
{
  "message": "Email has been sent successfully!"
}
```

Testing with CURL

```shell
curl --request POST \
--url localhost:8080/api/mail/send \
--header 'Content-Type: application/json' \
--data '{"to": "toemail@xxx.com, toemail2@xxx.com", "cc": "cc@xxx.com", "subject": "Testing from CURL", "content": "TEST Content"}'
```

---
## Business Requirements

- Create a RESTful API using Mailgun and Sendgrid.
  

- Should cater for multiple email recipients with To as a mandatory and Cc and Bcc are as an option.
  

- Should provide an abstraction and failover between two providers.
  

- No authentication is required.
  

- No 3rd party client library should be used to integrate with two providers.

---
## Todos

- If there was more time allowed, I could have added one more unit test for mailer function.
  

- Having a proper pipelines for CI/CD will deploy automated process for more convenience.  
  I usually use Jenkins as a CI/CD tool, however, I also want to try out 3rd party services such as CircleCI, TeamCity and TravisCI in the future.
  

- It would be better if another version of this service is build using background processing queue such as redis, sqs, rabbitmq and kafka.
  because it is more efficient for scalable processing data.

---
## Conclusion

- I have chosen Express as a framework with Typescript and Jest as Technical Stack because:
  - I am familiar with them.
  - If we encounter some issues or problems,
    it is easy to solve as they are very popular libraries with easy to access the solutions.
  
  
- I have used the class-validator library as a validator.
  
  By doing that, a schema of request data sent by users can be used generically as middleware.
  
  On top of that, customization becomes more flexible.

  
- I tried to keep the code simple, easy to understand and maintainable by following OOP style coding.
  

- I found a common pattern between Mailgun and Sendgrid providers which are necessary properties and then created an abstract class, BaseProvider, based on them.
  
  Also I have created an interface class, IProvider, which are necessary to create a provider class.
  

- I created two providers MailgunProvider and SendgridProvier which inherits the BaseProvider and IProvider classes.
  
  Therefore, Mailer class can set those providers and send email via failOverSendmail method. 
  
