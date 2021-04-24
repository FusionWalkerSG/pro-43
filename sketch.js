var player, playerSprite, playerAttack,playerAttackSprite,playerSword,playerRangedSprite,playerBlock,playerBlockSprite;
var dragon, dragonSprite, dragonFire, dragonFireSprite, dragonGroup;
var score=0; 
var backAnimation,bgAnimation;
var edges;

var ground;

function preload(){
    playerRunning = loadAnimation("Sprites/HeroKnight/Run/HeroKnight_Run_0.png","Sprites/HeroKnight/Run/HeroKnight_Run_1.png",
     "Sprites/HeroKnight/Run/HeroKnight_Run_2.png", "Sprites/HeroKnight/Run/HeroKnight_Run_3.png", "Sprites/HeroKnight/Run/HeroKnight_Run_4.png",
    "Sprites/HeroKnight/Run/HeroKnight_Run_5.png", "Sprites/HeroKnight/Run/HeroKnight_Run_6.png","Sprites/HeroKnight/Run/HeroKnight_Run_7.png", 
    "Sprites/HeroKnight/Run/HeroKnight_Run_8.png","Sprites/HeroKnight/Run/HeroKnight_Run_9.png");

    playerAttackSprite = loadAnimation("Sprites/HeroKnight/Attack3/HeroKnight_Attack3_0.png","Sprites/HeroKnight/Attack3/HeroKnight_Attack3_1.png",
    "Sprites/HeroKnight/Attack3/HeroKnight_Attack3_2.png","Sprites/HeroKnight/Attack3/HeroKnight_Attack3_3.png","Sprites/HeroKnight/Attack3/HeroKnight_Attack3_4.png",
    "Sprites/HeroKnight/Attack3/HeroKnight_Attack3_5.png","Sprites/HeroKnight/Attack3/HeroKnight_Attack3_6.png","Sprites/HeroKnight/Attack3/HeroKnight_Attack3_7.png");

    playerBlockSprite = loadAnimation("Sprites/HeroKnight/Block/HeroKnight_Block_0.png","Sprites/HeroKnight/Block/HeroKnight_Block_1.png",
    "Sprites/HeroKnight/Block/HeroKnight_Block_2.png","Sprites/HeroKnight/Block/HeroKnight_Block_3.png","Sprites/HeroKnight/Block/HeroKnight_Block_4.png");

    dragonAttack = loadAnimation("PNG/dragon/Attack1.png","PNG/dragon/Attack2.png","PNG/dragon/Attack3.png","PNG/dragon/Attack4.png");

    bgAnimation = loadImage("Sprites/cave_C.png");

    playerRangedSprite = loadImage("fire dagger.png");

    dragonFireSprite = loadAnimation("PNG/dragon/Fire_Attack1.png","PNG/dragon/Fire_Attack2.png","PNG/dragon/Fire_Attack3.png","PNG/dragon/Fire_Attack4.png",
    "PNG/dragon/Fire_Attack5.png","PNG/dragon/Fire_Attack6.png",)
}

function setup(){
    var canvas = createCanvas(900,600);

    backAnimation = createSprite(0,0,900,600);
    //bgAnimation = createSprite(0,0,900,600);
    backAnimation.addImage(bgAnimation);
    backAnimation.scale = 1;
    
    player = createSprite(100,550,10,10);
    playerSprite = createSprite(100,550,10,10);
    playerSprite.addAnimation("Running", playerRunning);
    playerSprite.scale = 1.75;
    playerAttack = createSprite(100,550,10,10);
    playerAttack.addAnimation("Attack", playerAttackSprite);
    playerAttack.scale = 1.75;
    //playerBlock = createSprite(155,550,10,10);
    //playerBlockSprite = createSprite(100,550,10,10);
    //playerBlock.addAnimation("Block", playerBlockSprite);

    dragonGroup = new Group();

    ground = createSprite(450,590,900,15);
}

function draw(){
    background(0);

    edges = createEdgeSprites();

    playerAttack.visible = false;
    playerSprite.visible = true;
    if(keyDown("E")){
        playerAttack.visible = true;
        playerSprite.visible = false;
    }

    if(keyDown("Q")){
        playerBlock.visible = true;
        playerSprite.visible = false;
    }

    spawnSword();
    spawnDragon();

    if(dragonGroup.isTouching(playerSword)){
        dragonGroup.destroyEach();
    }

    
    drawSprites();
}

function spawnDragon(){
    if(frameCount % 100 === 0){
        var dragon = createSprite(900,random(50,550),10,10);
        dragon.velocityX = -4;
        dragon.addAnimation("Attack",dragonAttack);
        var dragonFire = createSprite(800,dragon.y + 15);
        dragonFire.addAnimation("Fire",dragonFireSprite);
        dragonFire.velocityX = -4;
        dragonGroup.add(dragon);
        dragon.debug = true;

    }
}

function spawnSword(){
    if(keyDown("space")){
        playerSword = createSprite(100,550,10,10);
        playerSword.addAnimation("Throw", playerRangedSprite);
        playerSword.velocityX = 4;
        playerSword.velocityY = -2;
        playerSword.lifetime = 750;
    }
}

//function destroyDragon(){
    //if(playerSword.isTouching(dragon)){

    //}
//}