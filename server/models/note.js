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

    readAllNotesById: function(id, callback) {
        let query = "SELECT id, note, created, status FROM notes WHERE userId = ? AND active = 1 ORDER BY created ASC";
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err);
                callback(new Error("Error de conexión a la base de datos"), null, null);
            } else {
                connection.query(query, [id], function(err, rows) {
                    connection.release();
                    if (err) {
                        console.log(err);
                        callback(new Error("Error al obtener las notas: " + err), null, null);
                    } else {
                        let completed = [];
                        let nonCompleted = [];
                        rows.forEach(function(row) {
                            let note = {
                                id: row.id,
                                note: row.note,
                                created: moment(row.created).format("DD/MM/YYYY")
                            };
                            if (row.status == 'completed') {
                                completed.push(note);
                            } else {
                                nonCompleted.push(note);
                            }
                        });
                        callback(null, completed, nonCompleted);
                    }
                });
            }
        });
    },

    createNote: function(userId, note, callback) {
        let query = "INSERT INTO notes(userId, note) VALUES(?, ?);";
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err);
                callback(new Error("Error de conexión a la base de datos"), false);
            } else {
                connection.query(query, [userId, note], function(err, result) {
                    connection.release();
                    if (err) {
                        console.log(err);
                        callback(new Error("Error al crear la nota: " + err), false);
                    } else {
                        callback(null, true);
                    }
                });
            }
        });
    },

    completeNote: function(userId, id, callback) {
        let query = "UPDATE notes SET status = 'completed' WHERE id = ? AND userId = ?;";
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err);
                callback(new Error("Error de conexión a la base de datos"), false);
            } else {
                connection.query(query, [id, userId], function(err, result) {
                    connection.release();
                    if (err) {
                        console.log(err);
                        callback(new Error("Error al completar la nota: " + err), false);
                    } else {
                        callback(null, true);
                    }
                });
            }
        });
    },

    deleteNote: function(userId, id, callback) {
        let query = "UPDATE notes SET active = 0 WHERE id = ? AND userId = ?;";
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err);
                callback(new Error("Error de conexión a la base de datos"), false);
            } else {
                connection.query(query, [id, userId], function(err, result) {
                    connection.release();
                    if (err) {
                        console.log(err);
                        callback(new Error("Error al eliminar la nota: " + err), false);
                    } else {
                        callback(null, true);
                    }
                });
            }
        });
    },

    deleteCompletedNotes: function(userId, callback) {
        let query = "UPDATE notes SET active = 0 WHERE userId = ? AND status = 'completed';";
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err);
                callback(new Error("Error de conexión a la base de datos"), false);
            } else {
                connection.query(query, [userId], function(err, result) {
                    connection.release();
                    if (err) {
                        console.log(err);
                        callback(new Error("Error al eliminar las notas completadas: " + err), false);
                    } else {
                        callback(null, true);
                    }
                });
            }
        });
    }

}