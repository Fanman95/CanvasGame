//Tom Fan
class portal {
    constructor(x, y) {

        const img = new Image()
        img.src = './Img/portal.png'

        img.onload = () => {
            this.id = x
            this.image = img
            this.scale = y
            this.width = this.image.width / 4 * this.scale
            this.height = this.image.height * this.scale
            this.frames = 0
            this.framesTrigger = 0
            this.position = {
                x: 0,
                y: 0
            }

            switch (this.id) {
                case 0:
                    this.position = {
                        x: 0,
                        y: 0
                    }
                    break;
                case 1:
                    this.position = {
                        x: c.width - this.width,
                        y: 0
                    }
                    break;
                case 2:
                    this.position = {
                        x: c.width - this.width,
                        y: c.height - this.height
                    }
                    break;
                case 3:
                    this.position = {
                        x: 0,
                        y: c.height - this.height
                    }
                    break;
                //Boss Gate 4 & 5
                case 4:
                    this.position = {
                        x: 0,
                        y: c.height / 2 - this.height / 2
                    }
                    break;
                case 5:
                    this.position = {
                        x: c.width - this.width,
                        y: c.height / 2 - this.height / 2
                    }
                    break;
            }
        }
    }

    draw() {
        if (this.image)
            ctx.drawImage(
                this.image,
                502 * this.frames,
                0,
                502,
                502,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            )
    }

    update() {
        this.framesTrigger++
        if (this.framesTrigger % 4 == 0) {
            this.frames++
        }

        if (this.frames >= 4) {
            this.frames = 0
        }
        this.draw()

        switch (this.id) {
            case 0:
                this.position = {
                    x: 0,
                    y: 0
                }
                break;
            case 1:
                this.position = {
                    x: c.width - this.width,
                    y: 0
                }
                break;
            case 2:
                this.position = {
                    x: c.width - this.width,
                    y: c.height - this.height
                }
                break;
            case 3:
                this.position = {
                    x: 0,
                    y: c.height - this.height
                }
                break;
            //Boss Gate 4 & 5
            case 4:
                this.position = {
                    x: 0,
                    y: c.height / 2 - this.height / 2
                }
                break;
            case 5:
                this.position = {
                    x: c.width - this.width,
                    y: c.height / 2 - this.height / 2
                }
                break;
        }
    }
}

function addPortal() {
    Portals.push(new portal(0, 0.2))
    Portals.push(new portal(1, 0.2))
    Portals.push(new portal(2, 0.2))
    Portals.push(new portal(3, 0.2))
    Portals.push(new portal(4, 0.5))
    Portals.push(new portal(5, 0.5))
}