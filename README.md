# restful-auth
Authentication service with express and MongoDB on typescript

Swagger Documentation:  http://localhost:3002/api-docs

# Instructions to set up and run the project
run docker-compose up and project will be run on 3002 port

healtcheck: http://localhost:3002/health

Step 1. Register User: http://localhost:3002/api/v1/user

Step 2. Login User: http://localhost:3002/api/v1/auth/login

Step 3. Save Access Token Value As Bearer Token

Step 4. Open protected route http://localhost:3002/api/v1/user Bearer: token

Step 5. Refresh tokens with refreshToken, when access token will expire: http://localhost:3002/api/v1/auth/refresh

Step 6. Log out user http://localhost:3002/api/v1/auth/logout
