# 🎵 FinacPlus Microfrontend Assignment

This project demonstrates a working Microfrontend architecture using React and Webpack 5 Module Federation, with role-based authentication and Tailwind styling.

---

## 🖥️ Apps

- `main-app`: The **host app** with authentication (admin/user) and routing.
- `music-library`: The **remote microfrontend** exposed via Module Federation.

---

## 🚀 How to Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/rishi-bathija/finacplus-assignment.git
   cd finacplus-assignment
   ```
2. **Start music-library (Remote App)**
   ```bash
   cd music-library
   npm install
   npm start
   ```
   This runs the remote microfrontend on [http://localhost:3001](http://localhost:3001)

3. **Start main-app (Host App)**
   ```bash
   cd ../main-app
   npm install
   npm start
   ```
   This runs the host application on [http://localhost:3000](http://localhost:3000)

---

## 🌐 How It Was Deployed

Both apps are deployed separately using Vercel as two projects from the same monorepo:

| App         | URL                                                      |
|-------------|----------------------------------------------------------|
| Main App    | https://main-app-teal.vercel.app/                        |
| Music Library (remote) | https://music-library-drab-tau.vercel.app/    |

In `main-app/webpack.config.js`, the remote is referenced like this:
```js
remotes: {
  musicApp: "musicApp@https://music-library-drab-tau.vercel.app/remoteEntry.js"
}
```
**Note:** Deploy `music-library` first, then `main-app`.

---

## 🔐 Credentials for Demo

| Role  | Username | Password  |
|-------|----------|-----------|
| Admin | admin    | admin123  |
| User  | user     | user123   |

These credentials are stored and decoded from localStorage (in-memory JWT style).

---

## 🧠 Explanation: Micro Frontend & Role-Based Auth

- **Micro Frontend:**
  - `music-library` exposes the `MusicLibrary` component via `remoteEntry.js` using Webpack Module Federation.
  - `main-app` loads this remote component at runtime and renders it as part of its UI.
- **Role-Based Authentication:**
  - Auth is handled in `main-app` using a simple login form.
  - On login, a base64-encoded token (JWT-style) is stored in localStorage, containing the username and role.
  - The role is extracted from the token and passed as a prop to the remote `MusicLibrary` component.
  - The microfrontend uses this prop to conditionally render admin-only features (Add/Delete buttons).

---
