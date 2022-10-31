/* eslint-disable no-undef */
const admin = require("firebase-admin");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "./.env" });
}

const serviceAccount = {
    type: "service_account",
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCivXG8wtcB6flq\nF99dYwYYzc3mr83g7XVp80PFepNDJcsC412AjpoUdZrgatQaZfD24VR4ChrSoH3S\nOuou/cJN3ewYXohQpzCNwNTNcUIBdLsnRpF+tfPlW0wDkbHHr4UTFj+sW3j4n/ED\ni1H+J463w+y1+YLavpXfBSYPgCmV17NJaUikJQMN82jsZqfXEQuabDGPQR3gA8p3\n5B/QwVSM23GOP9E64GnJEByxss/n3bey34Kyy7JcjapJsUq563myX/XBPWjqgh90\nOB4Ou6rHbuglxRJyuZzq9l86SsInkF71OYDOkh1+HsM6QR0y/M9Wwr08dhoMhLou\nUiGtabxnAgMBAAECggEAGWkNLlUZ71GSQS+TD+jbVdoksUV4FwvczntOdLJL9isb\nhMrtmZoqktE+KpZjoe+S7WmHn+qr/4FRxBaw5D95LGFfcPqpvDYuzaNzVtS9Yq7Q\nXjSVmTxd5c0YlGIWaUCNvco2jPoHbILExjHlzpJspWLxPgTEmtUxX45VQAxZ8exp\nWAfYbJIfke6+o/biX8rwEFjNbJh2vlZFB5lgsKoVEW+QopcnyS37n/U4Z20EUy1s\neq1ern/HkkQoAmzHZQkpb7YI7UxLbtveJmTYbErQbK6u+l6q8fVbdVsKi3/CDDQh\nBShNmv0q9EK2VyBeqVgDjowtGWtjAN4tSBEVkv/J+QKBgQDYSG7jXA08i+W9mlyM\nO9wbZOxs9zJ0XdrPoKjpO9X2uXt4wJIXMTb486MaJqy/xcuH2Tk5p+Kv+GA2r9TW\nasse2SIv1b4XAZgbdLWu9grNJRCPAkWW1TM2mI4Vk5Lg8kCsiIKoKytsOaoIwIHE\n8xbcFwRJi2M9eeJmkWxJsaSw8wKBgQDAn+6Z6D0Y8B7qq8mnwpnV++NXfAQSSPh8\nztC7slhfae/eVNnsKePCsO4DmkYJuU5C9fKagGdrQwllIGiN+zSBwNzkFQuSkz9/\ns3uPEJq7ktSJmG/QdSozhPRV/wVk38xm0NmAOHVtz4Jl0l2CFdpFCnbWOBqU0T9U\niEyyrk7DvQKBgQCwiSbhs4AmXHYwda9202FMhusn4fmv2++/K37TqQBzO2CZ5m0Y\nOxaIy6zkqo60lYkUoGzCL9OrGIvH92s9fLvAuTDbZJadBrMWLgQiBDg6zDcg05Tj\nkbAUrx7CY8suiu3ZJi+nfl0aIFM2g5Moo9aT3MGmGfzt7++pEqgV2sb3mwKBgFUS\nTT6L4u/wnLbnx9ffijGHXZB1pRauQ5BbhrRev8jj8JwwvU4f8gc6POQ6blQ9EuNf\n3BWAQCyPHsca2RJbr4TeuK/C26mQfqrXiepVWwEch+F9AWT/WfQG9CJGzwsODCgc\ndPK7/KDS1LRDhCi/nfZ/+JwDiznOcDnVOIpxkTfBAoGBANLT0Apo+xx7iEIwjwyj\nNKnrh8qlGSrb8ki/++t7tiD64OmzKe5HqO8BjGKc+RGr61hWVty3A13+7hXVPN6a\nNDYWM+LrmJ+/EY9aD5hNC63TA4G2/BOWM6vFPfsOK6nzXkyf2bAkh9H7aDejT7fR\nnWrE/8ZidyvyCzDjTrzErnUo\n-----END PRIVATE KEY-----\n",
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tabasamunet.firebaseio.com",
});

const db = admin.firestore();

module.exports = { db, admin };