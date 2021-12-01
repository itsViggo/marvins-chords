import * as React from 'react';
import { Button, CardActionArea, Grid, Icon } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';

var cardStyle = {
    height: '10em',
    display: 'flex'
}

export default function SongList({ songs }) {
    const [start, setStart] = React.useState(0)
    const resultsPerPage = 6;
    const [end, setEnd] = React.useState(Math.min(resultsPerPage, songs.length))


    function getNext() {
        if (end + 5 > songs.length) {
            setEnd(songs.length)
            setStart(songs.length - resultsPerPage)
        } else {
            setEnd(end + resultsPerPage)
            setStart(start + resultsPerPage)
        }
    }

    function getPrev() {
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
            <Grid container spacing={2} alignItems='center'>
                {songs.slice(start, end).map(song => <Grid item xs={12} md={6} lg={4} xl={2}><SongCard song={song} /></Grid>)}
                <Grid item xs={12}>
                    <IconButton aria-label="previous" color="primary" size="large" onClick={getPrev} disabled={start === 0 ? 'enabled' : ''}>
                        <ChevronLeft fontSize="inherit"/>
                    </IconButton>
                    <IconButton aria-label="next" color="primary" size="large" onClick={getNext} disabled={end === songs.length ? 'disabled' : ''}>
                        <ChevronRight fontSize="inherit"/>
                    </IconButton>
                </Grid>
            </Grid>
        </>
    )
}

function SongCard({ song }) {
    return (
        <Card sx={{ minWidth: 275 }} style={cardStyle}>
            <CardActionArea onClick={() => window.open(song.url, '_blank').focus()}>
            <CardContent>
                <Typography variant="h5">
                    {song.song}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {song.artist}
                </Typography>
                <Typography>
                    {song.chords.join(', ')}
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>)
}