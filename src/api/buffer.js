class Buffer{
    constructor(){
        this.data = [];
    }

    enBuffer(item){
        this.data.push(item);
    }

    deBuffer(){
        return this.data.shift();
    }

    getSize(){
        return this.data.size();
    }
}

module.exports = Buffer;