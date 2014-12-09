/*------------------------------*/
/*                              */
/* Jeu         : Tanker         */
/* Version     : 3.0            */
/* Developpeur : remyandvincent */
/* Partie      : javascript     */
/*                              */
/*------------------------------*/


// Gestion des frames pour l'animation en fonction du navigateur
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 50);
          };
})();


// Attente du chargement de la page HTML
window.addEventListener("load", initialisation, false);


// Lancement du jeu
function initialisation () {

  // Si vous souhaitez utiliser le redimensionnement automatique
  Tanker.dimensionUtilisateur();
	
  // Lancer le jeu
  Tanker.jeu();
}

//////////////////////////////////////////////////

var Tanker = {

  imageChar : "img/char.png",

  dimensionUtilisateur : function() {

    var canvasL, canvasH;

    fenetreL = window.innerWidth;
    fenetreH = window.innerHeight;

    canvasH = fenetreH - 40;
    canvasL = Math.floor(canvasH * 3 / 4);

    var infos = document.getElementById("infos");

    var canvas = document.getElementById("canvas");

        canvas.width = canvasL;
        canvas.height = canvasH;
        canvas.style.marginTop = "10px";
        canvas.style.marginLeft = (fenetreL - canvasL) / 2 - 151 + "px";

        //infos.style.marginRight =  fenetreL / 2 - canvasL + 70 + "px";
  },

  jeu : function() {

    // Récupération du canvas
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    // Variables du jeu
    var niveau = 1;
    var tank;
    var ETAT_JEU = "LANCEMENT";
    var lancementTimer = 0;

    // Tableau du jeu
    var mines = [];

    // Chargements des images
    var imageChar = new Image();
        imageChar.src = Tanker.imageChar;

    var imageMine = new Image();
        imageMine.src = "img/mine.png";

    controleJeu();

    // Début des fonctions

    function controleJeu() {

      console.log(ETAT_JEU);

      switch(ETAT_JEU) {
        
        case "LANCEMENT" :

          messageDuJeu();

          break;

        case "CONSTRUCTION_MAP" :
                    
          creationChar();

          creationMines();

          if (niveau == 1) {

            ETAT_JEU = "CHRONO";
          }

          else {

            ETAT_JEU = "EN_JEU";
          }

          break;

        case "CHRONO" :

          if (lancementTimer == 0) {

            lancementTimer = 1;
            starter();
          }

          break;

        case "EN_JEU" :

          break;

        case "TERMINE" :

          break;

        case "AUCUN" :

          break;
      }

      requestAnimFrame(controleJeu);
    }

    function creationMines() {

      mines = [];

      for (var i = 0; i < 5 + niveau; i++) {
          
          var mine = {
            posX : Math.floor(Math.random() * (canvas.width - 40) + 10),
            posY : Math.floor(Math.random() * (canvas.height - 220))
          };

          mines.push(mine); 
      }
    }

    function creationChar() {

      if (niveau == 1) {

        tank = {
            gauche : false,
            droite : false,
            posX : Math.floor(canvas.width / 2) - 17,
            posY : canvas.height - 40,
            vitesse : 1
        }
      }

      else {

        var ancienTank = tank;

        tank = {
            gauche : ancienTank.gauche,
            droite : ancienTank.droite,
            posX : ancienTank.posX,
            posY : canvas.height - 40,
            vitesse : 1 + (niveau / 4)
        }
      }
    }

    function messageDuJeu() {

      var canvas = document.getElementById("canvas");

      var infos = document.getElementById("infos");

      var message = document.getElementById("message");
          message.style.marginTop = window.innerHeight / 2 - 60 + "px";

      var bouton1 = document.getElementById("bouton1");
          bouton1.style.marginLeft = window.innerWidth / 2 - 201 + "px";

      var bouton2 = document.getElementById("bouton2");

      if(ETAT_JEU == "LANCEMENT") {

        message.textContent = "Soldat êtes-vous prêt à survivre ?";
        bouton1.textContent = "Oui";
        bouton2.textContent = "Non";
      }

      document.addEventListener("click", function(ev) {

        if(ETAT_JEU == "LANCEMENT") {

          if (ev.target.textContent == "Oui") {

            message.style.display = "none";
            bouton1.style.display = "none";
            bouton2.style.display = "none";

            canvas.style.display = "block";
            infos.style.display = "block";

            ETAT_JEU = "CONSTRUCTION_MAP";
          }
        }
      }, false);

    }

    function starter() {

      var debut = 6;

      var timer = setInterval(function(){

        debut--;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font="20px Arial";
        ctx.fillStyle="white";
        ctx.fillText("Vous serez dans votre tank dans " + debut + " secondes.", canvas.width / 2 - 195, canvas.height / 2 - 20);
        ctx.fillText("Tenez vous prêt soldat !", canvas.width / 2 - 100, canvas.height / 2 + 20);

        if (debut == 0) {

          clearInterval(timer);

          lancementTimer = 0;

          ETAT_JEU = "EN_JEU";
        }

      }, 1000);
    }
  }
};