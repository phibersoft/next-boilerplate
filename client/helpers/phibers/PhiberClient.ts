export default class PhiberClient {
  static linkPrepare(blobData: Blob, fileName: string): HTMLAnchorElement {
    var elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blobData);
    elem.download = fileName;
    return elem;
  }

  static downloadify(blobData: Blob, fileName: string) {
    var elem = PhiberClient.linkPrepare(blobData, fileName);
    elem.click();
  }

  static downloadifyExcel(base64: string, fileName: string) {
    const url = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64}`;
    var elem = window.document.createElement("a");
    elem.href = url;
    elem.download = fileName;
    elem.click();
  }

  static downloadifyArrayBuffer(arrayBuffer: ArrayBuffer, fileName: string) {
    var blob = new Blob([Buffer.from(arrayBuffer)]);
    PhiberClient.downloadify(blob, fileName);
  }

  static downloadifyBuffer(buffer: Buffer, fileName: string) {
    var arrBuffer = PhiberClient.toArrayBuffer(buffer);
    PhiberClient.downloadifyArrayBuffer(arrBuffer, fileName);
  }

  static toArrayBuffer(buffer: Buffer): ArrayBuffer {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
      view[i] = buffer[i];
    }
    return ab;
  }

  static sendNoticeFatura(current: number, total: number) {
    const elem = document.getElementById("process-fatura") as HTMLDivElement;
    if (current < total) {
      elem.style.backgroundColor = "yellow";
      elem.textContent = `Kuyruk Sırası : ${current} / ${total}`;
    } else {
      elem.style.backgroundColor = "green";
      elem.textContent = "İşlem Tamamlandı.";
      setTimeout(() => {
        elem.style.backgroundColor = "red";
        elem.textContent = "İşlem Yok.";
      }, 1500);
    }
  }
}
