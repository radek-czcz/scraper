import { Injectable } from '@angular/core';
import { Subscription, fromEvent, Observable, first } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { iSong } from './iSong';
import { ApiUrlsService } from '../connections/api-urls.service';
import { AppConfigService } from '../app-config.service';
import { nextAlbumObject } from '../../player/player-component/nextAlbumObject'

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  audio: HTMLAudioElement = new Audio();
  sub: Subscription = new Subscription();
  private currentlyPlayed: iSong = {artist: '', album: '', title: ''};
  private domainAndPort: string = '';

  constructor(private http: HttpClient, private urlApi: ApiUrlsService, private config: AppConfigService) {
    this.domainAndPort = config.data.playerApiUrl + ':' + config.data.playerApiPort;
    let random = Math.floor(Math.random()*100);
    console.log('config: ', this.domainAndPort)
    this.audio.src = this.domainAndPort + '/song' /*'http://srv59554.seohost.com.pl:8055/song'*/ /*'http://192.168.0.108:8012/song'*/ + random
    console.log(this.audio.src);
    this.sub = fromEvent(this.audio, 'ended').subscribe((inp: any) => {
        this.currentlyPlayed.artist = '';
        this.currentlyPlayed.album = '';
        this.currentlyPlayed.title = '';
      console.log('song ended');
      this.http.get<any>( this.domainAndPort + '/songcounter').subscribe();
      console.log('before next');
      let receiver1 = this.http.get<string>(this.domainAndPort + '/nextSong').subscribe(res => {
        console.log(res);
        random = Math.floor(Math.random()*100);
        this.audio.src = this.domainAndPort + '/song'/*'http://srv59554.seohost.com.pl:8055/song'*/ /*'http://192.168.0.108:8012/song'*/ + random
        console.log(this.audio.src);
        this.play();
      })
    })
  }

  play(): void {
    this.audio.play();
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
    let nextAlbum;
    nextAlbum = this.http.get<nextAlbumObject>(this.domainAndPort + '/nextalbum')/*.subscribe(res => {
      console.log(res);
      return res;
    });*/
    return nextAlbum;
  }

  playPause(): void {
    console.log(this.audio.paused);
    !this.audio.paused ? this.audio.pause() : this.audio.play();
  }
}