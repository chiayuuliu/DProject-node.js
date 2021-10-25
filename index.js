require('dotenv').config(); 
const express = require('express')
const fs = require('fs').promises;
const cors = require('cors');
const db = require('./modules/connect-mysql')
//sessionStore要寫在db連線後面, { }設定連線的資料, 之前已連線過, 直接空物件, 後面參數寫連線物件(db)
// const sessionStore = new MysqlStore({}, db);


// 建立web server 物件, express 是一個func
// 設定app為一個express()的fun
const app = express();

const corsOptions = {
    Credentials:true,
    origin:(origin,cb)=>{
        console.log(`origin:${origin}`);
        //沒有錯誤的話前面給空值, true=允許
        cb(null,true); 
    }
}

app.use(cors(corsOptions))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// restful api 作法. /product是baseURL
app.use('/product', require('./routes/product'));




//定義路由結束(一定要放在最後面)
app.use((req,res)=>{
    res.status(404).send(`<h2>找不到頁面</h2>`);
})


let port = process.env.PORT || 3000;

app.listen(port, ()=>{
    const fm = 'YYYY-MM-DD HH:mm:ss';
    console.log(`啟動: ${port}`);

});