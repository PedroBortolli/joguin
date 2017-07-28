var c=document.getElementById("canvas");
var ctx=c.getContext("2d");

var dim = 50, sizeRet = 0, sizeBomb = 0, lost = 0, ok = 0, score = 0, time = 2000;
var timerRet = [], timerBomb = [], xRet = [], yRet = [], xBomb = [], yBomb = [], timerTimeUp = 0, xTimeUp = 2000, yTimeUp = 2000;


var startgame = 0;
c.addEventListener("click", clickPos);

ctx.fillStyle = "white";
ctx.fill();
ctx.font="30px Arial";
ctx.fillStyle = "black";
ctx.fillText("Como jogar:", 800, 150);
ctx.font="15px Arial";
ctx.fillText("A cada segundo um quadrado aleatorio", 800, 200);
ctx.fillText("aparece na tela. Sao eles:", 800, 220);

ctx.beginPath();
ctx.lineWidth="2";
ctx.strokeStyle="red";
ctx.rect(850,240,dim,dim); 
ctx.stroke();

ctx.beginPath();
ctx.lineWidth="2";
ctx.fillStyle="black";
ctx.rect(950,240,dim,dim); 
ctx.fill();
ctx.save();

ctx.fillText("Assim que um quadrado do primeiro tipo", 800, 320);
ctx.fillText("aparecer, clique nele o mais rapido possivel", 800, 340);
ctx.fillText("para elimina-lo. A duracao inicial de cada um", 800, 360);
ctx.fillText("e de 2 segundos. Este tempo vai diminuindo", 800, 380);
ctx.fillText("conforme quadrados sao eliminados!", 800, 400);
ctx.fillText("O outro quadrado e uma bomba. Nao a detone", 800, 420);
ctx.fillText("pois voce perde o jogo automaticamente. Cada", 800, 440);
ctx.fillText("bomba dura 4 segundos. Basta esperar!", 800, 460);
ctx.fillText("A cada 5 segundos este quadrado aparecera:", 800, 520);

ctx.beginPath();
ctx.lineWidth="2";
ctx.fillStyle="yellow";
ctx.rect(850,540,dim,dim);
ctx.fill();
ctx.save();

ctx.fillStyle="black";
ctx.fillText("Este quadrado especial desaparece rapidamente.", 800, 620);
ctx.fillText("Para cada quadrado deste tipo detonado o tempo", 800, 640);
ctx.fillText("de duracao dos quadrados brancos e aumentado.", 800, 660);
ctx.fillText("Portanto sempre tente acerta-lo!", 800, 680);


ctx.beginPath();
ctx.lineWidth="5";
ctx.strokeStyle="black";
ctx.rect(800,20,300,50);
ctx.stroke();
ctx.font="40px Arial";
ctx.fillText("Iniciar!", 890, 60);
ctx.save();


function clickPos(e) {
	if (lost) return;
	var x = e.clientX;
	var y = e.clientY;
	if (!startgame) {
		console.log("game not started, click at " + x + ", " + y);
		if (x >= 806 && x <= 1109 && y >= 27 && y <= 79) {
			startgame = 1;
			console.log("boraaaaaaaaaaaa");
			ctx.beginPath();
			ctx.lineWidth="2";
			ctx.fillStyle="white";
			ctx.rect(797,3,400,700);
			ctx.fill();
			ctx.save();
			setInterval(create, 1000);
			setInterval(timeup, 5000);
			setInterval(decrease_timer, 10);
			setInterval(update_score, 10);
		}
	}
	
	else {	
		console.log("click at pos " + x + ", " + y);
		for (i = 0; i < sizeRet; i++) {
			var thisx = xRet[i];
			var thisy = yRet[i];
			console.log("		checking if it lays inside " + thisx + ", " + thisy);
			if (x-thisx >= 7 && x-thisx <= dim+7 && y-thisy >= 7 && y-thisy <= dim+8) {
				console.log("					it does!!");
				erase_from_canvas(thisx, thisy);
				erase_ret_from_array(thisx, thisy);
				score++;
				break;
			}
		}
		for (i = 0; i < sizeBomb; i++) {
			var thisx = xBomb[i];
			var thisy = yBomb[i];
			if (x-thisx >= 7 && x-thisx <= dim+7 && y-thisy >= 7 && y-thisy <= dim+8) {
				lost = 1;
				break;
			}
		}
		if (x-xTimeUp >= 7 && x-xTimeUp <= dim+7 && y-yTimeUp >= 7 && y-yTimeUp <= dim+8) {
			time += 350;
			erase_from_canvas(xTimeUp, yTimeUp);
		}
	}
}


if (startgame) {

}

function intersects(x, y) {
	if (lost) return;
	//console.log("checking... " + x + " " + y + "    to see if it intersects");
	for (i = 0; i < sizeRet; i++) {
		var thisx = xRet[i];
		var thisy = yRet[i];
		//console.log(thisx + " " + thisy);
		if (Math.abs(thisx-x) < dim+2 && Math.abs(thisy-y) < dim+2) return 1;
	}
	for (i = 0; i < sizeBomb; i++) {
		var thisx = xBomb[i];
		var thisy = yBomb[i];
		//console.log(thisx + " " + thisy);
		if (Math.abs(thisx-x) < dim+2 && Math.abs(thisy-y) < dim+2) return 1;
	}
	if (Math.abs(xTimeUp-x) < dim+2 && Math.abs(yTimeUp-y) < dim+2) return 1;
	return 0;
}

function create_ret() {
	if (lost) return;
	ctx.beginPath();
	ctx.lineWidth="2";
	ctx.strokeStyle="red";
	var x = 0, y = 0;
	while (true) {
		x = Math.floor(Math.random()*600)+50;
		y = Math.floor(Math.random()*350)+50;
		if (intersects(x,y) == 0) break;
	}
	ctx.rect(x,y,dim,dim); 
	ctx.stroke();
	ctx.font="30px Arial";
	ctx.fillText(2, x+10, y+40);
	ctx.save();
	xRet[sizeRet] = x;
	yRet[sizeRet] = y;
	timerRet[sizeRet] = time;
	time -= 70;
	sizeRet++;
}

function create_bomb() {
	if (lost) return;
	ctx.beginPath();
	ctx.lineWidth="2";
	ctx.fillStyle="black";
	var x = 0, y = 0;
	while (true) {
		x = Math.floor(Math.random()*600)+50;
		y = Math.floor(Math.random()*350)+50;
		if (intersects(x,y) == 0) break;
	}
	ctx.rect(x,y,dim,dim); 
	ctx.fill();
	ctx.save();
	xBomb[sizeBomb] = x;
	yBomb[sizeBomb] = y;
	timerBomb[sizeBomb] = 4000;
	sizeBomb++;
}

function create() {
	if (lost) return;
	var x = Math.floor(Math.random()*10)+1;
	if (x <= 2) create_bomb();
	else create_ret();
}

function timeup() {
	if (lost) return;
	ctx.beginPath();
	ctx.lineWidth="2";
	ctx.fillStyle="yellow";
	var x = 0, y = 0;
	while (true) {
		x = Math.floor(Math.random()*600)+50;
		y = Math.floor(Math.random()*350)+50;
		if (intersects(x,y) == 0) break;
	}
	ctx.rect(x,y,dim,dim);
	timerTimeUp = 750;
	xTimeUp = x;
	yTimeUp = y;
	ctx.fill();
	ctx.save();
}

function erase_from_canvas(x, y) {
	if (lost) return;
	ctx.beginPath();
	ctx.lineWidth="2";
	ctx.rect(x-2, y-2, dim+4, dim+4);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.save();
}

function erase_ret_from_array(x, y) {
	if (lost) return;
	var pos = 0;
	for (i = 0; i < sizeRet; i++) {
		if (xRet[i] == x && yRet[i] == y) {
			pos = i;
		}
	}
	for (i = pos; i < sizeRet-1; i++) {
		xRet[i] = xRet[i+1];
		yRet[i] = yRet[i+1];
		timerRet[i] = timerRet[i+1];
	}
	sizeRet--;
}

function erase_bomb_from_array(x, y) {
	if (lost) return;
	var pos = 0;
	for (i = 0; i < sizeBomb; i++) {
		if (xBomb[i] == x && yBomb[i] == y) {
			pos = i;
		}
	}
	for (i = pos; i < sizeBomb-1; i++) {
		xBomb[i] = xBomb[i+1];
		yBomb[i] = yBomb[i+1];
		timerBomb[i] = timerBomb[i+1];
	}
	sizeBomb--;
}

function updateTimerRet(i, t) {
	if (lost) return;
	var x = xRet[i];
	var y = yRet[i];
	ctx.beginPath();
	ctx.lineWidth="2";
	ctx.rect(x+4, y+4, 40, 40);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.font="20px Arial";
	ctx.fillStyle = "black";
	t = t/1000;
	var display = Math.round(t*10)/10;
	ctx.fillText(display, x+10, y+40);
	ctx.save();
}

function decrease_timer() {
	if (lost) return;
	for (i = 0; i < sizeRet; i++) {
		timerRet[i] -= 10;
		updateTimerRet(i, timerRet[i]);
		if (timerRet[i] == 0) {
			lost = 1;
		}
	}
	for (i = 0; i < sizeBomb; i++) {
		timerBomb[i] -= 10;
		if (timerBomb[i] == 0) {
			erase_from_canvas(xBomb[i], yBomb[i]);
			erase_bomb_from_array(xBomb[i], yBomb[i]);
		}
	}
	if (timerTimeUp > 0) {
		console.log("eae");
		timerTimeUp -= 10;
		if (timerTimeUp == 0) {
			erase_from_canvas(xTimeUp, yTimeUp);
			xTimeUp = 2000;
			yTimeUp = 2000;
		}
	}
}

function update_score() {
	if (lost && !ok) {
		ctx.beginPath();
		ctx.lineWidth="2";
		ctx.rect(0, 600, 720, 200);
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.font="50px Arial";
		ctx.fillStyle = "black";
		ctx.fillText("Fim de jogo! Seu score foi de ", 10, 700);
		ctx.fillStyle = "red";
		ctx.fillText(score, 730, 700);
		ctx.font="30px Arial";
		ctx.fillStyle = "black";
		ctx.fillText("Atualize a pagina para um novo jogo", 100, 770);
		ok = 1;
	}
	else if (!lost) {
		ctx.beginPath();
		ctx.lineWidth="2";
		ctx.rect(0, 600, 720, 200);
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.font="50px Arial";
		ctx.fillStyle = "black";
		ctx.fillText("Score: " + score, 200, 700);
	}
}