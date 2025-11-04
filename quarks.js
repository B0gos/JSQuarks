
iteration = 0;

function init() {
    let ctx = document.getElementById("canvas").getContext("2d");
    let dots = [];

    setInterval(function() {
        input = getInputs();
        computeDots(dots, input.count);
        drawDots(ctx, dots, input.color);
        drawLines(ctx, dots, input.color, input.tolerance)
        moveDots(dots, input.speed);
    }, 5);
}

function getInputs(){
    let count = document.getElementById("amount").value;
    let tolerance = document.getElementById("tolerance").value;
    let speed = 100 / document.getElementById("speed").value;
    let color = document.getElementById("color").value;

    return input = {count:count, tolerance:tolerance, speed:speed, color:color}
}

function computeDots(dots, amount) {
    console.log(dots.length != amount);
    if(dots.length != amount) {
        if (dots.length > amount) // Trim array
            dots.length = amount;
        else
            for(i = dots.length; i < amount; i++){
                let x_pos = getRandomInt(0, 512);
                let y_pos = getRandomInt(0, 512);
                let direction = getRandomInt(0,360) * Math.PI / 180;
                dots[i] = {x:x_pos, y:y_pos, d:direction};
            }
    }
}

function drawDots(ctx, dots, color) {
    ctx.clearRect(0, 0, 512, 512);
    for(i = 0; i < dots.length; i++) {
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[i].x + 4, dots[i].y + 4);
        ctx.lineWidth = 4;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}

function moveDots(dots, speed) {
    for(i = 0; i < dots.length; i++) { // bounce
        if(dots[i].x < 0 || dots[i].x > 512 ||
           dots[i].y < 0 || dots[i].y > 512) {
            dots[i].d -= Math.PI * Math.random();
        }

        dots[i].x += Math.sin(dots[i].d) / speed;
        dots[i].y += Math.cos(dots[i].d) / speed;
    }
}

function drawLines(ctx, dots, color, tolerance) {
    for(i = 0; i < dots.length; i++) {
        for(j = 0; j < dots.length; j++) {
            let dist = Math.sqrt((dots[i].x - dots[j].x) * (dots[i].x - dots[j].x) + 
                                 (dots[i].y - dots[j].y) * (dots[i].y - dots[j].y));
            if(dist <= tolerance) {
                ctx.beginPath();
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.lineWidth = 1;
                ctx.strokeStyle = color;
                ctx.stroke();
            }
        }
    }
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

window.Onload = init();