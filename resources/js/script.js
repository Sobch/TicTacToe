// 1 means X, -1 means O

var startingX=true;
var lastX=false;
var gameOn=false;
var size=3;
var toWin=3;
var ticks=0;
var grid;

var x=3;
function create2dSquareArray(size){
	var array = [];
	for (var i=0;i<size;i++) {
		array[i] = [];
	}
	for (i=0;i<size;i++)
		for (j=0;j<size;j++) array[j][i]=false;
	return array;
}

function windowResize(){
	windowSize = $(window).width()+150>$(window).height()?$(window).height()-250:$(window).width()-100;
	$(".grid").css({"width": windowSize, "height": windowSize});
	if (18*(windowSize/200)>10) $("#game h1").css("font-size",(18*(windowSize/200)));
	if (windowSize>=600) $(".grid").css("border-spacing","3px");
		else if (windowSize<600 && windowSize>=320) $(".grid").css("border-spacing","2px");		
		else if (windowSize<320) $(".grid").css("border-spacing","1px");
}

function startup(){
	windowResize();
	showMainMenu();
}

function onEmptyCellClick(){
if (!gameOn) { alert("You messed in DOM!"); return; };
	if (!$(this).hasClass("X") && !$(this).hasClass("O")) {
		ticks++;
		var X = $(this).index();
		var Y = $(this).parent().index();
		if (lastX) {
			lastX=false;
			$(this).addClass("O");
			grid[X][Y]=-1;
			if (isWinner(-1,X,Y)) { $("#turn").text("O wygrał!"); $(".cell").unbind(); setTimeout(function(){ goToEndOptions(-1); }, 1000); return; }
			$("#turn").text("Kolej na X");
		} else {
			lastX=true;
			$(this).addClass("X");
			grid[X][Y]=1;
			if (isWinner(1,X,Y)) {$("#turn").text("X wygrał!"); $(".cell").unbind(); setTimeout(function(){ goToEndOptions(1); }, 1000); return; }
			$("#turn").text("Kolej na O");
		}
		if (ticks == size*size) {
			$("#turn").text("Remis!");
			setTimeout(function(){ goToEndOptions(0); }, 500);
		}
	}
}

function onRadioClick(){
	if ($(this).attr('id') == "gridSize3") {
		$('#toWin4').prop("disabled", true);
		$('#toWin5').prop("disabled", true);
		$('#toWin3').prop("checked","checked");
	};
	if (!$('#gridSize3').prop("checked")){ 
		$('#toWin4').prop("disabled", false); $('#toWin5').prop("disabled", false); }
	
	if ($(this).attr('name')=="gridSize" &&
		($('#toWin4').prop("checked") || $('#toWin5').prop("checked"))) 
		$('#gridSize3').prop("disabled", true);
	
	if ($(this).attr('id') == "toWin4" || $(this).attr('id') == "toWin5") {
		$('#gridSize3').prop("disabled", true);
	} else if ($(this).attr('id') == "toWin3") { $('#gridSize3').prop("disabled", false); }
}

function showMainMenu(){ $("#mainMenu").show(); }
function hideMainMenu(){ $("#mainMenu").hide(); }
function showOptions(){ $("#options").show(); }
function hideOptions(){ $("#options").hide(); }
function showGame(){ $("#game").show(); }
function hideGame(){ $("#game").hide(); }
function showEndOptions(){ $("#endOptions").show(); $("#shadow").show(); }
function hideEndOptions(){ $("#endOptions").hide(); $("#shadow").hide(); }

function goToMainMenu(){
	hideEndOptions(); hideGame(); hideOptions(); 
	showMainMenu();
}

function goToOptions(){
	hideMainMenu(); hideEndOptions(); hideGame(); 

	$('#gridSize3').prop("checked","checked");
	$('#toWin3').prop("checked","checked");
	$('#toWin4').prop("disabled", true);
	$('#toWin5').prop("disabled", true);
	
	showOptions();
}

function goToGame(){
	hideOptions(); hideMainMenu(); hideEndOptions();  
	
	ticks=0;	
	size = $('input[name=gridSize]:checked').val();
	toWin = $('input[name=toWin]:checked').val();
	$(".cell").click(onEmptyCellClick);
	
	grid = create2dSquareArray(size);
	$(".cell").removeClass("X").removeClass("O").removeClass("winning");
	switch (size){
		case "3": 
			$(".5-gameSize").hide();
			$(".8-gameSize").hide();
			$(".15-gameSize").hide();
			$(".5r-gameSize").hide();
			$(".8r-gameSize").hide();
			$(".15r-gameSize").hide();
			break;
		case "5": 
			$(".5-gameSize").show();
			$(".8-gameSize").hide();
			$(".15-gameSize").hide();
			$(".5r-gameSize").show();
			$(".8r-gameSize").hide();
			$(".15r-gameSize").hide();
			break;
		case "8": 
			$(".5-gameSize").show();
			$(".8-gameSize").show();
			$(".15-gameSize").hide();
			$(".5r-gameSize").show();
			$(".8r-gameSize").show();
			$(".15r-gameSize").hide();
			break;
		case "15": 
			$(".5-gameSize").show();
			$(".8-gameSize").show();
			$(".15-gameSize").show();
			$(".5r-gameSize").show();
			$(".8r-gameSize").show();
			$(".15r-gameSize").show();
			break;	
	}	
	if (startingX) { 
		startingX=false; 
		lastX=true;
		$("#turn").text("Kolej na O");
	} else {
		startingX=true; 
		lastX=false;
		$("#turn").text("Kolej na X");
	}
	
	gameOn=true;
	showGame(); 
	
}

function goToEndOptions(winner){
	switch(winner){
		case 0: $("#endOptions h1").text("Remis!"); break;
		case -1: $("#endOptions h1").text("Wygrywa Kółko!"); break;
		case 1: $("#endOptions h1").text("Wygrywa Krzyżyk!"); break;
		default: $("#endOptions h1").text("Remis?"); break;
	}
	hideOptions(); hideMainMenu();   
	showEndOptions();
	gameOn=false;
}


function countTop(value, X, Y){
	if (Y==0) return 0;
	var sum = 0;
	while (grid[X][--Y] == value) { sum+=value; if (Y-1<0) return sum;}
	return sum;
}
function countBottom(value, X, Y){
	if (Y+1==size) return 0;
	var sum = 0;
	while (grid[X][++Y] == value) { sum+=value; if (Y+1>=size) return sum;}
	return sum;
}
function countLeft(value, X, Y){
	if (X==0) return 0;
	var sum = 0;
	while (grid[--X][Y] == value) { sum+=value; if (X-1<0) return sum;}
	return sum;
}
function countRight(value, X, Y){
	if (X+1==size) return 0;
	var sum = 0;
	while (grid[++X][Y] == value) { sum+=value; if (X+1>=size) return sum;}
	return sum;
}
function countTopLeft(value, X, Y){
	if (Y==0 || X==0) return 0;
	var sum = 0;
	while (grid[--X][--Y] == value) { sum+=value; if (Y-1<0 || X-1<0) return sum;}
	return sum;
}
function countTopRight(value, X, Y){
	if (Y==0 || X+1==size) return 0;
	var sum = 0;
	while (grid[++X][--Y] == value) { sum+=value; if (Y-1<0 || X+1>=size) return sum;}
	return sum;
}
function countBottomRight(value, X, Y){
	if (Y+1==size || X+1==size) return 0;
	var sum = 0;
	while (grid[++X][++Y] == value) { sum+=value; if (Y+1>=size || X+1>=size) return sum;}
	return sum;
}
function countBottomLeft(value, X, Y){
	if (Y+1==size || X==0) return 0;
	var sum = 0;
	while (grid[--X][++Y] == value) { sum+=value; if (Y+1>=size || X-1<0) return sum;}
	return sum;
}

function selectTop(value, X, Y){
	X++; Y++;
	if (Y==1) return 0;
	while (grid[X-1][--Y-1] == value) { $('.row:nth-of-type('+Y+') .cell:nth-of-type('+X+')').addClass("winning"); if (Y==1) return; }
}
function selectBottom(value, X, Y){
	X++; Y++;
	if (Y==size) return 0;
	while (grid[X-1][++Y-1] == value) { $('.row:nth-of-type('+Y+') .cell:nth-of-type('+X+')').addClass("winning"); if (Y==size) return; }
}
function selectLeft(value, X, Y){
	X++; Y++;
	if (X==1) return 0;
	while (grid[--X-1][Y-1] == value) { $('.row:nth-of-type('+Y+') .cell:nth-of-type('+X+')').addClass("winning"); if (X==1) return; }
}
function selectRight(value, X, Y){
	X++; Y++;
	if (X==size) return 0;
	while (grid[++X-1][Y-1] == value) { $('.row:nth-of-type('+Y+') .cell:nth-of-type('+X+')').addClass("winning"); if (X==size) return; }
}
function selectTopRight(value, X, Y){
	X++; Y++;
	if (X==size || Y==1) return 0;
	while (grid[++X-1][--Y-1] == value) { $('.row:nth-of-type('+Y+') .cell:nth-of-type('+X+')').addClass("winning"); if (X==size || Y==1) return; }
}
function selectTopLeft(value, X, Y){
	X++; Y++;
	if (X==1 || Y==1) return 0;
	while (grid[--X-1][--Y-1] == value) { $('.row:nth-of-type('+Y+') .cell:nth-of-type('+X+')').addClass("winning"); if (X==1 || Y==1) return; }
}
function selectBottomLeft(value, X, Y){
	X++; Y++;
	if (X==1 || Y==size) return 0;
	while (grid[--X-1][++Y-1] == value) { $('.row:nth-of-type('+Y+') .cell:nth-of-type('+X+')').addClass("winning"); if (X==1 || Y==size) return; } 
}
function selectBottomRight(value, X, Y){
	X++; Y++;
	if (X==size || Y==size) return 0;
	while (grid[++X-1][++Y-1] == value) { $('.row:nth-of-type('+Y+') .cell:nth-of-type('+X+')').addClass("winning"); if (X==size || Y==size) return; }
}
function selectThis(X, Y){
	X++; Y++;
	$('.row:nth-of-type('+Y+') .cell:nth-of-type('+X+')').addClass("winning");
}

function isWinner(value, X, Y){ // 1 is X, -1 is O
	var horizontal = value + countLeft(value, X, Y) + countRight(value, X, Y);
	var vertical = value + countTop(value, X, Y) + countBottom(value, X, Y);
	var leftDiagonal = value + countTopLeft(value, X, Y) + countBottomRight(value, X, Y);
	var rightDiagonal = value + countTopRight(value, X, Y) + countBottomLeft(value, X, Y);
	if (value==-1) {
		if (horizontal == -1 * toWin) { selectThis(X,Y); selectLeft(-1,X,Y); selectRight(-1,X,Y); return true;}
		else if (vertical == -1 * toWin) { selectThis(X,Y); selectTop(-1,X,Y); selectBottom(-1,X,Y); return true;}
		else if (leftDiagonal == -1 * toWin) { selectThis(X,Y); selectTopLeft(-1,X,Y); selectBottomRight(-1,X,Y); return true;}
		else if (rightDiagonal == -1 * toWin) { selectThis(X,Y); selectTopRight(-1,X,Y); selectBottomLeft(-1,X,Y); return true;}
	} else {
		if (horizontal == toWin) { selectThis(X,Y); selectLeft(1,X,Y); selectRight(1,X,Y); return true;}
		else if (vertical == toWin) { selectThis(X,Y); selectTop(1,X,Y); selectBottom(1,X,Y); return true;}
		else if (leftDiagonal == toWin) { selectThis(X,Y); selectTopLeft(1,X,Y); selectBottomRight(1,X,Y); return true;}
		else if (rightDiagonal ==toWin) { selectThis(X,Y); selectTopRight(1,X,Y); selectBottomLeft(1,X,Y); return true;}
	}
	return false;
}


$(function(){
	
	// On page load
	startup();
	
	// On window resize
	$(window).resize(windowResize);
	
	// On empty cell click
	$(".cell").click(onEmptyCellClick);
	
	// On radio click
	$('input:radio').click(onRadioClick);
	
	// On start game in main menu click
	$("a[href$='#options']").click(goToOptions);
	
	// On start game in options click
	$("a[href$='#game']").click(goToGame);
	
	// On go to main menu click
	$("a[href$='#menu']").click(goToMainMenu);
	
});
