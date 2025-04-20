import { useParams, Link } from "react-router-dom";
import songsData from "../data/songs.json";

function SongDetailPage() {
    const { id } = useParams();
    const song = songsData.find((s) => s.id === parseInt(id));

    if (!song) {
        return <div>Song not found</div>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <Link to="/">← Back to list</Link>
            <h2>{song.title}</h2>
            <p><strong>Artist:</strong> {song.artist}</p>
            <p><strong>Year:</strong> {song.year}</p>
            <p><strong>Genre:</strong> {song.genre}</p>
        </div>
    );
}

export default SongDetailPage;
