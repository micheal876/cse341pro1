# cse341pro1
For local development:http://localhost:5000/api/items


for the login you will need to go to : http://localhost:5000/auth/github for it to you to the login with github 

GET /items
Description
Retrieve all items from the database.

Request
Method: GET
URL: /items
Response
Status: 200 OK
Content: A list of all item objects.




PUT /items/
Description
Update an existing item in the database.

Request
Method: PUT
URL: /items/:id
Headers:
Content-Type: application/json





DELETE /items/
Description
Delete an existing item from the database.

Request
Method: DELETE
URL: /items/:id
Response
Status: 200 OK
Content: A success message.

# This API has been deployed on Render. You can access it at the following URL: 
https://cse341pro1-week-3.onrender.com/api/items











1. Authenticate with GitHub
Route: GET /auth/github
Action: This route should redirect you to GitHub for authentication.
Test: Open your browser and go to http://localhost:5000/auth/github. You should be redirected to GitHub’s login page.
2. GitHub Callback
Route: GET /auth/github/callback
Action: After logging in to GitHub, GitHub will redirect you to this route.
Test: Ensure that after logging in, you’re redirected back to your application. You should see a success message or be redirected to a landing page.
3. Logout
Route: GET /logout
Action: This should log you out.
Test: Navigate to http://localhost:5000/logout. Ensure that your session is cleared, and you’re redirected appropriately.
4. Access Protected Route
Route: GET /protected-route
Action: This route should only be accessible when logged in.
Test:
First, make sure you’re logged out by navigating to http://localhost:5000/logout.
Then, try to access the protected route at http://localhost:5000/protected-route. You should receive a 401 Unauthorized response.
Now, log in through GitHub again, and after successful authentication, try accessing http://localhost:5000/protected-route again. You should receive a successful response (200 OK).