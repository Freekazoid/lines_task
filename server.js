const server = require('http').createServer();

const io = require('socket.io')(server, {
  path: '/bids',
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

server.listen(3000);
const name = ["First-","Second-","Third-","Fourth-","Fifth-","Sixth-","Seventh-","Eighth-","Ninth-","Tenth-"];
const Random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const RandomArr = function(x, y, z, t){
    let arr = []
    const sum = Random(z, t)
    do{
        h = Random(x, y)
        if(!(h in arr))
            arr.push(h)
        else
            continue
    }while(arr.length < sum)
    return arr
}
let users = [],
    data = [],//Использование любых технологий и способов хранения информации.
    timer = false


function dataScines(){
    if(data.length<=0){
        for(let i=0; i<100; ++i){
            data.push(//События
                {
                name: name[i<10?i:(String(i).slice(1) )]+"event",
                factors: []//Котировки
                }
            )
            for(let l=0; l<10; ++l){
                data[i].factors.push(
                    {
                        code: (900+l),
                        value: Random(1.01, 15.99)//Котировка принимает значение от 1.01 до 15.99
                    }
                )
            }
        }

      
    } else {
        let persent = 0
        do{
            let arr = RandomArr(0, 99, 31, 99)// не менее 30% событий(event)
            for(i in arr){
                fact = RandomArr(0, 9, 5, 9)
                data[arr[i]].factors = [];
                for(let l=0; l<fact.length; ++l){//Каждой событие имеет от 1 до 10 котировок(factors)
                    data[arr[i]].factors[fact[l]]=
                        {
                            code: (900+fact[l]),
                            value: Random(1.01, 15.99)//"1.01 до 15.99"
                        }
                }            
            }
            for(i in data)
                persent += ((data[i].factors.length>4)?1:0)// 50% событий(event) должно иметь 5 и более котировок

        }while(persent <= 50)//меняет значения не менее 50% котировок(factors)
    }
    return data;
}



io.sockets.on('connection', function (socket) {
    users.push(socket.id);
    //console.log("A user connected");
  });

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        users.splice(users.indexOf(socket.id), 1)
        //console.log("A user disconnected");
        data = [];
    });
    /*
    socket.on('customEmit2', function (msg) {//Получаем с клиента
        console.log("new connect", msg);
    })
    */
    clearInterval(timer)
    timer = setInterval(function tickT() {
        for(i of users)
            if(i.length>0)
                io.sockets.connected[i].emit('customEmit', dataScines())
    }, 1000);//Отправляем клиенту данные

});
