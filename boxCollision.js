//Tom Fan
//Tool of box Collision
function boxCollision(object1, object2) {
    if (
        object1.position.x + object1.width >= object2.position.x &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.y + object1.height >= object2.position.y &&
        object1.position.y <= object2.position.y + object2.height
    )
        return true
}
//------------------------------------------------------------
//Tool of circle Collision
function circleCollision(object1, object2) {
    var dx = (object1.position.x + object1.radius) - (object2.position.x + object2.radius);
    var dy = (object1.position.y + object1.radius) - (object2.position.y + object2.radius);
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < object1.radius + object2.radius) { return true }
}
//------------------------------------------------------------
//Tool of circle to box Collision
function circleAndBoxCollision(circle, box) {
    distanceX = Math.abs(circle.position.x - (box.position.x + box.width / 2));
    distanceY = Math.abs(circle.position.y - (box.position.y + box.height / 2));

    if (distanceX > (box.width / 2 + circle.r)) { return false; }
    if (distanceY > (box.height / 2 + circle.r)) { return false; }

    if (distanceX <= (box.width / 2)) { return true; }
    if (distanceY <= (box.height / 2)) { return true; }
}
//------------------------------------------------------------
function playerWindDefect() {
    for (var i = 0; i < AllEnemy.length; i++) {
        if (boxCollision(PlayerWind, AllEnemy[i]) == true) {
            for (var j = 0; j < 4; j++) {
                hitEffects.push(new hitEffect(AllEnemy[i].position.x, AllEnemy[i].position.y, AllEnemy[i].width, AllEnemy[i].height));
            }
            AllEnemy[i].hp -= Player.attack
            if (AllEnemy[i].hp <= 0) {
                score += AllEnemy[i].reward
                AllEnemy.splice(i, 1)
            }
        }
    }
}
//------------------------------------------------------------
function defect() {
    for (var i = 0; i < AllEnemy.length; i++) {
        if (boxCollision(Player, AllEnemy[i]) == true) {
            AllEnemy[i].hp -= Player.attack
            if (AllEnemy[i].hp <= 0) {
                score += AllEnemy[i].reward
                AllEnemy.splice(i, 1)
            }
        }
    }
}
//------------------------------------------------------------
function castleDefect() {
    for (var i = 0; i < AllEnemy.length; i++) {
        if (boxCollision(Castle, AllEnemy[i]) == true) {
            Castle.hp -= AllEnemy[i].attack
            hitEffects.push(new hitEffect(Castle.position.x, Castle.position.y, Castle.width, Castle.height));
            AllEnemy[i].speed = 0
        }
    }
}
//------------------------------------------------------------
function SlashDefect() {
    for (var a = 0; a < Slashs.length; a++) {
        for (var i = 0; i < AllEnemy.length; i++) {
            if (boxCollision(Slashs[a], AllEnemy[i]) == true) {
                for (var j = 0; j < 4; j++) {
                    hitEffects.push(new hitEffect(AllEnemy[i].position.x, AllEnemy[i].position.y, AllEnemy[i].width, AllEnemy[i].height));
                }
                AllEnemy[i].hp -= Player.attack
                if (AllEnemy[i].hp <= 0) {
                    score += AllEnemy[i].reward
                    AllEnemy.splice(i, 1)
                }
            }
        }
    }
}
//------------------------------------------------------------
function ThundersDefect() {
    for (var a = 0; a < Thunders.length; a++) {
        for (var i = 0; i < AllEnemy.length; i++) {
            if (circleAndBoxCollision(Thunders[a], AllEnemy[i]) == true) {
                for (var j = 0; j < 4; j++) {
                    hitEffects.push(new hitEffect(AllEnemy[i].position.x, AllEnemy[i].position.y, AllEnemy[i].width, AllEnemy[i].height));
                }
                AllEnemy[i].hp -= Player.attack
                if (AllEnemy[i].hp <= 0) {
                    score += AllEnemy[i].reward
                    AllEnemy.splice(i, 1)
                }
            }
        }
    }
}
//------------------------------------------------------------
function WaterBallDefect() {
    for (var a = 0; a < WaterBallRelease.length; a++) {
        for (var i = 0; i < AllEnemy.length; i++) {
            if (circleAndBoxCollision(WaterBallRelease[a], AllEnemy[i]) === true) {
                hitEffects.push(new hitEffect(AllEnemy[i].position.x, AllEnemy[i].position.y, AllEnemy[i].width, AllEnemy[i].height));
                AllEnemy[i].hp -= Player.attack
                if (AllEnemy[i].hp <= 0) {
                    score += AllEnemy[i].reward
                    AllEnemy.splice(i, 1)
                }
            }
        }
    }
}