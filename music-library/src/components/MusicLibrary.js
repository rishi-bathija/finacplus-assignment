import React, { useState, useMemo } from "react";

const defaultSongs = [
    { title: "Numb", artist: "Linkin Park", album: "Meteora" },
    { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
    { title: "Photograph", artist: "Ed Sheeran", album: "x" },
];

const MusicLibrary = ({ role }) => {
    const isAdmin = role === "admin";

    const [songs, setSongs] = useState(defaultSongs);
    const [filter, setFilter] = useState("");
    const [sortBy, setSortBy] = useState("title");

    const filteredSongs = useMemo(() => {
        return songs
            .filter(
                (song) =>
                    song.title.toLowerCase().includes(filter.toLowerCase()) ||
                    song.artist.toLowerCase().includes(filter.toLowerCase()) ||
                    song.album.toLowerCase().includes(filter.toLowerCase())
            )
            .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    }, [songs, filter, sortBy]);

    const addSong = () => {
        const title = prompt("Enter title");
        const artist = prompt("Enter artist");
        const album = prompt("Enter album");
        if (title && artist && album)
            setSongs([...songs, { title, artist, album }]);
    };

    const deleteSong = (title) => {
        setSongs(songs.filter((s) => s.title !== title));
    };

    return (
        <div
            className="p-8 bg-white rounded-2xl shadow-2xl min-h-[420px] max-w-2xl mx-auto"
        >
            <h2 className="text-3xl font-extrabold mb-6 text-blue-700 flex items-center gap-3">
                <span role="img" aria-label="music">🎵</span> Music Library
            </h2>

            <div className="flex flex-wrap items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search songs, artists, albums..."
                    className="p-3 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition min-w-[180px] flex-1"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-3 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                    <option value="title">Sort by Title</option>
                    <option value="artist">Sort by Artist</option>
                    <option value="album">Sort by Album</option>
                </select>

                {isAdmin && (
                    <button
                        className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition"
                        onClick={addSong}
                    >
                        ➕ Add Song
                    </button>
                )}
            </div>

            <ul className="space-y-4 mt-4">
                {filteredSongs.length === 0 && (
                    <li className="text-gray-400 italic text-center">No songs found.</li>
                )}
                {filteredSongs.map((song, index) => (
                    <li
                        key={index}
                        className="p-4 border border-blue-100 rounded-xl flex justify-between items-center bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition shadow"
                    >
                        <span>
                            <strong className="text-blue-900">{song.title}</strong>
                            <span className="text-gray-700"> – {song.artist}</span>
                            <span className="text-gray-500"> ({song.album})</span>
                        </span>
                        {isAdmin && (
                            <button
                                className="text-red-600 hover:text-red-800 font-bold px-3 py-1 rounded transition bg-red-50 hover:bg-red-100"
                                onClick={() => deleteSong(song.title)}
                            >
                                🗑 Delete
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MusicLibrary;
