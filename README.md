** Build Instructions

Create ACCESS_TOKEN_SECRET by running the following on the commandline:

```
node
require('crypto').randomBytes(64).toString('hex')
```

Create a `.env` file at the `JWTTokenAPI`. This file should include:


```
ACCESS_TOKEN_SECRET= {secret you created}
user= {user capable of read/write for MySQL}
password= {corresponding password}
```

After that. . .
1. `docker build -t jwt-token-api .`
3. `docker network create jwt-token-network`
3. `docker run --rm -d --name jwt-token-api --network jwt-token-network -p 8080:3000 jwt-token-api` 
4. `docker run --rm --name mysql -v $(pwd)/migrations:/docker-entrypoint-initdb.d -e MYSQL_ROOT_PASSWORD=password -d --network jwt-token-network mysql:latest`


5. To query, hit `localhost:8080/{route}/`


** Things to Improve
- A logout method to make use of refresh tokens.
- Signup should redirect to login if the user already exists.
- Passwords should *never* be stored as plaintext.
- Prevention of the reuse of usernames-- not checking if a username existed meant I needed to take an email and password to authenticate instead of username/password
- A way to validate email addresses without a regex. This is largely futile, and I may have been better served just looking for an `@` sign.
- Helpful error messages for 400s.
- I could have allowed the db to create the UUIDs.  I chose to do it manually to support automated tests that I didn't write.
- Automated testing.  Unit testing for email/username validation.  Integration testing (complete with deleting any created data) for the routes.
- Linting.
- generateAuthToken should reside in authentication.js.
- Getting everything working through `docker-compose`.

** Assumptions:
- ports 3306 and 9000 are available