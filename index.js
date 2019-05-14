//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.  
var express = require('express'); 
const bodyParser = require("body-parser"); 
//instanciation d'une application Express
const app = express();
app.use(bodyParser.json()); // Active la possibilité de récupérer les paramètres transmis avec la méthode HTTP POST

// Nous définissons ici les paramètres du serveur.
var hostname = 'localhost'; 
var port = 3000; 

/*let answer = [{"date": "2019-01-31",
			   "slots": {
				    "1000": { "isAvailable": true },
				    "1030": { "isAvailable": true },
				    "1100": { "isAvailable": true },
				    "1130": { "isAvailable": true },
				    "1400": { "isAvailable": true },
				    "1430": { "isAvailable": true },
				    "1500": { "isAvailable": true },
				    "1530": { "isAvailable": true },
				    "1600": { "isAvailable": true },
				    "1630": { "isAvailable": true },
				    "1700": { "isAvailable": true },
				    "1730": { "isAvailable": true }
				}    
  			}];*/

let answer =[];

 
//Afin de faciliter le routage (les URL que nous souhaitons prendre en charge dans notre API), nous créons un objet Router.
//C'est à partir de cet objet myRouter, que nous allons implémenter les méthodes. 
var myRouter = express.Router(); 
 
myRouter.route('/visits')

// GET Method
.get(function(req,res){ 
	// Display the availabilities for this date 
	for (var i = 0; i < answer.length; i++) {
		if(answer[i].date === req.query.date ){
			res.status(200).json(answer[i]);
		}	
	}
	res.status(200).json("Aucune réservation à cette date");
})

//POST Method
.post(function(req,res){

  for (var i = 0; i < answer.length; i++) {
  	// If date is already in the array
  	if(answer[i].date === req.body.date){
  		// If it's available yet
  		if(answer[i].slots[req.body.slot].isAvailable){
	  		answer[i].slots[req.body.slot].isAvailable = false;
	  		answer[i].slots[req.body.slot].name = req.body.name;

	  		res.status(200).json({message : "Successfuly booked"});
	  		res.status(200).json(answer[i]);
  		}
  		else {
  			res.status(400).json({message : "Slot already booked"});
  		}
  	}
  	
  }
    // If it's a new date add it in the array
  	answer.push({"date" : req.body.date, "slots" : {
										    "1000": { "isAvailable": true },
										    "1030": { "isAvailable": true },
										    "1100": { "isAvailable": true },
										    "1130": { "isAvailable": true },
										    "1400": { "isAvailable": true },
										    "1430": { "isAvailable": true },
										    "1500": { "isAvailable": true },
										    "1530": { "isAvailable": true },
										    "1600": { "isAvailable": true },
										    "1630": { "isAvailable": true },
										    "1700": { "isAvailable": true },
										    "1730": { "isAvailable": true }
										}
				});
	//update its fields
	answer[answer.length-1].slots[req.body.slot].isAvailable = false;
	answer[answer.length-1].slots[req.body.slot].name = req.body.name;
  
})

myRouter.route('/')
// all permet de prendre en charge toutes les méthodes. 
.all(function(req,res){ 
      res.json({message : "Bienvenue sur notre site de réservation ", methode : req.method});
});
 
// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);  
 
// Démarrer le serveur 
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port); 
});

