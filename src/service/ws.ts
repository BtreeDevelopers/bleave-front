export class Conection {
  ws: WebSocket;
  constructor(csfr: string, userid: string) {
    this.ws = new WebSocket(
      `${process.env.VUE_APP_API_URL_WS!}/?csfr=${csfr}&userid=${userid}`
    );
  }
}
