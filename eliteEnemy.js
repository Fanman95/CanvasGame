class newEliteObject {
    constructor(x1, y1, x2, y2, img, scale, v, framesLength, framesTriggerRequired, hp, atk, reward, blurColor) {
        this.speed = v
        this.id = currentId++
        this.velocity = {
            x: 0,
            y: 0
        }
        this.scale = scale
        this.image = img
        this.width = this.image.width / framesLength * this.scale
        this.height = this.image.height * this.scale
        this.position = {
            x: x1,
            y: y1
        }
        this.centerPosition = {
            x: x1 + this.width / 2,
        }
        this.targetPosition = {
            x: x2,
            y: y2
        }
        this.frames = 0
        this.framesTriggerRequired = framesTriggerRequired
        this.framesLength = framesLength
        this.framesTrigger = 0
        this.blurColor = blurColor
        this.hp = hp
        this.maxHP = this.hp
        this.hpBarLength = this.width
        this.hpBarLengthPercent = 1

        this.attack = atk
        this.reward = reward
    }

    draw() {
        ctx.shadowBlur = 30;
        ctx.shadowColor = this.blurColor;

        ctx.beginPath();
        ctx.ellipse(this.centerPosition.x, this.position.y + this.height, this.width / 2, this.width / 10, 0, 0, 2 * Math.PI);
        ctx.fillStyle = this.blurColor
        ctx.fill();
        ctx.closePath();

        ctx.drawImage(
            this.image,
            this.image.width / this.framesLength * this.frames,
            0,
            this.image.width / this.framesLength,
            this.image.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

        ctx.shadowBlur = 0;


        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "grey";
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.position.x + this.hpBarLength, this.position.y);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = "red";
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.position.x + this.hpBarLength * this.hpBarLengthPercent, this.position.y);
        ctx.stroke();
        ctx.closePath();
    }

    update() {
        this.framesTrigger++
        if (this.framesTrigger % this.framesTriggerRequired == 0) {
            this.frames++
        }

        if (this.frames >= this.framesLength) {
            this.frames = 0
        }
        this.draw()

        var dy = this.targetPosition.y - this.position.y
        var dx = this.targetPosition.x - this.position.x
        var angle = Math.atan2(dy, dx)

        this.velocity.x = Math.cos(angle) * this.speed
        this.velocity.y = Math.sin(angle) * this.speed

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.centerPosition.x += this.velocity.x

        this.hpBarLengthPercent = 1 - ((this.maxHP - this.hp) / this.maxHP)
    }
}

function addEliteIna() {
    setInterval(() => {
        if (keyID !== 'KeyP') {
            var RandomGateForIna = Math.round(Math.random() * 3)

            switch (RandomGateForIna) {
                case 0:
                    AllEnemy.push(new newEliteObject(Portals[0].position.x, Portals[0].position.y, c.width / 2, c.height / 2, InaRight, 0.1, 3, 8, 2, 1000, 100, 200, '#443a68'));
                    break;
                case 1:
                    AllEnemy.push(new newEliteObject(Portals[1].position.x, Portals[1].position.y, c.width / 2, c.height / 2, InaLeft, 0.1, 3, 8, 2, 1000, 100, 200, '#443a68'));
                    break;
                case 2:
                    AllEnemy.push(new newEliteObject(Portals[2].position.x, Portals[2].position.y, c.width / 2, c.height / 2, InaLeft, 0.1, 3, 8, 2, 1000, 100, 200, '#443a68'));
                    break;
                case 3:
                    AllEnemy.push(new newEliteObject(Portals[3].position.x, Portals[3].position.y, c.width / 2, c.height / 2, InaRight, 0.1, 3, 8, 2, 1000, 100, 200, '#443a68'));
                    break;
            }
        }
    }, 2500)
}

function addEliteGura() {

    setInterval(() => {
        if (keyID !== 'KeyP') {
            var RandomGateForGura = Math.round(Math.random() * 3)

            switch (RandomGateForGura) {
                case 0:
                    AllEnemy.push(new newEliteObject(Portals[0].position.x, Portals[0].position.y, c.width / 2, c.height / 2, GuraRight, 0.1, 5, 8, 2, 500, 100, 100, '#2773c1'));
                    break;
                case 1:
                    AllEnemy.push(new newEliteObject(Portals[1].position.x, Portals[1].position.y, c.width / 2, c.height / 2, GuraLeft, 0.1, 5, 8, 2, 500, 100, 100, '#2773c1'));
                    break;
                case 2:
                    AllEnemy.push(new newEliteObject(Portals[2].position.x, Portals[2].position.y, c.width / 2, c.height / 2, GuraLeft, 0.1, 5, 8, 2, 500, 100, 100, '#2773c1'));
                    break;
                case 3:
                    AllEnemy.push(new newEliteObject(Portals[3].position.x, Portals[3].position.y, c.width / 2, c.height / 2, GuraRight, 0.1, 5, 8, 2, 500, 100, 100, '#2773c1'));
                    break;
            }
        }

    }, 1000)

}

function addEliteKiara() {
    setInterval(() => {
        if (keyID !== 'KeyP') {
            var RandomGateForKiara = Math.round(Math.random() * 3)
            switch (RandomGateForKiara) {
                case 0:
                    AllEnemy.push(new newEliteObject(Portals[0].position.x, Portals[0].position.y, c.width / 2, c.height / 2, KiaraRight, 0.1, 1, 8, 2, 1500, 9999, 400, '#eb4643'));
                    break;
                case 1:
                    AllEnemy.push(new newEliteObject(Portals[1].position.x, Portals[1].position.y, c.width / 2, c.height / 2, KiaraLeft, 0.1, 1, 8, 2, 1500, 9999, 400, '#eb4643'));
                    break;
                case 2:
                    AllEnemy.push(new newEliteObject(Portals[2].position.x, Portals[2].position.y, c.width / 2, c.height / 2, KiaraLeft, 0.1, 1, 8, 2, 1500, 9999, 400, '#eb4643'));
                    break;
                case 3:
                    AllEnemy.push(new newEliteObject(Portals[3].position.x, Portals[3].position.y, c.width / 2, c.height / 2, KiaraRight, 0.1, 1, 8, 2, 1500, 9999, 400, '#eb4643'));
                    break;
            }
        }
    }, 15000)
}

function addEliteMori() {
    setInterval(() => {
        if (keyID !== 'KeyP') {
            var RandomGateForMoris = Math.round(Math.random() * 3)
            switch (RandomGateForMoris) {
                case 0:
                    AllEnemy.push(new newEliteObject(Portals[0].position.x, Portals[0].position.y, c.width / 2, c.height / 2, MoriRight, 0.1, 2, 8, 2, 5000, 500, 400, '#facccb'));
                    break;
                case 1:
                    AllEnemy.push(new newEliteObject(Portals[1].position.x, Portals[1].position.y, c.width / 2, c.height / 2, MoriLeft, 0.1, 2, 8, 2, 5000, 500, 400, '#facccb'));
                    break;
                case 2:
                    AllEnemy.push(new newEliteObject(Portals[2].position.x, Portals[2].position.y, c.width / 2, c.height / 2, MoriLeft, 0.1, 2, 8, 2, 5000, 500, 400, '#facccb'));
                    break;
                case 3:
                    AllEnemy.push(new newEliteObject(Portals[3].position.x, Portals[3].position.y, c.width / 2, c.height / 2, MoriRight, 0.1, 2, 8, 2, 5000, 500, 400, '#facccb'));
                    break;
            }
        }
    }, 10000)
}

function addEliteBossIna() {
    AllEnemy.push(new newEliteObject(Portals[4].position.x, Portals[4].position.y, Castle.position.x, Castle.position.y, HammerRight, 0.8, 0.2, 9, 2, 100000, 10000, 100000, 'black'));
}
