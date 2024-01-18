# CharityCrowd Backend

Welcome to the backend repository of CharityCrowd, a platform that empowers users to fund projects and make a positive impact. This backend is built using Node.js, GraphQL, MongoDB, and serves as the foundation for the CharityCrowd application.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [GraphQL API](#graphql-api)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Management:**
  - Admin users can view list of all users
  - Admin users can manage user roles.
  - Admin users can access Admin Page
- **Project Management:**
  - Users can add projects.
  - Users can donate to projects.
  - Anonymous donations are supported.
- **Authentication and Authorization:**
  - JWT-based authentication.

## Getting Started

### Prerequisites

- Node.js (version 18)
- npm or yarn
- MongoDB (make sure it's running locally or provide connection details)

### Installation

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/art-abdulwadud/CharityCrowd-Server.git
   cd CharityCrowd-Server
   yarn or npm install
   ```
2. Set up environment variables
3. Run the server:
  ```bash
  yarn start or yarn dev
  ```
### Configuration

Set up your environment variables in a .env file:

```env
PORT = 7000
project_id=""
private_key_id=""
private_key=""
client_email="
client_id=""
auth_uri=""
token_uri=""
auth_provider_x509_cert_url=""
client_x509_cert_url=""
DBNAME = ""
USERNAME = ""
PASSWORD = ""
```
Make sure to replace the placeholder values with your actual configuration.

### Usage

After setting up the backend, you can integrate it with the CharityCrowd frontend to create a seamless user experience. Refer to the frontend repository for more details.

### GraphQL API

The backend exposes a GraphQL API for interacting with various features. Explore the GraphQL schema for available queries and mutations.

### Contributing

I welcome contributions! If you find any issues or have suggestions, please open an issue or submit a pull request.

### License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/art-abdulwadud/charity-server/blob/main/LICENSE) file for details.
