"use strict";
class Database {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
    }
    getUrl() {
        return this.ip + ':' + this.port;
    }
}
const database = new Database("192.168.200.10", 3000);
const url = database.getUrl();
console.log(url);
