import {EEditorInput, EWSTypes, IWSData} from './interface';

export class NgBubbleSocket {
  private static socket;
  static init(initCB, onmessagecb, errCB){
    let socket = this.socket = new WebSocket('ws://localhost:11640');
    socket.onopen = (event) => {
      initCB(event);
    };
    socket.onclose = function (event) {
      ////
      setTimeout(() => {
        // location.reload();
      }, 5000);/*TODO: a better way of doing this?*/
    };

    socket.onerror = function (err) {
      errCB(err);
    };
    socket.onmessage = function (event) {
      onmessagecb(event)
    };
  }


  static sendMessage(data: IWSData) {
    
    try {
      this.socket.send(JSON.stringify(data));
    }catch (e) {

    }
  }
}