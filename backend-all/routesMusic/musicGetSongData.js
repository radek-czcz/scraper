import { db } from '../databaseConnectionPlayer';
import { data } from './index'
import playlist from '../playlist'
import * as mm from 'music-metadata'

function parseData() {
  return mm.parseFile(playlist.currentSong());
}

// route definition
  export const getSongData = {
    method: 'GET',
    path: '/songdata',
    options: {
      cors: {
        // "origin": ["Access-Control-Allow-Origin", /*"http://192.168.0.108"*/ 'http://localhost:4200'],
        "origin": ["*"],
        "headers": ["Accept", "Content-Type"],
        "additionalHeaders": ["X-Requested-With"]
      }
    },
    handler:
      function(req, h) {return new Promise( (res, rej) => {
          let meta = mm.parseFile(playlist.currentSong());
          meta.then(metaD => {
            let ret = {
              artist: '',
              album: '',
              title: ''
            };
            ret.artist = metaD.common.artist;
            ret.album = metaD.common.album;
            ret.title = metaD.common.title;
            res(h.response(JSON.stringify(ret)))
          })
      })}
  }

  export { parseData }