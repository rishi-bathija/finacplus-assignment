# 🎵 FinacPlus Microfrontend Assignment

This project demonstrates a working Microfrontend architecture using React and Webpack 5 Module Federation, with role-based authentication and Tailwind styling.

---

## 🖥️ Apps

- `main-app`: The **host app** with authentication (admin/user) and routing.
- `music-library`: The **remote microfrontend** exposed via Module Federation.

---

## ✅ How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/rishi-bathija/finacplus-assignment.git
cd finacplus-assignment

2. Start music-library (Remote App)

cd music-library
npm install
npm start

    This runs the remote microfrontend on http://localhost:3001

3. Start main-app (Host App)

cd ../main-app
npm install
npm start

    This runs the host application on http://localhost:3000

🔐 Demo Credentials
Role	Username	Password
Admin	admin	admin123
User	user	user123

    These credentials are stored and decoded from localStorage (in-memory JWT style).

✨ Features
🎯 Microfrontend Setup

    Remote app (music-library) exposes MusicLibrary component via Webpack Module Federation

    Host app (main-app) dynamically loads the remote at runtime

🎵 Music Library UI

    Search by title, artist, or album

    Sort dropdown (Title, Artist, Album)

    Group by Album using .reduce() with accordion toggles

    Admin-only Add/Delete buttons (UI control based on role)

    Fully responsive and styled using Tailwind CSS

🧩 Role-Based Access

    Simple login form in host app

    Stores a base64-encoded JWT-style token in localStorage

    Parses and extracts role from token

    UI controls are rendered based on role (admin or user)

🛠 How It Was Deployed (Vercel)

Both apps are deployed separately using Vercel as two projects from the same monorepo:
🔗 Live Links
App	URL
Main App	https://main-app-teal.vercel.app/
Music Library (remote)	https://music-library-drab-tau.vercel.app/

In main-app/webpack.config.js, the remote is referenced like this:

remotes: {
  musicApp: "musicApp@https://music-library-drab-tau.vercel.app/remoteEntry.js"
}

    ⚠️ Ensure music-library is deployed before deploying main-app.

🧠 How Microfrontend & Role Auth Work

    music-library exposes MusicLibrary via remoteEntry.js

    main-app loads it with Webpack Module Federation

    Auth is handled completely in main-app using localStorage and a simple JWT pattern

    The role is passed as a prop to MusicLibrary

    The microfrontend uses that prop to conditionally render Add/Delete buttons