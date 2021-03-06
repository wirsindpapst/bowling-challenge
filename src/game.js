"use strict"

function Game() {
  this._game = []
  this.spareOrStrike = []
  this.bonuses = []
  this.runningTotal = 0
}

Game.prototype.addFrame = function(score){
  this._game.push(score);
};

Game.prototype.returnLastElement = function(lastPosition, array){
  return array[array.length - lastPosition];
};

Game.prototype.determineOutcomeofFrame = function(){
  if(this.returnLastElement(1, this._game)[0] >= 10) {
    this.spareOrStrike.push("strike");
  } else if (this.returnLastElement(1, this._game)[0] + this.returnLastElement(1, this._game)[1] === 10) {
      this.spareOrStrike.push("spare");
    }
    else {
      this.spareOrStrike.push("neither");
    }
};

Game.prototype.calculateBonuses = function(){
  this.bonuses.push([])
  this.calculateSpareBonus();
  this.calculateStrikeBonus();
  if (this.spareOrStrike[9] === "strike"){
    var bonusFrame = new Frame()
    bonusFrame.bowlFinalFrameBonuses(this, "strike")
  } else if (this.spareOrStrike[9] === "spare"){
    var bonusFrame = new Frame()
    bonusFrame.bowlFinalFrameBonuses(this, "spare")
  }
};

Game.prototype.addFinalFrameBonuses = function(bonusBowl){
  for (var i = 0; i < bonusBowl.length; i++) {
    this.bonuses[9].push(bonusBowl[i]);
  }
  if (this.spareOrStrike[8] === "strike"){
    this.bonuses[8].push(bonusBowl[0])
  }
};

Game.prototype.calculateSpareBonus = function(){
  if (this.returnLastElement(2, this.spareOrStrike) === "spare") {
    this.returnLastElement(2, this.bonuses).push(this.returnLastElement(1, this._game)[0]);
  }
};

Game.prototype.calculateStrikeBonus = function(){
  if (this.spareOrStrike[this.spareOrStrike.length-3] === "strike" && this.spareOrStrike[this.spareOrStrike.length-2] === "strike") {
    this.bonuses[this.bonuses.length-3].push(this._game[this._game.length-1][0]);
  }
  if (this.spareOrStrike[this.spareOrStrike.length-2] === "strike" && this.spareOrStrike[this.spareOrStrike.length-1] === "strike") {
    this.bonuses[this.bonuses.length-2].push(this._game[this._game.length-1][0]);
  }
  if (this.spareOrStrike[this.spareOrStrike.length-2] === "strike" && this.spareOrStrike[this.spareOrStrike.length-1] !== "strike"){
    this.bonuses[this.bonuses.length-2].push(this._game[this._game.length-1][0]);
    this.bonuses[this.bonuses.length-2].push(this._game[this._game.length-1][1]);
  }
};

Game.prototype.calculateTotal = function () {
  var merged = [].concat.apply([], this._game);
  for (var i = 0; i < merged.length; i++) {
    this.runningTotal += merged[i];
  }
  var bonusMerged = [].concat.apply([], this.bonuses);
  for (var i = 0; i < bonusMerged.length; i++) {
    this.runningTotal += bonusMerged[i];
  }
};

Game.prototype.scoreEntireGame = function(){
  var game = new Game()
  for (var i = 0; i < 10; i++){
    var frame = new Frame()
    frame.bowlFrame(game);
    frame.resetFrame();
    game.determineOutcomeofFrame();
    game.calculateBonuses();
    console.log("Frame:")
    console.log(i + 1)
    console.log("Frame outcome:")
    console.log(game._game[game._game.length - 1])
    console.log(game.spareOrStrike[game.spareOrStrike.length - 1])
  }
    game.calculateTotal();
    console.log("Final total:");
    console.log(game.runningTotal);
    console.log(game.bonuses);
};
