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

          break;

        case "CONSTRUCTION_MAP" :
                    
          break;

        case "CHRONO" :

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
  }
};