let canvas, ctx, oldTxt, f;
let frame = document.getElementById('canvasout');
canvas = document.getElementById("myCan");
    ctx = canvas.getContext("2d");
    canvas.width = 475;
    canvas.height = 394;
let bkg = document.getElementById("bkg");
var mouse = {
    x:0,
    y:0
};
var obj = {
    x: 0,
    y: 0,
    w: 100,
    h: 100
};


window.addEventListener('load', (ev)=>{
    
    drawText();
    document.getElementById('msg').addEventListener('input', drawText);
    document.getElementById('save').addEventListener('click', fsave);
    document.getElementById('fileloader').addEventListener('change', addImage);
    document.getElementById('myCan').addEventListener('mousemove', function(e){
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
        draw();
    });

});

var u = [];

function draw(x, y){
    console.log(mouse.x + " " + mouse.y);
}


function addImage(e){
    var fr = new FileReader;
    fr.onload = function(event){
        var image = new Image();
        image.onload = function(){
            ctx.drawImage(image, 0, 0);
        }

        image.src = event.target.result;
        u.push(image);
    }
        fr.readAsDataURL(e.target.files[0]);
        console.log(fr);
   
}

/*function addNew(e){
    var pic = this, mx = 0, my=0, drag=false;
    this.x = 50;
    this.y = 50;
    this.w = 100;
    this.h = 100;
    var image = new Image;
    image.src = e;
    this.update = function(arg){
        ctx.drawImage(image, pic.x, pic.y);
    }
    //document.getElementById('canvasout').attributes('src', image);
    //document.getElementById('canvasout').style.display = block;
    
}*/


const drawText = function(){
    // normal, italic, bold
    // px pt cm in rem em
    // any installed or imported font
    ctx.font = 'normal 72px Beyno, Helvetica, Arial, monospace';
    ctx.fillStyle = 'Black';
    //textAlign center, left, right, end, start
    ctx.textAlign = 'start';
    //textBaseline top, hanging, middle, bottom, ideographic, alphabetic
    ctx.textBaseline = 'alphabetic';
    //direction ltr, rtl, inherit
    ctx.direction = 'ltr';

    let txt = document.getElementById('msg').value;
    let metrics = ctx.measureText(oldTxt);
    let w = metrics.width;
    ctx.clearRect(50, 120, w, -100);

    if( txt == ''){
        txt = 'Add Text.';
    }
    ctx.fillText(txt, 50, 100);
    oldTxt = txt;


}

function fsave() {
    var dataURL = canvas.toDataURL();
    frame.setAttribute('src', dataURL);
    frame.style.display = "block";
}