> I'm **Saiyam Jain** from the **Mechanical Engineering** Department of **IIT (BHU) Varanasi**

# Chit-Chat - Real-Time Chat, Voice, and Video Calling Platform

Chit-Chat is a real-time chatting platform with voice and video calling features, built using React.js and Vite. This README will guide you through the project, its dependencies, and how to set it up locally.

## Dependencies

Chit-Chat relies on several packages to provide its functionality. Here's a list of the packages used in this project:

- `@emoji-mart/data`: Provides emoji data for the chat.
- `@emoji-mart/react`: Allows users to select emojis for messages.
- `@emotion/cache`, `@emotion/react`, `@emotion/styled`: Used for managing styles in the project.
- `@hookform/resolvers`: Provides form resolvers for React Hook Form.
- `@iconify/react`: Used for displaying icons in the application.
- `@mui/lab`, `@mui/material`: Material-UI components for the user interface.
- `@reduxjs/toolkit`, `redux`, `redux-persist`: For state management and persistence.
- `axios`: Handles HTTP requests in the project.
- `emoji-mart`: An emoji picker component.
- `framer-motion`: Used for animations.
- `phosphor-react`: Provides a set of icons.
- `react`, `react-dom`: The core React libraries.
- `react-helmet-async`: Manages document head tags.
- `react-hook-form`: A library for form validation.
- `react-lazy-load-image-component`: Used for lazy-loading images.
- `react-redux`: Provides Redux bindings for React.
- `react-router-dom`: Handles routing in the application.
- `react-scripts`: Configuration and scripts for React development.
- `socket.io-client`: Enables real-time communication via WebSocket.
- `web-vitals`: Monitors the web application's performance.
- `yup`: A schema validation library.
- `zego-express-engine-webrtc`: A library for real-time communication and video calling.

## Setup and Run Locally

To run Chit-Chat locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/SaiRev0/Chit-Chat-Frontend.git
   cd Chit-Chat
   ```

2. Create a `.env` file and add your Backend URL, Zegocloud APPID and SERVER SECRET:

   ```env
   VITE_appID=your_app_id
   VITE_server =your_server_secret
   VITE_Backend=backend_url
   ```

3. Install the project dependencies using npm or pnpm:
   `npm install`
   or
   `pnpm install`
   <br/>

4. Start the Vite development server:
   `npm run dev`
   or
   `pnpm run dev`
   <br/>

**Make sure to start your backend server before starting the frontend server**

---

> That's it! You can now access Chit-Chat in your web browser at the specified address and enjoy real-time chatting, voice, and video calling features.
