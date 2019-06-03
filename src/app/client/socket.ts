import {EEditorInput, EWSTypes, IWSData} from './interface';
import {LoggingService} from '../editor-wrapper/logging.service';

export class NgBubbleSocket {
  private static socket;
  static init(initCB, onmessagecb, errCB) {
    const socket = this.socket = new WebSocket('ws://localhost:11638');
    socket.onopen = (event) => {
      initCB(event);
    };
    socket.onclose = function (event) {
      setTimeout(() => {
        // location.reload();
      }, 5000); /*TODO: a better way of doing this?*/
    };

    socket.onerror = function (err) {
      errCB(err);
    };
    socket.onmessage = function (event) {
      LoggingService.log('websocket request:' );
      LoggingService.log(event);
      onmessagecb(event);
    };
  }


  static sendMessage(data: IWSData) {
    LoggingService.log('websocket request:' );
    LoggingService.log(data);
    try {
      this.socket.send(JSON.stringify(data));
    } catch (e) {

    }
  }
}
