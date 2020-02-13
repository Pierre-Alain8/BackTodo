// Déclarations des dépendances

const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// Initialisation de la connexion a la base de données
mongoose.connect('mongodb://localhost/todoList', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// Récuperation des models
let User = require('./models/user');
let Tasks = require('./models/tasks'); 
let List = require('./models/list');

// Déclarations des routes de notre application
app.route('/').get(function(req, res) {
    res.send('hello world !');
});


// Route register user : Cette requête va recuperer ce qui est indiqué au sein du body, 
// si la valeurs des paramètres demandés sont vides la connexion ne peut s'effectuer.
app.route('/register').post(function (req, res) {

    // const name = req.body.name; 
    // // const email= req.body.email; 
    // const password = req.body.password;

    bcrypt.hash(req.body.password, 10, function(err, hash) {

        let user = new User({
            name : req.body.name,
            email : req.body.email, 
            password : hash
        }); 

        if (user.name !== null && user.email !== null && user.password !== null) {
                
                
            user.save(function(err, data){
                        
        
                if(err)
                    res.send(err)
        
                if(data)
                    res.send(data)
        
        
                });
        };

    });

});

        
    

// Route login : La route login permet de post l'email et le password de l'utilisateur qui a été créé afin de comparer le post qui a été effectué par le register.
// Si le user existe bien, la connexion peut s'effecuter.

app.route('/login').post(function(req, res){
 

    User.findOne({email: req.body.email}, function(err, data){

        console.log(req.body.email);

        if(data){

            bcrypt.compare(req.body.password, data.password, function(err, result){
            
                if(result){
                    let token = jwt.sign({id: data._id}, "maclefsecrete");
                    // le premier paramètre de la fonction sign et la data qu'on souhaite stocker dans le token
                    // le second paramètre est le nom de la clés de cryptage
                    let response = {user: data, token: token};
                    res.send(response);
                }

                else
                    res.send(err);
               
            });
        }
        else 
            res.send(err);
       
    })

});


// Route users : retourne l'ensemble des user inscrits 
app.route('/users').get(function(req, res){
    // insérer jwt avec rôle
    User.find({}, function(err, data) {
        res.send(data);
    });
});


// Route List : création d'une liste
app.route('/addList').post(function(req, res){

    jwt.verify(req.headers["x-access-token"], "maclefsecrete", function(err, decoded){ 
        // verify() permet de vérifier le token
        // on envoie les token dans le header
        // decoded est un objet qui correspond à la base de notre token

        if (err) 
            res.send(err)
        else {

            let list = new List({
                name: req.body.name, 
                // userId: req.body["userId[]"]
                userId: [decoded.id]
                
            });
        
            list.save(function(err,data){
         
        
                    if(err)
                        res.send(err)
            
                    else(data)
                        res.send(data)
                
        
            });

        };

    });
 

    

});


// Route updateUser : permet d'update le user afin d'afficher ses listes dans la route userList
app.route('/updateUser').put(function(req, res){

    jwt.verify(req.headers["x-access-token"], "maclefsecrete", function(err, decoded){

        if(err) 
            res.send(err)    

        else{
            User.updateOne({_id: [decoded.id]},{$set : {listId : req.body['listId[]']}}, function(err, data){

                if(err)
                    res.send(err); 

                else 
                    res.send(data)

            });
        }
    });
});


// Route list : permet retourner l'ensemble des list créées
app.route('/list').get(function(req, res){

    List.find({}, function(err, data){
        res.send(data); 
    });
});


// Route userList : permet de récuperer un user ainsi que ses list créées 
app.route('/userList/:id').get(function(req, res){

    jwt.verify(req.headers["x-access-token"], "maclefsecrete", function(err, decoded){

        if(err)
            res.send(err)

        else {
            User.findOne({_id: decoded.id}).populate('listId[]').exec(function (err,data) {

                if(err)
                    res.send(err); 
                else 
                    res.send(data)
            });
        }
    });

});

// Route deleteList : cette permet de supprimer une list
app.route('/deleteList/:id').delete(function(req, res){

    jwt.verify(req.headers["x-access-token"], "maclefsecrete", function(err, decoded){

        if(err)
            res.send(err)

        else{
            Tasks.deleteMany({listId: req.params.id}, function(err, params){

                if(err)
                    res.send(err)
                else{

                    List.deleteOne({ listId: req.params.id}, function(err, data){ 

                        if(err)
                            res.send(err);
                        else{
                            res.send(data)
                        }
        
                    });

                }
            })
           
        };
    });

});


// Route Tasks : création d'une tasks

app.route('/addTasks').post(function(req, res){

    jwt.verify(req.headers["x-access-token"], "maclefsecrete", function(err, decoded){ 
        // verify() permet de vérifier le token
        // on envoie les token dans le header
        // decoded est un objet qui correspond à la base de notre token

        if (err) 
            res.send(err)
        else {

            let tasks = new Tasks({
                name: req.body.name, 
                // userId: req.body["userId[]"]
                userId: [decoded.id]
                
            });
        
            tasks.save(function(err,data){
         
        
                    if(err)
                        res.send(err)
            
                    else(data)
                        res.send(data)
                
        
            });

        };

    });
   
});

// Route updateList : permet d'update les afin d'afficher ses tasks dans la route 
app.route('/updateList/:id').put(function(req, res){

    jwt.verify(req.headers["x-access-token"], "maclefsecrete", function(err, decoded){

        if(err) 
            res.send(err)    

        else{
            List.updateOne({listId: req.body.id},{$set : {tasksId : req.body['tasksId[]']}}, function(err, data){

                if(err)
                    res.send(err); 

                else 
                    res.send(data)

            });
        }
    });
});

// Route tasks : permet retourner l'ensemble des tasks créées
app.route('/tasks').get(function(req, res){

    Tasks.find({}, function(err, data){
        res.send(data); 
    });
});

// Route userTasks : permet de récuperer un user ainsi que ses list créées 
app.route('/listTasks/:id').get(function(req, res){

    jwt.verify(req.headers["x-access-token"], "maclefsecrete", function(err, decoded){

        if(err)
            res.send(err)

        else {
            List.findOne({listId: req.body.id}).populate('tasksId[]').exec(function (err,data) {

                if(err)
                    res.send(err); 
                else 
                    res.send(data)
            });
        }
    });

});





// Mise en écoute de notre application (sur le port 3000)
app.listen(3000);
