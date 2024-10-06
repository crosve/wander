# Wander

Our project is a cool travel app that helps people discover and share travel experiences in a new way. Using technology from Pinata and IPFS, it lets users create and explore custom travel guides, hidden spots, and local tips without relying on big servers. This means that the travel content stays online forever, can’t be taken down, and is available to everyone around the world. The app is all about real, user-made travel stories.

## Setup and Installation

To set up and run the Wander project locally, follow these steps:

### Prerequisites

Node.js (version 14.x or higher)

npm or yarn (package manager)

MongoDB (for backend database)

Google Maps API key

### Installation Steps

1. Clone the Repository:

   git clone https://github.com/wilsonliu2/wander.git

2. Install Dependencies:

   Install dependencies for both the frontend and backend:

   ```Frontend:

   cd frontend

   npm install

   Backend:

   cd backend

   npm install

   ```

3. Set Up Environment Variables:
   Create a .env file in the root of the backend folder and add the following environment variables:

   SUPABASE_URL=https://bgestvuowbnkkkftqchb.supabase.co/

   SUPABASE_KEY=your_supabase_key_here

   MONGODB_URI=your_mongodb_uri_here

   API_Key=your_api_key_here

   API_Secret=your_api_secret_here

   JWT=your_jwt_token_here

   JWT_TOKEN=your_jwt_token_here

4. Run the Project

   ```Frontend:

   cd frontend

   npm start

   Backend:

   cd backend

   npm start

   ```

5. Access the Application at your local host.
