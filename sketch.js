


var camelImage,dead,backgroundImg,groundImg,camel,ground,score,cactusGroup,state,cactus1,cactus2,cactus3,gameOverimg,gameOver
;
var bgm,jumpSound;
function preload()
{
	
	// jumpSound = loadSound("jump.mp3")
	// bgm = loadSound("bgm.mp3")
	gameOverimg=loadImage("gameOver.png")
	groundImg=loadImage("ground.png")
	backgroundImg=loadImage("bg.png")
	camelImage=loadAnimation("camel1.png","camel2.png")
	dead=loadAnimation("camel3.png")
	cactus1=loadImage("cactus1.png")
	cactus2=loadImage("cactus2.png")
	cactus3=loadImage("cactus3.png")
	// camelImage=loadImage()
}

function setup() {
	createCanvas(windowWidth, windowHeight);
    


gameOver=createSprite(width/2,height/2-20,1,1)
gameOver.addImage(gameOverimg)
gameOver.visible=false

 ground=createSprite(width/2,height-15,1,1)
	ground.addImage(groundImg)
	// ground.x = width/2
	invisibleGround = createSprite(width/2,height-10,width,125);  
	invisibleGround.shapeColor = "#f4cbaa";
	invisibleGround.visible=false;

	ground.velocityX = -10;
 camel=createSprite(225,100,10,10)
camel.addAnimation("run",camelImage)
camel.addAnimation("collided",dead)
camel.scale=width/3500

camel.debug=true

cactusGroup=new Group()
score = 0;

}


function draw() {
         

  background(backgroundImg);
  bgm.play( )  
  textSize(20);
  fill("black")
  text("score:"+score, 30, 50)
  console.log(score)
  if (ground.x < 0){
	ground.x = ground.width/2;
  }
    camel.collide(invisibleGround);



   
	if (cactusGroup.isTouching(camel)) {
	 state=1
	}
	if (state===1) {
		ground.velocityX=0
		gameOver.visible=true
	cactusGroup.destroyEach();

		camel.changeAnimation("collided",dead)
	} else {
		spawnObstacles();
		 camel.velocityY = camel.velocityY + 0.8
		 score = score + Math.round(getFrameRate()/20);
	   if (keyDown("SPACE")&&camel.y  >= height-220) {
		camel.velocityY=-20
		jumpSound.play( )
	 }
	
	}

  

	
  drawSprites();
 
}



function spawnObstacles() {
	if(frameCount % 60 === 0) {
	  var cactus = createSprite(width+Math.round(random(10,75)),height-150,20,30);
	  cactus.setCollider('rectangle',100,50,45,50)
	  // obstacle.debug = true

	  cactus.velocityX = ground.velocityX;	   
	  
	if(state===1){
		cactus.velocityX=0;
	}

	  

	  var rand = Math.round(random(1,3));
	  switch(rand) {
		case 1: cactus.addImage(cactus1);
				break;
		case 2: cactus.addImage(cactus2);
				break;
		case 3: cactus.addImage(cactus3);
				break;
		default: break;
	  }
	  
         
	  cactus.scale = width/3000;
	  cactus.lifetime = 300;
	  cactus.depth = camel.depth;
	  camel.depth +=1;
	  cactus.debug=true

	  cactusGroup.add(cactus);
	}
  }