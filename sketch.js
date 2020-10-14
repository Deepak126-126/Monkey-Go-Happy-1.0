
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var score=0;
var SurvivalTime=0;
var ground;



function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(500, 400);

  ground = createSprite(400, 400, 980, 40);
  ground.x = ground.width / 2;
  ground.velocityX=-4;
   

  monkey = createSprite(50, 160, 20, 50);
  monkey.addAnimation("running", monkey_running);


  
  monkey.scale=0.1;




  obstaclesGroup = new Group();
  FoodGroup = new Group();

  score = 0;

}


function draw() {

  background("220");
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  SurvivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+SurvivalTime,100,50);
  monkey.collide(ground);



  if (ground.x < 0) {
    ground.x = ground.width / 2;

  }


  if (obstaclesGroup.isTouching(monkey)) {
    obstacle.velocityX=0;
    banana.velocityX=0;
  }

 



    



    //jump when the space key is pressed
    if (keyDown("space") && monkey.y >= 100)   {
      monkey.velocityY = -12;
      
    }

    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;


    //spawn obstacles on the ground
    spawnObstacles();
    spawnBanana();

  
 


  


  drawSprites();


}



function spawnObstacles() {
  
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 365, 10, 40);
    obstacle.velocityX = -6        ;
    obstacle.addImage(obstacleImage);

    //generate random obstacles
    var rand = Math.round(random(1, 6));

    obstacle.scale = 0.1;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);

  }
}

function spawnBanana() {
  
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 250, 40, 10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;

    //assign lifetime to the variable
    banana.lifetime = 200;

    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    //add each cloud to the group
    FoodGroup.add(banana);
  }
}








