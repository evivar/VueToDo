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

    createUser: function(email, username, password, callback) {
        let query1 = "SELECT email, username FROM users WHERE email = ? OR username = ?;"
        let query2 = "INSERT INTO users(email, username, password) VALUES(?,?,?);";
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err);
                callback(new Error("Error de conexión a la base de datos"), false);
            } else {
                connection.query(query1, [email, username], function(err, rows) {
                    if (err) {
                        console.log(err);
                        callback(new Error("Error al registrar nuevo usuario: " + err), false);
                    } else if (rows.length != 0) {
                        console.log(err);
                        callback(new Error("Error al registrar nuevo usuario: " + err), false);
                    } else {
                        connection.query(query2, [email, username, password], function(err, result) {
                            connection.release();
                            if (err) {
                                console.log(err);
                                callback(new Error("Error al registrar nuevo usuario: " + err), false);
                            } else {
                                callback(null, true);
                            }
                        });
                    }
                });
            }
        });
    },

    loginUser: function(username, password, callback) {
        let query = "SELECT id, email, username FROM users WHERE username = ? AND password = ?";
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err);
                callback(new Error("Error de conexión a la base de datos"), false);
            } else {
                connection.query(query, [username, password], function(err, result) {
                    connection.release();
                    if (err || result.length < 1) {
                        console.log(err);
                        callback(new Error("Error login: " + err), false);
                    } else {
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
    },

    updateUser: function(email, username, oldPassword, newPassword, callback) {
        let query1 = "SELECT id FROM users WHERE email = ? AND username = ? AND password = ?";
        let query2 = "UPDATE users SET email = ?, username = ?, password = ? WHERE id = ?";
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err);
                callback(new Error("Error de conexión a la base de datos"), false);
            } else {
                connection.query(query1, [email, username, oldPassword], function(err, result) {
                    if (err || result.length < 1) {
                        console.log(err);
                        callback(new Error("Error: E-mail, usuario y/o contraseña incorrectos, " + err), false);
                    } else {
                        var userId = result[0].id;
                        connection.query(query2, [email, username, newPassword, userId], function(err, result) {
                            connection.release();
                            if (err) {
                                console.log(err);
                                callback(new Error("Error al actualizar el perfil: " + err), false);
                            } else {
                                callback(null, true);
                            }
                        })
                    }
                });
            }
        })
    }

}