Documentation
=============

## Table of Contents

- SiteMinder - Backend Engineer Tech Challenge
  - [Overview](#overview)
  - [Technical Overview](#technical-overview)
  - [Getting Started](#getting-started)
  - [API Document](#api-document)
    - [1. Send Email](#1-)
  - [Business Requirements](#business-requirements)
  - [Todos](#Todos)
  - [Conclusion](#conclusion)

---

## Overview

Create a service that accepts the necessary information and sends emails.

The application should provide an abstraction between two different email service providers. 
If one of the services goes down, your service can quickly failover to a different provider 
without affecting your customers.

* Demo Site - [http://siteminder.ezion.com.au/demo](http://siteminder.ezion.com.au/demo)

![alt Demo](https://github.com/xyzcocktail/siteminder-backend-assessment/blob/master/docs/demo-page.png "Demo Page Screenshot")
  
## Technical Overview

`Backend Technical Stack`

Here are lists of my choices for this project as follows:

- [NodeJS v12.x](https://nodejs.org/)
- [Express v4.16.4](https://expressjs.com/)
- [Typescript v3.2.2](https://www.typescriptlang.org/)
- [Jest v26.6.3](https://jestjs.io/)

## Getting Started

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

If one of the services goes down, your service can quickly failover to a different provider.

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
  "message": "Email has been sent successfully!",
  "data": {
    "providerName": "Sendgrid"
  }
}
```
or
```JSON
{
  "message": "Queued. Thank you.",
  "data": {
    "providerName": "Mailgun"
  }
}
```

Testing with Curl

```shell
curl --request POST \
--url localhost:8080/api/mail/send \
--header 'Content-Type: application/json' \
--data '{"to": "toemail@xxx.com, toemail2@xxx.com", "cc": "cc@xxx.com", "subject": "Testing from CURL", "content": "TEST Content"}'
```

---
## Business Requirement

- Mailgun
- SendGrid

Above services are free to try. You may choose alternative email providers that have API integration. 
Your solution should cater for multiple email recipients, CCs and BCCs but there is no need to support HTML email body types (plain text is OK).

The solution should be implemented as one or more RESTful API calls (see technology constraints below).
- No authentication is required for the scope of this exercise
- No 3rd party client library should be used to integrate with Mailgun, Sendgrid or other providers. 
  A simple HTTP client of choice can be used to handcraft HTTP requests to the email gateway services.


## Conclusion


I hope everything I did is accurate and comprehensible

I really enjoyed taking this task :)

Thank you. 
