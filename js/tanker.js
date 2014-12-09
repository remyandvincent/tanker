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
    // Création des évènements
    document.addEventListener("keydown", cliqueEnfonce, false);
    document.addEventListener("keyup", cliqueRelache, false);
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
          deplacementChar();
          collision();
          rendu();
          break;
        case "TERMINE" :
          messageDuJeu();
          break;
        case "AUCUN" :
          messageDuJeu();
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
    function cliqueEnfonce( ev ) {
      if (ev.keyCode == 37) {
        tank.gauche = true;
      }
      if (ev.keyCode == 39) {
        tank.droite = true;
      }
    }
    function cliqueRelache( ev ) {
      if (ev.keyCode == 37) {
        tank.gauche = false;
      }
      if (ev.keyCode == 39) {
        tank.droite = false;
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
      if(ETAT_JEU == "TERMINE") {
        message.style.display = "block";
        bouton1.style.display = "inline-block";
        bouton2.style.display = "inline-block";
        canvas.style.display = "none";
        infos.style.display = "none";
        
        message.textContent = "Souhaitez-vous recommencer une nouvelle partie ?";
        bouton1.textContent = "Oui";
        bouton2.textContent = "Non";
      }
      if(ETAT_JEU == "AUCUN") {
        canvas.style.display = "none";
        infos.style.display = "none";
        
        message.textContent = "Merci d'avoir joué à Tanker !";
        message.style.display = "block";
        bouton1.style.display = "none";
        bouton2.style.display = "none";
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
        if(ETAT_JEU == "TERMINE") {
          
          if (ev.target.textContent == "Oui") {
            niveau = 1;
            var etat_char = document.getElementById("etat_char");
            var vitesse_char = document.getElementById("vitesse_char");
            var mines_evitees = document.getElementById("mines_evitees");
            var niveau_actuel = document.getElementById("niveau_actuel");
            etat_char.textContent = "Etat du char : 100%";
            vitesse_char.textContent = "Vitesse : 10 km/h";
            mines_evitees.textContent = "Nombre de mines évitées : 0";
            niveau_actuel.textContent = "Niveau : 1";
            message.style.display = "none";
            bouton1.style.display = "none";
            bouton2.style.display = "none";
            canvas.style.display = "block";
            infos.style.display = "block";
            ETAT_JEU = "CONSTRUCTION_MAP";
          }
          if (ev.target.textContent == "Non") {
            ETAT_JEU = "AUCUN";
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
    function collision () {
      var hMine = 20;
      var lMine = 20;
      var hChar = 80;
      var lChar = 35;
      for (var i = 0; i < mines.length; i++) {
        
        if((mines[i].posX >= tank.posX + lChar)   // trop à droite
        || (mines[i].posX + lMine <= tank.posX)   // trop à gauche
        || (mines[i].posY >= tank.posY + hChar)   // trop en bas
        || (mines[i].posY + hMine <= tank.posY)) { // trop en haut
            
        }
        else {
          ETAT_JEU = "TERMINE";
        }
      }
    }
    function deplacementChar() {
      tank.posY -= tank.vitesse;
      if (tank.gauche == true) {
        tank.posX -= 5;
      }
      if (tank.droite == true) {
        tank.posX += 5;
      }
      if (tank.posX <= 0) {
        tank.posX = 0;
      }
      if (tank.posX >= canvas.width - 35) {
        tank.posX = canvas.width - 35;
      }
      // Fin du niveau
      if (tank.posY <= -40 ) {
        niveau++;
        miseAjourInfos();
        ETAT_JEU = "CONSTRUCTION_MAP";
      }
    }
    function miseAjourInfos() {
      var etat_char = document.getElementById("etat_char");
      var vitesse_char = document.getElementById("vitesse_char");
      var mines_evitees = document.getElementById("mines_evitees");
      var niveau_actuel = document.getElementById("niveau_actuel");
      var evitees = (niveau - 1) * (4 + (niveau - 1)) + 1;
      var vitesse = niveau * 5 + 5;
      etat_char.textContent = "Etat du char : 100%";
      vitesse_char.textContent = "Vitesse : " + vitesse + " km/h";
      mines_evitees.textContent = "Nombre de mines évitées : " + evitees;
      niveau_actuel.textContent = "Niveau : " + niveau;
    }
    function rendu () {
      // Nettoyage du canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // On dessine les mines
      for (var i = 0; i < mines.length; i++) {
        ctx.drawImage(imageMine, 0, 0, 20, 20, mines[i].posX, mines[i].posY, 20, 20);
      }
      // On dessine le char
      ctx.drawImage(imageChar, 0, 0, 35, 80, tank.posX, tank.posY, 35, 80);
    }
    // Fin des fonctions
  }
};