// подключение библиотеки которая поможет нам делать запросы на различные апи
//npm install --save request -сразу обычный пакет
//npm install --save request-promise -потом именно нужный нам
//но в нете пишут что пакет устрарел

let rp = require('request-promise')

//для экспорта конструкций есть глобальный объект module
module.exports = async function(city = ''){
    if(!city){
        throw new Error('error') //для ошибки
    } 
    const KEY = '6f7b30c0a67ffc9ec66e1d246dc5a586'
    const uri = 'http://api.openweathermap.org/data/2.5/weather'

    const options = {
        uri,
        qs:{
            appid: KEY,
            q: city,
            units: 'imperial'
        },
        json: true


    }

    try{
        const data = await rp(options)
        const celsius = (data.main.temp - 32) * 5/9
        

        return{
            weather: `${data.name}: ${celsius.toFixed(0)}`,
            error: null
        }
    } catch(error){
        return{
            weather:null,
            error: error.error.message
        }
    }

    
}