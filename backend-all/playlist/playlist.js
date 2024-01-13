import * as fs from 'fs';

let libPath = './music/';
let albumArray = [];
let playlistArray = [];
let currentTrackNumber = 0;
let integerDirectory = 0;
let numberOfFolders;

// READ FOLDER'S (ALBUMS) STRUCTURE AND GET RANDOM FOLDER
	let readFoldersPromise = function() {
	  return new Promise((resolve, reject) => {
	    fs.readdir(libPath.substring(0, libPath.length - 1), (err, files) => {
	    	err ? console.log(err) : console.log('How many folders: ', files.length);
	    	albumArray = files;
	      numberOfFolders = files.length;
	      resolve(files);
	    })
	  })
	}

integerDirectory = (Math.floor(Math.random() * numberOfFolders));

// READ FILES IN THE FOLDER (ALBUM), GENERATE RANDOM ALBUM TO PLAY
	readFoldersPromise().then(res => {
		integerDirectory = (Math.floor(Math.random() * numberOfFolders));
		readSongs()
	})

// GET FULL PATH OF SONG TO BE PLAYED
	function currentSong() {
		return libPath + albumArray[integerDirectory] + '/' + playlistArray[currentTrackNumber];
	}

// INCREASE OF THE SONG'S NUMBER (IN THE FOLDER), TO BE PLAYED NEXT
	function incrementSong() {
		currentTrackNumber++;
		if (currentTrackNumber === playlistArray.length) { currentTrackNumber = 0 }
		console.log('track number after increment: ', currentTrackNumber);
	}

// CHANGE ALBUM
	function changeAlbum() {
		integerDirectory++;
		integerDirectory === numberOfFolders ? integerDirectory = 0 : {} ;
		currentTrackNumber = 0;
		readSongs();
		console.log(albumArray[integerDirectory]);
		return {nextAlbum: albumArray[integerDirectory]};
	}

// READ ALL SONGS IN FOLDER (ALBUM)
	function readSongs() {
		fs.readdir(libPath + albumArray[integerDirectory], (err, files) => {
			playlistArray = files.filter(file => 
				/*file.includes('.mp3') || file.includes('.wma') || */file.includes('.ogg')
			).sort(() => (Math.random() > .5) ? 1 : -1);
			console.log(playlistArray);
			console.log('first song: index ', currentTrackNumber, ' of ', playlistArray.length, playlistArray[currentTrackNumber])
		})
	}

export { currentSong, incrementSong, changeAlbum }