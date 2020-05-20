let input, button, greeting;
let submit_remove = 0;
let canvas;
let gifLength = 5;

let started = 0;

let master_text = "";
let text_size = 60;
let pallete = ["#6ABAFF", "#0FFFD5", "#FF90FD", "#F0FF90", "#8D74FF", "#FCA129", "#A737D8", "#FC5993"];

let graphics;
let num = 300;
let movers = [];
let offset;
let bg;


function setup() {

   var p5Canvas = createCanvas(windowWidth, windowHeight-10);
   canvas = p5Canvas.canvas;

   //frameRate(4);
     colorMode(HSB, 360, 100, 100, 100);
     angleMode(DEGREES);
      strokeWeight(1);
     textAlign(CENTER, CENTER);
     textSize(500);
     graphics = createGraphics(width, height);
     graphics.colorMode(HSB, 360, 100, 100, 100);
     drawNoiseBackground(100000, graphics);
     let n = int(random(pallete.length));
     bg = pallete[n];
     pallete.splice(n, 1);

     offset = 0; //width / 10;
     for (let i = 0; i < num; i++) {
       let x = random(width);
       let y = random(height);
       movers.push(new Mover(x, y));
     }
     background(bg);

}


function save_photo(){
     save('pix.jpg');
}

function save_video(){
	if(started != 1){
	 capturer.start();
	 started = 1;
	 console.log("Starting to save");
 }

draw() ;
}

let count = 0;

function draw() {


  for (let mover of movers) {
     mover.update();
     mover.display();
   }

   for (let i = movers.length - 1; i > 0; i--) {
     let mover = movers[i];
     if (mover.life == 0) {
       movers.splice(i, 1);
     }
   }
   for (let i = movers.length; i < num; i++) {
     let angle = random(180);
     let x = random(width);
     let y = random(height);
     movers.push(new Mover(x, y));
   }



    // let the user change the text size with the up and down arrow
      if (keyIsDown(UP_ARROW)) {
          if(text_size < 510){
            text_size += 20;
          }
       }

       if (keyIsDown(DOWN_ARROW)) {
         if(text_size > 20){
           text_size -= 20;
         }
       }

       textSize(text_size);
       textAlign(CENTER);

       blendMode(DIFFERENCE);
       noFill();
       text(master_text,width/2,height/2);
       blendMode(NORMAL);




 if(started === 1 && count < 50){
		//capturer.start();

		capturer.capture(canvas);
		count++;
		console.log("started to capture");

	}else if (started === 1) {

		capturer.stop();
	 capturer.save();
	 started = 0;
	 count = 0;
	 console.log("done");
	}

console.log("sdf");

}

class Mover {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    this.noiseScaleX = 10;
    this.noiseScaleY = 10;
    this.noiseScaleZ = random(100, 180);
    this.vel = createVector(0, 0);
    this.life = random(1);
    this.count = int(random(1, 20));
    this.c = pallete[int(random(pallete.length))];
  }
  update() {
    // let n = noise(this.pos.x / this.noiseScaleX, this.pos.y / this.noiseScaleY, frameCount / this.noiseScaleZ);
    let n = noise(this.pos.x / this.noiseScaleX, this.pos.y / this.noiseScaleY);
    let angle = map(n, 0, 1, 0, 360);
    this.vel = createVector(cos(angle), sin(angle));
    this.pos.add(this.vel);
    this.pos.x = constrain(this.pos.x, offset, width - offset);
    this.pos.y = constrain(this.pos.y, offset, height - offset);
    this.life -= random(random(random(random()))) / 10;
    this.life = constrain(this.life, 0, 1);
  }

  display() {
    strokeWeight(map(this.life, 0, 1, 0, 20));
    stroke(this.c + "11");
    point(this.pos.x, this.pos.y);
  }
}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 0, 0.2);
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 3);
    let h = random(1, 3);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}


//add this function make the text be dynamic
function keyReleased() {
 if (keyCode==8) {
   if (master_text.length>0) {
      master_text = master_text.substring(0, master_text.length-1);
   }
 }
 else if (keyCode>=65 && keyCode<=90 || keyCode==32 || keyCode==54) {
   master_text += str(key);
 }else if(keyCode == ENTER || keyCode == RETURN){
   console.log("hi");
   master_text = master_text + " " + master_text;
 }else if (keyCode == CONTROL) {
   console.log("control");

   lock = lock * -1;
   lock_x = mouseX;
   lock_y = mouseY;
 }
}
