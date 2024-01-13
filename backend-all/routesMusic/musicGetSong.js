import { db } from '../databaseConnectionPlayer';
import { data } from './index'
import * as fs from 'fs';
import playlist from '../playlist'

// route definition
  export const getSong = {

    method: 'GET',
    path: '/song{any}',
    options: {
      cors: {
        "origin": ["*"],
        "headers": ["Accept", "Content-Type"],
        "additionalHeaders": ["X-Requested-With"]
      }
    },
    handler: 
      function(req, h) {return new Promise( (res, rej) => {
        console.log('song path: ', playlist.currentSong());
        res(h.file(playlist.currentSong())
          .header("Content-Type", "audio/ogg")
          .header('Accept-Ranges', 'bytes')
          .type("audio/ogg"));
      })}
  };