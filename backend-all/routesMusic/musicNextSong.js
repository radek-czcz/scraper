import { db } from '../databaseConnectionPlayer';
import playlist from '../playlist'

// route definition
  export const nextSong = {
    method: 'GET',
    path: '/nextSong',
    options: {
      cors: {
        "origin": ["*"],
        "headers": ["Accept", "Content-Type"],
        "additionalHeaders": ["X-Requested-With"]
      }
    },
    handler: async (reg, h) => {
      console.log('nextsong');
      playlist.incrementSong();
      return {message: 'next song done'};
    }
}