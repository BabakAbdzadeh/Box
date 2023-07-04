# BOX

This repository houses a robust and interactive React, MERN, application designed to manage and display product shares among different users. The application provides a comprehensive suite of features including user authentication, product and contributor management, and detailed result displays.

## Front End

This is a React-based application that manages and displays product shares among different users.

## Table of Contents

- [Components](#components)
- [Services](#services)
- [Utilities](#utilities)
- [Routing](#routing)
- [APIs and Connection](#apis-and-connection)
- [Getting Started](#getting-started)
- [Contributing](#contributing)

## Components

Component           | Description
--------------------|------------------------------
LoginComponent      | Handles user login. It uses the login function from auth.service to authenticate the user.
RegisterComponent   | Handles user registration. It uses the register function from auth.service to register a new user.
AddContributors     | Allows the user to add contributors to a product. It uses the lodash library to manipulate the list of contributors.
AddProducts         | Allows the user to add products. It generates a unique ID for each product using the uuid library.
AllResults          | Fetches and displays all results from the backend API.
App                 | The main component of the application. It handles routing and state management.
Result              | Displays the final results of the product shares. It takes a finalDocument prop which contains information about the products and the payers.
Table               | Displays and manipulates the data of a single product. It takes tableData and isCallingToSendBack as props. The tableData prop contains information about the product and its payers.
AdminBoard          | Fetches and displays the admin board content from the backend API.
Profile             | Displays the profile of the current user. It allows the user to view their user board and admin board if they have admin privileges.
UserBoard           | Fetches and displays the user board content from the backend API.

## Services

Service             | Description
--------------------|------------------------------
auth-header.js      | Gets the authentication header for API requests. It retrieves the user's access token from local storage and returns it in an object.
auth.service.js     | Provides functions for user authentication. It includes functions for logging in, logging out, registering a new user, and getting the current user.
user.service.js     | Provides functions for interacting with the user-related endpoints of the backend API. It includes functions for getting the user's board and the admin board.

## Utilities

Utility             | Description
--------------------|------------------------------
TablesSlideShow.js  | Provides functionality for displaying the product tables as a slideshow.
pdf-print.js        | Provides a function to print a table as a PDF.
r-dropdown.js       | Provides a function to toggle the display of a dropdown menu.
scrollFix.js        | Provides a function to observe a container element and automatically scroll it to the left whenever a new child node is added.

## Routing

The application uses React Router for routing. The following routes are defined:

- The root route ("/") which renders the App component.
- The "/results" route which renders the AllResults component.
- The "/login" route which renders the LoginComponent component.
- The "/register" route which renders the RegisterComponent component.
- The "/profile" route which renders the Profile component.

## APIs and Connection

The application interacts with a [BackEnd](#back-end) API for user authentication and data retrieval. The API's base URL is "http://localhost:8080/api/user/" for authentication services and "http://localhost:3001/api/user/" for user services. The application uses fetch to make requests to the API and includes the user's access token in the headers for authenticated endpoints.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install`.
3. Start the application by running `npm start`.

## Contributing

Contributions to the project are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

Please make sure to follow the code formatting guidelines and provide detailed information about your changes in the pull request description.

Feel free to explore the codebase and contribute in any way that adds value to the project.

# Back End 

This project is a Node.js application that provides a RESTful API for managing and calculating shared expenses. The application is designed to handle user authentication, data storage, and complex calculations related to shared expenses. It uses MongoDB as a database and Express.js for handling HTTP requests.

## Installation Instructions

1. Clone the repository to your local machine.
2. Install Node.js and MongoDB if you haven't already.
3. Navigate to the project directory and run `npm install` to install all the necessary dependencies.
4. Set up your MongoDB database and update the `config/db.config.js` file with your database credentials.
5. Run `nodemon` to start the server.

## API

The application provides several endpoints for managing users and shared expenses:

| Endpoint                                         | Method | Description                               |
| ------------------------------------------------ | ------ | ----------------------------------------- |
| `/api/user/register`                             | POST   | User registration                         |
| `/api/user/login`                                | POST   | User login                                |
| `/api/user/signout`                              | POST   | User logout                               |
| `/api/auth/refreshtoken`                         | POST   | Refresh access token                      |
| `/api/data/`                                     | POST   | Create a new shared expense document       |
| `/api/data/:id`                                  | PUT    | Update an existing shared expense document |
| `/api/data/:id`                                  | DELETE | Delete a shared expense document           |
| `/api/documents/`                                | GET    | Get all shared expense documents           |
| `/api/user/results`                              | GET    | Get all shared expense documents for a specific user |

## Configuration

The application's configuration can be found in the `config/` directory. Here you can configure the application's secret key, JWT expiration times, and database connection details.

## API Documentation

The API documentation can be found in the `controllers/` directory. Each controller file corresponds to a specific part of the API and contains detailed comments explaining what each endpoint does.

## Code Examples

The `controllers/` directory contains several examples of how to interact with the MongoDB database using Mongoose, how to handle HTTP requests and responses, and how to perform complex calculations related to shared expenses.

## Troubleshooting

If you encounter any issues while using the application, check the console output for any error messages. These messages can provide valuable information about what went wrong.

## Contributing Guidelines

Contributions are welcome! If you'd like to contribute, please feel free to submit a pull request. If you find a bug or have a feature request, please open an issue.

## License

This project is not lisencesd yet. This means you are free to use, modify, and distribute the code. 

## Changelog

The project's version history can be found in the Git commit history. Each commit message provides a brief description of the changes made.

## Additional Resources

For more information on the technologies used in this project, check out the following resources:

- [Node.js Documentation](https://nodejs.org/documentation/)
- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)
- [MongoDB Documentation](https://docs.mongodb.com/)
