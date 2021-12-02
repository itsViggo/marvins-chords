import * as React from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import SongCard from './SongCard';

export default function SongList ({ songs, title }) {
  const [start, setStart] = React.useState(0)
  const resultsPerPage = 6;
  const [end, setEnd] = React.useState(Math.min(resultsPerPage, songs.length))

  function getNext () {
    if (end + 5 > songs.length) {
      setEnd(songs.length)
      setStart(songs.length - resultsPerPage)
    } else {
      setEnd(end + resultsPerPage)
      setStart(start + resultsPerPage)
    }
  }

  function getPrev () {
    if (start - resultsPerPage < 0) {
      setStart(0)
      setEnd(resultsPerPage)
    } else {
      setStart(start - resultsPerPage)
      setEnd(end - resultsPerPage)
    }
  }

  return (
    <>
      <p>{title}</p>
      <Grid container spacing={2} alignItems='center'>
        {songs.slice(start, end).map(song => <Grid item xs={12} sm={6} lg={4} xl={2} key={song}><SongCard song={song} /></Grid>)}
        <Grid item xs={12}>
          <IconButton aria-label="previous" color="primary" size="large" onClick={getPrev} disabled={start === 0 ? 'enabled' : ''}>
            <ChevronLeft fontSize="inherit" />
          </IconButton>
          <IconButton aria-label="next" color="primary" size="large" onClick={getNext} disabled={end === songs.length ? 'disabled' : ''}>
            <ChevronRight fontSize="inherit" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}
