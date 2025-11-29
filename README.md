# Gitbusted-Pub: GitHub Plagiarism Checker

## Overview

**Gitbusted-Pub** is a full-stack application designed to detect potential plagiarism in GitHub repositories. It leverages a machine learning model, specifically a TF-IDF vectorizer and a trained model (likely a classifier), to analyze code and identify similarities with existing codebases.

The project is structured as a two-part application:
1.  **Backend:** A Python-based API built with **FastAPI** that hosts the machine learning model for plagiarism detection.
2.  **Frontend:** A modern web interface built with **React** and **Vite** for user interaction.

## Features

*   **Machine Learning Powered:** Utilizes a pre-trained model (`model.pkl`) and TF-IDF vectorizer (`tfidf_vectorizer.pkl`) for similarity analysis.
*   **FastAPI Backend:** Provides a robust and fast API endpoint for plagiarism checks.
*   **Modern Frontend:** A responsive and interactive user interface built with React and Vite.
*   **Modular Setup:** Clear separation between the backend and frontend components.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following software installed on your system:

*   **Git**
*   **Python 3.x** (with `pip` or `pip3`)
*   **Node.js** (with `npm` or `yarn`)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/GitBusted/Gitbusted-Pub.git
    cd Gitbusted-Pub
    ```

2.  **Navigate to the project root:**

    ```bash
    cd Gitbusted-Pub
    ```

## Setup and Running the Application

The application requires both the backend and the frontend to be running simultaneously.

### 1. Backend Setup (FastAPI)

The backend handles the core logic and machine learning model.

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Install Python dependencies:**

    ```bash
    pip install -r requirements.txt
    # or use pip3 if necessary
    # pip3 install -r requirements.txt
    ```

3.  **Run the FastAPI server:**

    The server will typically run on `http://127.0.0.1:8000`.

    ```bash
    uvicorn fast:app --reload
    ```

### 2. Frontend Setup (React/Vite)

The frontend provides the user interface to interact with the backend.

1.  **Navigate to the frontend directory:**

    ```bash
    cd ../git-busted
    ```

2.  **Install Node.js dependencies:**

    ```bash
    npm install
    # or yarn install
    ```

3.  **Run the development server:**

    The frontend will typically run on `http://127.0.0.1:5173` (or a similar port).

    ```bash
    npm run dev
    ```

Once both servers are running, open your browser to the frontend address (e.g., `http://127.0.0.1:5173`) to use the application.

## Project Structure

The repository is organized into two main directories:

```
Gitbusted-Pub/
├── backend/
│   ├── fast.py               # FastAPI application entry point
│   ├── requirements.txt      # Python dependencies
│   ├── model.pkl             # Pre-trained ML model
│   ├── tfidf_vectorizer.pkl  # Pre-trained TF-IDF vectorizer
│   └── ...
└── git-busted/
    ├── src/                  # React source code
    ├── public/               # Static assets
    ├── package.json          # Node.js dependencies
    └── ...
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

## License

This project is licensed under the MIT License - see the repository for details.
