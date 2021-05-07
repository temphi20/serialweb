const serialport = require('serialport');
// const fs = require('fs');
// const mqtt = require('mqtt');

class Port{
    static #port;

    constructor(body){
        this.body = body;
    }

    static openPort(){
        // this.#port = new serialport('COM1', {
        //     baudRate: 9600
        // })
    }

    static getPortInfo(){
        try{
            // serialport.list().then(ports => {
            //     ports.map(port => port.path).join('');
            // })
        }
        catch(err){
            return { success: false, err };
        }
    }
}

module.exports = Port;