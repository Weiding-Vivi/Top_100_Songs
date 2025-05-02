import React from 'react';

function YearSlider({ minYear, maxYear, yearRange, setYearRange }) {
    return (
        <div style={{ margin: '20px 0' }}>
            <strong>Filter by Year:</strong><br />
            <label>
                From:
                <input
                    type="range"
                    min={minYear}
                    max={maxYear}
                    value={yearRange[0]}
                    onChange={e => setYearRange([+e.target.value, yearRange[1]])}
                />
                {yearRange[0]}
            </label>
            <br />
            <label>
                To:
                <input
                    type="range"
                    min={minYear}
                    max={maxYear}
                    value={yearRange[1]}
                    onChange={e => setYearRange([yearRange[0], +e.target.value])}
                />
                {yearRange[1]}
            </label>
        </div>
    );
}

export default YearSlider;