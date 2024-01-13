// ROUTE TO SEND AUDIO FILE
  import { getSong } from './musicGetSong';
// ROUTE TO SEND DATA OF PLAYED SONG TO DATABASE
  import { countMusic } from './musicCounter';
// ROUTE TO SEND AUDIO FILE'S METADATA
  import { getSongData } from './musicGetSongData';
// ROUTE TO CHANGE ALBUM
  import { changeAlbum } from './musicChangeAlbum';
// NEXT SONG ROUTE
  import { nextSong } from './musicNextSong';
  import { parseData } from './musicGetSongData';


const exportedMembers = [ countMusic, getSong, getSongData, changeAlbum, nextSong ]

export default exportedMembers
export { parseData }