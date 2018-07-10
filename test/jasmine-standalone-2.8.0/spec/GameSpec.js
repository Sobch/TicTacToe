describe("Game", function() {
	it("should change starting player after every game (When X player starts first time, the second game will start O player and vice-versa)", function() {
		startingPlayer=startingX?"X":"Y";
		if (startingPlayer=="X") expect(startingX).toEqual(true);
			else expect(startingX).toEqual(false);
		goToGame();
		if (startingPlayer=="X") expect(startingX).toEqual(false);
			else expect(startingX).toEqual(true);
		goToGame();
		if (startingPlayer=="X") expect(startingX).toEqual(true);
			else expect(startingX).toEqual(false);
	});
		
	it("can create a two dimentional grid", function() {
		var gridTest=create2dSquareArray(3);
		gridTest[2][2]=2;
		expect(gridTest[2][2]).toEqual(2);
	});
	
	describe("decides if player is a winner ", function() {
		it("first scenario ( Grid size - 3, to win - 3, Diagonal filled with O's, check from middle field if O wins, expected to win )", function() {
			toWin=3;
			size=3;
			grid = [
			  [-1, 0, 0],
			  [ 0,-1, 0],
			  [ 0, 0,-1]
			];
			expect(isWinner(-1,1,1)).toEqual(true);
		});
			
		it("second scenario ( Grid size - 5, to win - 5, Third column filled with X's, check from top middle field if O wins, expected NOT to win )", function() {
			grid=create2dSquareArray(5);
			toWin=5;
			size=5;
			grid = [
			  [ 0, 0, 1, 0, 0],
			  [ 0, 0, 1, 0, 0],
			  [ 0, 0, 1, 0, 0],
			  [ 0, 0, 1, 0, 0],
			  [ 0, 0, 1, 0, 0]
			];
			expect(isWinner(-1,4,2)).toEqual(false);
		});
		
		it("third scenario ( Grid size - 5, to win - 5, Third column filled with X's, check from top middle field if X wins, expected to win )", function() {
			expect(isWinner(1,4,2)).toEqual(true);
		});
		
		it("fourth scenario ( Grid size - 8, to win - 5, winning configuration on diagonal, expected to win )", function() {
			size=8;
			grid = [
			  [ 0, 0, 0, 0, 0, 0, 0, 0],
			  [ 0, 0, 0, 0, 0, 0, 0, 0],
			  [ 0, 0, 1, 0, 0, 0, 0, 0],
			  [ 0, 0, 0, 1, 0, 0, 0, 0],
			  [ 0, 0, 0, 0, 1, 0, 0, 0],
			  [ 0, 0, 0, 0, 0, 1, 0, 0],
			  [ 0, 0, 0, 0, 0, 0, 1, 0],
			  [ 0, 0, 0, 0, 0, 0, 0, 0]
			];
			expect(isWinner(1,1,6)).toEqual(false);
		});
	});
	
	it ("resets the grid when player resets the game", function() {
		size=3;
		toWin=3;
		grid = [
			  [ 1, 1,-1],
			  [ 1,-1, 1],
			  [ 1, 1,-1]
			];
		goToGame();
		for (i=0; i<3; i++) {
			expect(grid[i]).not.toContain(1);
			expect(grid[i]).not.toContain(-1);
		}
	});
});
