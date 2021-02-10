import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  websock!: WebSocket;

  constructor() {
  }

  connect(url: string): void {
    console.log('connect');
    this.websock = new WebSocket(url);
    this.websock.onopen = (event) => this.onOpen();
    this.websock.onmessage = (event) => this.onMessage(event);
  }

  onOpen(): void {
    console.log('socket connected');
    this.send('asdf');
  }

  send(msg: string): void {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setUint32(0, 1);
    for(let i=0; i < msg.length; i++) {
      view.setUint8(4+i, msg.charCodeAt(i));
    }
    this.websock.send(buffer);
  }

  onMessage(event: any): void {
    let arrayBuffer: ArrayBuffer;
    let fileReader = new FileReader();
    fileReader.onload = function() {
      arrayBuffer = this.result as ArrayBuffer;
      const view = new DataView(arrayBuffer);
      const iCmd: number = view.getInt32(0);
      const barray = new Uint8Array(arrayBuffer, 4, arrayBuffer.byteLength - 4)
      console.log(iCmd, new TextDecoder("utf-8").decode(barray))
    };
    fileReader.readAsArrayBuffer(event.data);
  }

}
