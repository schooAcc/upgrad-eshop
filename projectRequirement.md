Starter Code and Configuration Guidelines
The starter code is the code snippet on which you must create the frontend using React of the upGrad Eshop application. This will help you follow the proper configuration guidelines that are required for developing this application.

 


Use create-react-app to bootstrap a React project, which will act as the starter code for your application.

 

At all times, you need to make sure that your web app is configured properly. Keeping the configuration guidelines in mind, you must adhere to the guidelines below whenever you make any changes.

 

The frontend project will make requests to the APIs hosted on EC2 instance. You will use the API endpoint https://dev-project-ecommerce.upgrad.dev/api/ to use during development.

 

Configuration Guidelines:
1. Always keep the following folders and the corresponding files inside them in the root directory of your application.

‘node_modules’ folder (containing the list of all the packages)
‘public’ folder

‘index.html’ file

‘manifest.json’ file

‘src’ folder

‘assets’ folder

‘common’ folder

‘components’ folder

‘index.css’ file

‘index.js’ file

‘.gitignore’ file

‘package-lock.json’ file

‘package.json’ file

‘README.md’ file

Note: Remember to not disturb the names of these folders and files, and their locations inside the application. If you do, then it would be cumbersome for the graders to evaluate your code based on the given rubrics. Also, take special care to change only the required content of these folders and files. If you fail to do so, then your application may fail to run successfully, and this would also lead to your application being evaluated incorrectly.


2. Place all the common elements, components, stylesheets, scripts, etc., inside the ‘common’ folder.

 

3. Place all the resource files that you need to use in the application inside the ‘assets’ folder.

 

4. Create all your React components inside the ‘components’  folder. For each component, you need to first create a folder by the name of that component. Inside this folder, you need to create one JSX file and one stylesheet corresponding to that component.

 

For example, if you are creating the home component, then you can create a folder named ‘home’ inside the ‘components’ folder. Inside this folder, you can create two files, ‘Home.js’ and ‘Home.css’, which are, respectively, the JSX and stylesheet files corresponding to the home component of the application. It should look like this.

‘components’ folder

‘home’ folder

‘Home.js’ file

‘Home.css’ file

API Setup and Usage Guide
This section provides essential information for setting up your development environment and interacting with the UpGrad Eshop application’s API. The APIs are hosted remotely, and you will use tools like Postman to test and manage the application's functionality.

Please note that this is only to understand the APIs. It is not a mandatory step and you can choose to go to the next step. 

 
Pre-Requisites
Java 11 - https://www.java.com/en/download/help/download_options.html

Maven - https://www.baeldung.com/install-maven-on-windows-linux-mac

MongoDB - https://www.mongodb.com/docs/manual/installation/

IDE - IntelliJ Community Edition - https://www.jetbrains.com/idea/download

Postman - https://www.postman.com/downloads/

 

Postman Setup
Download postman and use the postman_collection.json file given at the end of the page to see what all APIs should look like and try them out.

In Postman simply Go to Import -> Select the file.

This will create a new collection in your postman.

Authentication tokens are saved in the headers tab and in the environment variables.

 

Setup
Open Project in IntelliJ Community Edition

In the maven Side panel run Maven Clean and Install Lifecycle Commands.

Go to Terminal in the IDE and run mvn spring-boot:run

This will start the application and Also setup the roles if not already created.

 

You can now use the provided API endpoints via Postman or in your frontend to interact with the hosted backend. Ensure that all requests requiring authentication include the x-auth-token in the request headers.

 

The following sections detail how to interact with the various API endpoints, such as signing up users, managing products, and handling orders.

 

SIGNUP
For Normal User Signup

POST https://dev-project-ecommerce.upgrad.dev/api/auth/signup

{

    "email": "demo@demo.com",

    "password": "password",

    "firstName": "MyFName",

    "lastName": "MyLName",

    "contactNumber": "1234567890"

}

 

For Admin User Signup

POST https://dev-project-ecommerce.upgrad.dev/api/auth/signup

{

    "email": "demo@demo.com",

    "password": "password",

    "firstName": "MyAdminName",

    "lastName": "MyAdminLName",

    "contactNumber": "1234567890",

    "role": "ADMIN"

}

 

LOGIN
POST https://dev-project-ecommerce.upgrad.dev/api/auth/signin

{

    "username": "demo@demo.com",

    "password": "password"

}

 

The above returns a token in the x-auth-token header.

All Authenticated Requests should include this token in the request Headers

x-auth-token: TOKEN_VALUE_HERE

For all the request given below, remember to add the x-auth-token Header (Like Above).

 

Products
Create Products
POST https://dev-project-ecommerce.upgrad.dev/api/products

{

    "name": "Dryfit Tshirt",

    "category": "Clothes",

    "price": 200.5,

    "description": "An Awesome Tshirt",

    "manufacturer": "Nike",

    "availableItems": 100

}

 

Update Products
PUT https://dev-project-ecommerce.upgrad.dev/api/products/{id}

{

    "id": "64e5d487ae2bb51b4b7e6e61",

    "name": "Sports Shoes By Reebok123",

    "category": "Shoes",

    "price": 500,

    "description": "Its not a shoe, its your partner",

    "manufacturer": "Reebok",

    "availableItems": 100

}

 

Delete Products
DELETE https://dev-project-ecommerce.upgrad.dev/api/products/{id}

 

GET All Categories
GET https://dev-project-ecommerce.upgrad.dev/api/products/categories

 

Addresses
Get All Addresses
GET https://dev-project-ecommerce.upgrad.dev/api/addresses

 

Create Address
POST https://dev-project-ecommerce.upgrad.dev/api/addresses

{

    "name": "SomeAddress",

    "contactNumber": "123324234234",

    "city": "Delhi",

    "landmark": "Dilli Haat",

    "street": "Some Street",

    "state": "Delhi",

    "zipcode": "123456"

}

 

Update Address
PUT https://dev-project-ecommerce.upgrad.dev/api/addresses/{id}

{

    "id": "64e5fc6a2122c31e8edc4a18",

    "name": "SomeAddress123",

    "contactNumber": "9999999999",

    "city": "Delhi",

    "landmark": "Dilli Haat",

    "street": "Some Street",

    "state": "Delhi",

    "zipcode": "123456"

}

 

Delete Address
DELETE https://dev-project-ecommerce.upgrad.dev/api/addresses/{id}

 

Orders
Get All Orders
GET https://dev-project-ecommerce.upgrad.dev/api/orders

 

Get an Order
GET https://dev-project-ecommerce.upgrad.dev/api/orders/{id}

 

Create An Order
POST https://dev-project-ecommerce.upgrad.dev/api/orders

{

    "quantity": 5,

    "product": "PRODUCT_ID"

    "address": "ADDRESS_ID"

}

Project Statement for the Navigation Bar
The first step in building the application is the creation of the navigation bar. 

 


The navigation bar appears on the top of every page of the application and contains the following based on whether the user is logged in and if the logged-in user is an admin or not:

upGrad Eshop logo

If the user is not logged in:

Links to log in and signup pages

If the user is logged in:

Search bar

Link to home page 

Button to log out of the application

If the user logged in as an admin, add the link to the ‘Add Products’ page

 

Guidelines for the Navigation Bar:

Use @material-ui/icons/ShoppingCart for the logo.
Use react-router Route to set up routing for login and signup pages.
Use @material-ui/core/AppBar to create the AppBar.
When a user clicks on the Sign In button in the form, the API endpoint: /auth must be used to log the user into the application. So the API Endpoint would be https://dev-project-ecommerce.upgrad.dev/api/auth.
When a user clicks on the Sign Up button in the form, the API endpoint: /users must be used to register the user into the application.
When a user successfully signs in, the user should be automatically redirected to the products page.
When a user searches for a product, the API endpoint: /products must be used to search the product in the application: 
 

Note: You can also compare each of your web pages with the screenshots given below.

 


Navigation bar without login

image3
image3
Navigation bar after logging in as a normal user

image13
image13
Navigation Bar after logging in as an admin

image 3
image 3
Search bar

image 20
image 20
Sign in page: This page should be active on /login.

image16
image16
Sign up page:  This page should be active on /signup.

image 21
image 21
Sign up form

image 11
image 11

Project Statement for Contents of Products Page
The second step is to create the main contents of the products page.

Guidelines for the Products Page:

In case a user is not logged in, they should not be able to proceed to the products page. The user should be redirected to the login page.
Use @material-ui/core/Card to display the products.
Card display for a non-admin user

Fig 1
Fig 1
Card display for an admin user

Fig 2
Fig 2
Use @material-ui/lab/ToggleButton to create the product category tabs.
These categories should be fetched using the endpoint: /products/categories.
Fig 3
Fig 3
 

The category tabs should be present on all the pages of the application.
The items should be sorted according to the following options:
Default: The products should be displayed in the same order as received from the API.
Price high to low: The products should be displayed in the decreasing order of price. This means that the product with the highest price should be displayed first.
Price low to high: The products should be displayed in the increasing order of price. This means that the product with the lowest price should be displayed first.
Newest: The products should be displayed in the order of addition or modification, with the latest added or modified product displayed first.
Fig 4
Fig 4
 

To display all the products, the API endpoint: /products.
To display all the categories, the API endpoint: /products/categories must be used to log the user into the application.
 

Note: You can also compare each of your web pages with the screenshots given below.


Default view of the products page for a non-admin user

Fig 5
Fig 5
Default view of the products page for an admin. 

Fig 6
Fig 6
 

Products page with a category filter, apparel

Fig 7
Fig 7
Products page with sorting, 'Price: High to Low' applied 

(Notice the prices of the items on the page.)

Fig 8
Fig 8
Search Text Added to filter the page:

Fig 9
Fig 9
Project Statement for the Product Details Page
Once the user clicks the Buy button on any product on the Products page, they should be redirected to the product details page of that product.

 

Guidelines for Product Details page:

To display the details of a product, the following API endpoint: /products/{id} must be used to get the product details.
The user should be able to input the quantity for a product on the details page.
Ensure the product image is properly bound. In case the image is not available, alternate text should be displayed for accessibility purposes. 

Note: You can also compare each of your web pages with the screenshots given below.

 

Product Details Page:

Fig 1
Fig 1

Project Statement for Placing the Order
Once the user clicks on the Place Order button on the product details page, the user should be redirected to the orders page. The Create Order page should have a stepper menu.

 

Guidelines for the Create Order page:

Use @material-ui/core/Stepper to create the stepper menu.
On confirming the order, the following message should be displayed:
‘Your order is confirmed.’

To create an order, the API endpoint: /orders must create an order.
To add the address, the API endpoint: /addresses should add the address.
 

Note: You can also compare each of your web pages with the screenshots given below.

 

Step 1: Product Details

Fig 1
Fig 1
 


Step 2: Address Details

In case an address does not exist, the address form can be filled in to save a new address. Then the saved address can be selected in the dropdown. 
If a user tries to go to the confirm order page without selecting the address, an error message should be displayed on the screen - Please select address!
 

Fig 2
Fig 2
Fig 3
Fig 3
Fig 4
Fig 4
Step 3: Order Details


In the confirm order screen, if the user clicks on Confirm Order, the order should be placed using the /orders.
After the order is placed, users should be redirected to the Products page, with a message - Order placed successfully!
 

Fig 5
Fig 5
Fig 6
Fig 6

Project Statement for the Admin User
An admin can manage the products in an application. The following are changes in the user interface for an Admin:

 


1. Add Product link in AppBar

Fig 1
Fig 1
 

2. Modify/Delete icons in the product card

Fig 2
Fig 2
 

Guidelines for the Admin User functionalities:

On clicking the delete icon in the product card, a dialog to confirm deletion should appear.

On confirming deletion, display a message ‘Product <name> deleted successfully’.

On successful modification, display a message ‘Product <name> modified successfully’.

On successful addition of a product using the Add Product form, display a message ‘Product <name> added successfully’.

To display all the products in the Manage Products page, the API endpoint: /products must be used to display all the products.

To add a product, the API endpoint: /products should add the product.

To edit a product, the API endpoint: /products/{id} should edit the product.

To delete a product, the API endpoint: /products/{id} should delete the product.

 

Note: You can also compare each of your web pages with the screenshots given below.

 

Deleting a product:

Fig 3
Fig 3
Fig 4
Fig 4
Modifying a product:

Fig 5
Fig 5
Fig 6
Fig 6
Adding a product:

The category is Creatable Select. A user can choose pre-existing categories or add a new category.

Fig 7
Fig 7
Fig 8
Fig 8
Fig 9
Fig 9

Evaluation Rubrics


Criteria	Meets Specifications	Does Not Meet Specifications
Code Functionality	 	 
Appearance of Header

1. The background of the header has the colour #3f51b5.	1. The background of the header is not of the colour #3f51b5.
2. The logo is positioned properly and it looks like the one shown in the project statement.	2. The logo is not present and/or the logo is not positioned properly and/or the logo does not look the same as shown in the screenshot, as mentioned in the project statement.
3. The search box is positioned properly and it looks like the one shown in the project statement.	3. The search box is not present and/or it is not positioned properly and/or it does not look like the one as shown in the screenshot in the project statement.
4. The Login and Sign up links are positioned properly and looks like the one shown in the project statement.	4. The Login and Sign up links are positioned properly and looks like the one shown in the project statement.
Functionality of Search Box	The search box performs the functionality of searching a product by its name in the manner mentioned in the project statement.	The search box does not perform the functionality of searching a product by its name, as mentioned in the project statement and/or it is not integrated with the API endpoint mentioned in the project statement.
Functionality of Login and Sign up Links	On click of the Login link, a Sign in page appears and a Sign up page appears on clicking the Sign up link.	The Sign in or Sign up page does not appear on clicking the links.
Appearance of Sign in and Sign up Pages

1. The Sign in page displays a form with two text fields - Email & Password, and a 'Sign in' button.	1. The Sign in page does not contain the forms with the specified fields and the button.
2. The Sign up page displays a form with fields - First Name, Last Name, Email Address, Password, Confirm Password, Contact Number and a 'Sign Up' button.	2. The Sign up page does not contain the forms with the specified fields and the button.
Functionality of Sign up Form

1. The form validation works properly for all the fields in the signup form and looks the same as shown in the screenshot in the project statement.	1. The signup form is not present and/or form validation does not work properly for or one or more required fields in the signup form and/or it does not look the same as shown in the screenshot in the project statement.
2. When the Sign up button is clicked, an API call is made to the endpoint mentioned in the project statement.	2. The Sign up button is not present and/or when the signup button is clicked, an API call is not made to the mentioned endpoint.
3. Successful or failed signup is handled properly with user messages as mentioned in the project statement.	3. Successful or failed signup is not handled properly with user messages as mentioned in the project statement.
Functionality of Sign In Form

1. The form validation works properly for all the fields in the login form and looks the same as shown in the screenshot in the project statement.	1. The login form is not present and/or form validation does not work properly for or one or more required fields in the login form and/or it does not look the same as shown in the screenshot in the project statement.
2. When the Sign in button is clicked, an API call is made to the endpoint mentioned in the project statement.	2. The Sign in button is not present and/or when the login button is clicked, an API call is not made to the mentioned endpoint.
3. Successful or failed login is handled properly with user messages as mentioned in the project statement.	3. Successful or failed login is not handled properly with user messages as mentioned in the project statement.
Appearance of the Product Categories	The categories are listed in the same manner as mentioned in the problem statement.	The categories are missing and/or are not displayed properly.
Functionality of the Product Categories

1. All the products are displayed when the All button is pressed and it is default selected on page load.	1. The All button is missing and/or the products aren't displayed and/or it is not the default selection.
2. On click of a category, only the products belonging to that category are loaded.	2. The categories aren't clickable and/or they load all products belonging to other categories as well and/or do not load products belonging to them.
3. An API call is made to fetch the products as mentioned in the project statement.	3. The API call is missing or is not made to the endpoint mentioned in the project statement.
Appearance of Sort Menu	The Sort menu is the same as mentioned in the project statement.	The Sort menu is missing and/or is not the same as the one mentioned in the project statement.
Functionality of the Sort Menu

1. The sort menu has the four sorting options as mentioned in the project statement.	1. The Sort menu has fewer or more sorting options.
2. The sorting options function correctly as per the project statement.	2. The sorting options do not work correctly as per the project statement.
Appearance of the Products	The products are displayed as per the project statement.	There are no products displayed and/or they aren't displayed as per the project statement.
Appearance of the Product Details Page

1. The product details are mentioned as per the project statement.	1. The product details are missing and/or are not as per the project statement.
2. An API call is made to fetch a specific product as mentioned in the project statement.	2. The API call is missing or is not made to the endpoint mentioned in the project statement.
Functionality of the Product Details Page

1. A user routes to the product details page with the click of a 'Buy' button of the product.	1. There is no hyperlink for the product details page on a product and/or it does not lead to the product details.
2. There is a 'Place Order' button on the product details page which routes to the create order page.	2. There is no button on the product details page and/or it does not lead to the create order page.
Appearance of the Create Order Page

1. There is a stepper menu that has 3 steps to place the order.	1. The stepper is not present or has missing steps and/or has additional steps.
2. The first step displays the item that the customer wants to order as per the project statement.	2. The first step is not present and/or is not created as the project statement.
3. The second step adds the address as per the project statement.	3. The second step is not present and/or is not created as the project statement.
4. The third step is to review the order as per the project statement.	4. The third step is not present and/or is not created as the project statement.
Functionality of the First Step

1. Only the product that is chosen by the user is shown.	1. The product chosen by the user isn't displayed and/or some other product is displayed.
2. On click on the Next button, the user is navigated to the next step.	2. The Next button is not present and/or the user is not navigated to the next step.
Functionality of the Second Step

1. There is a form to capture user address and a drop-down to choose from existing addresses.	1. There is no form present to capture the user address or a drop-down to choose from existing addresses.
2. All the fields and validations are as per the project statement.	2. The fields are missing and/or the validations are missing.
3. An API call is made to add the address as mentioned in the project statement.	3. The API call is missing or is not made to the endpoint mentioned in the project statement.
4. On click on the Next or back button, the user is navigated to the next or previous step.	4. The next or back buttons are not present and/or the user is not navigated to the next or previous step respectively.
Functionality of the Third Step

1. The product that the user wants to buy is displayed here as per the project statement.	1. The product chosen by the user isn't displayed and/or some other product is displayed.
2. The address that the user has added is displayed as mentioned in the project statement.	2. The address that the user choose isn't displayed and/or some other address is displayed.
3. On clicking the Place order button, the user is redirected to the products page with the message that displays the text "Order placed successfully!" and the back button redirects to the second step of the stepper menu.	3. The Place Order or back buttons are not present and/or the user is not navigated to the next or previous step respectively.
Appearance of the Manage Products Page

1. When the Admin user logs in, the "Add Product" link in the header appears.	1. The link is missing and/or is not as per the project statement.
2. The modify and delete icons are present on every product card.	2. There are no buttons to edit and/or delete a product.
Functionality of the Manage Products Page

1. On click of the Add Product link, the Add Product page is displayed containing a form with all the product details fields.	1. The page is not present or is visible to all users and/or is not routed to by Add Product.
2. When the edit icon is clicked, the Modify product page is displayed with a form with all the product details fields.	2. The page is not present or is visible to all users and/or is not routed to by edit icon.
3. When the delete icon is clicked, a modal box appears.	3. The modal box is not present.
Appearance and functionality of Add Product Page

1. The page contains a form.	1. The form is not created.
2. All the fields and validations are as per the project statement.	2. The fields are missing and/or the validations are missing.
3. An API call is made to add the product as mentioned in the project statement.	3. The API call is missing or is not made to the endpoint mentioned in the project statement.
4. The added product is displayed on the UI.	4. The added product is not displayed on the UI.
Appearance and functionality of Delete Products Modal

1. The modal has details as per the project statement.	1. The modal is not created or has missing details.
2. The buttons in the modal function as per the problem statement.	2. The button are missing or do not function properly.
3. An API call is made to delete the product as mentioned in the project statement.	3. The API call is missing or is not made to the endpoint mentioned in the project statement.
4. The deleted product is not displayed on the UI.	4. The deleted product is still displayed on the UI.
Appearance and functionality of Modify Product Page

1. The page contains a form.	1. The form is not created.
2. All the fields have prefilled values and validations are as per the project statement.	2. The fields with prefilled values are missing and/or the validations are missing.
3. An API call is made to modify the product as mentioned in the project statement.	3. The API call is missing or is not made to the endpoint mentioned in the project statement.
4. The modified product is displayed on the UI.	4. The modified product is not displayed on the UI.
Adherence to Coding Guidelines	 	 
Best Coding Practices

1. All the features are implemented using components and the code is formatted correctly and uses the right spacing & indentation.	1. All the features are not implemented using components and/or the code is not formatted correctly. Extra spaces, line breaks, and incorrect indentation are used throughout the code.
2. The web application is configured properly and proper folders are created and are placed at the proper location inside the application folder while following the application configuration guidelines, as described earlier.	2. The web application does not follow the Application Configuration Guidelines, as described earlier. The name and/or location of a folder/file in the starter code has changed. The common components/stylesheets are not created inside the ‘common’ folder, making redundant code appear at multiple places and/or the application pages are not created inside its individual folder inside the ‘screens’ folder.
3. The code is well documented and contains proper comments to help other developers understand the flow of the application and how the code works.	3. The code is not well documented and does not contain enough or proper comments to understand the complicated portions of the code.
4. The code is committed from time to time with proper commit messages.	4 Incremental commits are not made with proper commit messages.

Course Project Submission
The submission deadline is as per your calendar.


 

Submissions required:

Please upload your entire frontend project code to Github.

Share the link to the Github repository that contains your final project code.

We should be able to download the project files from your Github repository, and your project should run on our end without any modification to the files that we downloaded from your Github repository.

Course Project - upGrad Eshop Application
Submission details
The starter code is the code snippet on which you must create the frontend using React of the upGrad Eshop application. This will help you follow the proper configuration guidelines that are required for developing this application.

 

Use create-react-app to bootstrap a React project, which will act as the starter code for your application.

 

At all times, you need to make sure that your web app is configured properly. Keeping the configuration guidelines in mind, you must adhere to the guidelines below whenever you make any changes.

 

The frontend project will make requests to the APIs hosted on EC2 instance. You will use the API endpoint https://dev-project-ecommerce.upgrad.dev/api/ to use during development.

 

Configuration Guidelines:

1. Always keep the following folders and the corresponding files inside them in the root directory of your application.

‘node_modules’ folder (containing the list of all the packages)
‘public’ folder
‘index.html’ file
‘manifest.json’ file
‘src’ folder
‘assets’ folder
‘common’ folder
‘components’ folder
‘index.css’ file
‘index.js’ file
‘.gitignore’ file
‘package-lock.json’ file
‘package.json’ file
‘README.md’ file
Note: Remember to not disturb the names of these folders and files, and their locations inside the application. If you do, then it would be cumbersome for the graders to evaluate your code based on the given rubrics. Also, take special care to change only the required content of these folders and files. If you fail to do so, then your application may fail to run successfully, and this would also lead to your application being evaluated incorrectly.

2. Place all the common elements, components, stylesheets, scripts, etc., inside the ‘common’ folder.

 

3. Place all the resource files that you need to use in the application inside the ‘assets’ folder.

 

4. Create all your React components inside the ‘components’  folder. For each component, you need to first create a folder by the name of that component. Inside this folder, you need to create one JSX file and one stylesheet corresponding to that component.

 

For example, if you are creating the home component, then you can create a folder named ‘home’ inside the ‘components’ folder. Inside this folder, you can create two files, ‘Home.js’ and ‘Home.css’, which are, respectively, the JSX and stylesheet files corresponding to the home component of the application. It should look like this.

‘components’ folder
‘home’ folder
‘Home.js’ file
‘Home.css’ file
This section provides essential information for setting up your development environment and interacting with the UpGrad Eshop application’s API. The APIs are hosted remotely, and you will use tools like Postman to test and manage the application's functionality.

Please note that this is only to understand the APIs. It is not a mandatory step and you can choose to go to the next step. 

 

Pre-Requisites

Java 11 - https://www.java.com/en/download/help/download_options.html
Maven - https://www.baeldung.com/install-maven-on-windows-linux-mac
MongoDB - https://www.mongodb.com/docs/manual/installation/
IDE - IntelliJ Community Edition - https://www.jetbrains.com/idea/download
Postman - https://www.postman.com/downloads/
 

Postman Setup

Download Postman and create a new account using the ‘Sign Up With Google’ and follow the process.
Use the Upgrad Ecommerce.postman_collection.json file, provided at the end of the segment to see what all APIs should look like and try them out with your local environment.
In Postman simply Go to Import -> Select the file.
This will create a new collection in your postman.
 

Setup

Open Project in IntelliJ Community Edition
In the maven Side panel run Maven Clean and Install Lifecycle Commands.
Go to Terminal in the IDE and run mvn spring-boot:run
This will start the application and Also setup the roles if not already created.
 

You can now use the provided API endpoints via Postman or in your frontend to interact with the hosted backend. Ensure that all requests requiring authentication include the x-auth-token in the request headers.

 

The following sections detail how to interact with the various API endpoints, such as signing up users, managing products, and handling orders.

 

SIGNUP

For Normal User Signup:

POST https://dev-project-ecommerce.upgrad.dev/api/auth/signup

 

{

 

    "email": "demo@demo.com",

 

    "password": "password",

 

    "firstName": "MyFName",

 

    "lastName": "MyLName",

 

    "contactNumber": "1234567890"

 

}

 

Note: Modify the details of the user in the Body section to avoid getting error messages.

 

For Admin User Signup:

POST https://dev-project-ecommerce.upgrad.dev/api/auth/signup

 

{

 

    "email": "demo@demo.com",

 

    "password": "password",

 

    "firstName": "MyAdminName",

 

    "lastName": "MyAdminLName",

 

    "contactNumber": "1234567890",

 

    "role": "ADMIN"

 

}

 

Note: Modify the details of the user in the Body section to avoid getting error messages.

 

LOGIN

POST https://dev-project-ecommerce.upgrad.dev/api/auth/signin

 

{

 

    "username": "demo@demo.com",

 

    "password": "password"

 

}

 

The above API returns a token in the x-auth-token header which you will find it under the response header. 
All authenticated requests should include this token in the request Headers.

x-auth-token: TOKEN_VALUE_HERE

 

For all the request given below, you are required to add the x-auth-token Header.

 

Products

Create Products

POST https://dev-project-ecommerce.upgrad.dev/api/products

 

{

 

    "name": "Dryfit Tshirt",

 

    "category": "Clothes",

 

    "price": 200.5,

 

    "description": "An Awesome Tshirt",

 

    "manufacturer": "Nike",

 

    "availableItems": 100

 

}

 

Note: Modify the product information to avoid duplicacy. To modify the details, go to the Body tab.

Creating a product will return ‘id' in the response body. This is the product id, which will be used to refer this product.

 

GET Product

GET https://dev-project-ecommerce.upgrad.dev/api/products/{id}

 

To get the details of the product, id of the product must be provided. In the Params section, update the {{product_id}} value with the id we got from the previous API to create the product.

 

Update Products

PUT https://dev-project-ecommerce.upgrad.dev/api/products/{id}

 

{

 

    "id": "64e5d487ae2bb51b4b7e6e61",

 

    "name": "Sports Shoes By Reebok123",

 

    "category": "Shoes",

 

    "price": 500,

 

    "description": "Its not a shoe, its your partner",

 

    "manufacturer": "Reebok",

 

    "availableItems": 100

 

}

 

Delete Products

DELETE https://dev-project-ecommerce.upgrad.dev/api/products/{id}

 

GET All Categories

GET https://dev-project-ecommerce.upgrad.dev/api/products/categories

 

Addresses

 

Create Address

POST https://dev-project-ecommerce.upgrad.dev/api/addresses

 

{

 

    "name": "SomeAddress",

 

    "contactNumber": "123324234234",

 

    "city": "Delhi",

 

    "landmark": "Dilli Haat",

 

    "street": "Some Street",

 

    "state": "Delhi",

 

    "zipcode": "123456"

 

}

 

Note: Modify the details of the address in the Body section before sending it, otherwise you wont be able to create a address if it has already been created.


Creating the address will return an id, which is the address id and will be used for referencing the created address.

 

GET Address

GET https://dev-project-ecommerce.upgrad.dev/api/addresses/{id}

 

To get the details of the address, id of the address must be provided. In the ‘Params’ section, update the {{address_id}} value with the id we got from the previous API to create the address.

 

Update Address

PUT https://dev-project-ecommerce.upgrad.dev/api/addresses/{id}

 

{

 

    "id": "64e5fc6a2122c31e8edc4a18",

 

    "name": "SomeAddress123",

 

    "contactNumber": "9999999999",

 

    "city": "Delhi",

 

    "landmark": "Dilli Haat",

 

    "street": "Some Street",

 

    "state": "Delhi",

 

    "zipcode": "123456"

 

}

 

GET All Addresses

GET https://dev-project-ecommerce.upgrad.dev/api/addresses

 

Delete Address

DELETE https://dev-project-ecommerce.upgrad.dev/api/addresses/{id}

 

Orders

Create An Order

POST https://dev-project-ecommerce.upgrad.dev/api/orders

 

{

 

    "quantity": 5,

 

    "product": "PRODUCT_ID"

 

    "address": "ADDRESS_ID"

 

}

 

This request will create an order and return the order id in the response body.

 

Get An Order

GET https://dev-project-ecommerce.upgrad.dev/api/orders/{id}

 

To get the details of the order, id of the order must be provided. In the ‘Params’ section, update the order_id value with the id we got from the previous API to create an order.

Get All Order

The first step in building the application is the creation of the navigation bar. 

 

The navigation bar appears on the top of every page of the application and contains the following based on whether the user is logged in and if the logged-in user is an admin or not:

upGrad Eshop logo
If the user is not logged in:
Links to log in and signup pages
If the user is logged in:
Search bar
Link to home page 
Button to log out of the application
If the user logged in as an admin, add the link to the ‘Add Products’ page
 

Guidelines for the Navigation Bar:

Use @material-ui/icons/ShoppingCart for the logo.
Use react-router Route to set up routing for login and signup pages.
Use @material-ui/core/AppBar to create the AppBar.
When a user clicks on the Sign In button in the form, the API endpoint: /auth must be used to log the user into the application. So the API Endpoint would be https://dev-project-ecommerce.upgrad.dev/api/auth.
When a user clicks on the Sign Up button in the form, the API endpoint: /users must be used to register the user into the application.
When a user successfully signs in, the user should be automatically redirected to the products page.
When a user searches for a product, the API endpoint: /products must be used to search the product in the application: 
 

Note: You can also compare each of your web pages with the screenshots given below.

 

Navigation bar without login

 

The second step is to create the main contents of the products page.

Guidelines for the Products Page:

In case a user is not logged in, they should not be able to proceed to the products page. The user should be redirected to the login page.
Use @material-ui/core/Card to display the products.
 

Use @material-ui/lab/ToggleButton to create the product category tabs.
These categories should be fetched using the endpoint: /products/categories.
 

The category tabs should be present on all the pages of the application.
The items should be sorted according to the following options:
Default: The products should be displayed in the same order as received from the API.
Price high to low: The products should be displayed in the decreasing order of price. This means that the product with the highest price should be displayed first.
Price low to high: The products should be displayed in the increasing order of price. This means that the product with the lowest price should be displayed first.
Newest: The products should be displayed in the order of addition or modification, with the latest added or modified product displayed first.
 

To display all the products, the API endpoint: /products.
To display all the categories, the API endpoint: /products/categories must be used to log the user into the application.
 

Once the user clicks the Buy button on any product on the Products page, they should be redirected to the product details page of that product.

 

Guidelines for Product Details page:

To display the details of a product, the following API endpoint: /products/{id} must be used to get the product details.
The user should be able to input the quantity for a product on the details page.
Ensure the product image is properly bound. In case the image is not available, alternate text should be displayed for accessibility purposes. 
Once the user clicks on the Place Order button on the product details page, the user should be redirected to the orders page. The Create Order page should have a stepper menu.

 

Guidelines for the Create Order page:

Use @material-ui/core/Stepper to create the stepper menu.
On confirming the order, the following message should be displayed:
‘Your order is confirmed.’

To create an order, the API endpoint: /orders must create an order.
To add the address, the API endpoint: /addresses should add the address.
 

 

Step 2: Address Details

In case an address does not exist, the address form can be filled in to save a new address. Then the saved address can be selected in the dropdown. 
If a user tries to go to the confirm order page without selecting the address, an error message should be displayed on the screen - Please select address!
 

 

Step 3: Order Details

In the confirm order screen, if the user clicks on Confirm Order, the order should be placed using the /orders.
After the order is placed, users should be redirected to the Products page, with a message - Order placed successfully!
 

An admin can manage the products in an application. The following are changes in the user interface for an Admin:

 

1. Add Product link in AppBar

2. Modify/Delete icons in the product card

 

Guidelines for the Admin User functionalities:

On clicking the delete icon in the product card, a dialog to confirm deletion should appear.
On confirming deletion, display a message ‘Product <name> deleted successfully’.
On successful modification, display a message ‘Product <name> modified successfully’.
On successful addition of a product using the Add Product form, display a message ‘Product <name> added successfully’.
To display all the products in the Manage Products page, the API endpoint: /products must be used to display all the products.
To add a product, the API endpoint: /products should add the product.
To edit a product, the API endpoint: /products/{id} should edit the product.
To delete a product, the API endpoint: /products/{id} should delete the product.
 

Criteria

Meets Specifications

Does Not Meet Specifications

Code Functionality

 	 
Appearance of Header

1. The background of the header has the colour #3f51b5.

1. The background of the header is not of the colour #3f51b5.

2. The logo is positioned properly and it looks like the one shown in the project statement.

2. The logo is not present and/or the logo is not positioned properly and/or the logo does not look the same as shown in the screenshot, as mentioned in the project statement.

3. The search box is positioned properly and it looks like the one shown in the project statement.

3. The search box is not present and/or it is not positioned properly and/or it does not look like the one as shown in the screenshot in the project statement.

4. The Login and Sign up links are positioned properly and looks like the one shown in the project statement.

4. The Login and Sign up links are positioned properly and looks like the one shown in the project statement.

Functionality of Search Box

The search box performs the functionality of searching a product by its name in the manner mentioned in the project statement.

The search box does not perform the functionality of searching a product by its name, as mentioned in the project statement and/or it is not integrated with the API endpoint mentioned in the project statement.

Functionality of Login and Sign up Links

On click of the Login link, a Sign in page appears and a Sign up page appears on clicking the Sign up link.

The Sign in or Sign up page does not appear on clicking the links.

Appearance of Sign in and Sign up Pages

1. The Sign in page displays a form with two text fields - Email & Password, and a 'Sign in' button.

1. The Sign in page does not contain the forms with the specified fields and the button.

2. The Sign up page displays a form with fields - First Name, Last Name, Email Address, Password, Confirm Password, Contact Number and a 'Sign Up' button.

2. The Sign up page does not contain the forms with the specified fields and the button.

Functionality of Sign up Form

1. The form validation works properly for all the fields in the signup form and looks the same as shown in the screenshot in the project statement.

1. The signup form is not present and/or form validation does not work properly for or one or more required fields in the signup form and/or it does not look the same as shown in the screenshot in the project statement.

2. When the Sign up button is clicked, an API call is made to the endpoint mentioned in the project statement.

2. The Sign up button is not present and/or when the signup button is clicked, an API call is not made to the mentioned endpoint.

3. Successful or failed signup is handled properly with user messages as mentioned in the project statement.

3. Successful or failed signup is not handled properly with user messages as mentioned in the project statement.

Functionality of Sign In Form

1. The form validation works properly for all the fields in the login form and looks the same as shown in the screenshot in the project statement.

1. The login form is not present and/or form validation does not work properly for or one or more required fields in the login form and/or it does not look the same as shown in the screenshot in the project statement.

2. When the Sign in button is clicked, an API call is made to the endpoint mentioned in the project statement.

2. The Sign in button is not present and/or when the login button is clicked, an API call is not made to the mentioned endpoint.

3. Successful or failed login is handled properly with user messages as mentioned in the project statement.

3. Successful or failed login is not handled properly with user messages as mentioned in the project statement.

Appearance of the Product Categories

The categories are listed in the same manner as mentioned in the problem statement.

The categories are missing and/or are not displayed properly.

Functionality of the Product Categories

1. All the products are displayed when the All button is pressed and it is default selected on page load.

1. The All button is missing and/or the products aren't displayed and/or it is not the default selection.

2. On click of a category, only the products belonging to that category are loaded.

2. The categories aren't clickable and/or they load all products belonging to other categories as well and/or do not load products belonging to them.

3. An API call is made to fetch the products as mentioned in the project statement.

3. The API call is missing or is not made to the endpoint mentioned in the project statement.

Appearance of Sort Menu

The Sort menu is the same as mentioned in the project statement.

The Sort menu is missing and/or is not the same as the one mentioned in the project statement.

Functionality of the Sort Menu

1. The sort menu has the four sorting options as mentioned in the project statement.

1. The Sort menu has fewer or more sorting options.

2. The sorting options function correctly as per the project statement.

2. The sorting options do not work correctly as per the project statement.

Appearance of the Products

The products are displayed as per the project statement.

There are no products displayed and/or they aren't displayed as per the project statement.

Appearance of the Product Details Page

1. The product details are mentioned as per the project statement.

1. The product details are missing and/or are not as per the project statement.

2. An API call is made to fetch a specific product as mentioned in the project statement.

2. The API call is missing or is not made to the endpoint mentioned in the project statement.

Functionality of the Product Details Page

1. A user routes to the product details page with the click of a 'Buy' button of the product.

1. There is no hyperlink for the product details page on a product and/or it does not lead to the product details.

2. There is a 'Place Order' button on the product details page which routes to the create order page.

2. There is no button on the product details page and/or it does not lead to the create order page.

Appearance of the Create Order Page

1. There is a stepper menu that has 3 steps to place the order.

1. The stepper is not present or has missing steps and/or has additional steps.

2. The first step displays the item that the customer wants to order as per the project statement.

2. The first step is not present and/or is not created as the project statement.

3. The second step adds the address as per the project statement.

3. The second step is not present and/or is not created as the project statement.

4. The third step is to review the order as per the project statement.

4. The third step is not present and/or is not created as the project statement.

Functionality of the First Step

1. Only the product that is chosen by the user is shown.

1. The product chosen by the user isn't displayed and/or some other product is displayed.

2. On click on the Next button, the user is navigated to the next step.

2. The Next button is not present and/or the user is not navigated to the next step.

Functionality of the Second Step

1. There is a form to capture user address and a drop-down to choose from existing addresses.

1. There is no form present to capture the user address or a drop-down to choose from existing addresses.

2. All the fields and validations are as per the project statement.

2. The fields are missing and/or the validations are missing.

3. An API call is made to add the address as mentioned in the project statement.

3. The API call is missing or is not made to the endpoint mentioned in the project statement.

4. On click on the Next or back button, the user is navigated to the next or previous step.

4. The next or back buttons are not present and/or the user is not navigated to the next or previous step respectively.

Functionality of the Third Step

1. The product that the user wants to buy is displayed here as per the project statement.

1. The product chosen by the user isn't displayed and/or some other product is displayed.

2. The address that the user has added is displayed as mentioned in the project statement.

2. The address that the user choose isn't displayed and/or some other address is displayed.

3. On clicking the Place order button, the user is redirected to the products page with the message that displays the text "Order placed successfully!" and the back button redirects to the second step of the stepper menu.

3. The Place Order or back buttons are not present and/or the user is not navigated to the next or previous step respectively.

Appearance of the Manage Products Page

1. When the Admin user logs in, the "Add Product" link in the header appears.

1. The link is missing and/or is not as per the project statement.

2. The modify and delete icons are present on every product card.

2. There are no buttons to edit and/or delete a product.

Functionality of the Manage Products Page

1. On click of the Add Product link, the Add Product page is displayed containing a form with all the product details fields.

1. The page is not present or is visible to all users and/or is not routed to by Add Product.

2. When the edit icon is clicked, the Modify product page is displayed with a form with all the product details fields.

2. The page is not present or is visible to all users and/or is not routed to by edit icon.

3. When the delete icon is clicked, a modal box appears.

3. The modal box is not present.

Appearance and functionality of Add Product Page

1. The page contains a form.

1. The form is not created.

2. All the fields and validations are as per the project statement.

2. The fields are missing and/or the validations are missing.

3. An API call is made to add the product as mentioned in the project statement.

3. The API call is missing or is not made to the endpoint mentioned in the project statement.

4. The added product is displayed on the UI.

4. The added product is not displayed on the UI.

Appearance and functionality of Delete Products Modal

1. The modal has details as per the project statement.

1. The modal is not created or has missing details.

2. The buttons in the modal function as per the problem statement.

2. The button are missing or do not function properly.

3. An API call is made to delete the product as mentioned in the project statement.

3. The API call is missing or is not made to the endpoint mentioned in the project statement.

4. The deleted product is not displayed on the UI.

4. The deleted product is still displayed on the UI.

Appearance and functionality of Modify Product Page

1. The page contains a form.

1. The form is not created.

2. All the fields have prefilled values and validations are as per the project statement.

2. The fields with prefilled values are missing and/or the validations are missing.

3. An API call is made to modify the product as mentioned in the project statement.

3. The API call is missing or is not made to the endpoint mentioned in the project statement.

4. The modified product is displayed on the UI.

4. The modified product is not displayed on the UI.

Adherence to Coding Guidelines

 	 
Best Coding Practices

1. All the features are implemented using components and the code is formatted correctly and uses the right spacing & indentation.

1. All the features are not implemented using components and/or the code is not formatted correctly. Extra spaces, line breaks, and incorrect indentation are used throughout the code.

2. The web application is configured properly and proper folders are created and are placed at the proper location inside the application folder while following the application configuration guidelines, as described earlier.

2. The web application does not follow the Application Configuration Guidelines, as described earlier. The name and/or location of a folder/file in the starter code has changed. The common components/stylesheets are not created inside the ‘common’ folder, making redundant code appear at multiple places and/or the application pages are not created inside its individual folder inside the ‘screens’ folder.

3. The code is well documented and contains proper comments to help other developers understand the flow of the application and how the code works.

3. The code is not well documented and does not contain enough or proper comments to understand the complicated portions of the code.

4. The code is committed from time to time with proper commit messages.

4 Incremental commits are not made with proper commit messages.

 

The submission deadline is as per your calendar.

 

Submissions required:

Please upload your entire frontend project code to Github.
Share the link to the Github repository that contains your final project code.
We should be able to download the project files from your Github repository, and your project should run on our end without any modification to the files that we downloaded from your Github repository.

