import * as React from 'react';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';

const cardStyle = {
  height: '10em',
  display: 'flex',
  backgroundColor: '#e6b175'
}

export default function SongCard ({ song }) {
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
