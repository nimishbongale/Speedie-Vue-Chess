<template>
  <div id="app" v-cloak>
  <span>
  <center>
  <p>Test your Chess-Mouse-Move-Speed on SpeedieChess! Just set your time, and get, set go!</p>
    <chessboard @onMove="showInfo" :fen="currentFen"  :key="componentKey"/>
    </center>
  <p>Move Score: {{this.positionInfo}}</p>
  </span> 
	<timer-setup v-if="!time" @set-time="setTime"></timer-setup>
	 <div v-else>
		 <timer :time="prettyTime"></timer>
			  <button v-if="!isRunning" @click="start">START</button>
			  <button v-if="isRunning" @click="stop">STOP</button>
			  <button @click="reset">RESET</button>
	</div>       
</div>
</template>

<script>

import {chessboard} from 'vue-chessboard'
import 'vue-chessboard/dist/vue-chessboard.css'
import './assets/style1.scss'

/* eslint-disable */

let timerSetup = {
    template:`
    <form>
         <label for="min">MINUTES<br />
         <input type="number" v-model="minutes" name="time_m" id="min" min="0" max="59">
         </label>
         <label for="sec">SECONDS<br />
              <input type="number" v-model="secondes" name="time_s" id="sec" max="59" min="0">
         </label>
         <button type="button" @click="sendTime">SET TIME</button>
    </form>`,
    data () {
         return {
              minutes:null,
              secondes:null
         }
    },
    methods: {
         sendTime() {
              this.$emit('set-time', {minutes:this.minutes, secondes:this.secondes})
         }
    }
}

let Timer = {
    template: `
    <div>
        <chessboard/>
         <div class="timer">{{ time }}</div>
         </div>
    `,
    props:['time'],
}

export default {
    components: {
         'timer-setup':timerSetup,
         'timer':Timer,
         'chessboard':chessboard,
    },
    data() {
      return{
         isRunning: false,
         minutes:0,
         secondes:0,
         time:0,
         storeTim:0,
         timer:null,
         sound:new Audio("http://s1download-universal-soundbank.com/wav/nudge.wav"),
         positionInfo:null,
         currentFen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
         componentKey: 0,
      }
    },
    computed: {
        prettyTime () {
             let time = this.time
             let minutes = Math.floor(time / 60)
             let secondes = Math.floor(time % 60)
             return minutes +":"+secondes
        },
    },
    methods: {
         start () {
             this.isRunning = true
              this.forceRerender()

             if (!this.timer) {
                  this.timer = setInterval( () => {
                        if (this.time > 0) {
                             this.time--
                        } else {
                             clearInterval(this.timer)
                             this.sound.play()
                             var moves = this.positionInfo
                             var timetaken = this.storeTim
                             var movespersec = moves/timetaken

                              alert("Your Score: "+moves+"\nTime taken: "+timetaken+" seconds"+"\nMoves per second: "+movespersec)
                              this.forceRerender()
                        }
                  }, 1000 )
             }
         },
         stop () {
             this.isRunning = false
             clearInterval(this.timer)
             this.timer = null
         },
         reset () {
             document.location.reload()
         },
         setTime (payload) {
             this.time = (parseInt(payload.minutes * 60) + parseInt(payload.secondes))
             this.storeTim = this.time
             this.positionInfo = 0
         },
          forceRerender() {
      this.componentKey += 1;  
    },
         showInfo(data) {
       this.positionInfo = data.history.length
}
    }
}

</script>
