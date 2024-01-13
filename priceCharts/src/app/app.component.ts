import { Component, OnInit, HostListener } from '@angular/core';
import { PlayerService } from './services/player-service/player-service.service'
import { MainComponent } from './main/main.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'priceCharts';
  authorName: string = '';
/*  audio: HTMLAudioElement = new Audio();
  sub: Subscription = new Subscription();*/

  constructor(private player: PlayerService){}

  // ngOnInit() {
  //   let random = Math.floor(Math.random()*100);
  //   this.audio.src = 'http://srv59554.seohost.com.pl:8055/song' /*'http://192.168.0.108:8012/song'*/ + random
  //   console.log(this.audio.src);
  //   this.sub = fromEvent(this.audio, 'ended').subscribe((inp: any) => {
  //     random = Math.floor(Math.random()*100);
  //     this.audio.src = 'http://srv59554.seohost.com.pl:8055/song' /*'http://192.168.0.108:8012/song'*/ + random
  //     console.log(this.audio.src);
  //     this.audio.play();
  //   })
  // }

  @HostListener('window:keydown.shift.a', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.authorName = "rc";
    setTimeout(() => {
      this.authorName = "";
    }, 5000)
  }

  play() {
    this.player.play();
  }

}


