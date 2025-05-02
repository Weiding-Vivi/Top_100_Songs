import React from 'react';

function GenreFilter({ genres, activeGenre, setActiveGenre, colorScale }) {
    return (
        <div style={{ marginBottom: '10px' }}>
            <strong>Filter by Genre: </strong>
            <button onClick={() => setActiveGenre(null)}>All</button>
            {genres.map(g => (
                <button
                    key={g}
                    style={{
                        margin: '0 5px',
                        backgroundColor: g === activeGenre ? colorScale(g) : '#eee',
                        border: 'none',
                        padding: '5px 10px',
                        cursor: 'pointer'
                    }}
                    onClick={() => setActiveGenre(g)}
                >
                    {g}
                </button>
            ))}
        </div>
    );
}

export default GenreFilter;