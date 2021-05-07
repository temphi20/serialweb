<template>
  <v-container>
    <v-card
    :style="{padding: '20px'}"
    outlined
    >
      <p>Port: </p>
      <v-text-field v-model="port"
      :rules="rules"
      hide-details="auto"
      ></v-text-field>
      <v-btn
      @click="openPort"
      v-text='Open'
      color="primary"
      depressed
      ></v-btn>
    </v-card>

    <v-row>
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
    </v-row>
  </v-container>
</template>

<script>
import Port from '../api/serial';

  export default {
    name: 'Serial',

    data: () => ({
        rules: [
            value => !!value || 'Input msg',
        ],
        loading3: false,
        butt: [
            {
                name: 'send',
                reveal: false,
            },
            {
                name: 'recv',
                reveal: false,
            }
        ],
        
    }),
    watch: {
        // loader() {
        //     const l = this.loader;
        //     this[l] = !this[l];

        //     setTimeout(() => (this[l] = false), 3000);
        //     this.loader = null;
        // }
    },

    methods: {
      openPort(){
        // const port = new Port();
        // port;
      }
    }
  }
</script>