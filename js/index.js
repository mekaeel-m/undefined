const canvasW = 1300, canvasH = 900, navH = 175;
window.onload = function() {
    let canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")

    blob = new Blob("../images/blob.svg", ctx)
    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        blob.updatePos(ctx)
        blob.draw(ctx)
    }, 1)
}

class Blob {
    x = 50;
    y = 100;
    w = 200;
    h = 200;
    xVel = .5;
    yVel = .5;
    constructor(src, ctx) {
        this.img = new Image()
        this.img.src = src
        this.img.onload = () => {
            this.draw(ctx)
            this.img.id = "blob"
        }
    }
    
    updatePos(ctx) {
        let isAbove = this.y < -this.h + navH;
        let isBelow = this.y > (canvasH - this.h);
        let isRight = this.x > (canvasW - this.w);
        let isLeft = this.x < -this.w;

        if (isAbove) {
            this.yVel *= -1
        } else if (isBelow) {
            this.yVel *= -1
        } else if (isRight) {
            this.xVel *= -1
        } else if (isLeft) {
            this.xVel *= -1
        }
        this.x += this.xVel;
        this.y += this.yVel;
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}