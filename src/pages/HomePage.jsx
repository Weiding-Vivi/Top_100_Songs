import { useEffect, useState } from "react";
import songsData from "../data/songs.json";
import SongCard from "../components/SongCard";
import FilterPanel from "../components/FilterPanel";



function HomePage() {
    const [songs, setSongs] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setSongs(songsData);
    }, []);

    const years = [...new Set(songs.map((song) => song.year))].sort((a, b) => a - b);
    const genres = [...new Set(songs.map((song) => song.genre))].sort();


    const filteredSongs = songs.filter((song) => {
        const matchYear = selectedYear === "" || song.year === parseInt(selectedYear);
        const matchGenre = selectedGenre === "" || song.genre === selectedGenre;
        const matchSearch =
            searchTerm === "" ||
            song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchTerm.toLowerCase());

        return matchYear && matchGenre && matchSearch;
    });



    return (
        <div style={{ padding: "20px" }}>
            <h1>Billboard Top Songs of the 2010s</h1>
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Search by title or artist..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: "6px", width: "300px" }}
                />
            </div>

            <FilterPanel
                years={years}
                genres={genres}
                selectedYear={selectedYear}
                selectedGenre={selectedGenre}
                onYearChange={setSelectedYear}
                onGenreChange={setSelectedGenre}
            />

            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {filteredSongs.map((song) => (
                    <SongCard key={song.id} song={song} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
