var credentials = {
  type: "service_account",
  project_id: "gumusistan-283813",
  private_key_id: "048f1911d43a19e0ee29d2859f39e07a46118389",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC25mRRKoWPir+l\npiNXO5EfiwG7piqd9LNYL2zaKCqfbuaJjdEF6GyeWCCoKCTVRlAFB7fkELrOI6Ca\nYDrwf2bQiM0TpS0+AMukjjDC4NcEkOp4M+eZxs/KB4rualXJ5enfEXgyma8wdRPJ\n0zVH3vyIB0dNon+nIXe0w3uJnlo5dESngPD1HcHzbzo777kh7sV2ZKjskRInDn9e\nm5gkHneNIUS6nPu6h05l0hJ6+EU63xLqjS4MCLyYOcbEdMM/L2gmGHUKm9GXXBLd\nf0O0RA9+QS5zV72/d3U45c4L0i2ERle1EQ9JhmlVb2+8zqB6kUwLDg7uScLmoFi3\n15WxFUQvAgMBAAECggEAHJzvy2Ay7ivZ+NjZj9y6bWGFGeLQU/m40kOebIVQIF/B\nzSR/M29oXrU8FqfWa08erErIJ/O+EGBeewgxmveIvCL1V5dwUSeKtD79EzUILlIF\nfFySZOpHY5HJLayQ/eRBXCu9eXJgMofTsAVMwTukl3CcD7crmpflGZsOCToutJdf\nC5jgwiUUDANYOPj/2Ig26BV1PO8hfPrLztnIf31gwYgp1vKcIMKhlaVrenCMgKRO\nFiMXhmx4OFVY3uHDIMC94EHsXYbjG9xKzvIcguY4XQ/i1wV86XfrC658AHrBoDLX\nt3NEzzSuUSkyjA04jjeD1C6UWg7HIYO+8NAiek1mYQKBgQDzhE8BQNzlUL4pSY47\nlcDD35oA+3S0sXSAvtCWfl/t5yPaG2F5181h3WTEaACXIQA2UcATppzAtQj4BKHa\nXKtrPizn8gy0lo/WaULY5d+T3LlXPKiN08VVC7PCNoGQH+F21iGHUHvlHbMD3Xyt\n2jHFGbuZ4hKUdaDgmJ4CrNgwyQKBgQDARppqNdjeeP3mCryft47RMQIngfBorRNo\neACfgPFio/xu9J2XrKhSCKSsz3eMYTIKZVXb6z1gIHE/cAG8IJeQjF8oxGHA5fqx\n/o7+zEKcJFzQIg04+AsJQ9AGf8S3870FgGUHgNG3IBgU+1/hy29OdBVek4Ua9Uuy\nZw8k/eIBNwKBgEDRIsZOoX1YNIWA0p8BiUGZrsA8LiA6a6wpHhQwpxAHyf8v8o4f\n5sb5yuyMUjvnyMqsj9erLWYNyclaUkpxCB+PeRxzzPX0bWzAr85TwWL2CU8zEhpO\nF+Q/LSWwpGPcWILtFBeUUKX3dcK9nYYY4c54vvqCtjdV5/BgLw6/OvwhAoGAFJ/+\nNGJuTv7/jUudjCxuf3YYWxCPL0tRh6VHu9RjEEey7lwDA6AbtiEDOR5QHpjWe1L/\ncMW9IbCZNUrYhMuiNnk4Q/E84ypISAucXyyeAI3N/u2IKZJB7M5/ZBMUkP7uScbK\nD5H77P7eVnHYiSn/WJUPLcP5RTkG065Ga5toQOUCgYBSXBNTWauCNSFWmzmSxFOO\nEORzabXqgSTheeQgmz4RKyGYi+sFoznkkonhs1I2Gv7YmOxKUySDCnU4CmcO9wR+\n8PX9Ghh0CTL+v84QjrgWiEFYW+fuAgUikQTNHeYq+O3Xo83whmEEJc7TozJQ0Jcy\nQ0kWH+gYV/V0RtsFqAQCag==\n-----END PRIVATE KEY-----\n",
  client_email: "phibershinigami@gumusistan-283813.iam.gserviceaccount.com",
  client_id: "100539065648628384871",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/phibershinigami%40gumusistan-283813.iam.gserviceaccount.com",
};

import * as google from "@google-cloud/storage";
class PhiberGoogle {
  storage: google.Storage;
  bucket: string;

  constructor() {
    this.storage = new google.Storage({ credentials });
  }
  async getFiles() {
    var results = await this.storage.bucket(this.bucket).getFiles();
    return results;
  }
  /**
   *
   * @param file string, example : C:\\x.txt
   * @param fileName string, example: avatar/x.txt
   */
  async sendFile(
    file: string,
    fileName?: string
  ): Promise<google.UploadResponse> {
    var options = {
      gzip: true,
      metadata: {
        cacheControl: "public, max-age=31536000",
      },
    };
    if (fileName) {
      options["destination"] = fileName;
    }
    var results = await this.storage.bucket(this.bucket).upload(file, options);

    return results;
  }
  async deleteFile(fileName: string) {
    var results = await this.storage
      .bucket(this.bucket)
      .file(fileName)
      .delete();
    return results;
  }
}
PhiberGoogle.prototype.bucket = "gumusistan";
export default PhiberGoogle;
