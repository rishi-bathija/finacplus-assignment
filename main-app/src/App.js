import React, { lazy, Suspense, useState } from "react";
import { getUserFromToken } from "./auth/auth";
import Login from "./Login";

const MusicLibrary = lazy(() => import("musicApp/MusicLibrary"));

const App = () => {
    const [user, setUser] = useState(getUserFromToken());

    if (!user) return <Login onLogin={() => setUser(getUserFromToken())} />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <header
                className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xl font-bold shadow-lg mb-10 rounded-b-2xl flex items-center justify-between"
            >
                <span>
                    Welcome, {user.username} <span className="text-blue-200 font-normal">({user.role})</span>
                </span>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                    }}
                    className="bg-white text-blue-700 border-none rounded-lg px-5 py-2 font-semibold shadow hover:bg-blue-100 transition"
                >
                    Logout
                </button>
            </header>
            <main className="flex justify-center items-start">
                <div className="w-full max-w-2xl">
                    <Suspense fallback={<div className="text-center text-blue-600">Loading Music Library...</div>}>
                        <MusicLibrary role={user.role} />
                    </Suspense>
                </div>
            </main>
        </div>
    )
};

export default App;
