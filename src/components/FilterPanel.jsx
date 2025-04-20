// src/components/FilterPanel.jsx
function FilterPanel({ years, genres, selectedYear, selectedGenre, onYearChange, onGenreChange }) {
    return (
        <div style={{ marginBottom: "20px" }}>
            <label>
                Year:{" "}
                <select value={selectedYear} onChange={(e) => onYearChange(e.target.value)}>
                    <option value="">All</option>
                    {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </label>

            <label style={{ marginLeft: "20px" }}>
                Genre:{" "}
                <select value={selectedGenre} onChange={(e) => onGenreChange(e.target.value)}>
                    <option value="">All</option>
                    {genres.map((g) => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>
            </label>
        </div>
    );
}

export default FilterPanel;
