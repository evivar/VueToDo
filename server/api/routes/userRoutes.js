"use strict";

const User = require('../../models/user');

module.exports = function(router){

    router.post("/user/register", function(request, response){
        console.log(request.body)
        User.createUser(request.body.email, request.body.username, request.body.password, function(err, result){
            if(err){
                response.status(500);
                response.json({message: "Error al registrar un nuevo usuario", error: err});
            }
            else{
                response.status(200);
                response.json({message: "Registro completado correctamente", error: null});
            }
        });
    });

    router.post("/user/login", function(request, response){
        User.loginUser(request.body.username, request.body.password, function(err, user){
            if(err){
                response.status(500);
                response.json({message: "Usuario y/o contraseña incorrectos", error: err});
            }
            else{
                response.status(200);
                response.json({user: user});
            }
        });
    });

    // router.post("/user/forgotPassword", function(request, response){
    //     User.readUser(request.body.email, request.body.username, function(err, result){
    //         if(err){
    //             response.status(500);
    //             response.json({message: "E-mail y/o usuario incorrectos", error: err});
    //         }
    //         else{
    //             User.generatePassword(request.body.email, function(err, newPassword){
    //                 if(err){
    //                     response.status(500);
    //                     response.json({message: "Error al generar una nueva contraseña", error: err});
    //                 }
    //                 else{
    //                     //TODO: Enviar email al usuario con la nueva contraseña
    //                 }
    //             })
    //         }
    //     })
    // });

    // router.post("/user/updatePassword", function(request, response){
        
    // });

}