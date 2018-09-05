var players = {
    player1: {
        name: "Darth Vader",
        attackPower: 25,
        basePower: 25,
        healthPoints: 180,
        image: "Darth-Vader.png"
    },
    player2: {
        name: "Luke Skywalker",
        attackPower: 20,
        basePower: 20,
        healthPoints: 160,
        image: "Luke-Skywalker.png"
    },
    player3: {
        name: "Obi-Wan Kenobi",
        attackPower: 8,
        basePower: 8,
        healthPoints: 130,
        image: "Obi-Wan-Kenobi.png"
    },
    player4: {
        name: "Yoda",
        attackPower: 5,
        basePower: 5,
        healthPoints: 120,
        image: "Yoda.png"
    }
}

$(document).ready(function() {

    var attacker;
    var defender;

    // render the players
    $.each(players, function(id, player) {
        var playerDiv = $("<div>").addClass("player").attr("id", id);
        var playerName = $("<p>").text(player.name);
        var playerImage = $("<img>").attr("src", "assets/images/" + player.image);
        var playerHealthPoints = $("<p>").attr("id", id + "Hp").text(player.healthPoints);
        playerDiv.append(playerName).append(playerImage).append(playerHealthPoints);
        $("#enemies").append(playerDiv);
    });

    // select attacker and defender
    function selectPlayers() {
        $(".player").on("click", function() {
            if (this.id !== attacker) {
                if (!$("#attacker").html().trim()) {
                    attacker = this.id;
                    $("#attacker").append($("#" + attacker));
                    $("#attackerText").text("YOUR CHARACTER");
                    $("#enemiesText").text("ENEMIES TO ATTACK");
                } else {
                    defender = this.id;
                    $("#defender").append($("#" + defender));
                    $("#defenderText").text("DEFENDER");
                    $(".player").off("click");
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
            // attacker is dead
            $("#attackButton").css("visibility", "hidden");
            $("#" + attacker).fadeOut(4000, function() {
                $("#attack").text("You are dead.");
                $("#counterAttack").text("Game over.");
            });
        }
        if (players[defender].healthPoints <= 0) {
            // defender is dead
            $("#attackButton").css("visibility", "hidden");
            $("#" + defender).fadeOut(4000, function() {
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