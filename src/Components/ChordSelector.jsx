import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import { FormGroup } from '@mui/material';
import SongList from './SongList';

export default function ChordSelector() {
    const [note, setNote] = React.useState('C');
    const [selectedChords, setSelectedChords] = React.useState([]);
    const [songs, setSongs] = React.useState([]);
    const [lookingForSongs, setLookingForSongs] = React.useState(false);

    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const chordTypes = ['', 'm', '7', '5', 'dim', 'dim7', 'aug', 'sus2', 'sus4', 'maj7', 'm7', '7sus4', 'maj9', 'maj11', 'maj13', 'maj9#11', 'maj13#11', 'add9', '6add9', 'maj7b5', 'maj7#5', 'm6', 'm9', 'm11', 'm13', 'madd9', 'm6add9', 'mmaj7', 'mmaj9', 'm7b5', 'm7#5', '6', '9', '11', '13', '7b5', '7#5', '7b9', '7#9', '7(b5,b9)', '7(b5,#9)', '7(#5,b9)', '7(#5,#9)', '9b5', '9#5', '13#11', '13b9', '11b9', 'sus2sus4', '-5']
    const handleChange = (event) => {
        setNote(event.target.value);
    };

    function getSongs() {
        setLookingForSongs(true);
        setSongs([]);
        fetch('data.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        ).then(res => res.json()).then(json => {
            setSongs(json.filter(song => song.chords.every(val => selectedChords.includes(val))))
            setLookingForSongs(false);
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        });
    }

    return (
        <Box sx={{ minWidth: 120, margin: '30px' }}>
            <FormControl component="fieldset">
                <FormGroup>
                    <InputLabel id="demo-simple-select-label">Note</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={note}
                        label="Note"
                        onChange={handleChange}
                    >
                        {notes.map((note) => (
                            <MenuItem value={note}>{note}</MenuItem>
                        ))}
                    </Select>
                </FormGroup>
                <FormGroup row>
                    {[...chordTypes, ...notes.filter(n => n !== note).map(note => `/${note}`)].map((chordType) => (
                        <FormControlLabel control={
                            <Checkbox
                                id={chordType}
                                onChange={e => {
                                    e.target.checked ? setSelectedChords([...selectedChords, `${note}${chordType}`]) : setSelectedChords(selectedChords.filter(chord => chord !== `${note}${chordType}`));
                                }}
                                checked={selectedChords.includes(`${note}${chordType}`) ? 'checked' : ''}
                            />}
                            label={`${note}${chordType}`} />
                    ))}
                </FormGroup>
            </FormControl>
            <div>{selectedChords.join(', ')}</div>
            <Button sx={{ margin: '30px' }} variant='contained' onClick={getSongs}>
                Find songs
            </Button>
            {lookingForSongs && <p>Marvin is looking for songs you can play...</p>}
            {songs.length !== 0 && <SongList songs={songs}/>}
        </Box>)
}