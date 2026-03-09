Method → Select GET
URL → Enter:
http://localhost:3000/products

Test POST (Create Product)
Change method from GET → POST
Keep same URL:
http://localhost:3000/products
Now:
Click Body
Select raw
Choose JSON
Paste this:
{
  "name": "Lenovo IdeaPad",
  "brand": "Lenovo",
  "price": 55000,
  "category": "Laptop",
  "description": "8GB RAM, 512GB SSD",
  "inStock": true,
  "warrantyPeriod": "1 Year",
  "rating": 4
}
Click Send

GET PRODUCT BY ID
Copy the _id from the POST response.
In postman:
Method → GET
URL:
http://localhost:3000/products/PASTE_ID_HERE
Example:
http://localhost:3000/products/65fabc12345abcd6789ef000
Click Send
✅ Expected Result
Status: 200 OK
Product JSON returned
If yes → GET BY ID working.

UPDATE PRODUCT (PUT)
Now:
Method → PUT
URL:
http://localhost:3000/products/PASTE_ID_HERE
Click Body
Select raw
Choose JSON
Paste:
{
  "price": 60000
}
Click Send

DELETE PRODUCT
Now:
Method → DELETE
URL:
http://localhost:3000/products/PASTE_ID_HERE
Click Send
✅ Expected Result
Status: 200 OK
Message:
{
  "message": "Product deleted successfully"
}

npm init -y
npm install express mongoose dotenv cors
npm install nodemon --save-dev
npm run dev
