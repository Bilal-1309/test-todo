const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/static", express.static(path.resolve(__dirname, "static")));
app.use(require("./routes"));

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_SERVER);
        console.log('Вы успешно подключились к MongoDB');
        app.listen(port, () => {
            console.log(`Сервер успешно запущен на порте ${port}!`)
        })
    }catch (e) {
        console.log(e);
    }
}
connect();