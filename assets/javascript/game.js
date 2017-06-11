function characterCreation(attack, health, counter, imgLeft, imgRight, imgDeadLeft, imgDeadRight, selectDiv, name) {
  this.attack = attack;
  this.health = health;
  this.counter = counter;
  this.imgLeft = imgLeft;
  this.imgRight = imgRight;
  this.imgDeadLeft = imgDeadLeft;
  this.imgDeadRight = imgDeadRight;
  this.selectDiv = selectDiv;
  this.name = name;
}

var blackMage = new characterCreation(16, 240, 30, "assets/images/blackMageLeft.png", "assets/images/blackMageRight.png", "assets/images/blackMageDeadLeft.png", "assets/images/blackMageDeadRight.png", "#black", "Black Mage");
var knight = new characterCreation(28, 200, 20, "assets/images/knightLeft.png", "assets/images/knightRight.png", "assets/images/knightDeadLeft.png", "assets/images/knightDeadRight.png", "#knight", "Knight");
var blueMage = new characterCreation(10, 260, 50, "assets/images/blueMageLeft.png", "assets/images/blueMageRight.png", "assets/images/blueMageDeadLeft.png", "assets/images/blueMageDeadRight.png", "#blue", "Blue Mage");
var dragoon = new characterCreation(15, 300, 45, "assets/images/dragoonLeft.png", "assets/images/dragoonRight.png", "assets/images/dragoonDeadLeft.png", "assets/images/dragoonDeadRight.png", "#dragoon", "Dragoon");

var characters = [blackMage, knight, blueMage, dragoon];
var characterSelect = false;
var oSelect = false;
var addAttack = 0;
var defHealth = 0;
var attHealth = 0;
var initial = false;
var audio = $("#hover")[0];
var victorySound = $("#victorySound")[0];
var gameOverSound = $("#gameOverSound")[0];
var music = $("#musicSound")[0];
var attackSound = $("#attackSound")[0];
var wins = 0;
	
function charSelect(selectedCharacter)  {
	
	if (!characterSelect) {
		$(".loadUp").css("display","block");
		$(selectedCharacter).attr("src", characters[$(selectedCharacter).attr("arrRef")].imgRight);
		$("#attackerName").text(characters[$(selectedCharacter).attr("arrRef")].name);
		$(selectedCharacter).detach().prependTo($("#attackerArea"));
		$("#attackerHealth").text("HP: " + characters[$(selectedCharacter).attr('arrRef')].health + " / " + characters[$(selectedCharacter).attr('arrRef')].health);
		$("#charSelectScreen > :input").detach().prependTo($("#opponentArea"));
		characterSelect = true;
		$("#charSelectScreen").hide();
		audio = null;
	}
		
	if (oSelect == false && $(selectedCharacter).parent().is("#opponentArea")) {
		$("#defenderArea > :input").remove();
		$(selectedCharacter).detach().prependTo($("#defenderArea"));
		$("#defenderName").text(characters[$(selectedCharacter).attr("arrRef")].name);
		$("#defenderHealth").text("HP: " + characters[$(selectedCharacter).attr('arrRef')].health + " / " + characters[$(selectedCharacter).attr('arrRef')].health);
		$("#healthBarDef").css("display","block");
		oSelect = true;
		defHealth = characters[$("#defenderArea > :input").attr("arrRef")].health;
	}
	
}

// function selectOpponent() {
// 	$(":input").click(function() {
		
// 	});
// }

function attack() {
	if (initial == false) {
		addAttack = characters[$("#attackerArea > :input").attr("arrRef")].attack;
		attHealth = characters[$("#attackerArea > :input").attr("arrRef")].health;
		initial = true;
	} 
	if (defHealth > 0) {
		attackSound.play();
		defHealth = defHealth - addAttack;
		addAttack = addAttack + characters[$("#attackerArea > :input").attr("arrRef")].attack;
		$("#defenderHealth").text("HP: " + defHealth + " / " + characters[$("#defenderArea > :input").attr("arrRef")].health);
		$("#defHealthPerct").width(function(n, c){
        return (defHealth / characters[$("#defenderArea > :input").attr("arrRef")].health) * 100;
        });
	}
	if (defHealth > 0) {
		attHealth = attHealth - characters[$("#defenderArea > :input").attr("arrRef")].counter;
		$("#attackerHealth").text("HP: " + attHealth + " / " + characters[$("#attackerArea > :input").attr("arrRef")].health);
		$("#attHealthPerct").width(function(n, c){
        return (attHealth / characters[$("#attackerArea > :input").attr("arrRef")].health) * 100;
        });
	} 
	if (defHealth <= 0 && oSelect) {
		oSelect = false;
		$("#defenderName").text("");
		$("#defenderHealth").text("");
		$("#healthBarDef").css("display","none");
		wins++;
		$("#defHealthPerct").width(function(n, c){
        return (100 / 100) * 100;
        });
		$("#defenderArea > :input").attr("src", characters[$("#defenderArea > :input").attr("arrRef")].imgDeadLeft);
		}
	if (attHealth < 1) {
		$("#attackerArea > :input").attr("src", characters[$("#attackerArea > :input").attr("arrRef")].imgDeadRight);
		$("#attackerArea > :input").animate({ height: "400px", width: "400px"});
		$("#instructions").animate({ opacity: "0" });
		$("#attackButton").css("display", "none");
		$("#statsArea").animate({ opacity: "0" });
		$("#defenderArea").animate({ opacity: "0" });
		$("#opponentArea").animate({ opacity: "0" });
		$("#gameOver").css("display", "block");
		$("#playAgain").css("display", "block");
		$("#gameOver").animate({ left: "+=1100px" }, "slow");
		music.pause();
		gameOverSound.play();
	}
	if (wins == 3) {
		$("#attackerArea > :input").animate({ height: "400px", width: "400px"});
		$("#instructions").animate({ opacity: "0" });
		$(":button").css("display", "none");
		$("#defenderArea").animate({ opacity: "0" });
		$("#statsArea").animate({ opacity: "0" });
		$("#victory").css("display", "block");
		$("#victory").animate({ left: "+=1240px" }, "slow");
		$("#playAgain").css("display", "block");
		music.pause();
		victorySound.play();
	}
}

for (var i = 0; i < characters.length; i++) {
	$(characters[i].selectDiv).click(function() {
		charSelect(this);
})}

	$("#charSelectScreen > :input").mouseenter(function() {
 		if (!characterSelect) {
 		audio.play();
 		}
	});

$(document).ready(function() {
    music.play();
});

$('#playAgain').click(function() {
    location.reload();
});

