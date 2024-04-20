import { Injectable } from '@angular/core';
import { Subscription, fromEvent, Observable, first } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { iSong } from './iSong';
import { ApiUrlsService } from '../connections/api-urls.service';
import { AppConfigService } from '../app-config/app-config.service';
import { nextAlbumObject } from '../../player/player-component/nextAlbumObject'
import { Inject } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  audio: HTMLAudioElement = new Audio();
  sub: Subscription = new Subscription();
  private currentlyPlayed: iSong = {artist: '', album: '', title: ''};
  private domainAndPort: string = '';

  constructor(private http: HttpClient, private urlApi: ApiUrlsService, private config: AppConfigService) {
    // config the domain and port
      this.domainAndPort = config.data.playerApiUrl + ':' + config.data.playerApiPort;

    // get random number to attach to song sources endpoint's url
      let random = Math.floor(Math.random()*100);

    // set audio source 
      this.audio.src = this.domainAndPort + '/song' + random
      console.log(this.audio.src);
    
    // define what to do when song ends
      this.sub = fromEvent(this.audio, 'ended').subscribe((inp: any) => {

        // reset currently played song's displayed infos
          this.currentlyPlayed.artist = '';
          this.currentlyPlayed.album = '';
          this.currentlyPlayed.title = '';
          // console.log('song ended');

        // make a http call to send the song data to db, to count how many times the song has been played
          this.http.get<any>( this.domainAndPort + '/songcounter').subscribe();

        // get infos about next song to be played
          let receiver1 = this.http.get<string>(this.domainAndPort + '/nextSong').subscribe(res => {
            random = Math.floor(Math.random()*100);
            this.audio.src = this.domainAndPort + '/song'/*'http://srv59554.seohost.com.pl:8055/song'*/ /*'http://192.168.0.108:8012/song'*/ + random
            console.log(this.audio.src);
            this.play();
          })
      })
  }

  play(): void {
    // start playing
      this.audio.play();
    // get the data of currently played song
      let loaded = fromEvent(this.audio, 'play').pipe(first()).subscribe(inp => {
        let receiver = this.http.get<iSong>(this.domainAndPort + '/songdata').subscribe(res => {
          console.log('now playing: ', res);
          setTimeout(() => {
            this.currentlyPlayed.artist = res.artist;
            this.currentlyPlayed.album = res.album;
            this.currentlyPlayed.title = res.title;
          }, 1000)
        });
      });
  }

  get playedArtist(){
    return this.currentlyPlayed.artist;
  }

  get playedAlbum() {
    return this.currentlyPlayed.album;
  }

  get playedSong() {
    return this.currentlyPlayed.title;
  }

  nextAlbum(): Observable<nextAlbumObject> {
    // get the name of next album to be played
      let nextAlbum;
      nextAlbum = this.http.get<nextAlbumObject>(this.domainAndPort + '/nextalbum');
      return nextAlbum;
  }

  playPause(): void {
    console.log(this.audio.paused);
    !this.audio.paused ? this.audio.pause() : this.audio.play();
  }
}