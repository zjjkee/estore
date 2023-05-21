export const encodeImage = (mimetype, arrayBuffer) => {
    let u8 = new Uint8Array(arrayBuffer)
    const b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(c)},''))
    return "data:"+mimetype+";base64,"+b64encoded;
}
