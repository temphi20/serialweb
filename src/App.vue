<template>
  <v-app>
    <!-- <v-card> -->
      <v-app-bar
      color="beidge"
      absolute
      flat
      dense
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </v-app-bar>
    <!-- </v-card> -->

    <v-main
    :style="{marginTop: '100px'}"
    >
      <Serial/>
    </v-main>
  </v-app>
</template>

<script>
import Serial from './components/Serial';
// const serialport = require('serialport');

export default {
  name: 'App',

  components: {
    Serial,
  },

  data: () => ({
    //
  }),
  methods: {
    
  },
};
</script>
