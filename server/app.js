"use strict";

const express = require("express");
const cors = require('cors');
const path = require("path");
const fs = require('fs');
const mysql = require('mysql');
const dateFormat = require('date-format');
const moment = require('moment');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);
const api = require('./api');

const sessionStore = new MySQLStore({
    host: "localhost",
    user: "root",
    password: "",
    database: "vue-todo"
});

const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});

const app = express();

// const ficherosEstaticos = path.join(__dirname, "public");
// app.use(express.static(ficherosEstaticos));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

//app.use(middlewareSession);

app.use("/api", api);

/*app.use(middlewareNotFound);

app.use(middlewareServerError);

function middlewareNotFound(request, response) {
    response.status(404);
    response.render("error404", { url: request.url });
}

function middlewareServerError(error, request, response, next) {
    response.status(500);
    console.log(error.message);
    response.render("error500", { message: error.message });
}*/

app.listen(3000, function(err) {
    if (err) {
        console.error("No se pudo inicializar el servidor " + err.message);
    } else {
        console.log("Servidor arrancado en puerto 3000");
    }
});