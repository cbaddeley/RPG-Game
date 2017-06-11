var blackMage = {
		attack : 5,
		health : 50,
		counter : 5,
		imgLeft : "assets/images/blackMageLeft.png",
		imgRight: "assets/images/blackMageRight.png",
		selectDiv : "#black",
		name: "Black Mage"
	};
var knight = {
		attack : 5,
		health : 50,
		counter : 5,
		imgLeft : "assets/images/knightLeft.png",
		imgRight: "assets/images/knightRight.png",
		selectDiv : "#knight",
		name: "Knight"
	};
var blueMage = {
		attack : 5,
		health : 50,
		counter : 5,
		imgLeft : "assets/images/blueMageLeft.png",
		imgRight: "assets/images/blueMageRight.png",
		selectDiv : "#blue",
		name: "Blue Mage"
	};
var dragoon = {
		attack : 5,
		health : 50,
		counter : 5,
		imgLeft : "assets/images/dragoonLeft.png",
		imgRight: "assets/images/dragoonRight.png",
		selectDiv : "#dragoon",
		name: "Dragoon"
	};
var characters = [blackMage, knight, blueMage, dragoon];
var characterSelect = false;
var oSelect = false;
var addAttack = 0;
var defHealth = 0;
var attHealth = 0;
var initial = false;
var audio = $("#hover")[0];
	
function charSelect(selectedCharacter)  {
	
	if (!characterSelect) {
		console.log(selectedCharacter);
		console.log(selectedCharacter.imgRight);
		console.log($(selectedCharacter).attr("arrRef"));
		$(".loadUp").css("display","block");
		$(selectedCharacter).attr("src", characters[$(selectedCharacter).attr("arrRef")].imgRight);
		$("#attackerName").text(characters[$(selectedCharacter).attr("arrRef")].name);
		$(selectedCharacter).detach().prependTo($("#attackerArea"));
		$("#charSelectScreen > :input").detach().prependTo($("#opponentArea"));
		characterSelect = true;
		$("#charSelectScreen").hide();
		audio = null;
	}
		
	if (oSelect == false && $(selectedCharacter).parent().is("#opponentArea")) {
		$(selectedCharacter).detach().prependTo($("#defenderArea"));
		$("#defenderName").text(characters[$(selectedCharacter).attr("arrRef")].name);
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
		console.log(addAttack);
		console.log(defHealth);
		console.log(attHealth);
	} 

	if (defHealth > 0) {
		defHealth = defHealth - addAttack;
		addAttack = addAttack + characters[$("#attackerArea > :input").attr("arrRef")].attack;
		console.log(defHealth);
		console.log(addAttack);
	}
	if (defHealth > 0) {
		attHealth = attHealth - characters[$("#defenderArea > :input").attr("arrRef")].counter;
		console.log(attHealth);
	}	else {
		oSelect = false;
		$("#defenderName").text("");
		$("#defenderArea > :input").remove();
		

	}
}

for (var i = 0; i < characters.length; i++) {
	$(characters[i].selectDiv).click(function() {
		charSelect(this);
})}


$("#charSelectScreen > :input").mouseenter(function() {
  audio.play();
});

