/*

Titre : Tanker
Version : 1.0
Auteur : RemyAndVincent
Script : initalisation

*/

// Amélioration de la fluidité

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 40);
          };
})();


// Attente du chargement de la page HTML

window.addEventListener("load", initialisation, false);


// Initialisation du canvas et lancement du jeu

function initialisation () {

	canvas = document.getElementById("canvas");

	ctx = canvas.getContext("2d");
}