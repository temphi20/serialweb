<template>
  <v-container>
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
                    :loading="loading3"
                    :disabled="loading3"
                    :style="{marginTop: '20px'}"
                    @click="loader = 'loading3'; butt[n-1].reveal = true;"
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
  export default {
    name: 'Serial',

    data: () => ({
        rules: [
            value => !!value || 'Input msg',
            // value => (value && value.length === 0) || 'Input msg',
        ],
        loading3: false,
        butt: [
            {
                name: 'send',
                label: 'input msg',
                reveal: false,
            },
            {
                name: 'recv',
                label: 'output msg',
                reveal: false,
            }
        ],
        
    }),
    watch: {
        loader() {
            const l = this.loader;
            this[l] = !this[l];

            setTimeout(() => (this[l] = false), 3000);
            this.loader = null;
        }
    },
  }
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>