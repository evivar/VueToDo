"use strict";

const dateFormat = require('date-format');
const moment = require('moment');
const mysql = require('mysql');
const multer = require('multer');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "vue-todo"
});

module.exports = {

    createUser: function (email, username, password, callback) {
        let query = "INSERT INTO users(email, username, password) VALUES(?,?,?);";
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                callback(new Error("Error de conexión a la base de datos").false);
            }
            else {
                connection.query(query, [email, username, password], function (err, result) {
                    connection.release();
                    if (err) {
                        console.log(err);
                        callback(new Error("Error al registrar nuevo usuario: " + err), false);
                    }
                    else {
                        callback(null, true);
                    }
                });
            }
        });
    },

    loginUser: function (username, password, callback) {
        let query = "SELECT id, email, username FROM users WHERE username = ? AND password = ?";
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                callback(new Error("Error de conexión a la base de datos"), false);
            }
            else {
                connection.query(query, [username, password], function (err, result) {
                    connection.release();
                    if (err || result.length < 1) {
                        console.log(err);
                        callback(new Error("Error login: " + err), false);
                    }
                    else {
                        let User = {
                            id: result[0].id,
                            email: result[0].email,
                            username: result[0].username
                        }
                        callback(null, User);
                    }
                });
            }
        });
    }

}