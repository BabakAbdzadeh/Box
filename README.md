# Back End side of the Project Overview

This project is a Node.js application that provides a RESTful API for managing and calculating shared expenses. The application is designed to handle user authentication, data storage, and complex calculations related to shared expenses. It uses MongoDB as a database and Express.js for handling HTTP requests.

## Installation Instructions

1. Clone the repository to your local machine.
2. Install Node.js and MongoDB if you haven't already.
3. Navigate to the project directory and run `npm install` to install all the necessary dependencies.
4. Set up your MongoDB database and update the `config/db.config.js` file with your database credentials.
5. Run `nodemon` to start the server.

## Usage Guide

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
