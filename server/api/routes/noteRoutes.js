"use strict";

const Note = require('../../models/note');

module.exports = function(router) {

    router.post("/notes/index", function(request, response) {
        Note.readAllNotesById(request.body.id, function(err, completed, nonCompleted) {
            if (err) {
                response.status(500);
                response.json({ message: "Error al obtener las notas", error: err });
            } else {
                response.status(200);
                response.json({ completed: completed, nonCompleted: nonCompleted });
            }
        });
    });

    router.post("/notes/createNote", function(request, response) {
        Note.createNote(request.body.id, request.body.note, function(err, result) {
            if (err) {
                response.status(500);
                response.json({ message: "Error al crear la nota", error: err });
            } else {
                response.redirect(307, '/api/notes/index');
            }
        });
    });

    router.post("/notes/completeNote", function(request, response) {
        Note.completeNote(request.body.id, request.body.noteId, function(err, result) {
            if (err) {
                response.status(500);
                response.json({ message: "Error al completar la nota", error: err });
            } else {
                response.redirect(307, '/api/notes/index');
            }
        });
    });

    router.post("/notes/deleteNote", function(request, response) {
        Note.deleteNote(request.body.id, request.body.noteId, function(err, result) {
            if (err) {
                response.status(500);
                response.json({ message: "Error al eliminar la nota", error: err });
            } else {
                response.redirect(307, '/api/notes/index');
            }
        });
    });

    router.post("/notes/deleteCompletedNotes", function(request, response) {
        Note.deleteCompletedNotes(request.body.id, function(err, result) {
            if (err) {
                response.status(500);
                response.json({ message: "Error al eliminar las notas completadas", error: err });
            } else {
                response.redirect(307, '/api/notes/index');
            }
        });
    })

}