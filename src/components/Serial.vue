<template>
  <v-container>
    <!-- <v-card
    :style="{padding: '20px'}"
    outlined
    >
      <p>Port: 
      <v-text-field v-model="port"
      :rules="rules"
      hide-details="auto"
      ></v-text-field></p>
      <p>Baud rate: 
      <v-text-field v-model="baud"
      :rules="rules"
      hide-details="auto"
      ></v-text-field></p>
      <v-btn
      @click="openPort"
      v-text='Open'
      color="primary"
      depressed
      ></v-btn>
    </v-card> -->
    <v-card
    :style="{padding: '20px'}"
    outlined
    >
      <v-col>
        <!-- <v-menu
          offset-y
        >
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              color="primary"
              v-bind="attrs"
              v-on="on"
              @click="setPortNum"
            >
            Port Number
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="com in portList"
              :key="com"
              link
            >
              <v-list-item-title v-text="com"></v-list-item-title>
            </v-list-item>
            </v-list>
        </v-menu> -->

        <!-- <v-menu
          offset-y
        >
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              color="primary"
              v-bind="attrs"
              v-on="on"
              @click="setBaudRate"
            >
            Baud Rate
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="baud in baudList"
              :key="baud"
              link
            >
              <v-list-item-title v-text="baud"></v-list-item-title>
            </v-list-item>
            </v-list>
        </v-menu> -->
      </v-col>
      <p>Port Number: {{ this.portInfo.portNum }}</p>
      <p>Baud Rate: {{ this.portInfo.options.baudRate }}</p>
      <v-btn
      fab
      small
      color="primary"
      @click="openPort"
      >
        <v-icon>
          mdi-plus
        </v-icon>
    </v-btn>
    </v-card>

    <v-col>
      <v-card
      :style="{padding: '20px'}"
      outlined
      >
          <p>{{ this.portInfo.buffer[0] }}</p>
      </v-card>
    </v-col>

    <!-- <v-row>
        <v-col
        v-for="n in 2"
        :key="n"
        align="center"
        >
            <v-card
            :style="{padding: '20px'}"
            outlined
            >
                <div>
                    <v-text-field
                    :rules="rules"
                    hide-details="auto"
                    ></v-text-field>
                    <v-btn
                    :style="{marginTop: '20px'}"
                    v-text="butt[n-1].name"
                    color="primary"
                    depressed
                    ></v-btn>
                </div>
            </v-card>
        </v-col>
    </v-row> -->
    
  </v-container>
</template>

<script>
// import Port from '../api/port';
const remote = window.electron.remote;
const SerialPort = remote.getGlobal('SerialPort');

// if(port !== null){
//   port.write('1');
// }

  export default {
    name: 'Serial',

    data: () => ({
      port: null,
      portList: null,
      baudList: [ 2400, 4800, 9600, 19200, 38400, 57600, 115200 ],
      options: {  
                    baudRate: 9600,
                    parity: 'none',
                    dataBits: 8,
                    stopBits: 1,
                    autoOpen: false
                },
      portInfo: {
        portNum: 'COM1',
        options: {
          baudRate: 115200,
          autoOpen: false,
        },
        buffer: [],
      },
    }),

    watch: {
    },

    methods: {
      genRenderer(){
        console.log("load success");
      },

      setPortInfo(){
        this.portInfo.portNum;
        this.portInfo.options.baudRate;
        this.portInfo.buffer = [];
      },

      openPort(){
        // const remote = window.electron.remote;
        // const SerialPort = remote.getGlobal('SerialPort');
        let port = this.port;
        if(port) { this.closePort(); }
        port = new SerialPort('COM1', this.options,null)

        port.open((err) => {
          if(err){ return console.log(`openPort(port.open) =>\n${err}`); }
        });

        port.on('open', () => {
          console.log(port.isOpen);
        })

        console.log(port);
        port.on('error', (err) => {
          if(err){ console.log(`openPort(port.on.error) =>\n${err}`); }
        });

        port.on('data', (data) => {
          this.portInfo.buffer.push(data);
          // setTimeout(() => {}, 1000);
        })
      },
      closePort(){
        let port = this.port;
        if(port){
          try{
            if(port.isOpen){ port.close(); }
            else { this.genPort(); }
          }
          catch(err){ console.log(`closePort =>\n${err}`); }
        }
      }
    },
    

    mounted() {
      this.genRenderer();
    }
  }
</script>