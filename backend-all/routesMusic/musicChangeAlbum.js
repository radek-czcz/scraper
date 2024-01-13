import { db } from '../databaseConnectionPlayer';
import { data } from './index'
import * as mainPlayingData from './musicGetSong'
import * as fs from 'fs';
import * as mm from 'music-metadata'
import playlist from '../playlist'

let currentTrackNumber;

// route definition
  export const changeAlbum = {
    method: 'GET',
    path: '/nextalbum',
    options: {
      cors: {
        // "origin": ["Access-Control-Allow-Origin", /*"http://192.168.0.108"*/ 'http://localhost:4200'],
        "origin": ["*"],
        "headers": ["Accept", "Content-Type"],
        "additionalHeaders": ["X-Requested-With"]
      }
    },
    handler:
      function(req, h) {
        return h.response(JSON.stringify(playlist.changeAlbum()));
      /*
        console.log('numberOfFolders: ', mainPlayingData.numberOfFolders)
        mainPlayingData.integerDirectory++;
        console.log('integerDirectory: ', mainPlayingData.integerDirectory);
        if (mainPlayingData.integerDirectory < mainPlayingData.numberOfFolders) {}
        else {mainPlayingData.integerDirectory = 0 }
        console.log('integerDirectory: ', mainPlayingData.integerDirectory);
        fs.readdir(mainPlayingData.musicDirectory + mainPlayingData.integerDirectory, (err, files) => {
          playlist = files.sort(() => (Math.random() > .5) ? 1 : -1);
          let meta = mm.parseFile(mainPlayingData.musicDirectory + mainPlayingData.integerDirectory + '/' + files[0]);
          meta.then(value => {
            console.log(value.common.album);
            res(h.response(JSON.stringify(value.common.album)));
          })
          currentTrackNumber = 0;
        })
      */}
  }