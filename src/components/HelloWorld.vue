<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

     <table class="table">
        <thead>
            <tr>
                <td><strong>Id</strong></td>
                <td><strong>Events: name</strong></td>
                <td><strong>factors:</strong><strong>code / value</strong></td>
            </tr>
        </thead>
        <tbody>
        	
            <tr v-for="(item, i) in events" :key="i">
                <td>{{ i }}</td>
                <td>{{ item.name }}</td>
                <td class="factors">
                  <tr v-for="(items, l) in item.factors" :key="l"
                    :class="{'new': items.new == true }">
                    <td class="code">{{ items.code }}</td>
                    <td class="value" >{{ items.value }}</td>
                  </tr>
                </td>
            </tr>
        </tbody>
    </table>
   
  </div>
</template>

<script>
//Запрещается использование DOM для обновления котировок. Обновление
//должно происходить исключительно средствами Vue.

export default {
  
  data () {
    return {
      msg: 'Welcome to Your lines Task',
      events: [],
      tmpEvents: []
    }
  },
  sockets: {
    connect() {
        this.customEmit2('Hello socket')
    },
    customEmit(data){
      ((this.events.length === 0)?(this.events = data):(this.tmpEvents = data))
      this.init()
      //console.log(data)
    }
  },
  methods: {
    init(){
      let tmp = this.tmpEvents
      this.events.forEach(function(item, i){
        item.factors.forEach(function(items, l){
          items.new = false
          if(tmp.length > 0){
            if(tmp[i].factors[l] != null){
              if(tmp[i].factors[l].value !== items.value){
                items.value = tmp[i].factors[l].value
                items.new = true
              }
            }
          }
        })
      })
    },
    customEmit2(data) {
        this.$socket.emit('customEmit2',  {msg: data})
      }
  },
}
</script>

<style scoped>
h1 {
  font-weight: normal;
  color: #42b983;
}
.table{
  width: 90vw;
  position: relative;
  margin: 0 50px;
}
.factors{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.factors tr{
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50px;
    transition: all .8s linear;
}
.new{
  background: #42b983;
}
.new .code{
  color: darkred;
}
.new .value{
  color: lightcyan;
}
</style>
