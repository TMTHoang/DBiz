# SME–Agency Matching Platform MVP

A full-stack web application that connects Small and Medium Enterprises (SMEs) with marketing agencies through an intelligent recommendation system.

## Technology Stack

- **MERN Stack**
  - **MongoDB** - NoSQL database for storing projects, agencies, and match data
  - **Express.js** - Backend web framework for REST API
  - **React.js** - Frontend library for building user interfaces
  - **Node.js** - JavaScript runtime for server-side execution
- **Docker** - Containerization platform for consistent development and deployment environments

## How to Run

To start the entire application stack (MongoDB, Backend API, and Frontend):

```bash
docker compose up --build
```

The `--build` flag ensures all containers are rebuilt with the latest code changes. For subsequent runs without code changes, you can use:

```bash
docker compose up
```

## Application URLs

Once the containers are running, access the application at:

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **Database**: mongodb://localhost:27017

## Features

- **Smart Recommendations**: AI-powered matching algorithm ranks agencies based on:
  - Service overlap with project requirements
  - Budget compatibility
  - Agency ratings
  - Premium subscription status
  
- **Complete Workflow**: 
  - Browse recommended agencies for your project
  - Filter agencies by location
  - View detailed agency profiles
  - Send connection requests
  - Chat with potential agency partners
  - Confirm matches to finalize partnerships

## Project Structure

```
sme-agency-platform/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic (recommendation engine)
│   │   ├── middleware/     # Error handling middleware
│   │   └── data/           # Database seeding scripts
│   ├── Dockerfile
│   └── package.json
├── frontend/                # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js          # Main app with routing
│   │   └── App.css         # Global styles
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml       # Docker orchestration
└── README.md
```

## Getting Started

### Prerequisites

- Docker Desktop installed and running
- Git (for cloning the repository)

### Initial Setup

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd sme-agency-platform
   ```

2. **Start the application**:
   ```bash
   docker compose up --build
   ```

3. **Seed the database** (in a new terminal while containers are running):
   ```bash
   docker compose exec backend npm run seed
   ```

4. **Access the application**:
   - Open your browser and navigate to http://localhost:3000
   - You should see the mock project profile page
   - Click "Browse Agencies" to start exploring

## Development

The application uses Docker volumes for hot-reloading during development:
- Frontend changes in `frontend/src/` are automatically reflected
- Backend changes in `backend/src/` trigger Nodemon auto-restart

No need to rebuild containers for code changes in the `src` directories!

## Docker Commands Reference

- `docker compose up -d`: Start all services in detached mode.
- `docker compose down`: Stop all services.
- `docker compose down -v`: Stop all services and remove data volumes (resets database).
- `docker compose build [service_name]`: Rebuild a specific service (e.g., `backend`).
- `docker compose logs -f [service_name]`: View live logs for a service.

## MVP Success Criteria

- SME can visit `http://localhost:3000` and see a mock project profile.
- Clicking 'Browse' fetches and displays a ranked list of agencies from the backend.
- The 'Filter by Location' input successfully filters the displayed list.
- Clicking 'View Profile & Connect' loads a new page with that agency's details.
- Clicking 'Send Connection Request' creates a `MatchRequest` in the DB and navigates to the chat page.
- The chat page fetches messages and allows new messages to be sent.
- Clicking 'Confirm Match' successfully calls the match API and updates the project status.
- All services run and communicate *only* within the Docker environment.
