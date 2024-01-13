import { db } from '../databaseConnectionPlayer';
import { data } from './index'
import { parseData } from './musicGetSongData'

// route definition
// ROUTE TO ADD PLAYED SONG TO DATABASE AND INCREMENT PLAYCOUNTER
  export const countMusic = {
    method: 'GET',
    path: '/songcounter',
    options: {
      cors: {
        "origin": ["*"],
        "headers": ["Accept", "Content-Type"],
        "additionalHeaders": ["X-Requested-With"]
      }
    },
    handler: (reg, h) => {
      let result = parseData().then(res => {
        let result1 = db.query(
          // "SELECT * FROM artist"
          `INSERT IGNORE INTO srv59554_music.artist (artist) VALUES ('${res.common.artist}');
            INSERT IGNORE INTO srv59554_music.genre (genre_id) VALUES ('${res.common.genre}');
            INSERT IGNORE INTO srv59554_music.album (album_title, year, genre, artist) VALUES ('${res.common.album}', '${res.common.year}', '${res.common.genre}', '${res.common.artist}');
            INSERT INTO song (title, album_title, year, genre, artist) 
            VALUES ('${res.common.title}', '${res.common.album}', '${res.common.year}', '${res.common.genre}', '${res.common.artist}') ON DUPLICATE KEY UPDATE play_counter=play_counter+1;`
          , (err, res, fields) => {
              if ( err ) { 
                console.log(err);
                return err;
              } else return res
          }
        )
        return result1
      })
      return {message: 'result'};
    }
  }