import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import { BrowserRouter } from 'react-router-dom'

ReactDom.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// login(){
//     fetch("http://localhost:8080/login") route côté serveur
//     method: "POST",   <-Définition de la méthode de la requête
//     body: new URLSearchParams(this.state), <- on récupère les valeurs liés aux states 
//     header:{
//              "Content-Type": "application/x-www-form-urlencoded"
//          }
//       })
//          .then(response => {
//              if(response.status === 200){
//                  response.json().then(response => {
//                      console.log(response);
//          }); 
//        }
//        else
//            console.log('Utilisateur non trouvé'); 
//      })
//        .catch(errors => {
//              console.log(errors)
//     })
    
//     }