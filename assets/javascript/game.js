var players = {
    player1: {
        name: "Darth Vader",
        id: "player1",
        healthPoints: 180,
        attackPower: 15,
        basePower: 15,
        image: "Darth-Vader.png",
        role: "enemies"
    },
    player2: {
        name: "Luke Skywalker",
        id: "player2",
        healthPoints: 160,
        attackPower: 12,
        basePower: 12,
        image: "Luke-Skywalker.png",
        role: "enemies"
    },
    player3: {
        name: "Obi-Wan Kenobi",
        id: "player3",
        healthPoints: 130,
        attackPower: 8,
        basePower: 8,
        image: "Obi-Wan-Kenobi.png",
        role: "enemies"
    },
    player4: {
        name: "Yoda",
        id: "player4",
        healthPoints: 120,
        attackPower: 5,
        basePower: 5,
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
    function selectPlayers() {
        $(".character").on("click", function() {
            if (this.id !== attacker) {
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
            }
        });
    }

    selectPlayers();

    // attack
    $("<button>").addClass("attackButton").attr("id", "attackButton").html("ATTACK").appendTo("#defender").click(function() {
        var attackDamage = players[attacker].attackPower;
        var counterAttackDamage = players[defender].basePower;
        players[defender].healthPoints -= attackDamage;
        players[attacker].healthPoints -= counterAttackDamage;
        $("#" + defender + "Hp").text(players[defender].healthPoints);
        $("#" + attacker + "Hp").text(players[attacker].healthPoints);
        $("#attack").html("You attacked " + players[defender].name + " for " + attackDamage + " damage.");
        $("#counterAttack").text(players[defender].name + " attacked you back for " + counterAttackDamage + " damage.");
        players[attacker].attackPower += players[attacker].basePower;
        if (players[attacker].healthPoints <= 0) {
            // you are dead
            $("#gameOver").text("You are dead. Game over.");
        }
        if (players[defender].healthPoints <= 0) {
            // he is dead
            $("#attackButton").css("visibility", "hidden");
            $("#" + defender).fadeOut(5000, function() {
                $("#attack").text(players[defender].name + " is dead.");
                if ($("#enemies").html().trim()) {
                    $("#counterAttack").text("Select another enemy.");
                    selectPlayers();
                } else {
                    $("#counterAttack").text("You have no more enemies.");
                }
            });
        }
    });

})