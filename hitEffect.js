//Tom Fan
class hitEffect {
    constructor(x, y, w, h) {
        this.position = {
            x: x,
            y: y
        }

        this.relativeImage = {
            w: w,
            h: h,
        }

        this.center = {
            x: this.position.x + this.relativeImage.w / 2,
            y: this.position.y + this.relativeImage.h / 2
        }

        this.velocity = {
            x: (Math.round(Math.random()) * 2 - 1) * 5 * Math.random(),
            y: -10 + 5 * Math.random()
        }
        this.time = 10
        this.r = 1
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(this.center.x, this.center.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath()
    }

    update() {
        this.draw()
        this.center.x += this.velocity.x
        this.center.y += this.velocity.y
        this.velocity.y += 2
    }
}

function hitEffectupdate() {
    for (var i = 0; i < hitEffects.length; i++) {
        hitEffects[i].update()
        hitEffects[i].time--
        if (hitEffects[i].time <= 0) {
            hitEffects.splice(i, 1)
        }
    }
}