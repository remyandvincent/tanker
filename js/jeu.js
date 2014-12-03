/*

Titre : Tanker
Version : 1.0
Auteur : RemyAndVincent
Script : jeu

*/

function lancementJeu (canvas, ctx) {

	// Initialisation de la variable du jeu
	var gameOver = 0;
	var finNiveau = 0;

	// Chargement de l'image du char
	var imageChar = new Image();
		imageChar.src = "img/char.png";

	// Chargement de l'image des mines
	var imageMine = new Image();
		imageMine.src = "img/mine.png";

	// Création du tank
	var tank = {
		posX : 280,
		posY : 780,
		vitesse : 1
	}

	// Création des mines
	var mines = creationDesMines();

	// Initalisation des évenements
	document.addEventListener("keydown", deplacementTank, false);

	// Fonctionnalités du jeu

	function creationDesMines() {

		var mines = [];

		for (var i = 0; i < 15; i++) {

			var mine = {
				posX : Math.floor(Math.random() * 570 + 10),
				posY : Math.floor(Math.random() * 700)
			};

			mines.push(mine);
		}

		return mines;
	}


	function deplacementTank( ev ) {

		if (ev.keyCode == 37) {

			tank.posX -= 10;
		}

		if (ev.keyCode == 39) {

			tank.posX += 10;
		}

		if (tank.posX <= 0) {

			tank.posX = 0;
		}

		if (tank.posX >= 565) {

			tank.posX = 565;
		}
	}

	function collision () {

		var hMine = 20;
		var lMine = 20;

		var hChar = 80;
		var lChar = 35;

		for (var i = 0; i < mines.length; i++) {
			
			if((mines[i].posX >= tank.posX + lChar)		// trop à droite
			|| (mines[i].posX + lMine <= tank.posX)		// trop à gauche
			|| (mines[i].posY >= tank.posY + hChar)		// trop en bas
			|| (mines[i].posY + hMine <= tank.posY))	// trop en haut
		    	gameOver = gameOver;
		    else
		    	gameOver = 1;

  		};
	}

	function rendu () {

		if (gameOver == 0 && finNiveau == 0) {
			
			requestAnimFrame(rendu);
		}
		
		else {

			if (gameOver == 1) {

				alert("Game Over");
			}

			else {

				alert("Bravo tu as réussi le niveau");
			}
		}

		// Netoyage de canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Mouvement automatique vers l'avant du char
		tank.posY -= tank.vitesse;

		// On dessine les mines
		for (var i = 0; i < mines.length; i++) {

			ctx.drawImage(imageMine, 0, 0, 20, 20, mines[i].posX, mines[i].posY, 20, 20);
		}

		// On dessine le char à sa nouvelle position
		ctx.drawImage(imageChar, 0, 0, 35, 80, tank.posX, tank.posY, 35, 80);

		collision();

		if (tank.posY <= -40 ) {

			finNiveau = 1;
		}
	}



	// Lancement de la bloucle de rendu
	rendu();
}