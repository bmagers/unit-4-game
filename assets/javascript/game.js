var players = {
    player1: {
        name: "Darth Vader",
        id: "player1",
        healthPoints: 180,
        attackPower: 6,
        baseAttackPower: 6,
        counterAttackPower: 4,
        image: "Darth-Vader.png",
        role: "enemies"
    },
    player2: {
        name: "Luke Skywalker",
        id: "player2",
        healthPoints: 150,
        attackPower: 6,
        baseAttackPower: 6,
        counterAttackPower: 4,
        image: "Luke-Skywalker.png",
        role: "enemies"
    },
    player3: {
        name: "Obi-Wan Kenobi",
        id: "player3",
        healthPoints: 120,
        attackPower: 6,
        baseAttackPower: 6,
        counterAttackPower: 4,
        image: "Obi-Wan-Kenobi.png",
        role: "enemies"
    },
    player4: {
        name: "Yoda",
        id: "player4",
        healthPoints: 100,
        attackPower: 6,
        baseAttackPower: 6,
        counterAttackPower: 4,
        image: "Yoda.png",
        role: "enemies"
    }
}

$(document).ready(function() {

    var attacker;
    var defender;

    // render the players
    $.each(players, function(id, player) {
        var playerDiv = $("<div>").addClass("character").attr("id", id);
        var playerName = $("<p>").text(player.name);
        var playerImage = $("<img>").attr("src", "assets/images/" + player.image);
        var playerHealthPoints = $("<p>").attr("id", id + "Hp").text(player.healthPoints);
        playerDiv.append(playerName).append(playerImage).append(playerHealthPoints);
        $("#enemies").append(playerDiv);
    });

    // select attacker and defender
    $(".character").on("click", function() {
        if (!$("#you").html().trim()) {
            $("#you").append($("#" + this.id));
            attacker = this.id;
            $("#youText").text("YOUR CHARACTER");
            $("#enemiesText").text("ENEMIES TO ATTACK");
        } else {
            $("#defender").append($("#" + this.id));
            $(".character").off("click");
            defender = this.id;
            $("#defenderText").text("DEFENDER");
            $(".attackButton").css("visibility", "visible");
        }
    });

    // attack
    $("<button>").addClass("attackButton").html("ATTACK").appendTo("#defender").click(function() {
        var attackDamage = players[attacker].attackPower;
        var counterAttackDamage = players[defender].counterAttackPower;
        players[defender].healthPoints -= attackDamage;
        players[attacker].healthPoints -= counterAttackDamage;
        $("#" + defender + "Hp").text(players[defender].healthPoints);
        $("#" + attacker + "Hp").text(players[attacker].healthPoints);


        console.log("new defender healthpoints = " + players[defender].healthPoints);
        console.log("new attacker healthpoints = " + players[attacker].healthPoints);


        $("#attack").html("You attacked " + players[defender].name + " for " + attackDamage + " damage.");
        $("#counterAttack").text(players[defender].name + " attacked you back for " + counterAttackDamage + " damage.");
        
    });





})