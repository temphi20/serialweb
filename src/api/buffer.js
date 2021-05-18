class Buffer{
    constructor(name){
        if(name) { this.name = name; }
        else { this.name = 'Buffer' };
        this.data = [];
        this.len = 0;
    }

    enBuffer(item){
        this.data.push(item);
        this.len += 1;
    }

    deBuffer(){
        if(this.isEmpty()) { return console.log(`${this.name} is empty\n`); }
        this.len -= 1;
        return this.data.shift();
    }

    clear(){
        this.data = [];
        this.len = 0;
    }

    isEmpty(){
        if(this.len){ return false; }
        return true;
    }

    getLen(){
        return this.len;
    }

    getData(idx){
        return this.data[idx];
    }

    printData(){
        let print = this.name + ':\n';
        this.data.forEach(element => {
            print += element + '\n';
        });
        console.log(print);
    }
}

module.exports = Buffer;