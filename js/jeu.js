/*

Titre : Tanker
Version : 1.0
Auteur : RemyAndVincent
Script : jeu

*/

function lancementJeu (canvas, ctx) {

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

	// Initalisation des évenements
	document.addEventListener("keydown", deplacementTank, false);

	// Fonctionnalités du jeu

	function creationDesMines() {

		var mines = [];

		for (var i = 0; i < 15; i++) {

			var mine = {
				posX : Math.random(Math.floor() * 695),
				posY : Math.random(Math.floor() * 700)
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
	}

	function rendu () {

		requestAnimFrame(rendu);

		// Netoyage de canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Mouvement automatique vers l'avant du char
		tank.posY -= tank.vitesse;

		// On dessine les mines
		for (var i = 0; i < mines.length; i++) {

			ctx.drawImage(image, 0, 0, 20, 20, mines[i].posX,mines[i].posY, 20, 20);
		}

		// On dessine le char à sa nouvelle position
		ctx.drawImage(imageChar, 0, 0, 35, 80, tank.posX,tank.posY, 35, 80);
	}

	// Lancement de la bloucle de rendu
	rendu();
}