import { Component, Inject, OnInit } from '@angular/core';
import { SocketService } from './service/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'DDZWeb';

  constructor( @Inject('socket') public socket: SocketService) {
  }

  ngOnInit(): void {
    this.socket.connect('ws://shou2926.tpddns.cn:9091');
  }
}
