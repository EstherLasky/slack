# Slack

This project uses the Slack WEB API to create an automatic connection list to Slack. It uses Node.js and the `@slack/web-api` package to interact with the Slack API.

## Technologies and Languages Used

* Node.js
* JavaScript
* Docker

## How to Use with Docker

1. Build the Docker image by running the command in the root directory of the project.

    ```bash
    docker build -t <image-name> .
    ```

2. Run the Docker container by running the command.

    ```bash
    docker run --rm <image-name>
    ```

Note: You will need to create a `.env` file in the root directory of the project with the  variables according `.env.example` file.
