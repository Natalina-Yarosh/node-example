let express = require('express') //импорт модуля
let bodyParser = require('body-parser') //подключение пакета
let weatherR = require('./requests/weather.request')

//переменная отвечает за все приложение app

let app = express()

//по умолчанию идут файлы ejs
app.set('view engine', 'ejs')

//укажем какой путь явл статическим
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true})) //чтобы в req.body появидись какие-то данные
//get - получаем какие-либо данные
// берется спец файл похожий на index.html в котором будет вся разметка
app.get('/', (req, res) => {
    res.render('index', {weather:null, error:null})
})

//post - возвращаем ту же страницу, но уже с отрендеренным параметром
//req - это то, что мы отправляем как запрос
//res - то, что мы отвечаем на запрос - отображаем 
app.post('/', async (req, res) => {
    let {city} = req.body //меня интересует только поле city  (атрибут name )
    let {weather, error} = await weatherR(city)
    res.render('index', {weather, error})
})



//1 значение - порт на котором будем слушшать наше приложение
//2 - выводим информацию
app.listen(3000, () => {
    console.log('Server has started 3 000' )
})

//если запускаем через nodemon index все изменения сразу без перезагрузки отображаются
//npm run start - запускаем свой скрипт


//npm i ejs - офрмат файлов для шаблонизации html

//npm i body-parser - распарсить то, что внутри body


//6f7b30c0a67ffc9ec66e1d246dc5a586