import { Component, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { PlayerService } from '../../services/player-service/player-service.service'
import { nextAlbumObject } from './nextAlbumObject'
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-player-component',
  templateUrl: './player-component.component.html',
  styleUrls: ['./player-component.component.css'],
  animations: [
    trigger('myTrigger', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(":leave", [
        animate('500ms ease-out', style({ transform: 'translateX(150%)' })),
      ])
    ])]
    /*trigger('myTrigger', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', [animate('0.5s 0.5s ease-in')]),
      transition(':leave', [animate('0.5s ease-in')]),
    ]),*/
})
export class PlayerComponentComponent {

  artist: string;
  album: string;
  title: string;
  playNext: string;

  @ViewChild('nextPlayTempl') private nextPlay!: TemplateRef<any>;
  @ViewChild('container1', {read: ViewContainerRef}) private container!: ViewContainerRef;

  constructor(public player: PlayerService){
    this.artist = this.player.playedArtist;
    this.album = this.player.playedAlbum;
    this.title = this.player.playedSong;
    this.playNext = '';
  }

  nextAlbum() {
    let nextAlbum = this.player.nextAlbum();
    nextAlbum.subscribe(res => {
      console.log('next album, player component: ', res);
      this.playNext = res.nextAlbum;
      if (this.container.length > 0) { this.container.clear() }
      this.container.createEmbeddedView(this.nextPlay);
      return res;
    });
  }

  playPause(): void {
    this.player.playPause();
  }
}