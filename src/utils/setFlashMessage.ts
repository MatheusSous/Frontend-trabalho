import bus from './bus';
export function setFlashMessage( msg: string, type: string ) {
  bus.emit("flash", {
    message: msg,
    type: type,
  });
}