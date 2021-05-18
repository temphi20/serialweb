// const serialport = require('serialport');
const Buffer = require('./buffer');

class Port{
    constructor(){
        
        this.buffer = new Buffer();
    }

    static createPort(port, num, rate){
        this.port = port;
        this.portNum = num;
        this.baudRate = rate;
    }

    static read(){
        return this.buffer.deBuffer();
    }

    static write(item){
        this.buffer.enBuffer(item);
    }

    static getPortInfo(){
        return { portNum: this.portNum, baudRate: this.baudRate };
    }
}

module.exports = Port;