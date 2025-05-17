# Task Manager CRUD Application

A full-stack task management application built with Django and React.

## Features

- Create, Read, Update, and Delete tasks
- Modern Material-UI interface
- RESTful API backend
- TypeScript support

## Tech Stack

### Backend

- Django
- Django REST Framework
- SQLite (default database)

### Frontend

- React
- TypeScript
- Material-UI
- Axios for API calls

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd crudapi
   ```

2. Create and activate a virtual environment:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:

   ```bash
   python3 manage.py migrate
   ```

5. Start the development server:
   ```bash
   python3 manage.py runserver
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

- GET /api/tasks/ - List all tasks
- POST /api/tasks/ - Create a new task
- GET /api/tasks/{id}/ - Retrieve a specific task
- PUT /api/tasks/{id}/ - Update a task
- DELETE /api/tasks/{id}/ - Delete a task

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
