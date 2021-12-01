import * as React from 'react';
import { Button, CardActionArea, Grid, Icon } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';

export default function SongList({ songs }) {
    const [start, setStart] = React.useState(0)
    const [end, setEnd] = React.useState(Math.min(5, songs.length))

    function getNext() {
        if (end + 5 > songs.length) {
            setEnd(songs.length)
            setStart(songs.length - 5)
        } else {
            setEnd(end + 5)
            setStart(start + 5)
        }
    }

    function getPrev() {
        if (start - 5 < 0) {
            setStart(0)
            setEnd(5)
        } else {
            setStart(start - 5)
            setEnd(end - 5)
        }
    }

    return (
        <>
            <Grid container spacing={2} alignItems='center'>
                <Grid item xs={1}>
                    {start !== 0 && <IconButton aria-label="previous" color="primary" size="large" onClick={getPrev}>
                        <ChevronLeft fontSize="inherit"/>
                    </IconButton>}
                </Grid>
                {songs.slice(start, end).map(song => <Grid item xs={2}><SongCard song={song} /></Grid>)}
                <Grid item xs={1}>
                    {end !== songs.length && <IconButton aria-label="next" color="primary" size="large" onClick={getNext}>
                        <ChevronRight fontSize="inherit"/>
                    </IconButton>}
                </Grid>
            </Grid>
        </>
    )
}

function SongCard({ song }) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardActionArea onClick={() => window.open(song.url, '_blank').focus()}>
            <CardContent>
                <Typography>
                    {song.song}
                </Typography>
                <Typography>
                    {song.artist}
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>)
}