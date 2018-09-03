var player1 = {
    name: "Darth Vader",
    id: "player1",
    healthPoints: 180,
    attackPower: 6,
    baseAttackPower: 6,
    counterAttackPower: 4,
    image: "Obi-Wan-Kenobi.png",
    role: "enemies",
}

var player2 = {
    name: "Luke Skywalker",
    id: "player2",
    healthPoints: 150,
    attackPower: 6,
    baseAttackPower: 6,
    counterAttackPower: 4,
    image: "Obi-Wan-Kenobi.png",
    role: "enemies",
}

var player3 = {
    name: "Obi-Wan Kenobi",
    id: "player3",
    healthPoints: 120,
    attackPower: 6,
    baseAttackPower: 6,
    counterAttackPower: 4,
    image: "Obi-Wan-Kenobi.png",
    role: "enemies",
}

var player4 = {
    name: "Yoda",
    id: "player4",
    healthPoints: 100,
    attackPower: 6,
    baseAttackPower: 6,
    counterAttackPower: 4,
    image: "Obi-Wan-Kenobi.png",
    role: "enemies",
}

function renderPlayer(player, position) {
    var html = "<div class='character' id='" + player.id + "'><p>" + player.name;
    html += "</p><img src='assets/images/" + player.image;
    html += "'><p>" + player.healthPoints + "</p></div>";
    var positionDiv = "#" + position;
    $(positionDiv).append(html);
}

$(document).ready(function() {
    var players = [player1, player2, player3, player4];
    players.forEach(function(item) {
        renderPlayer(item, "enemies");
    });
    $(".character").on("click", function() {
        console.log(this.id + " clicked");
        if (!$("#you").html().trim()) {
            $("#you").append($("#" + this.id));
            $("#youText").text("YOUR CHARACTER");
            $("#enemiesText").text("ENEMIES AVAILABLE TO ATTACK");
        } else {
            $("#defender").append($("#" + this.id));
            $(".character").off("click");
            $("#defenderText").text("DEFENDER");
        }
    });







})