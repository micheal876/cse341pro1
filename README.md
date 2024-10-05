# cse341pro1
For local development:http://localhost:5000/api/items


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


