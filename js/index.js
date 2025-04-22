const canvasW = 1300, canvasH = 900, navH = 175;
window.onload = function() {
    let canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")

    blob1 = new Blob("../images/blob.svg", ctx, .2, .3)
    blob2 = new Blob("../images/blob.svg", ctx, -.4, .1)
    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        blob1.updatePos(ctx)
        blob1.draw(ctx)
        blob2.updatePos(ctx)
        blob2.draw(ctx)

        ctx.font = "48px Tahoma";
        ctx.fillStyle = "#D3D3D3"
        ctx.textAlign = "center"
    }, 1)
}

class Blob {
    x = 50;
    y = 100;
    w = 200;
    h = 200;
    constructor(src, ctx, xVel, yVel) {
        this.img = new Image()
        this.img.src = src
        this.xVel = xVel
        this.yVel = yVel
        this.img.onload = () => {
            this.draw(ctx)
            this.img.id = "blob"
        }
    }
    
    updatePos(ctx) {
        let isAbove = this.y < -this.h + navH;
        let isBelow = this.y > (canvasH - this.h - 30);
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