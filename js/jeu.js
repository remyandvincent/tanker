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

	// Création du tank
	var tank = {
		posX : 280,
		posY : 780,
		vitesse : 1
	}

	// Initalisation des évenements
	document.addEventListener("keydown", deplacementTank, false);


	function deplacementTank( ev ) {

		if (ev.keyCode == 37) {

			tank.positionX -= 10;
		}

		if (ev.keyCode == 39) {

			tank.positionX += 10;
		}
	}

	function rendu () {

		requestAnimFrame(rendu);

		// Netoyage de canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Mouvement automatique vers l'avant du char
		tank.posY -= tank.vitesse;

		// On dessine le char
		ctx.drawImage(imageChar, 0, 0, 35, 80, tank.posX,tank.posY, 35, 80);
	}

	// Lancement de la bloucle de rendu
	rendu();
}