** Build Instructions
Create a `.env` file at the `JWTTokenAPI`. This file should include:
ACCESS_TOKEN_SECRET= {randomly generated secret}
user= {user capable of read/write for MySQL}
password= {corresponding password}

After that. . .
1. docker build -t jwt-token-api .
2. docker run -it -p 9000:3000 jwt-token-api


** Things to Improve
- A logout method to make use of refresh tokens.
- Signup should redirect to login if the user already exists.
- Passwords should *never* be stored as plaintext.
- Prevention of the reuse of usernames.
- A way to validate email addresses without a regex. This is largely futile, and I may have been better served just looking for an `@` sign.
- Helpful error messages for 400s.
- I could have allowed the db to create the UUIDs.  I chose to do it manually to support automated tests that I didn't write.
- Automated testing.  Unit testing for email/username validation.  Integration testing (complete with deleting any created data) for the routes.
- Linting.

** Assumptions:
- ports 3306 and 9000 are available