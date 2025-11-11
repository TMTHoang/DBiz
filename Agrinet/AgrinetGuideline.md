# SME–Agency Matching Platform - Product Requirements Document (PRD)

## Project Overview
**Project Name:** SME–Agency Matching Platform
**Technology Stack:** MERN (MongoDB, Express.js, React.js, Node.js)
**Development Environment:** Docker-only
**Target:** MVP workflow for SME project matching (from "Browse" to "Confirm").

## Core Features
- **SMEs:** Browse recommended agencies for a specific project.
- **Recommendation System:** Ranks agencies based on service overlap, budget, rating, and premium status.
- **Connection Flow:** Includes viewing a profile, sending a request, a simple chat, and a final confirmation.

---

## Phase 1: Docker Environment Setup

### Task 1.1: Create Project Structure
- Create the root folder: `sme-agency-platform/`
- Inside `sme-agency-platform/`, create the following directory structure:
  - `docker-compose.yml` (file)
  - `backend/` (folder)
    - `Dockerfile` (file)
    - `package.json` (file)
    - `src/` (folder)
  - `frontend/` (folder)
    - `Dockerfile` (file)
    - `package.json` (file)
    - `src/` (folder)

### Task 1.2: Create Backend `package.json`
- In `backend/package.json`, create a JSON object.
- Set `name` to "backend" and `version` to "1.0.0".
- Set `main` to "src/server.js".
- Add a `scripts` object with two commands:
  - `start`: "node src/server.js"
  - `dev`: "nodemon src/server.js"
- Add a `dependencies` object with:
  - `"express": "^4.18.2"`
  - `"mongoose": "^7.5.0"`
  - `"cors": "^2.8.5"`
  - `"dotenv": "^16.3.1"`
- Add a `devDependencies` object with:
  - `"nodemon": "^3.0.1"`

### Task 1.3: Create Backend `Dockerfile`
- In `backend/Dockerfile`, set the base image to `node:18-alpine`.
- Set the `WORKDIR` to `/app`.
- `COPY` `package*.json` to `./`.
- `RUN` `npm install` to install dependencies.
- `COPY` the rest of the source code ( `.` ) to `.`.
- `EXPOSE` port 5000.
- Set the default `CMD` to `["npm", "run", "dev"]`.

### Task 1.4: Create Frontend `package.json`
- In `frontend/package.json`, create a JSON object.
- Set `name` to "frontend", `version` to "0.1.0", and `private` to true.
- Add a `dependencies` object with:
  - `"react": "^18.2.0"`
  - `"react-dom": "^18.2.0"`
  - `"react-scripts": "5.0.1"`
  - `"axios": "^1.5.0"`
- Add a `scripts` object with:
  - `start`: "react-scripts start"
  - `build`: "react-scripts build"
  - `test`: "react-scripts test"
- Add a basic `eslintConfig` object and a `browserslist` object (can be copied from a standard `create-react-app`).

### Task 1.5: Create Frontend `Dockerfile`
- In `frontend/Dockerfile`, set the base image to `node:18-alpine`.
- Set the `WORKDIR` to `/app`.
- `COPY` `package*.json` to `./`.
- `RUN` `npm install`.
- `COPY` the rest of the source code ( `.` ) to `.`.
- `EXPOSE` port 3000.
- Set the default `CMD` to `["npm", "start"]`.

### Task 1.6: Configure `docker-compose.yml`
- In `docker-compose.yml`, set the `version` to '3.8'.
- Define three top-level `services`: `db`, `backend`, and `frontend`.
- **For the `db` service:**
  - Use `image: mongo:latest`.
  - Set `container_name: mongodb`.
  - Map `ports` "27017:27017".
  - Define a volume `mongo-data:/data/db`.
  - Assign to `networks: ['app-network']`.
- **For the `backend` service:**
  - Set `build: ./backend`.
  - Set `container_name: backend-api`.
  - Map `ports` "5000:5000".
  - Map `volumes`: `./backend/src:/app/src`.
  - Set `depends_on: ['db']`.
  - Assign to `networks: ['app-network']`.
  - Add `environment` variables:
    - `MONGO_URI=mongodb://db:27017/sme-agency-db`
    - `PORT=5000`
- **For the `frontend` service:**
  - Set `build: ./frontend`.
  - Set `container_name: frontend-app`.
  - Map `ports` "3000:3000".
  - Map `volumes`: `./frontend/src:/app/src`.
  - Set `depends_on: ['backend']`.
  - Assign to `networks: ['app-network']`.
- Define a top-level `networks` object `app-network` using the `bridge` driver.
- Define a top-level `volumes` object `mongo-data` using the `local` driver.
## Phase 2: Backend Server & Database Connection

### Task 2.1: Create Basic Express Server
- In `backend/src/`, create a file named `server.js`.
- In `server.js`, import `express`, `cors`, and `dotenv`.
- Call `dotenv.config()` to load environment variables.
- Create an `express` app instance.
- Apply `cors()` and `express.json()` as middleware to the app.
- Create a simple `GET /` test route that responds with a string: "Backend API is running...".
- Set `PORT` from `process.env.PORT` (defaulting to 5000).
- Call `app.listen()` to start the server on `PORT` and log a "Server running" message.

### Task 2.2: Create Database Connection File
- In `backend/src/`, create a new folder `config`.
- Inside `backend/src/config/`, create a file named `db.js`.
- In `db.js`, import `mongoose`.
- Create and export an async function named `connectDB`.
- Inside `connectDB`, use a `try/catch` block.
- In the `try` block, get the `MONGO_URI` from `process.env.MONGO_URI` (which is `mongodb://db:27017/sme-agency-db` from `docker-compose.yml`).
- Call `await mongoose.connect(mongoUri)`.
- Log "MongoDB Connected..." on success.
- In the `catch` block, log the `err.message` and exit the process with failure: `process.exit(1)`.

### Task 2.3: Connect DB to Server
- In `backend/src/server.js`, import the `connectDB` function from `./config/db.js`.
- Call `connectDB()` at the top of the file, immediately after loading `dotenv`.

### Task 2.4: Test Docker Environment
- From the root `sme-agency-platform/` directory, run the following command in your terminal: `docker compose up --build`
- **Success Criteria:** After the containers are running, navigate to `http://localhost:5000/`. You must see the message "Backend API is running...". This confirms the backend, DB, and Docker networking are all working.
- Stop the services by pressing `Ctrl+C` in the terminal or running `docker compose down`.

---

## Phase 3: Data Models

### Task 3.1: Create `models` Directory
- In `backend/src/`, create a new folder named `models`.

### Task 3.2: Create Agency Model
- In `backend/src/models/`, create `Agency.js`.
- Import `mongoose`.
- Create a new `mongoose.Schema` named `AgencySchema`.
- Define the schema fields exactly as specified in the `phase 3, data.docx` file:
  - `user_id` (ObjectId, ref: 'User')
  - `company_name` (String, required)
  - `location_city` (String)
  - `location_country` (String)
  - `offered_services` (Array of String, required)
  - `budget_min` (Number)
  - `budget_max` (Number)
  - `agency_rating` (Number, default 0)
  - `subscription_type` (String, enum: ['basic', 'premium'], default: 'basic')
  - `experience_years` (Number)
  - `team_size` (Number)
  - `awards` (Array of String)
  - `portfolio` (Array of Objects)
- Export the model: `mongoose.model('Agency', AgencySchema)`

### Task 3.3: Create Project Model
- In `backend/src/models/`, create `Project.js`.
- Import `mongoose`.
- Create a new `mongoose.Schema` named `ProjectSchema`.
- Define the schema fields exactly as specified in the `phase 3, data.docx` file:
  - `sme_id` (ObjectId, ref: 'SME')
  - `title` (String, required)
  - `description` (String)
  - `needed_services` (Array of String, required)
  - `budget_min` (Number)
  - `budget_max` (Number)
  - `industry` (String)
  - `location_city` (String)
  - `location_country` (String)
  - `status` (String, enum: ['open', 'matched', 'closed'], default: 'open')
  - `created_at` (Date, default: Date.now)
- Export the model: `mongoose.model('Project', ProjectSchema)`

### Task 3.4: Create MatchScore Model
- In `backend/src/models/`, create `MatchScore.js`.
- Import `mongoose`.
- Create a new `mongoose.Schema` named `MatchScoreSchema`.
- Define the schema fields exactly as specified in the `phase 3, data.docx` file:
  - `project_id` (ObjectId, ref: 'Project')
  - `agency_id` (ObjectId, ref: 'Agency')
  - `service_overlap_score` (Number)
  - `budget_score` (Number)
  - `rating_score` (Number)
  - `premium_boost` (Number)
  - `total_score` (Number)
  - `created_at` (Date, default: Date.now)
- Export the model: `mongoose.model('MatchScore', MatchScoreSchema)`

### Task 3.5: Create MatchRequest Model
- In `backend/src/models/`, create `MatchRequest.js`.
- Import `mongoose`.
- Create a new `mongoose.Schema` named `MatchRequestSchema`.
- Define the schema fields exactly as specified in the `phase 3, data.docx` file:
  - `project_id` (ObjectId, ref: 'Project')
  - `agency_id` (ObjectId, ref: 'Agency')
  - `status` (String, enum: ['pending', 'accepted', 'declined', 'matched'], default: 'pending')
  - `requested_date` (Date, default: Date.now)
  - `response_date` (Date)
  - `score_snapshot` (Number)
  - `initial_message` (String)
- Export the model: `mongoose.model('MatchRequest', MatchRequestSchema)`

### Task 3.6: Create ChatMessage Model
- In `backend/src/models/`, create `ChatMessage.js`.
- Import `mongoose`.
- Create a new `mongoose.Schema` named `ChatMessageSchema`.
- Define the schema fields exactly as specified in the `phase 3, data.docx` file:
  - `request_id` (ObjectId, ref: 'MatchRequest')
  - `sender_role` (String, enum: ['SME', 'Agency'], required)
  - `sender_id` (ObjectId, required)
  - `content` (String, required)
  - `timestamp` (Date, default: Date.now)
  - `is_read` (Boolean, default: false)
- Export the model: `mongoose.model('ChatMessage', ChatMessageSchema)`

### Task 3.7: Create MatchedProject Model
- In `backend/src/models/`, create `MatchedProject.js`.
- Import `mongoose`.
- Create a new `mongoose.Schema` named `MatchedProjectSchema`.
- Define the schema fields exactly as specified in the `phase 3, data.docx` file:
  - `request_id` (ObjectId, ref: 'MatchRequest')
  - `project_id` (ObjectId, ref: 'Project')
  - `agency_id` (ObjectId, ref: 'Agency')
  - `start_date` (Date, default: Date.now)
  - `status` (String, enum: ['active', 'completed', 'terminated'], default: 'active')
- Export the model: `mongoose.model('MatchedProject', MatchedProjectSchema)`
## Phase 3.8: Database Seeding

### Task 3.8.1: Create Seed Script File
- In `backend/src/`, create a new folder `data`.
- In `backend/src/data/`, create a file named `seed.js`.

### Task 3.8.2: Connect Seed Script to DB
- In `seed.js`, import `mongoose`, `dotenv`, `connectDB` (from `../config/db.js`), `Project` (from `../models/Project.js`), and `Agency` (from `../models/Agency.js`).
- Call `dotenv.config({ path: '.env' })` (you may need to adjust the path).
- Call `connectDB()` to connect to the database.

### Task 3.8.3: Create Sample Data Arrays
- In `seed.js`, create an array `sampleServices` with a variety of service names, for example: 'SEO', 'Social Media', 'Content Marketing', 'PPC', 'Web Design', 'E-commerce Dev', 'Brand Strategy', 'Email Marketing'.
- Create an array `sampleLocations` with a few objects, e.g., `{ city: 'New York', country: 'USA' }`, `{ city: 'London', country: 'UK' }`, `{ city: 'Tokyo', country: 'Japan' }`.

### Task 3.8.4: Define 5 Sample Projects
- In `seed.js`, create an array `sampleProjects`.
- Add 5 project objects to this array.
- **Example Project 1 (Tech):** `title: 'New E-commerce Site'`, `needed_services: ['Web Design', 'E-commerce Dev', 'SEO']`, `budget_min: 5000`, `budget_max: 15000`.
- **Example Project 2 (Food):** `title: 'Local Restaurant Social Media'`, `needed_services: ['Social Media', 'Content Marketing']`, `budget_min: 1000`, `budget_max: 3000`.
- **Example Project 3 (Finance):** `title: 'Finance Blog Content'`, `needed_services: ['Content Marketing', 'SEO']`, `budget_min: 2000`, `budget_max: 5000`.
- **Example Project 4 (General):** `title: 'Full Marketing Push Q1'`, `needed_services: ['PPC', 'Email Marketing', 'Brand Strategy']`, `budget_min: 10000`, `budget_max: 25000`.
- **Example Project 5 (Specific):** `title: 'PPC Campaign for Gadgets'`, `needed_services: ['PPC', 'SEO']`, `budget_min: 3000`, `budget_max: 7000`.

### Task 3.8.5: Define 20 Sample Agencies
- In `seed.js`, create an array `sampleAgencies`.
- Add 20 agency objects to this array, ensuring they overlap with the projects.
- **Example Agency (Good Match for P1):** `company_name: 'Web Wizards'`, `location: 'New York'`, `offered_services: ['Web Design', 'E-commerce Dev', 'SEO', 'Social Media']`, `budget_min: 4000`, `budget_max: 20000`, `agency_rating: 4.8`, `subscription_type: 'premium'`.
- **Example Agency (Good Match for P2):** `company_name: 'Social Eats'`, `location: 'London'`, `offered_services: ['Social Media', 'Content Marketing', 'Brand Strategy']`, `budget_min: 1000`, `budget_max: 5000`, `agency_rating: 4.5`, `subscription_type: 'basic'`.
- **Example Agency (Partial Match for P3):** `company_name: 'SEO Kings'`, `location: 'Tokyo'`, `offered_services: ['SEO', 'PPC']`, `budget_min: 3000`, `budget_max: 10000`, `agency_rating: 4.2`, `subscription_type: 'basic'`.
- **Example Agency (Premium, Broad):** `company_name: 'Full Stack Marketing'`, `location: 'New York'`, `offered_services: ['PPC', 'Email Marketing', 'Brand Strategy', 'SEO', 'Content Marketing']`, `budget_min: 8000`, `budget_max: 30000`, `agency_rating: 4.9`, `subscription_type: 'premium'`.
- **Example Agency (Budget Mismatch):** `company_name: 'High-End Branding'`, `location: 'London'`, `offered_services: ['Brand Strategy', 'Web Design']`, `budget_min: 30000`, `budget_max: 100000`, `agency_rating: 5.0`, `subscription_type: 'basic'`.
- **Command:** Create 15 more similar agencies, varying their `offered_services`, `budgets`, `ratings`, and `locations` to create a good mix for the recommendation engine.

### Task 3.8.6: Create Import/Destroy Functions
- In `seed.js`, create an async function `importData`.
- Inside `importData`, use a `try/catch` block.
- In `try`, call `await Project.deleteMany()` and `await Agency.deleteMany()` to clear old data.
- Then, call `await Project.insertMany(sampleProjects)` and `await Agency.insertMany(sampleAgencies)`.
- Log "Data Imported!" and call `process.exit()`.
- In `catch`, log the error and call `process.exit(1)`.
- Create a similar `destroyData` function that only calls `deleteMany()` and then exits.

### Task 3.8.7: Add Seed Script to `package.json`
- In `backend/package.json`, modify the `scripts` object.
- Add a new script: `"seed": "node src/data/seed.js"`.
- Add a new script: `"seed:destroy": "node src/data/seed.js --destroy"`.
- Modify `seed.js` to check for `process.argv[2] === '--destroy'`. If true, call `destroyData()`, otherwise call `importData()`.

### Task 3.8.8: Run the Seed Script
- **Instruction:** To populate your database, first ensure your Docker services are running: `docker compose up`.
- Once the backend container is running, open a **new terminal** and execute the following command:
  ```bash
  docker compose exec backend npm run seed
---

## Phase 4: Backend - Recommendation Engine

### Task 4.1: Create Recommendation Service
- In `backend/src/`, create a new folder `services`.
- Inside `backend/src/services/`, create `recommendationService.js`.
- In this file, create and export a function `calculateTotalScore(project, agency)`.
- Inside `calculateTotalScore`, implement the scoring logic:
  - Create a helper `calculateServiceOverlap(projectServices, agencyServices)`: Returns a score based on matching services.
  - Create a helper `calculateBudgetScore(projectBudget, agencyBudget)`: Returns a score based on budget compatibility.
  - Create a helper `getRatingScore(agencyRating)`: Returns the agency's rating.
  - Create a helper `getPremiumBoost(subscriptionType)`: Returns a score boost if `subscriptionType === 'premium'`.
- The `calculateTotalScore` function should call these helpers and return an object containing `service_overlap_score`, `budget_score`, `rating_score`, `premium_boost`, and `total_score`.

### Task 4.2: Create Recommendation API Route
- In `backend/src/`, create a new folder `routes`.
- Inside `backend/src/routes/`, create `recommendRoutes.js`.
- In this file, import `express`, `express.Router()`, `Project`, `Agency`, `MatchScore`, and `calculateTotalScore`.
- Define an async `GET /:projectId` route.
- Inside the route:
  1. Find the `Project` by `req.params.projectId`. Return 404 if not found.
  2. Fetch all `Agency` documents.
  3. Create an empty `recommendations` array.
  4. Loop through each `agency`.
  5. Call `calculateTotalScore(project, agency)` to get the `scores`.
  6. (Optional step for logging): Create and `save` a new `MatchScore` document with the `project_id`, `agency_id`, and `scores`.
  7. Push an object `{ agency, scores }` to the `recommendations` array.
- After the loop, sort the `recommendations` array by `scores.total_score` in descending order.
- Send the sorted `recommendations` array as a JSON response.
- Export the router.

### Task 4.3: Add Route to `server.js`
- In `backend/src/server.js`, import the recommendation route: `require('./routes/recommendRoutes')`.
- Add the route to the app as middleware: `app.use('/api/recommend', recommendRoutes)`. (Make sure to assign the import to a variable like `recommendRoutes`).

---

## Phase 5: Backend - Profile & Connection Request API

### Task 5.1: Create Agency API Route
- In `backend/src/routes/`, create `agencyRoutes.js`.
- Import `express`, `express.Router()`, and `Agency`.
- Define an async `GET /:id` route.
- Inside the route, find the `Agency` by `req.params.id`.
- If not found, return 404.
- If found, send the `agency` object as a JSON response.
- Export the router.
- In `backend/src/server.js`, import and `app.use('/api/agencies', ...)` this new route file.

### Task 5.2: Create Connection Request Route
- In `backend/src/routes/`, create `requestRoutes.js`.
- Import `express`, `express.Router()`, and `MatchRequest`.
- Define an async `POST /` route.
- Inside the route:
  1. Get `projectId`, `agencyId`, `initialMessage`, and `scoreSnapshot` from `req.body`.
  2. Check if a `MatchRequest` for this `projectId` and `agencyId` already exists. If so, return a 400 error.
  3. Create a new `MatchRequest` with the data from the body and `status: 'pending'`.
  4. `save()` the new request.
  5. Send the new `request` object as a JSON response.
- Define an async `GET /` route.
- Inside this route, check for `req.query.projectId` or `req.query.agencyId` to build a filter query.
- Find all `MatchRequest` documents matching the query.
- Use `.populate('project_id').populate('agency_id')` to attach project and agency details.
- Send the list of requests as a JSON response.
- Export the router.
- In `backend/src/server.js`, import and `app.use('/api/requests', ...)` this new route file.

---

## Phase 6: Backend - Chat & Confirmation API

### Task 6.1: Create Chat API Route
- In `backend/src/routes/`, create `chatRoutes.js`.
- Import `express`, `express.Router()`, and `ChatMessage`.
- Define an async `POST /` route.
- Inside the route, get `requestId`, `senderRole`, `senderId`, and `content` from `req.body`.
- Create and `save()` a new `ChatMessage` with this data.
- Send the newly created message object as a JSON response.
- Define an async `GET /:requestId` route.
- Inside this route, `find()` all `ChatMessage` documents where `request_id` matches `req.params.requestId`.
- Use `.sort({ timestamp: 1 })` to get messages in chronological order.
- Send the array of messages as a JSON response.
- Export the router.
- In `backend/src/server.js`, import and `app.use('/api/chat', ...)` this new route file.

### Task 6.2: Create Match Confirmation Route
- In `backend/src/routes/`, create `matchRoutes.js`.
- Import `express`, `express.Router()`, `MatchRequest`, `MatchedProject`, and `Project`.
- Define an async `POST /confirm/:requestId` route.
- Inside the route:
  1. Find the `MatchRequest` by `req.params.requestId`. Return 404 if not found.
  2. Update the `MatchRequest` status to `'matched'` and `save()` it.
  3. Find the associated `Project` by `request.project_id` and update its status to `'matched'`.
  4. Create and `save()` a new `MatchedProject` document, linking the `request_id`, `project_id`, and `agency_id`.
  5. Send the new `MatchedProject` object as a JSON response.
- Export the router.
- In `backend/src/server.js`, import and `app.T_use('/api/match', ...)` this new route file.

## Phase 7: Frontend - Basic Setup & Routing

### Task 7.1: Install React Router
- In `frontend/package.json`, add `"react-router-dom": "^6.15.0"` to the `dependencies` object.
- **Note to user:** You must rebuild the frontend container to install this. Run `docker compose build frontend`.

### Task 7.2: Create Component Structure
- In `frontend/src/`, create a new folder named `components`.
- In `frontend/src/components/`, create the following empty component files:
  - `ProjectProfile.js`
  - `RecommendationList.js`
  - `AgencyProfile.js`
  - `ChatView.js`

### Task 7.3: Clean Up `App.js`
- In `frontend/src/App.js`, remove the default React logo and boilerplate code.
- Import `BrowserRouter`, `Route`, and `Routes` from `react-router-dom`.
- Import the four components created in the previous task.
- Inside the `App` function, return a `Router` component.
- Inside the `Router`, add a simple header (`<h1>SME-Agency Platform</h1>`) and a `main` element.
- Inside `main`, set up `Routes` to handle the application's pages.

### Task 7.4: Implement Basic Routing
- In `frontend/src/App.js`, define the following routes inside the `Routes` component:
  - `path="/"`: Renders the `ProjectProfile` component.
  - `path="/recommend/:projectId"`: Renders the `RecommendationList` component.
  - `path="/agency/:agencyId"`: Renders the `AgencyProfile` component.
  - `path="/chat/:requestId"`: Renders the `ChatView` component.

---

## Phase 8: Frontend - Project Profile (Mock)

### Task 8.1: Create `ProjectProfile` Component
- In `frontend/src/components/ProjectProfile.js`, import `React` and `useNavigate` from `react-router-dom`.
- Create a mock project ID as a constant (e.g., `MOCK_PROJECT_ID = '60d0fe4f5311236168a109cb'`).
- In the component, render mock project details (e.g., a title, description, and budget).
- Get the `Maps` function from `useNavigate`.
- Add a button with the text "Browse Agencies".
- Create an `onClick` handler for the button that calls `Maps` to `/recommend/${MOCK_PROJECT_ID}`.

### Task 8.2: Test the "Browse" Button
- Run the environment: `docker compose up`
- Go to `http://localhost:3000/`.
- **Success Criteria:** You must see the mock project details and the "Browse Agencies" button. Clicking this button must navigate you to `http://localhost:3000/recommend/60d0fe4f5311236168a109cb`.

---

## Phase 9: Frontend - Recommendation List & Filter

### Task 9.1: Fetch Recommendations
- In `frontend/src/components/RecommendationList.js`, import `React`, `useState`, `useEffect`, `useParams`, and `useNavigate`.
- Import `axios` from `axios`.
- Get `projectId` from `useParams`.
- Get the `Maps` function from `useNavigate`.
- Create a `recommendations` state (defaulting to `[]`) and a `loading` state (defaulting to `true`).
- In a `useEffect` hook, create an async function `fetchRecs` that:
  - Calls `axios.get('http://localhost:5000/api/recommend/${projectId}')`.
  - Sets the `recommendations` state with `res.data`.
  - Sets `loading` to `false`.
  - Catches and logs any errors.
- Call `fetchRecs` when the component mounts.

### Task 9.2: Render Recommendation List
- In `RecommendationList.js`, add a render check: if `loading` is true, show a "Loading..." message.
- If loading is false, `map` over the `recommendations` array.
- For each `rec` (which is `{ agency, scores }`), render a `div` with:
  - `agency.company_name`
  - `agency.location_city`
  - `agency.agency_rating`
  - `scores.total_score`
- Add a "View Profile & Connect" button to each item.
- Add an `onClick` handler to this button that calls `Maps` to `/agency/${agency._id}`.

### Task 9.3: Add Location Filter
- In `RecommendationList.js`, create a `locationFilter` state (defaulting to `''`).
- Add an `<input>` field for "Filter by Location (City)" that updates the `locationFilter` state `onChange`.
- Create a new array `filteredRecs` by using `.filter()` on the `recommendations` state.
- The filter logic should be: `rec.agency.location_city.toLowerCase().includes(locationFilter.toLowerCase())`.
- Update the render logic to `map` over `filteredRecs` instead of `recommendations`.

---

## Phase 10: Frontend - Agency Profile & Connection

### Task 10.1: Fetch Agency Profile
- In `frontend/src/components/AgencyProfile.js`, import `React`, `useState`, `useEffect`, `useParams`, and `useNavigate`.
- Import `axios`.
- Get `agencyId` from `useParams`.
- Get `Maps` from `useNavigate`.
- Create an `agency` state (defaulting to `null`) and a `loading` state (defaulting to `true`).
- In a `useEffect` hook, create an async function to fetch `http://localhost:5000/api/agencies/${agencyId}`.
- On success, set the `agency` state with `res.data` and set `loading` to `false`.
- If `loading`, render "Loading...". If `!agency`, render "Agency not found."

### Task 10.2: Render Agency Profile
- If the `agency` data exists, render its details:
  - `agency.company_name`
  - `agency.location_city`, `agency.location_country`
  - `agency.team_size`, `agency.experience_years`
  - `agency.agency_rating`
  - A list of `agency.offered_services` (use `.join(', ')`).

### Task 10.3: Add "Send Request" Button
- In `AgencyProfile.js`, add a button with text "Send Connection Request".
- Create an async `handleConnect` function for the button's `onClick`.
- Inside `handleConnect`:
  - Create a mock `projectId` (use the same one from Phase 8).
  - Define a `body` object with `projectId` and `agencyId`.
  - `try` to `await axios.post('http://localhost:5000/api/requests', body)`.
  - On success (`res.data` will be the new request object), navigate to `/chat/${res.data._id}`.
  - `catch` and log/alert any errors.

---

## Phase 11: Frontend - Chat & Confirmation

### Task 11.1: Fetch Chat Messages
- In `frontend/src/components/ChatView.js`, import `React`, `useState`, `useEffect`, `useParams`, and `useNavigate`.
- Import `axios`.
- Get `requestId` from `useParams` and `Maps` from `useNavigate`.
- Create a `messages` state (defaulting to `[]`) and a `newMessage` state (defaulting to `''`).
- Create an async function `fetchMessages` to `axios.get('http://localhost:5000/api/chat/${requestId}')`.
- In a `useEffect`, call `fetchMessages` on mount.
- Render the `messages` array by mapping over it. For each `msg`, show `msg.sender_role` and `msg.content`.

### Task 11.2: Add Send Message Form
- In `ChatView.js`, add a `<form>` with an `onSubmit` handler named `handleSubmit`.
- The form should contain an `<input>` field for the new message.
- The input's `value` should be `newMessage` and `onChange` should update the `newMessage` state.
- In the `handleSubmit` function:
  - Prevent default form submission.
  - Create a `body` object with `requestId`, `content: newMessage`, and mock sender info (e.g., `senderRole: 'SME'`, `senderId: 'mockSmeId'`).
  - `await axios.post('http://localhost:5000/api/chat', body)`.
  - On success, add the `res.data` (new message) to the `messages` state array.
  - Clear the `newMessage` state.

### Task 11.3: Add "Confirm Match" Button
- In `ChatView.js`, add a button with text "Confirm Match".
- Create an async `handleConfirm` function for the button's `onClick`.
- Inside `handleConfirm`:
  - Add a `window.confirm()` check: "Are you sure you want to confirm this match?".
  - If the user confirms:
    - `try` to `await axios.post('http://localhost:5000/api/match/confirm/${requestId}')`.
    - On success, `alert('Match Confirmed!')`.
    - Navigate the user back to the home page (`Maps('/')`).
    - `catch` and log/alert any errors.

## Phase 12: Backend - Error Handling

### Task 12.1: Create Error Middleware
- In `backend/src/`, create a new folder `middleware`.
- In `backend/src/middleware/`, create a file `errorMiddleware.js`.
- In `errorMiddleware.js`, create and export a `notFound` middleware function:
  - It should respond with a 404 status and an error message `Not Found - ${req.originalUrl}`.
- In `errorMiddleware.js`, create and export an `errorHandler` middleware function (must take `err, req, res, next`):
  - It should determine the `statusCode` (use `res.statusCode` if not 200, otherwise 500).
  - It should send a JSON response with `message: err.message` and `stack: err.stack` (only show stack if `process.env.NODE_ENV !== 'production'`).

### Task 12.2: Implement Error Middleware in `server.js`
- In `backend/src/server.js`, import `notFound` and `errorHandler` from `./middleware/errorMiddleware.js`.
- After all API routes (e.g., `app.use('/api/match', ...)`), add the `notFound` middleware: `app.use(notFound)`.
- As the very last middleware, add the `errorHandler`: `app.use(errorHandler)`.

### Task 12.3: Add Async Error Handling
- To handle errors in async routes, we need `express-async-handler`.
- In `backend/package.json`, add `"express-async-handler": "^1.2.0"` to the `dependencies`.
- **Note to user:** You will need to rebuild the backend container. Run `docker compose build backend`.
- In `backend/src/routes/recommendRoutes.js`, import `asyncHandler` from `express-async-handler`.
- Wrap the entire callback for the `GET /:projectId` route with `asyncHandler(async (req, res) => { ... })`.
- Repeat this for all async route callbacks in `agencyRoutes.js`, `requestRoutes.js`, `chatRoutes.js`, and `matchRoutes.js`.

---

## Phase 13: Frontend - Polish & Cleanup

### Task 13.1: Add Loading Indicators
- In `frontend/src/components/RecommendationList.js`:
  - Before the `useEffect` call, add a `loading` state (default `true`).
  - Set `loading` to `false` in both the `try` and `catch` blocks of `fetchRecs`.
  - In the return statement, add a check: `if (loading) { return <p>Finding the best agencies for you...</p>; }`.
- In `frontend/src/components/AgencyProfile.js`:
  - Add a `loading` state (default `true`) and set it to `false` in `try` and `catch`.
  - Add a check: `if (loading) { return <p>Loading agency profile...</p>; }`.
- In `frontend/src/components/ChatView.js`:
  - Add a `loading` state (default `true`) for `fetchMessages` and set it to `false` in `try` and `catch`.
  - Add a check: `if (loading) { return <p>Loading chat...</p>; }`.

### Task 13.2: Add Basic Styling
- In `frontend/src/`, create a new file `App.css`.
- In `frontend/src/App.js`, import `./App.css`.
- In `App.css`, add simple, clean styles for:
  - `body`: Set `font-family` and a light `background-color`.
  - `.App`: Set `max-width`, `margin`, `padding`, and `background-color: #fff`.
  - `button`: Add padding, border-radius, and a `cursor`.
  - `input[type="text"]`: Add padding and border.
  - Create a simple class for agency cards (e.g., `.agency-card`) with a `border` and `margin`.
- In `RecommendationList.js`, apply the `.agency-card` class to the `div` for each agency.

---

## Phase 14: Documentation & Final Testing

### Task 14.1: Create `README.md`
- In the root `sme-agency-platform/` folder, create a `README.md` file.
- In `README.md`, add a heading: `# SME–Agency Matching Platform MVP`.
- Add a section "Technology Stack" and list "MERN (MongoDB, Express, React, Node)", "Docker".
- Add a section "How to Run".
- Add a code block for `bash` with the command `docker compose up --build`.
- Add a list of "Application URLs":
  - `Frontend: http://localhost:3000`
  - `Backend: http://localhost:5000`
  - `Database: mongodb://localhost:27017`

### Task 14.2: Add Docker Commands Reference
- In `README.md`, add a new section: `## Docker Commands Reference`.
- Add command: `docker compose up -d`: "Start all services in detached mode."
- Add command: `docker compose down`: "Stop all services."
- Add command: `docker compose down -v`: "Stop all services and remove data volumes (resets database)."
- Add command: `docker compose build [service_name]`: "Rebuild a specific service (e.g., `backend`)."
- Add command: `docker compose logs -f [service_name]`: "View live logs for a service."

### Task 14.3: Final MVP Success Criteria
- In `README.md`, add a final section: `## MVP Success Criteria`.
- Add a list item: "SME can visit `http://localhost:3000` and see a mock project profile."
- Add a list item: "Clicking 'Browse' fetches and displays a ranked list of agencies from the backend."
- Add a list item: "The 'Filter by Location' input successfully filters the displayed list."
- Add a list item: "Clicking 'View Profile & Connect' loads a new page with that agency's details."
- Add a list item: "Clicking 'Send Connection Request' creates a `MatchRequest` in the DB and navigates to the chat page."
- Add a list item: "The chat page fetches messages and allows new messages to be sent."
- Add a list item: "Clicking 'Confirm Match' successfully calls the match API and updates the project status."
- Add a list item: "All services run and communicate *only* within the Docker environment."