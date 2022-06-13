class player {
    constructor() {
        this.speed = 10
        this.attack = 1
        this.skill = {
            Ame: false,
            Kiara: false,
            Gura: false,
            Ina: false,
            Mori: false,
        }
        this.releasePerTime = {
            Ame: 5,
            Kiara: 1,
            Gura: 10,
            Ina: 100,
            Mori: 5,
        }
        //skill CD
        this.skillMaxRemain = {
            Ame: 10,
            Kiara: 30,
            Gura: 60,
            Ina: 30,
            Mori: 120,
        }
        this.skillRemain = {
            Ame: 10,
            Kiara: 30,
            Gura: 60,
            Ina: 30,
            Mori: 120,
        }
        this.skillArea = {
            Ame: 2,
            Kiara: 2,
            Gura: 2,
            Ina: 2,
            Mori: 2,
        }
        this.skillRemainBarLengthPercent = {
            Ame: 1,
            Kiara: 1,
            Gura: 1,
            Ina: 1,
            Mori: 1,
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.scale = 0.1
        //default left
        this.image = playerLeft
        this.width = this.image.width / 8 * this.scale
        this.height = this.image.height * this.scale
        this.position = {
            x: c.width / 2 - this.width / 2,
            y: c.height / 2 - this.height / 2
        }
        this.frames = 0
        this.framesTrigger = 0
        this.skillRemainBarLength = {
            Ame: this.width,
            Kiara: this.width,
            Gura: this.width,
            Ina: this.width,
            Mori: this.width,
        }

    }

    draw() {
        if (this.skill.Kiara === true) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#eb4643';
        }
        ctx.drawImage(
            this.image,
            590 * this.frames,
            0,
            590,
            780,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        //reset blur
        ctx.shadowBlur = 0;
        //skill bar 
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "grey";
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.position.x + this.width, this.position.y);
        ctx.moveTo(this.position.x, this.position.y - 5);
        ctx.lineTo(this.position.x + this.width, this.position.y - 5);
        ctx.moveTo(this.position.x, this.position.y - 10);
        ctx.lineTo(this.position.x + this.width, this.position.y - 10);
        ctx.moveTo(this.position.x, this.position.y - 15);
        ctx.lineTo(this.position.x + this.width, this.position.y - 15);
        ctx.moveTo(this.position.x, this.position.y - 20);
        ctx.lineTo(this.position.x + this.width, this.position.y - 20);
        ctx.stroke();
        ctx.closePath()

        ctx.beginPath();
        ctx.lineWidth = "3";
        //Color of Ame
        ctx.strokeStyle = "#a3ff70";
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.position.x + this.skillRemainBarLength.Ame * this.skillRemainBarLengthPercent.Ame, this.position.y);
        ctx.stroke();
        ctx.closePath()

        ctx.beginPath();
        ctx.lineWidth = "3";
        //Color of Kiara
        ctx.strokeStyle = "#eb4643";
        ctx.moveTo(this.position.x, this.position.y - 5);
        ctx.lineTo(this.position.x + this.skillRemainBarLength.Kiara * this.skillRemainBarLengthPercent.Kiara, this.position.y - 5);
        ctx.stroke();
        ctx.closePath()

        ctx.beginPath();
        ctx.lineWidth = "3";
        //Color of Gura
        ctx.strokeStyle = "#2773c1";
        ctx.moveTo(this.position.x, this.position.y - 10);
        ctx.lineTo(this.position.x + this.skillRemainBarLength.Gura * this.skillRemainBarLengthPercent.Gura, this.position.y - 10);
        ctx.stroke();
        ctx.closePath()

        ctx.beginPath();
        ctx.lineWidth = "3";
        //Color of Ina
        ctx.strokeStyle = "purple";
        ctx.moveTo(this.position.x, this.position.y - 15);
        ctx.lineTo(this.position.x + this.skillRemainBarLength.Ina * this.skillRemainBarLengthPercent.Ina, this.position.y - 15);
        ctx.stroke();
        ctx.closePath()

        ctx.beginPath();
        ctx.lineWidth = "3";
        //Color of Mori
        ctx.strokeStyle = "black";
        ctx.moveTo(this.position.x, this.position.y - 20);
        ctx.lineTo(this.position.x + this.skillRemainBarLength.Mori * this.skillRemainBarLengthPercent.Mori, this.position.y - 20);
        ctx.stroke();
        ctx.closePath()
    }

    update() {
        this.framesTrigger++
        if (this.framesTrigger % 2 == 0) {
            this.frames++
        }

        if (this.frames >= 8) {
            this.frames = 0
        }
        this.draw()
        //Player Img
        if (mouse.x > this.position.x) {
            switch (this.skill.Ame) {
                case false:
                    this.image = playerRight;
                    break;
                case true:
                    this.image = AmeRight;
                    if (this.skillRemain.Ame > 0 && Slashs.length < this.releasePerTime.Ame) {
                        Slashs.push(new slash(mouse.x, mouse.y, this.skillArea.Ame))
                        this.skillRemain.Ame--
                    }
                    break;
            }

        }
        else {
            switch (this.skill.Ame) {
                case false:
                    this.image = playerLeft;
                    break;
                case true:
                    this.image = AmeLeft;
                    if (this.skillRemain.Ame > 0 && Slashs.length < this.releasePerTime.Ame) {
                        Slashs.push(new slash(mouse.x, mouse.y, this.skillArea.Ame))
                        this.skillRemain.Ame--
                    }
                    break;
            }
        }

        //Default max. thunters = 10, related to releasePerTime
        if (this.skill.Gura === true && AllEnemy.length > 0 && Thunders.length <= this.releasePerTime.Gura) {
            let o = Math.round(Math.random() * (AllEnemy.length - 1))
            Thunders.push(new thunder(AllEnemy[o].position.x, AllEnemy[o].position.y, AllEnemy[o].width, AllEnemy[o].height))
        }
        //Player position
        var dy = mouse.y - this.position.y
        var dx = mouse.x - this.position.x
        var angle = Math.atan2(dy, dx)

        this.velocity.x = Math.cos(angle) * this.speed
        this.velocity.y = Math.sin(angle) * this.speed

        if (Math.abs(this.velocity.x) > Math.abs(dx)) {
            this.velocity.x = dx
        }

        if (Math.abs(this.velocity.y) > Math.abs(dy)) {
            this.velocity.y = dy
        }

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        //Update skill bar
        this.skillRemainBarLengthPercent.Ame = 1 - ((this.skillMaxRemain.Ame - this.skillRemain.Ame) / this.skillMaxRemain.Ame)
        this.skillRemainBarLengthPercent.Kiara = 1 - ((this.skillMaxRemain.Kiara - this.skillRemain.Kiara) / this.skillMaxRemain.Kiara)
        this.skillRemainBarLengthPercent.Gura = 1 - ((this.skillMaxRemain.Gura - this.skillRemain.Gura) / this.skillMaxRemain.Gura)
        this.skillRemainBarLengthPercent.Ina = 1 - ((this.skillMaxRemain.Ina - this.skillRemain.Ina) / this.skillMaxRemain.Ina)
        this.skillRemainBarLengthPercent.Mori = 1 - ((this.skillMaxRemain.Mori - this.skillRemain.Mori) / this.skillMaxRemain.Mori)
    }
}

window.addEventListener("mousedown", function () {
    Player.skill?.Ame = true
});

window.addEventListener("mouseup", function () {
    Player.skill?.Ame = false
});





