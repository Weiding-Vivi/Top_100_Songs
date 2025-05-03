import { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import songsData from './data/songs.json';
import GenreFilter from './components/GenreFilter';
import YearSlider from './components/YearSlider';
import SongDetailCard from './components/SongDetailCard';

function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [activeGenre, setActiveGenre] = useState(null);
  const [yearRange, setYearRange] = useState([2010, 2020]);
  const svgRef = useRef(null);
  const legendRef = useRef(null);

  useEffect(() => {
    setSongs(songsData);
  }, []);

  useEffect(() => {
    if (songs.length === 0) return;

    const filteredSongs = songs.filter(d => {
      const inYear = d.year >= yearRange[0] && d.year <= yearRange[1];
      const inGenre = activeGenre === null || d.genre === activeGenre;
      return inYear && inGenre;
    });

    const width = 1000;
    const height = 500;
    const margin = { top: 40, right: 40, bottom: 40, left: 100 };
    const genres = Array.from(new Set(songs.map(s => s.genre))).sort();
    const years = Array.from(new Set(filteredSongs.map(s => s.year))).sort();

    const xScale = d3.scalePoint()
      .domain(years)
      .range([margin.left, width - margin.right])
      .padding(0.5);

    const yScale = d3.scalePoint()
      .domain(genres)
      .range([margin.top, height - margin.bottom])
      .padding(0.5);

    const colorScale = d3.scaleOrdinal()
      .domain(genres)
      .range(d3.schemeTableau10);

    const positionMap = {};
    filteredSongs.forEach(song => {
      const key = `${song.year}-${song.genre}`;
      if (!positionMap[key]) positionMap[key] = [];
      positionMap[key].push(song);
    });
    filteredSongs.forEach(song => {
      const key = `${song.year}-${song.genre}`;
      song.offsetIndex = positionMap[key].indexOf(song);
      song.totalOverlap = positionMap[key].length;
    });

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format('d')));

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    svg.append('text')
      .attr('x', width - margin.right)
      .attr('y', height - margin.bottom + 35)
      .attr('text-anchor', 'end')
      .attr('font-size', '14px')
      .text('Year →');

    svg.append('text')
      .attr('x', margin.left - 40)
      .attr('y', margin.top - 10)
      .attr('text-anchor', 'start')
      .attr('font-size', '14px')
      .text('↑ Genre');

    const tooltip = d3.select('#tooltip');

    svg.selectAll('circle')
      .data(filteredSongs)
      .enter()
      .append('circle')
      .attr('cx', d => {
        const baseX = xScale(d.year);
        const spread = 10;
        const centerShift = (d.totalOverlap - 1) * spread / 2;
        return baseX - centerShift + d.offsetIndex * spread;
      })
      .attr('cy', d => yScale(d.genre))
      .attr('r', 6)
      .attr('fill', d => colorScale(d.genre))
      .attr('stroke', '#333')
      .attr('stroke-width', 0.5)
      .style('transition', 'all 0.2s ease')
      .on('mouseenter', function (event, d) {
        tooltip
          .style('visibility', 'visible')
          .html(`<strong>${d.title}</strong><br/>${d.artist} (${d.year})`);
        d3.select(this)
          .attr('r', 9)
          .attr('stroke-width', 1.5)
          .raise();
      })
      .on('mousemove', function (event) {
        tooltip
          .style('top', `${event.offsetY + 10}px`)
          .style('left', `${event.offsetX + 10}px`);
      })
      .on('mouseleave', function () {
        tooltip.style('visibility', 'hidden');
        d3.select(this)
          .attr('r', 6)
          .attr('stroke-width', 0.5);
      })
      .on('click', function (event, d) {
        setSelectedSong(d);
      });

    const legendContainer = d3.select(legendRef.current);
    legendContainer.selectAll('*').remove();

    const legend = legendContainer
      .append('svg')
      .attr('width', 1000)
      .attr('height', genres.length * 22);

    genres.forEach((genre, i) => {
      const row = legend.append('g')
        .attr('transform', `translate(100, ${i * 20 + 10})`);

      row.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 6)
        .attr('fill', colorScale(genre))
        .attr('stroke', '#333')
        .attr('stroke-width', 0.5);

      row.append('text')
        .attr('x', 12)
        .attr('y', 4)
        .text(genre)
        .style('font-size', '12px')
        .style('alignment-baseline', 'middle');
    });
  }, [songs, activeGenre, yearRange]);

  const genreList = Array.from(new Set(songs.map(s => s.genre))).sort();
  const allYears = songs.map(s => s.year);
  const minYear = Math.min(...allYears);
  const maxYear = Math.max(...allYears);

  const colorScale = d3.scaleOrdinal()
    .domain(genreList)
    .range(d3.schemeTableau10);

  const jumpToNextInGenre = (current) => {
    const filtered = songs.filter(s => s.genre === current.genre);
    const idx = filtered.findIndex(s => s.id === current.id);
    const next = filtered[(idx + 1) % filtered.length];
    setSelectedSong(next);
  };

  const jumpToNextInYear = (current) => {
    const filtered = songs.filter(s => s.year === current.year);
    const idx = filtered.findIndex(s => s.id === current.id);
    const next = filtered[(idx + 1) % filtered.length];
    setSelectedSong(next);
  };

  const handleCloseCard = () => {
    setSelectedSong(null);
  };

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      <h1>Top 100 Songs Navigator</h1>
      <GenreFilter genres={genreList} activeGenre={activeGenre} setActiveGenre={setActiveGenre} colorScale={colorScale} />
      <YearSlider minYear={minYear} maxYear={maxYear} yearRange={yearRange} setYearRange={setYearRange} />
      <svg ref={svgRef} width={1000} height={500}></svg>
      <hr style={{ margin: '40px 0' }} />
      <div ref={legendRef} style={{ marginBottom: '20px' }}></div>
      <div id="tooltip" style={{
        position: 'absolute',
        padding: '6px 10px',
        background: 'white',
        border: '1px solid gray',
        borderRadius: '4px',
        pointerEvents: 'none',
        visibility: 'hidden',
        fontSize: '14px'
      }}></div>
      {selectedSong && (
        <SongDetailCard
          song={selectedSong}
          jumpToNextInGenre={jumpToNextInGenre}
          jumpToNextInYear={jumpToNextInYear}
          onClose={handleCloseCard}
        />
      )}
    </div>
  );
}

export default App;
