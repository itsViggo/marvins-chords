# Marvin's Chords
Currently deployed at https://marvins-chords.herokuapp.com/, this is a webapp where you can tell Marvin what chords you know and he'll tell you what songs you can play and some songs you can learn that have one or two extra chords that you don't know yet.

# How it works
Python scraper gets the top 5000 most popular songs and their corresponding chords from ultimate-guitar.com and stores it in data.json. The webapp itself is built from React and finds songs from data.json with chords that are a subset of (or nearly a subset of) those selected by the user.

# Why I made this
I started learning how to play guitar and there wasn't a tool that could do this as far as I could find. Also, had a front-end programming exam so thought this would be a good way to practice.
