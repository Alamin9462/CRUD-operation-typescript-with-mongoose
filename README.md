# CRUD-operation-typescript-with-mongoose
Project Setup:
Create an Express project with TypeScript.
Set up a MongoDB database to store Products (books) and Orders.
Use Mongoose for schema definition and data operations.
Implement CRUD operations for both books and orders.

1. Create a Book:
2.  https://book-ecommerce-backend-node.vercel.app/api/products/create-product
Method: POST

2. Get All Books:
3.  https://book-ecommerce-backend-node.vercel.app/api/products

4.  Get a Specific Book:
5.  https://book-ecommerce-backend-node.vercel.app/api/products/:productId

6.  Update a Book:
    https://book-ecommerce-backend-node.vercel.app/api/products/:productId
    Method: PUT

Delete a Book:
Endpoint: https://book-ecommerce-backend-node.vercel.app/api/products/:productId
Method: DELETE


6. Order a Book
Endpoint: https://book-ecommerce-backend-node.vercel.app/api/orders
Method: POST
Inventory Management Logic:
When an order is placed, the quantity in the product model is reduced.
If the inventory quantity goes to zero, set inStock to false.
Could you handle insufficient stock cases by returning an appropriate error message?




