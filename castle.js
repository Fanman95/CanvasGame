//Tom Fan
class castle {
    constructor() {
        this.scale = 0.5
        this.image = castleImg
        this.width = this.image.width * this.scale
        this.height = this.image.height * this.scale
        this.position = {
            x: c.width / 2 - this.width / 2,
            y: c.height / 2 - this.height / 2
        }

        this.center = {
            x: c.width / 2,
            y: c.height / 2
        }

        this.hp = 50000
        this.maxHP = 50000
        this.hpBarLength = this.width
        this.hpBarLengthPercent = 1


    }

    draw() {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "grey";
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.position.x + this.hpBarLength, this.position.y);
        ctx.stroke();
        ctx.closePath()

        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = "red";
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.position.x + this.hpBarLength * this.hpBarLengthPercent, this.position.y);
        ctx.stroke();
        ctx.closePath()
    }

    update() {
        this.draw()
        this.hpBarLengthPercent = 1 - ((this.maxHP - this.hp) / this.maxHP)
        this.position = {
            x: c.width / 2 - this.width / 2,
            y: c.height / 2 - this.height / 2
        }
    }
}