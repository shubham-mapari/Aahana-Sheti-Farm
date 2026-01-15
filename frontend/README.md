# Farmer Management System

This is a frontend for the Farmer Management System built with React and Firebase.

## Setup

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env` file in the root directory with your Firebase configuration:
    ```
    REACT_APP_FIREBASE_API_KEY=...
    REACT_APP_FIREBASE_AUTH_DOMAIN=...
    REACT_APP_FIREBASE_PROJECT_ID=...
    ...
    ```

3.  **Run Locally:**
    ```bash
    npm start
    ```

## Structure

-   `src/components`: Reusable UI components
-   `src/pages`: Main application pages
-   `src/services`: Firebase service wrappers
-   `src/firebase`: Firebase configuration and core logic
