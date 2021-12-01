import requests
from bs4 import BeautifulSoup
import json

MAX_PAGES = 100

with open('./public/data.json', 'w') as f:
    f.write('[\n')
    for j in range(MAX_PAGES):
        URL = f'https://www.ultimate-guitar.com/explore?page={j + 1}&type[]=Chords'
        page = requests.get(URL)
        soup = BeautifulSoup(page.content, 'html.parser')
        tabs = json.loads(soup.select_one(
            'div[class="js-store"]')['data-content'])['store']['page']['data']['data']['tabs']
        for i in range(len(tabs)):
            print(
                f'Getting chords for song {j*50+i+1}/{MAX_PAGES * len(tabs)}\r', end='')
            URL = tabs[i]['tab_url']
            page = requests.get(URL)
            soup = BeautifulSoup(page.content, 'html.parser')

            applicature = json.loads(soup.select_one('div[class="js-store"]')['data-content'])[
                'store']['page']['data']['tab_view']['applicature']
            song = json.loads(soup.select_one(
                'div[class="js-store"]')['data-content'])['store']['page']['data']['tab']['song_name']
            artist = json.loads(soup.select_one(
                'div[class="js-store"]')['data-content'])['store']['page']['data']['tab']['artist_name']
            chords = list(applicature.keys())
            if j == MAX_PAGES - 1 and i == len(tabs) - 1:
                f.write(json.dumps({
                    'url': URL,
                    'chords': chords,
                    'artist': artist,
                    'song': song
                }, indent=4) + '\n')
            else:
                f.write(json.dumps({
                    'url': URL,
                    'chords': chords,
                    'artist': artist,
                    'song': song
                }, indent=4) + ',\n')
    f.write(']')
