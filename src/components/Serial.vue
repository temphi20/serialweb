<template>
  <v-container>
    <v-card
    :style="{padding: '20px'}"
    outlined
    >
      <!-- <template> -->
      <v-container fluid>
        <v-row align="center">
          <v-col>
            <v-select
            v-model="vPort"
            :items="portList"
            label="Select port:"
            dense
            return-object
            ></v-select>
          </v-col>
          <v-col>
            <v-select
            v-model="vBaud"
            :items="baudList"
            label="Select baud rate:"
            dense
            >
            {{ this.portInfo.options.baudRate }}
            </v-select>
          </v-col>
          <v-col>
            <v-select
            v-model="vSig"
            :items="signalList"
            label="Select senging signal:"
            dense
            return-object
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="right">
            <v-btn
            fab
            small
            depressed
            color="normal"
            @click="sendSignal"
            :style="{marginRight: '10px'}"
            >
              <v-icon>send</v-icon>
            </v-btn>
            <v-btn
            fab
            small
            depressed
            color="primary"
            @click="setPortInfo"
            :style="{marginRight: '10px'}"
            >
              <v-icon>autorenew</v-icon>
            </v-btn>
            <v-btn
            fab
            small
            depressed
            color="primary"
            @click="openPort"
            >
              <v-icon>power_settings_new</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card
    :style="{marginTop: '10px', padding: '20px'}"
    outlined
    >
      <h4>Recive data:</h4>
      <div
      v-for="(data, idx) in vBuffer"
      :key="idx"
      >
      {{ data }}
      </div>
    </v-card>
  </v-container>
</template>

<script>
const remote = window.electron.remote;
const SerialPort = remote.getGlobal('SerialPort');

const Buffer = require('../api/buffer');

  export default {
    name: 'Serial',

    data: () => ({
      vPort: '',
      vBaud: '',
      vSig: '',
      vBuffer: [],
      
      port: null,
      portList: [],
      baudList: [ 2400, 4800, 9600, 19200, 38400, 57600, 115200 ],
      signalList: [ '0', '1' ],
      portInfo: {
        portNum: 'COM1',
        isRecv: false,
        isRead: false,
        options: {
          baudRate: 115200,
          autoOpen: false,
        },
        buffer: null,
        bufferLen: 0,
      },
    }),

    watch: {
    },

    methods: {
      genRenderer(){
        this.destroyPort();
        this.genPortList();
        this.vSig = this.signalList[1];
        this.vBaud = this.baudList[6];
        console.log("load success");
      },
      genPortList() {
        SerialPort.list()
        .then((ports) => {
            for(let i in ports){ this.portList.push(ports[i].path); }
            if(this.portList.length < 1){ this.portList.push('null'); }
            this.vPort = this.portList[0];
          })
        .catch((err) => { console.log(`genPortList =>\n${err}`); })
      },

      sendSignal(){
        if(this.port === null){
          alert(`sendSignal => Port is not open`);
          return console.log(`sendSignal => Port is not open`);
        }
        console.log(this.vSig);
        this.port.write(this.vSig.toString());
      },

      setPortInfo(){
        // this.closePort();
        this.destroyPort();
        console.log(this.vPort);
        this.portInfo.portNum = this.vPort;
        this.portInfo.options.baudRate = this.vBaud;
        if(this.portInfo.buffer){ this.portInfo.buffer.clear(); }
      },

      openPort(){
        if(this.port !== null){
          alert(`Port open => Plz open after port setting or destroy`);
          return console.log(`Port open => Plz open after port setting or destroy`);
        }
        this.port = new SerialPort(this.portInfo.portNum, this.portInfo.options);

        this.port.open((err) => {
          if(err){
            return console.log(`openPort(port.open) =>\n${err}`);
          }
        });

        this.port.on('open', () => {
          console.log(`Port open => ${this.port.isOpen}`);
          this.portInfo.buffer = new Buffer();
          this.bufferLen = 0;
        })

        this.port.on('error', (err) => {
          if(err && this.port!==null){
            console.log(`openPort(port.on.error) =>\n${err}`);
          }
        });

        this.port.on('data', (data) => {
          const tmp = data.toString();

          switch(tmp){
            case '0':
              this.portInfo.isRecv = false;
              this.portInfo.isRead = false;
              this.portInfo.buffer.clear();
              this.vBuffer = [];
              break;
            case '1':
              this.portInfo.isRecv = true;
              break;
            default:
              if(!this.portInfo.isRecv){
                alert(`openPort(port.on.data) => Send righ signal`);
                console.log(`openPort(port.on.data) => Send righ signal`);
              }
          }

          if(this.portInfo.isRead){
            this.portInfo.buffer.enBuffer(tmp);
            // this.portInfo.buffer.printData();
            this.vBuffer.push(tmp);
          }

          if(this.portInfo.isRecv){ this.portInfo.isRead = true; }
          else { this.portInfo.isRead = false; }

          console.log(`recv msg: ${tmp}`);
        })
      },
      // closePort(){
      //   if(this.port){
      //     try{
      //       if(this.port.isOpen){
      //         console.log('close port');
      //         this.port.close();
      //         // this.portInfo.buffer.clear();
      //         this.portInfo.buffer = null;
      //       }
      //     }
      //     catch(err){ console.log(`closePort =>\n${err}`); }
      //   }
      // },
      destroyPort(){
        if(this.portInfo.isRecv || this.portInfo.isRead){
          alert(`destroyPort => Refresh port setting after reciving 0 signal`);
          return console.log(`destroyPort => Refresh port setting after reciving 0 signal`);
        }
        if(this.port !== null) {
          this.port.close();
          this.port = null;
          alert(`destroyPort => Success closing port`);
          console.log(`destroyPort => Success closing port`);
        }
        this.portInfo.buffer = null;
        console.log(`destroyPort`);
      }
    },
    
    watch: {
      // isDisable: () => {
      //   if(this.isDisable){
      //     document.getElementById('v-port').disabled();
      //   }
      // }
    },

    mounted() {
      this.genRenderer();
    }
  }
</script>