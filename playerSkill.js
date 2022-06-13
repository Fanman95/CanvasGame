//Tom Fan
class newSkill {
    constructor(x1, y1, x2, y2, img, scale, v, framesLength, framesTriggerRequired) {
        this.speed = v
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
        this.targetPosition = {
            x: x2,
            y: y2
        }
        this.frames = 0
        this.framesTriggerRequired = framesTriggerRequired
        this.framesLength = framesLength
        this.framesTrigger = 0

    }

    draw() {
        if (Player.skill.Kiara === true) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#eb4643';
        }

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
        //reset blur
        ctx.shadowBlur = 0;
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
    }
}

//--------------------------------------------------
class Wind {
    constructor() {
        this.scale = 2
        this.image = wind
        this.width = this.image.width / 30 * this.scale
        this.height = this.image.height * this.scale
        this.position = {
            x: c.width / 2 - this.width / 2,
            y: c.height / 2 - this.height / 2
        }
        this.frames = 0
    }

    draw() {
        if (Player.skill.Kiara === true) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#eb4643';
        }
        ctx.drawImage(
            this.image,
            this.image.width / 30 * this.frames,
            0,
            this.image.width / 30,
            this.image.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        //reset blur
        ctx.shadowBlur = 0;
    }

    update() {
        this.frames++

        if (this.frames >= 30) {
            this.frames = 0
        }

        this.draw()
        this.position.x = Player.position.x - (this.width - Player.width) / 2
        this.position.y = Player.position.y - (this.height - Player.height * 2)

    }
}

//--------------------------------------------------
class slash {
    constructor(x, y, scale) {
        this.speed = 50
        this.time = 30
        this.scale = scale
        this.image = wind
        this.width = this.image.width / 30 * this.scale
        this.height = this.image.height * this.scale
        this.targetPoint = {
            x: x - (this.width - Player.width) / 2,
            y: y - (this.height - Player.height * 2)
        }
        this.position = {
            x: Player.position.x - (this.width - Player.width) / 2,
            y: Player.position.y - (this.height - Player.height * 2)
        }
        this.frames = 0
        this.framesTrigger = 0

        this.dy = this.targetPoint.y - this.position.y
        this.dx = this.targetPoint.x - this.position.x
        this.angle = Math.atan2(this.dy, this.dx)

        this.velocity = {
            x: Math.cos(this.angle) * this.speed,
            y: Math.sin(this.angle) * this.speed
        }
    }

    draw() {
        if (Player.skill.Kiara === true) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#eb4643';
        }

        ctx.drawImage(
            this.image,
            this.image.width / 30 * this.frames,
            0,
            this.image.width / 30,
            this.image.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        //reset blur
        ctx.shadowBlur = 0;
    }

    update() {
        this.frames++

        if (this.frames >= 30) {
            this.frames = 0
        }

        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.time--
    }
}

function SlashsUpdate() {
    for (var i = 0; i < Slashs.length; i++) {
        Slashs[i].update()
        if (Slashs[i].time <= 0) {
            Slashs.splice(i, 1)
        }

    }
}

//--------------------------------------------------
class thunder {
    constructor(x, y, width, height) {
        this.width = width
        this.height = height
        this.position = {
            x: x + this.width / 2,
            y: y + this.height
        }
        this.targetPosition = {
            x: x + this.width / 2,
            y: 0
        }
        this.time = 10
        this.lineWidth = 15
        this.r = 15
    }

    draw() {
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#007AC1';
        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = "#c4eafc";
        ctx.moveTo(this.targetPosition.x, this.targetPosition.y);
        ctx.lineTo(this.position.x, this.position.y);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = "#c4eafc";
        ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();

        ctx.shadowBlur = 0;
    }

    update() {
        this.draw();
        this.time--;
        this.lineWidth -= 5;
        this.r += 5;
    }
}

function ThundersUpdate() {
    for (var i = 0; i < Thunders.length; i++) {
        Thunders[i].update()
        if (Thunders[i].time <= 0) {
            Thunders.splice(i, 1)
        }
    }
}
//--------------------------------------------------
class waterBigBall {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y
        }
        this.r = 10
    }
    draw() {
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#007AC1';

        ctx.beginPath();
        ctx.fillStyle = "#74ccf4";
        ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
        //reset blur
        ctx.shadowBlur = 0;
    }
    update() {
        this.draw()
        this.r++
    }
}

class waterBall {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y
        }
        this.velocity = {
            x: (Math.round(Math.random()) * 2 - 1) * 5 * Math.random(),
            y: (Math.round(Math.random()) * 2 - 1) * 5 * Math.random()
        }
        this.r = 3
        this.time = 100
    }
    draw() {
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#007AC1';

        ctx.beginPath();
        ctx.fillStyle = "#74ccf4";
        ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
        //reset blur
        ctx.shadowBlur = 0;
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.time--
    }
}

function WaterBallStorageUpdate() {
    for (var i = 0; i < WaterBallStorage.length; i++) {
        WaterBallStorage[i].update()
    }
}

function WaterBallReleaseUpdate() {
    for (var i = 0; i < WaterBallRelease.length; i++) {
        WaterBallRelease[i].update()
        if (WaterBallRelease[i].time <= 0) {
            WaterBallRelease.splice(i, 1)
        }
    }
}
//--------------------------------------------------
class reaper {
    constructor() {
        this.length = c.height / 2
    }
    draw() {
        for (var i = 0; i < c.width; i++) {
            ctx.beginPath();
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.moveTo(i, c.height);
            ctx.lineTo(i, c.height - this.length / i + i * Math.random());
            ctx.stroke();
            ctx.closePath();
        }

    }
    update() {
        this.draw();
        this.length += 50000
    }
}

function ReaperUpdate() {
    for (var i = 0; i < Reaper.length; i++) {
        Reaper[i].update()
    }
}