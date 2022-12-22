interface DatabaseI {
    ip: string
    port: number
}

class Database implements DatabaseI {
    ip: string
    port: number
    constructor(ip: string, port: number) {
        this.ip = ip
        this.port = port
    }

    public getUrl(): string {
        return this.ip + ':' +  this.port
    }
}

const database = new Database("192.168.200.10", 3000)
const url = database.getUrl()
console.log(url)