# JWT Token Refresh
This Application refresh or renew the jwt access token every 10mins

## Features
- REST APIs created with ExpressJS for User Registration, Login.
- Used Mongoose as an adapter/driver between Server and MongoDB.
- User Authentication performed with help of libraries like 'bcryptjs' and 'jsonwebtoken'.
- Used Cookies to store access tokens and refresh tokens with secret key by generating token using jwt.sign().
- 'client' folder contains all the Front end files and 'server' folder contains all the server side files.

  ## Installation

Clone the repository

```
git clone https://github.com/karthikdk/Jwt-server.git
```
Install all the server dependencies

Go to the server directory

```bash
  cd server
```
Install Dependencies
```
npm install
```
And Start up the server by

```
node index.js
```

Install MongoDB Community Edition and run it by executing
```
mongod
```

Note : Add the following environment variables for best experience.

1. JWT_SECRET_KEY (for JWT signing and verifying)
2. JWT_REFRESH_KEY (for jwt refresh or renewal)

## Note

If you face any problem or have any suggestion on improving the code then feel free to raise an issue.
