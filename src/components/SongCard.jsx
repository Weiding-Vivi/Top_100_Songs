import { Link } from "react-router-dom";

function SongCard({ song }) {
    return (
        <Link to={`/songs/${song.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "12px",
                margin: "8px",
                width: "250px",
                backgroundColor: "#f9f9f9",
                transition: "0.2s",
                cursor: "pointer"
            }}>
                <h3>{song.title}</h3>
                <p><strong>Artist:</strong> {song.artist}</p>
                <p><strong>Year:</strong> {song.year}</p>
                <p><strong>Genre:</strong> {song.genre}</p>
            </div>
        </Link>
    );
}

export default SongCard;
