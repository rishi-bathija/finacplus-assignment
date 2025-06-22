import React, { useState, useMemo } from "react";


const defaultSongs = [
    { title: "Numb", artist: "Linkin Park", album: "Meteora" },
    { title: "Breaking the Habit", artist: "Linkin Park", album: "Meteora" },
    { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
    { title: "Photograph", artist: "Ed Sheeran", album: "x" },
];

const MusicLibrary = ({ role }) => {
    const isAdmin = role === "admin";

    const [songs, setSongs] = useState(defaultSongs);
    const [filter, setFilter] = useState("");
    const [sortBy, setSortBy] = useState("title");
    const [groupByAlbum, setGroupByAlbum] = useState(false);
    const [openAlbums, setOpenAlbums] = useState({});
    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [newSong, setNewSong] = useState({ title: "", artist: "", album: "" });
    const [modalError, setModalError] = useState("");

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


    const groupedSongs = useMemo(() => {
        return filteredSongs.reduce((acc, song) => {
            if (!acc[song.album]) acc[song.album] = [];
            acc[song.album].push(song);
            return acc;
        }, {});
    }, [filteredSongs]);

    // Remove old addSong and replace with modal logic
    const openAddSongModal = () => {
        setNewSong({ title: "", artist: "", album: "" });
        setModalError("");
        setShowModal(true);
    };
    const closeAddSongModal = () => {
        setShowModal(false);
        setModalError("");
    };
    const handleAddSong = () => {
        if (!newSong.title.trim() || !newSong.artist.trim() || !newSong.album.trim()) {
            setModalError("All fields are required.");
            return;
        }
        setSongs([...songs, { ...newSong }]);
        setShowModal(false);
    };

    const deleteSong = (title) => {
        setSongs(songs.filter((s) => s.title !== title));
    };

    const toggleAlbum = (album) => {
        setOpenAlbums((prev) => ({ ...prev, [album]: !prev[album] }));
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

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={groupByAlbum}
                        onChange={() => setGroupByAlbum((prev) => !prev)}
                    />
                    Group by Album
                </label>

                {isAdmin && (
                    <button
                        className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition w-full"
                        onClick={openAddSongModal}
                    >
                        Add Song
                    </button>
                )}
            </div>

            {groupByAlbum ? (
                Object.entries(groupedSongs).map(([album, tracks]) => (
                    <div key={album} className="border rounded mb-3">
                        <div
                            className="p-3 bg-gray-100 font-semibold cursor-pointer"
                            onClick={() => toggleAlbum(album)}
                        >
                            📀 {album} ({tracks.length} track{tracks.length > 1 ? "s" : ""})
                        </div>
                        {openAlbums[album] && (
                            <ul className="p-3 space-y-2">
                                {tracks.map((song, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center border-b pb-1"
                                    >
                                        <span>
                                            <strong>{song.title}</strong> — {song.artist}
                                        </span>
                                        {isAdmin && (
                                            <button
                                                className="text-red-500 hover:underline"
                                                onClick={() => deleteSong(song.title)}
                                            >
                                                🗑 Delete
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))
            ) : (
                <ul className="space-y-2">
                    {filteredSongs.map((song, index) => (
                        <li
                            key={index}
                            className="p-2 border rounded flex justify-between items-center"
                        >
                            <span>
                                <strong>{song.title}</strong> — {song.artist} ({song.album})
                            </span>
                            {isAdmin && (
                                <button
                                    className="text-red-500 hover:underline"
                                    onClick={() => deleteSong(song.title)}
                                >
                                    🗑 Delete
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {/* Modal for adding a new song */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
                        <h3 className="text-2xl font-bold mb-4 text-blue-700">Add New Song</h3>
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Title"
                                className="p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={newSong.title}
                                onChange={e => setNewSong({ ...newSong, title: e.target.value })}
                                autoFocus
                            />
                            <input
                                type="text"
                                placeholder="Artist"
                                className="p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={newSong.artist}
                                onChange={e => setNewSong({ ...newSong, artist: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Album"
                                className="p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={newSong.album}
                                onChange={e => setNewSong({ ...newSong, album: e.target.value })}
                            />
                            {modalError && <div className="text-red-500 text-sm">{modalError}</div>}
                            <div className="flex gap-4 mt-2">
                                <button
                                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition"
                                    onClick={handleAddSong}
                                >
                                    Add
                                </button>
                                <button
                                    className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold shadow hover:bg-gray-300 transition"
                                    onClick={closeAddSongModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MusicLibrary;
