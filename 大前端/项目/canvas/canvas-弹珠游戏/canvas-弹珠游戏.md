canvas-弹珠游戏 目录
[TOC]
***

# 前言

- 桌面弹珠游戏

- 需要花时间了解源代码
- 资源将会放在[github-弹珠游戏]()

# 结果展示

![image-20210318193524811](.\img\0-pinball.png)

# 代码展示

## `pinball.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Poker Pinball</title>

    <style>
      body {
         background: skyblue;
      }
      
      #showPolygonsOnlyToast {
         color: black;
         position: absolute;
         top: 20px;
         left: 10px;
      }

    </style>
    <link rel='stylesheet' type='text/css' href='pinball.css'/>
  </head>

   <body>
      

      <audio id='ballRolling' preload='auto'>
         <source src='sounds/ballRolling.ogg' type='audio/ogg'>
      </audio>

      <audio id='flipper' preload='auto'>
         <source src='sounds/flipper.ogg' type='audio/ogg'>
      </audio>

      <audio id='bumper' preload='auto'>
         <source src='sounds/bumper.ogg' type='audio/ogg'>
      </audio>

      <audio id='pinball' preload='auto'>
         <source src='sounds/pinball.ogg' type='audio/ogg'>
      </audio>

      <!-- Game canvas........................................................... -->

      <canvas id='gameCanvas' width='535' height='936'>
         Canvas not supported
      </canvas>

      <div id='showPolygonsOnlyToast' class='toast'>
         <input type='checkbox' id='showPolygonsOnlyCheckbox'/>
         Polygons
      </div>
      
      <!-- Loading................................................................ -->

      <div id='loadingToast' class='toast'>
         <span id='loadingToastTitle' class='title'>Core HTML5 Canvas Pinball</span>

         <div id='loadingMessage'>Loading...</div>
         <div id='progressDiv'></div>
      </div>

      <!-- Scores................................................................ -->

      <div id='scoreToast' class='toast'></div>


      <!-- Paused................................................................ -->

      <div id='pausedToast' class='toast'>
        <p class='title'>Paused</p>
        <p>Click here to start</p>
      </div>    

      
      <!-- Game Over............................................................. -->

      <div id='gameOverToast' class='toast'>
         <p class='title'>Game Over</p><br/>
         <p><input id='clearHighScoresCheckbox' type='checkbox'/> clear high scores</p>
         <input id='newGameButton' type='button' value='new game' autofocus='true'/>
      </div>

      <!-- High scores........................................................... -->

      <p id='highScoreParagraph'></p>

      <div id='highScoreToast' width='300' style='display: none'>
        <p class='title'>High score!</p>
        <p>What's your name?</p>
        <input id='nameInput' type='text' autofocus='true' display='none'>
        <input id='addMyScoreButton' type='button' value='add my score' disabled='true'>
        <input id='newGameFromHighScoresButton' type='button' value='new game'>

        <p class='title' id='previousHighScoresTitle' display='none'>Previous High Scores</p>
        <ol id='highScoreList'>
        </ol>
      </div>

      <!-- Lose Life.............................................................. -->

    <script src = 'requestNextAnimationFrame.js'></script>
    <script src = 'stopwatch.js'></script>
    <script src = 'animationTimer.js'></script>
    <script src = 'progressbar.js'></script>
    <script src = 'sprites.js'></script>
    <script src = 'gameEngine.js'></script>
    <script src = 'shapes.js'></script>
    <script src = 'pinball.js'></script>
  </body>
</html>

```

## `pinball.css`

```css
#readoutToast {
    position: absolute;
    left: 480px;
    top: 60px;
    color: white;
    display: none;
 }
 
 #loadingToast {
    padding: 20px;
    position: absolute;
    left: 42px;
    top: 180px;
    width: 450px;
    height: 150px;
    display: block;
 }

 #loadingToast .title {
    padding-left: 125px;
    font: 16px Arial;
 }

 #loadingToast p {
    margin-left: 10px;
    margin-right: 10px;
    color: black;
 }
 
 #highScoreParagraph {
    position: absolute;
    left: 175px;
    top: 0px;
    color: red;
    font-size: 4.5em;
    margin-left: 70px;
 }
 
 #highScoreToast {
    position: absolute;
    left: 20px;
    top: 120px;
    color: cornflowerblue;
    margin-left: 150px;
    margin-top: 20px;
 }

 #gameCanvas {
    margin: 20px;
    background: lightskyblue;
    /*background: rgba(120,168,249,0.7);*/
    position: absolute;
    left: 0px;
    top: 0px;
    -webkit-box-shadow: rgba(100,100,100,0.5) 4px 4px 8px;
    -moz-box-shadow: rgba(100,140,230,0.5) 2px 2px 6px;
    box-shadow: rgba(100,140,230,0.5) 2px 2px 6px;
    -o-box-shadow: rgba(100,140,230,0.5) 2px 2px 6px;
    border: thin solid cornflowerblue;
 }

 .floatingControls {
    background: rgba(0, 0, 0, 0.1);
    border: thin solid skyblue;
    -webkit-box-shadow: rgba(0,0,0,0.3) 2px 2px 4px;
    -moz-box-shadow: rgba(100,140,230,0.5) 2px 2px 6px;
    box-shadow: rgba(100,140,230,0.5) 2px 2px 6px;
    -o-box-shadow: rgba(100,140,230,0.5) 2px 2px 6px;
    position: absolute;
 }

 .floatingControls a {
    font-size: 1.5em;
    text-decoration: none;
    color: rgba(255,255,0,0.6);
 }

 .floatingControls a:hover {
    color: rgba(255,255,0,1.0);
 }

 #instructionsLink {
    color: cornflowerblue;
    text-decoration: none;
 }

 #instructionsLink:hover {
    color: rgba(255,255,0,1.0);
 }

 #instructions p.title {
    font-size: 1.5em;
    color: blue;
 }
 
 #instructions {
    margin-left: 60px;
    margin-top: 50px;
    padding-left: 20px;
    padding-right: 20px;
    width: 700px;
    height: 370px;
    -webkit-box-shadow: rgba(0,0,0,0.3) 4px 4px 8px;
    -moz-box-shadow: rgba(100,140,230,0.5) 2px 2px 6px;
    box-shadow: rgba(100,140,230,0.5) 2px 2px 6px;
    -o-box-shadow: rgba(100,140,230,0.5) 2px 2px 6px;
    color: rgba(0, 0, 255, 0.8);
    background: rgba(255, 255, 255, 0.8);
 }

 #instructionsOkayButtonDiv {
    left: 0px;
    width: 100%;
    text-align: center; 
 }

 #instructionsOkayButton {
    margin-top: 30px;
 }

 .toast {
    background: rgba(255, 255, 255, 0.7);
    border: thin solid skyblue;
    -webkit-box-shadow: rgba(0,0,0,0.3) 2px 2px 4px;
    -moz-box-shadow: rgba(100,140,230,0.5) 2px 2px 6px;
    box-shadow: rgba(100,140,230,0.5) 2px 2px 6px;
    -o-box-shadow: rgba(100,140,230,0.5) 2px 2px 6px;
    position: absolute;
    display: none;
 }

 #pausedToast {
    padding: 5px 40px 20px 40px;
    margin-left: 172px;
    margin-top: 100px;
    color: blue;
 }

 #pausedToast p {
    color: blue;
 }

 #pausedToast p.title {
    font-size: 1.50em;
    color: blue;
    padding-left: 18px;
 }

 #scoreToast {
    background: #5a3716;
    left: 25px;
    top: 25px;
    padding: 5px; 
    font-size: 1.25em;
    color: yellow;
    width: 3em;
    text-align: center;
    border: thin solid rgba(255,255,0,0.5);
 }

 div .title { 
    color: blue;
 }

 div p { 
    color: blue;
 }

 div a { 
    text-decoration: none;
    color: cornflowerblue;
 }

 p.title {
    font-size: 1.5em;
 }

 #gameOverToast {
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 10px;
    margin-left: 173px;
    margin-top: 100px;
    text-align: center;
    display: none;
 }

 #highScoreList {
    color: rgba(0,0,255,0.6);
 }

 #previousHighScoresTitle {
    margin-top: 50px;
 }

 #loadButtonSpan {
    position: absolute;
    left: 200px;
    padding-top: 20px;
 }
 
 .blurb {
    padding: 10px;
    display: block;
    font: 12px Arial;
 }

 #progressDiv {
    padding-left: 55px;
    padding-top: 45px;
 }

 #loadingMessage {
    color: navyblue;
    font: 14px Helvetica;
    padding-top: 20px;
    padding-left: 183px;
 } 

 #showPolygonsOnlyToast {
    background: rgba(255,255,255,0.5);
    padding: 3px; 
    color: rgba(255,250,0,1.0);
    text-align: center;
    left: 423px;
    top: 25px;
 }

```

## `requestNextAnimationFrame.js`

```js
window.requestNextAnimationFrame =
   (function () {
      var originalWebkitRequestAnimationFrame = undefined,
          wrapper = undefined,
          callback = undefined,
          geckoVersion = 0,
          userAgent = navigator.userAgent,
          index = 0,
          self = this;

      // Workaround for Chrome 10 bug where Chrome
      // does not pass the time to the animation function
      
      if (window.webkitRequestAnimationFrame) {
         // Define the wrapper

         wrapper = function (time) {
           if (time === undefined) {
              time = +new Date();
           }
           self.callback(time);
         };

         // Make the switch
          
         originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;    

         window.webkitRequestAnimationFrame = function (callback, element) {
            self.callback = callback;

            // Browser calls the wrapper and wrapper calls the callback
            
            originalWebkitRequestAnimationFrame(wrapper, element);
         }
      }

      // Workaround for Gecko 2.0, which has a bug in
      // mozRequestAnimationFrame() that restricts animations
      // to 30-40 fps.

      if (window.mozRequestAnimationFrame) {
         // Check the Gecko version. Gecko is used by browsers
         // other than Firefox. Gecko 2.0 corresponds to
         // Firefox 4.0.
         
         index = userAgent.indexOf('rv:');

         if (userAgent.indexOf('Gecko') != -1) {
            geckoVersion = userAgent.substr(index + 3, 3);

            if (geckoVersion === '2.0') {
               // Forces the return statement to fall through
               // to the setTimeout() function.

               window.mozRequestAnimationFrame = undefined;
            }
         }
      }
      
      return window.requestAnimationFrame   ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||

         function (callback, element) {
            var start,
                finish;

            window.setTimeout( function () {
               start = +new Date();
               callback(start);
               finish = +new Date();

               self.timeout = 1000 / 60 - (finish - start);

            }, self.timeout);
         };
      }
   )
();

```

## `stopwatch.js`

```js
// Stopwatch..................................................................
//
// Like the real thing, you can start and stop a stopwatch, and you can
// find out the elapsed time the stopwatch has been running. After you stop
// a stopwatch, it's getElapsedTime() method returns the elapsed time
// between the start and stop.

Stopwatch = function ()  {
};

// You can get the elapsed time while the timer is running, or after it's
// stopped.

Stopwatch.prototype = {
   startTime: 0,
   running: false,
   elapsedTime: 0,

   start: function () {
      this.startTime = +new Date();
      this.elapsedTime = 0;
      this.running = true;
   },

   stop: function () {
      this.elapsedTime = +new Date() - this.startTime;
      this.running = false;
   },

   getElapsedTime: function () {
      if (this.running) return +new Date() - this.startTime;
      else              return this.elapsedTime;
   },

   reset: function() {
      this.elapsedTime = 0;
      this.startTime = 0;
      this.running = false;
   }
};

```

## `animationTimer.js`

```js
// AnimationTimer..................................................................
//
// An animation runs for a duration, in milliseconds. It's up to you,
// however, to start and stop the animation -- animations do not stop
// automatically. You can check to see if an animation is over with the
// isOver() method, and you can see if an animation is running with
// isRunning(). Note that animations can be over, but still running.
//
// You can also supply an optional timeWarp function that warps the percent
// completed for the animation. That warping lets you do easily incorporate
// non-linear motion, such as: ease-in, ease-out, elastic, etc.

AnimationTimer = function (duration, timeWarp)  {
    this.timeWarp = timeWarp;
 
    if (duration !== undefined) this.duration = duration;
    else                        this.duration = 1000;
 
    this.stopwatch = new Stopwatch();
 };
 
 AnimationTimer.prototype = {
    start: function () {
       this.stopwatch.start();
    },
 
    stop: function () {
       this.stopwatch.stop();
    },
 
    getRealElapsedTime: function () {
       return this.stopwatch.getElapsedTime();
    },
    
    getElapsedTime: function () {
       var elapsedTime = this.stopwatch.getElapsedTime(),
           percentComplete = elapsedTime / this.duration;
 
       if (!this.stopwatch.running)    return undefined;
       if (this.timeWarp == undefined) return elapsedTime;
 
       return elapsedTime * (this.timeWarp(percentComplete) / percentComplete);
    },
 
    isRunning: function() {
       return this.stopwatch.running;
    },
    
    isOver: function () {
       return this.stopwatch.getElapsedTime() > this.duration;
    },
 
    reset: function() {
       this.stopwatch.reset();
    }
 };
 
 AnimationTimer.makeEaseOut = function (strength) {
    return function (percentComplete) {
       return 1 - Math.pow(1 - percentComplete, strength*2);
    };
 };
 
 AnimationTimer.makeEaseIn = function (strength) {
    return function (percentComplete) {
       return Math.pow(percentComplete, strength*2);
    };
 };
 
 AnimationTimer.makeEaseInOut = function () {
    return function (percentComplete) {
       return percentComplete - Math.sin(percentComplete*2*Math.PI) / (2*Math.PI);
    };
 };
 
 AnimationTimer.makeElastic = function (passes) {
    passes = passes || 3;
    return function (percentComplete) {
        return ((1-Math.cos(percentComplete * Math.PI * passes)) *
                (1 - percentComplete)) + percentComplete;
    };
 };
 
 AnimationTimer.makeBounce = function (bounces) {
    var fn = AnimationTimer.makeElastic(bounces);
    return function (percentComplete) {
       percentComplete = fn(percentComplete);
       return percentComplete <= 1 ? percentComplete : 2-percentComplete;
    }; 
 };
 
 AnimationTimer.makeLinear = function () {
    return function (percentComplete) {
       return percentComplete;
    };
 };
 
```

## `progressbar.js`

```js
var COREHTML5 = COREHTML5 || {}

COREHTML5.Progressbar = function(w, h, strokeStyle, red, green, blue) {
   this.domElement = document.createElement('div');
   this.context = document.createElement('canvas').getContext('2d');
   this.domElement.appendChild(this.context.canvas);

   this.context.canvas.width = w + h;  // On each end, corner radius = h/2
   this.context.canvas.height = h;
   
   this.setProgressbarProperties(w, h);

   this.background.globalAlpha = 0.3;
   this.drawToBuffer(this.background, strokeStyle, red, green, blue);
   this.drawToBuffer(this.foreground, strokeStyle, red, green, blue);

   this.percentComplete = 0;
   return this;
}

COREHTML5.Progressbar.prototype = {
   LEFT: 0,
   TOP: 0,

   setProgressbarProperties: function(w, h) {
      this.w = w;
      this.h = h;
      this.cornerRadius = this.h/2,
      this.right  = this.LEFT + this.cornerRadius + this.w + this.cornerRadius,
      this.bottom = this.TOP + this.h;

      this.background = document.createElement('canvas').getContext('2d'),
      this.foreground = document.createElement('canvas').getContext('2d'),

      this.background.canvas.width = w + h; // On each end, corner radius = h/2
      this.background.canvas.height = h;

      this.foreground.canvas.width = w + h; // On each end, corner radius = h/2
      this.foreground.canvas.height = h;
   },

   draw: function (percentComplete) {
      this.erase();
      this.context.drawImage(this.background.canvas, 0, 0);

      if (percentComplete > 0) {
         this.context.drawImage(this.foreground.canvas, 0, 0,
                             this.foreground.canvas.width*(percentComplete/100),
                             this.foreground.canvas.height,
                             0, 0,
                             this.foreground.canvas.width*(percentComplete/100),
                             this.foreground.canvas.height);
      }
   },
   
   drawToBuffer: function (context, strokeStyle, red, green, blue) {
		context.save();

      context.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
      context.strokeStyle = strokeStyle;
      
		context.beginPath();

      context.moveTo(this.LEFT + this.cornerRadius, this.TOP);
      context.lineTo(this.right - this.cornerRadius, this.TOP);

      context.arc(this.right - this.cornerRadius,
           this.TOP + this.cornerRadius, this.cornerRadius, -Math.PI/2, Math.PI/2);

      context.lineTo(this.LEFT + this.cornerRadius,
           this.TOP + this.cornerRadius*2);

      context.arc(this.LEFT + this.cornerRadius,
           this.TOP + this.cornerRadius, this.cornerRadius, Math.PI/2, -Math.PI/2);

		context.fill();

	   context.shadowColor = undefined;

      var gradient = context.createLinearGradient(this.LEFT, this.TOP, this.LEFT, this.bottom);
      gradient.addColorStop(0, 'rgba(255,255,255,0.4)');
      gradient.addColorStop(0.3, 'rgba(255,255,255,0.7)');
      gradient.addColorStop(0.4, 'rgba(255,255,255,0.5)');
      gradient.addColorStop(1, 'rgba(255,255,255,0.1)');
      context.fillStyle = gradient;
		context.fill();

      context.lineWidth = 0.4;
      context.stroke();

		context.restore();
	},

   erase: function() {
      this.context.clearRect(this.LEFT, this.TOP, this.context.canvas.width, this.context.canvas.height);
   }
};

```

## `sprites.js`

```js
// Painters...................................................................

// Painters paint sprites with a paint(sprite, context) method. ImagePainters
// paint an image for their sprite.

var ImagePainter = function (imageUrl) {
    this.image = new Image;
    this.image.src = imageUrl;
 };
 
 ImagePainter.prototype = {
    image: undefined,
 
    paint: function (sprite, context) {
       if (this.image !== undefined) {
          if ( ! this.image.complete) {
             this.image.onload = function (e) {
                sprite.width = this.width;
                sprite.height = this.height;
                
                context.drawImage(this,  // this is image
                   sprite.left, sprite.top,
                   sprite.width, sprite.height);
             };
          }
          else {
            context.drawImage(this.image, sprite.left, sprite.top,
                              sprite.width, sprite.height); 
          }
       }
    }
 };
 
 SpriteSheetPainter = function (cells) {
    this.cells = cells;
 };
 
 SpriteSheetPainter.prototype = {
    cells: [],
    cellIndex: 0,
 
    advance: function () {
       if (this.cellIndex == this.cells.length-1) {
          this.cellIndex = 0;
       }
       else {
          this.cellIndex++;
       }
    },
    
    paint: function (sprite, context) {
       var cell = this.cells[this.cellIndex];
       context.drawImage(spritesheet, cell.x, cell.y, cell.w, cell.h,
                        sprite.left, sprite.top, cell.w, cell.h);
    }
 };
 
 // Sprite Animators...........................................................
 
 // Sprite animators have an array of painters that they succesively apply
 // to a sprite over a period of time. Animators can be started with 
 // start(sprite, durationInMillis, restoreSprite)
 
 var SpriteAnimator = function (painters, elapsedCallback) {
    this.painters = painters;
    if (elapsedCallback) {
       this.elapsedCallback = elapsedCallback;
    }
 };
 
 SpriteAnimator.prototype = {
    painters: [],
    duration: 1000,
    startTime: 0,
    index: 0,
    elapsedCallback: undefined,
 
    end: function (sprite, originalPainter) {
       sprite.animating = false;
 
       if (this.elapsedCallback) {
          this.elapsedCallback(sprite);
       }
       else {
          sprite.painter = originalPainter;
       }              
    },
    
    start: function (sprite, duration) {
       var endTime = +new Date() + duration,
           period = duration / (this.painters.length),
           interval = undefined,
           animator = this, // for setInterval() function
           originalPainter = sprite.painter;
 
       this.index = 0;
       sprite.animating = true;
       sprite.painter = this.painters[this.index];
 
       interval = setInterval(function() {
          if (+new Date() < endTime) {
             sprite.painter = animator.painters[++animator.index];
          }
          else {
             animator.end(sprite, originalPainter);
             clearInterval(interval);
          }
       }, period); 
    },
 };
 
 // Sprites....................................................................
 
 // Sprites have a name, a painter, and an array of behaviors. Sprites can
 // be updated, and painted.
 //
 // A sprite's painter paints the sprite: paint(sprite, context)
 // A sprite's behavior executes: execute(sprite, context, time)
 
 var Sprite = function (name, painter, behaviors) {
    if (name !== undefined)      this.name = name;
    if (painter !== undefined)   this.painter = painter;
    if (behaviors !== undefined) this.behaviors = behaviors;
 
    return this;
 };
 
 Sprite.prototype = {
    left: 0,
    top: 0,
    width: 10,
    height: 10,
     velocityX: 0,
     velocityY: 0,
    visible: true,
    animating: false,
    painter: undefined, // object with paint(sprite, context)
    behaviors: [], // objects with execute(sprite, context, time)
 
     paint: function (context) {
      if (this.painter !== undefined && this.visible) {
         this.painter.paint(this, context);
      }
     },
 
    update: function (context, time) {
       for (var i = this.behaviors.length; i > 0; --i) {
          this.behaviors[i-1].execute(this, context, time);
       }
    }
 };
 
```

## `gameEngine.js`

```js
var getTimeNow = function () {
    return +new Date();
 };
 
 // Game.......................................................................
 
 // This game engine implements a game loop that draws sprites. See sprites.js.
 //
 // The game engine also has support for:
 //
 // Time-based motion (game.pixelsPerFrame())
 // Pause (game.togglePaused())
 // High Scores (game.setHighScore(), game.getHighScores(), game.clearHighScores())
 // Sound (game.canPlaySound(), game.playSound())
 // Accessing frame rate (game.fps)
 // Accessing game time (game.gameTime)
 // Key processing (game.addKeyListener())
 //
 // The game engine's animate() method invokes the following methods,
 // in the order listed:
 //
 //     game.startAnimate()
 //     game.paintUnderSprites()
 //     game.paintOverSprites()
 //     game.endAnimate()
 //
 // Those four methods are implemented by the game engine to do nothing.
 // You override those do-nothing implementations to make the game come alive.
 
 var Game = function (gameName, canvasId) {
    var canvas = document.getElementById(canvasId),
        self = this; // Used by key event handlers below
 
    // General
    
    this.context = canvas.getContext('2d');
    this.gameName = gameName;
    this.sprites = [];
    this.keyListeners = [];
 
    // High scores
 
    this.HIGH_SCORES_SUFFIX = '_highscores';
 
    // Image loading
    
    this.imageLoadingProgressCallback;
    this.images = {};
    this.imageUrls = [];
    this.imagesLoaded = 0;
    this.imagesFailedToLoad = 0;
    this.imagesIndex = 0;
 
    // Time
    
    this.startTime = 0;
    this.lastTime = 0;
    this.gameTime = 0;
    this.fps = 0;
    this.STARTING_FPS = 60;
 
    this.paused = false;
    this.startedPauseAt = 0;
    this.PAUSE_TIMEOUT = 100;
 
    // Sound
 
    this.soundOn = true;
    this.soundChannels = [];
    this.audio = new Audio();
    this.NUM_SOUND_CHANNELS = 10;
 
    for (var i=0; i < this.NUM_SOUND_CHANNELS; ++i) {
       var audio = new Audio();
       this.soundChannels.push(audio);
    }
 
    // The this object in the following event handlers is the
    // DOM window, which is why the functions call
    // self.keyPressed() instead of this.keyPressed(e).
 
    window.onkeypress = function (e) { self.keyPressed(e)  };
    window.onkeydown  = function (e) { self.keyPressed(e); };
 
    return this;
 };
 
 // Game methods...............................................................
 
 Game.prototype = {
    // Given a URL, return the associated image
    
    getImage: function (imageUrl) {
       return this.images[imageUrl];
    },
    
    // This method is called by loadImage() when
    // an image loads successfully.
 
    imageLoadedCallback: function (e) {
       this.imagesLoaded++;
    },
    
    // This method is called by loadImage() when
    // an image does not load successfully.
 
    imageLoadErrorCallback: function (e) {
       this.imagesFailedToLoad++;
    },
 
    // Loads a particular image
    
    loadImage: function (imageUrl) {
       var image = new Image(),
           self = this; // load and error event handlers called by DOMWindow
 
       image.src = imageUrl;
 
       image.addEventListener('load',
          function (e) {
             self.imageLoadedCallback(e); 
          });
 
       image.addEventListener('error',
          function (e) {
             self.imageLoadErrorCallback(e);
          });
 
       this.images[imageUrl] = image;
    },
 
    // You call this method repeatedly to load images that have been
    // queued (by calling queueImage()). This method returns the
    // percent of the games images that have been processed. When
    // the method returns 100, all images are loaded, and you can
    // quit calling this method.
    
    loadImages: function () {
 
       // If there are images left to load
 
       if (this.imagesIndex < this.imageUrls.length) {
          this.loadImage(this.imageUrls[this.imagesIndex]);
          this.imagesIndex++;
       }
 
       // Return the percent complete
 
       return (this.imagesLoaded + this.imagesFailedToLoad) /
               this.imageUrls.length * 100;
    },
 
    // Call this method to add an image to the queue. The image
    // will be loaded by loadImages().
    
    queueImage: function (imageUrl) {
       this.imageUrls.push(imageUrl);
    },
    
    // Game loop..................................................................
 
    // Starts the animation by invoking window.requestNextAnimationFrame().
    //
    // window.requestNextAnimationFrame() is a polyfill method implemented in
    // requestNextAnimationFrame.js. You pass requestNextAnimationFrame() a
    // reference to a function that the browser calls when it's time to draw
    // the next animation frame.
    //
    // When it's time to draw the next animation frame, the browser invokes
    // the function that you pass to requestNextAnimationFrame(). Because that
    // function is invoked by the browser (the window object, to be more exact),
    // the this variable in that function will be the window object. We want
    // the this variable to be the game instead, so we use JavaScript's built-in
    // call() function to call the function, with the game specified as the
    // this variable.
    
    start: function () {
       var self = this;               // The this variable is the game
       this.startTime = getTimeNow(); // Record game's startTime (used for pausing)
 
       window.requestNextAnimationFrame(
          function (time) {
             // The this variable in this function is the window, not the game,
             // which is why we do not simply do this: animate.call(time).
             
             self.animate.call(self, time); // self is the game
          });
    },
 
    // Drives the game's animation. This method is called by the browser when
    // it's time for the next animation frame.
    //
    // If the game is paused, animate() reschedules another call to animate()
    // in PAUSE_TIMEOUT (100) ms.
    //
    // If the game is not paused, animate() paints the next animation frame and
    // reschedules another call to animate() when it's time to draw the
    // next animation frame.
    //
    // The implementations of this.startAnimate(), this.paintUnderSprites(),
    // this.paintOverSprites(), and this.endAnimate() do nothing. You override
    // those methods to create the animation frame.
 
    animate: function (time) {
       var self = this; // window.requestNextAnimationFrame() called by DOMWindow
       
       if (this.paused) {
          // In PAUSE_TIMEOUT (100) ms, call this method again to see if the game
          // is still paused. There's no need to check more frequently.
          
          setTimeout( function () {
             window.requestNextAnimationFrame(
                function (time) {
                   self.animate.call(self, time);
                });
          }, this.PAUSE_TIMEOUT);
       }
       else {                       // Game is not paused
          this.tick(time);          // Update fps, game time
          this.clearScreen();       // Clear the screen in preparation for next frame
 
          this.startAnimate(time);  // Override as you wish
          this.paintUnderSprites(); // Override as you wish
 
          this.updateSprites(time); // Invoke sprite behaviors
          this.paintSprites(time);  // Paint sprites in the canvas
 
          this.paintOverSprites();  // Override as you wish
          this.endAnimate();        // Override as you wish
 
          this.lastTime = time;
 
          // Call this method again when it's time for the next animation frame
 
          window.requestNextAnimationFrame(
             function (time) {
                self.animate.call(self, time); // The this variable refers to the window
             });
       }
    },
 
    // Update the frame rate, game time, and the last time the application
    // drew an animation frame.
    
    tick: function (time) {
       this.updateFrameRate(time);
       this.gameTime = (getTimeNow()) - this.startTime;
    },
 
    // Update the frame rate, based on the amount of time it took
    // for the last animation frame only.
    
    updateFrameRate: function (time) {
       if (this.lastTime === 0) this.fps = this.STARTING_FPS;
       else                     this.fps = 1000 / (time - this.lastTime);
    },
 
    // Clear the entire canvas.
    
    clearScreen: function () {
       this.context.clearRect(0, 0,
          this.context.canvas.width, this.context.canvas.height);
    },
 
    // Update all sprites. The sprite update() method invokes all
    // of a sprite's behaviors.
 
    updateSprites: function (time) {
       for(var i=0; i < this.sprites.length; ++i) {
          var sprite = this.sprites[i];
          sprite.update(this.context, time);
       };
    },
 
    // Paint all visible sprites.
    
    paintSprites: function (time) {
       for(var i=0; i < this.sprites.length; ++i) {
          var sprite = this.sprites[i];
          if (sprite.visible)
             sprite.paint(this.context);
       };
    },
 
    // Toggle the paused state of the game. If, after
    // toggling, the paused state is unpaused, the
    // application subtracts the time spent during
    // the pause from the game's start time. That
    // means the game picks up where it left off,
    // without a potentially large jump in time.
 
    togglePaused: function () {
       var now = getTimeNow();
 
       this.paused = !this.paused;
 
       if (this.paused) {
          this.startedPauseAt = now;
       }
       else { // not paused
          // Adjust start time, so game starts where it left off when
          // the user paused it.
 
          this.startTime = this.startTime + now - this.startedPauseAt;
          this.lastTime = now;
       }
    },
 
    // Given a velocity of some object, calculate the number of pixels to
    // move that object for the current frame.
    
    pixelsPerFrame: function (time, velocity) {
       // Sprites move a certain amount of pixels per frame (pixels/frame).
       // This methods returns the amount of pixels a sprite should move
       // for a given frame. Sprite velocity is measured in pixels / second,
       // so: (pixels/second) * (second/frame) = pixels/frame:
 
       return velocity / this.fps;  // pixels / frame
    },
 
    // High scores................................................................
 
    // Returns an array of high scores from local storage.
    
    getHighScores: function () {
       var key = this.gameName + this.HIGH_SCORES_SUFFIX,
           highScoresString = localStorage[key];
 
       if (highScoresString == undefined) {
          localStorage[key] = JSON.stringify([]);
       }
       return JSON.parse(localStorage[key]);
    },
 
    // Sets the high score in local storage.
 
    setHighScore: function (highScore) {
       var key = this.gameName + this.HIGH_SCORES_SUFFIX,
           highScoresString = localStorage[key];
       
       highScores.unshift(highScore);
       localStorage[key] = JSON.stringify(highScores);
    },
 
    // Removes the high scores from local storage.
 
    clearHighScores: function () {
       localStorage[this.gameName + this.HIGH_SCORES_SUFFIX] = JSON.stringify([]);
    },
 
    // Key listeners..............................................................
 
    // Add a (key, listener) pair to the keyListeners array.
    
    addKeyListener: function (keyAndListener) {
       this.keyListeners.push(keyAndListener);
    },
    
    // Given a key, return the associated listener.
 
    findKeyListener: function (key) {
       var listener = undefined;
       
       for(var i=0; i < this.keyListeners.length; ++i) {
          var keyAndListener = this.keyListeners[i],
              currentKey = keyAndListener.key;
          if (currentKey === key) {
             listener = keyAndListener.listener;
          }
       };
       return listener;
    },
 
    // This method is the call back for key down and key press
    // events.
    
    keyPressed: function (e) {
       var listener = undefined,
           key = undefined;
 
       switch (e.keyCode) {
          // Add more keys as needed
 
          case 32: key = 'space';        break;
          case 68: key = 'd';            break;
          case 75: key = 'k';            break;
          case 83: key = 's';            break;
          case 80: key = 'p';            break;
          case 37: key = 'left arrow';   break;
          case 39: key = 'right arrow';  break;
          case 38: key = 'up arrow';     break;
          case 40: key = 'down arrow';   break;
       }
 
       listener = this.findKeyListener(key);
       if (listener) { // listener is a function
          listener();  // invoke the listener function
       }
    },
 
    // Sound......................................................................
 
    // Returns true if the browser can play sounds in the ogg file format.
 
    canPlayOggVorbis: function () {
       return "" != this.audio.canPlayType('audio/ogg; codecs="vorbis"');
    },
 
    // Returns true if the browser can play sounds in the mp3 file format.
 
    canPlayMp3: function () {
       return "" != this.audio.canPlayType('audio/mpeg');
    },
 
    // Returns the first available sound channel from the array of sound channels.
 
    getAvailableSoundChannel: function () {
       var audio;
       
       for (var i=0; i < this.NUM_SOUND_CHANNELS; ++i) {
          audio = this.soundChannels[i];
 
          if (audio.played.length === 0 || audio.ended) {
             return audio;
          }
       }
       return undefined; // all channels in use
    },
 
    // Given an identifier, play the associated sound.
    
    playSound: function (id) {
       var channel = this.getAvailableSoundChannel(),
           element = document.getElementById(id);
 
       if (channel && element) {
          channel.src = element.src === '' ? element.currentSrc : element.src;
          channel.load();
          channel.play();
       }
    },
 
    
    // Sprites....................................................................
 
    // Add a sprite to the game. The game engine will update the sprite and
    // paint it (if it's visible) in the animate() method.
    
    addSprite: function (sprite) {
       this.sprites.push(sprite);
    },
    
    // It's probably a good idea not to access sprites directly, because
    // it's better to write generalized code that deals with all
    // sprites, so this method should be used sparingly.
    
    getSprite: function (name) { 
       for(i in this.sprites) {
          if (this.sprites[i].name === name)
             return this.sprites[i];
       }
       return null;      
    },
 
    // Override the following methods as desired:
 
    startAnimate:      function (time) { }, // These methods are called by
    paintUnderSprites: function ()     { }, // animate() in the order they
    paintOverSprites:  function ()     { }, // are listed. Override them
    endAnimate:        function ()     { }  // as you wish.
 };
 
```

## `shapes.js`

```js
// Functions.....................................................

// ..............................................................
// Check to see if a polygon collides with another polygon
// ..............................................................

function polygonCollidesWithPolygon (p1, p2, displacement) { // displacement for p1
    var mtv1 = p1.minimumTranslationVector(p1.getAxes(), p2, displacement),
        mtv2 = p1.minimumTranslationVector(p2.getAxes(), p2, displacement);
 
    if (mtv1.overlap === 0 || mtv2.overlap === 0)
       return { axis: undefined, overlap: 0 };
    else
       return mtv1.overlap < mtv2.overlap ? mtv1 : mtv2;
 };
 
 // ..............................................................
 // Check to see if a circle collides with another circle
 // ..............................................................
 
 function circleCollidesWithCircle (c1, c2) {
    var distance = Math.sqrt( Math.pow(c2.x - c1.x, 2) +
                              Math.pow(c2.y - c1.y, 2)),
        overlap = Math.abs(c1.radius + c2.radius) - distance;
 
    return overlap < 0 ?
       new MinimumTranslationVector(undefined, 0) :
       new MinimumTranslationVector(undefined, overlap);
 };
 
 // ..............................................................
 // Get the polygon's point that's closest to the circle
 // ..............................................................
 
 function getPolygonPointClosestToCircle(polygon, circle) {
    var min = BIG_NUMBER,
        length,
        testPoint,
        closestPoint;
    
    for (var i=0; i < polygon.points.length; ++i) {
       testPoint = polygon.points[i];
       length = Math.sqrt(Math.pow(testPoint.x - circle.x, 2), 
                          Math.pow(testPoint.y - circle.y, 2));
       if (length < min) {
          min = length;
          closestPoint = testPoint;
       }
    }
 
    return closestPoint;
 };
 
 // ..............................................................
 // Get the circle's axis (circle's don't have an axis, so this
 // method manufactures one)
 // ..............................................................
 
 function getCircleAxis(circle, polygon, closestPoint) {
    var v1 = new Vector(new Point(circle.x, circle.y)),
        v2 = new Vector(new Point(closestPoint.x, closestPoint.y)),
        surfaceVector = v1.subtract(v2);
 
    return surfaceVector.normalize();
 };
 
 // ..............................................................
 // Tests to see if a polygon collides with a circle
 // ..............................................................
 
 function polygonCollidesWithCircle (polygon, circle, displacement) {
    var axes = polygon.getAxes(),
        closestPoint = getPolygonPointClosestToCircle(polygon, circle);
 
    axes.push(getCircleAxis(circle, polygon, closestPoint));
 
    return polygon.minimumTranslationVector(axes, circle, displacement);
 };
 
 // ..............................................................
 // Given two shapes, and a set of axes, returns the minimum
 // translation vector.
 // ..............................................................
 
 
 function getMTV(shape1, shape2, displacement, axes) {
    var minimumOverlap = BIG_NUMBER,
        overlap,
        axisWithSmallestOverlap,
        mtv;
 
    for (var i=0; i < axes.length; ++i) {
       axis = axes[i];
       projection1 = shape1.project(axis);
       projection2 = shape2.project(axis);
       overlap = projection1.getOverlap(projection2);
 
       if (overlap === 0) {
          return new MinimumTranslationVector(undefined, 0);
       }
       else {
          if (overlap < minimumOverlap) {
             minimumOverlap = overlap;
             axisWithSmallestOverlap = axis;    
          }
       }
    }
    mtv = new MinimumTranslationVector(axisWithSmallestOverlap,
                                      minimumOverlap);
    return mtv;
 };
 
 
 // Constants.....................................................
 
 var BIG_NUMBER = 1000000;
 
 
 // Points........................................................
 
 var Point = function (x, y) {
    this.x = x;
    this.y = y;
 };
 
 Point.prototype = {
    rotate: function (rotationPoint, angle) {
       var tx, ty, rx, ry;
    
       tx = this.x - rotationPoint.x; // tx = translated X
       ty = this.y - rotationPoint.y; // ty = translated Y
 
       rx = tx * Math.cos(-angle) - // rx = rotated X
            ty * Math.sin(-angle);
 
       ry = tx * Math.sin(-angle) + // ry = rotated Y
            ty * Math.cos(-angle);
 
       return new Point(rx + rotationPoint.x, ry + rotationPoint.y); 
    }
 };
 
 // Lines.........................................................
 
 var Line = function(p1, p2) {
    this.p1 = p1;  // point 1
    this.p2 = p2;  // point 2
 }
 
 Line.prototype.intersectionPoint = function (line) {
    var m1, m2, b1, b2, ip = new Point();
 
    if (this.p1.x === this.p2.x) {
       m2 = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x);
       b2 = line.p1.y - m2 * line.p1.x;
       ip.x = this.p1.x;
       ip.y = m2 * ip.x + b2;
    }
    else if(line.p1.x === line.p2.x) {
       m1 = (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x);
       b1 = this.p1.y - m1 * this.p1.x;
       ip.x = line.p1.x;
       ip.y = m1 * ip.x + b1;
    }
    else {
      m1 = (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x);
       m2 = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x);
       b1 = this.p1.y - m1 * this.p1.x;
       b2 = line.p1.y - m2 * line.p1.x;
       ip.x = (b2 - b1) / (m1 - m2);
       ip.y = m1 * ip.x + b1;
    }
    return ip;
 };
    
 // Bounding boxes................................................
 
 var BoundingBox = function(left, top, width, height) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
 };
 
 
 // Vectors.......................................................
 
 var Vector = function(point) {
    if (point === undefined) {
       this.x = 0;
       this.y = 0;
    }
    else {
       this.x = point.x;
       this.y = point.y;
    }
 };
 
 Vector.prototype = {
    getMagnitude: function () {
       return Math.sqrt(Math.pow(this.x, 2) +
                        Math.pow(this.y, 2));
    },
 
    setMagnitude: function (m) {
       var uv = this.normalize();
       this.x = uv.x * m;
       this.y = uv.y * m;
    },
    
    dotProduct: function (vector) {
       return this.x * vector.x +
              this.y * vector.y;
    },
 
    add: function (vector) {
       var v = new Vector();
       v.x = this.x + vector.x;
       v.y = this.y + vector.y;
       return v;
    },
 
    subtract: function (vector) {
       var v = new Vector();
       v.x = this.x - vector.x;
       v.y = this.y - vector.y;
       return v;
    },
 
    normalize: function () {
       var v = new Vector(),
           m = this.getMagnitude();
       v.x = this.x / m;
       v.y = this.y / m;
       return v;
    },
 
    perpendicular: function () {
       var v = new Vector();
       v.x = this.y;
       v.y = 0-this.x;
       return v;
    },
 
    reflect: function (axis) {
       var dotProductRatio, vdotl, ldotl, v = new Vector(),
            vdotl = this.dotProduct(axis),
            ldotl = axis.dotProduct(axis),
            dotProductRatio = vdotl / ldotl;
 
       v.x = 2 * dotProductRatio * axis.x - this.x;
       v.y = 2 * dotProductRatio * axis.y - this.y;
 
       return v;
    }
 };
 
 
 // Shapes........................................................
 
 var Shape = function () {
    this.fillStyle = 'rgba(255, 255, 0, 0.8)';
    this.strokeStyle = 'white';
 };
 
 Shape.prototype = {
    move: function (dx, dy) {
       throw 'move(dx, dy) not implemented';
    },
 
    createPath: function (context) {
       throw 'createPath(context) not implemented';
    },
 
    boundingBox: function () {
       throw 'boundingBox() not implemented';
    },
 
    fill: function (context) {
       context.save();
       context.fillStyle = this.fillStyle;
       this.createPath(context);
       context.fill();
       context.restore();
    },
 
    stroke: function (context) {
       context.save();
       context.strokeStyle = this.strokeStyle;
       this.createPath(context);
       context.stroke();
       context.restore();
    },
 
    collidesWith: function (shape, displacement) {
       throw 'collidesWith(shape, displacement) not implemented';
    },
    
    isPointInPath: function (context, x, y) {
       this.createPath(context);
       return context.isPointInPath(x, y);
    },
 
    project: function (axis) {
       throw 'project(axis) not implemented';
    },
 
    minimumTranslationVector: function (axes, shape, displacement) {
       return getMTV(this, shape, displacement, axes);
    }
 };
 
 
 // Circles.......................................................
 
 var Circle = function (x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.strokeStyle = 'blue';
    this.fillStyle = 'yellow';
 }
 
 Circle.prototype = new Shape();
 
 Circle.prototype.centroid = function () {
    return new Point(this.x,this.y);
 };
 
 Circle.prototype.move = function (dx, dy) {
    this.x += dx;
    this.y += dy;
 };
 
 Circle.prototype.boundingBox = function (dx, dy) {
    return new BoundingBox(this.x - this.radius,
                           this.y - this.radius,
                           2*this.radius,
                           2*this.radius);
 };
 
 Circle.prototype.createPath = function (context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
 };
    
 Circle.prototype.project = function (axis) {
    var scalars = [],
        point = new Point(this.x, this.y);
        dotProduct = new Vector(point).dotProduct(axis);
 
    scalars.push(dotProduct);
    scalars.push(dotProduct + this.radius);
    scalars.push(dotProduct - this.radius);
 
    return new Projection(Math.min.apply(Math, scalars),
                          Math.max.apply(Math, scalars));
 };
 
 Circle.prototype.collidesWith = function (shape, displacement) {
    if (shape.radius === undefined) {
       return polygonCollidesWithCircle(shape, this, displacement);
    }
    else {
       return circleCollidesWithCircle(this, shape, displacement);
    }
 };
    
 
 // Polygons......................................................
 
 var Polygon = function () {
    this.points = [];
    this.strokeStyle = 'blue';
    this.fillStyle = 'white';
 };
 
 Polygon.prototype = new Shape();
 
 Polygon.prototype.getAxes = function () {
    var v1, v2, surfaceVector, axes = [], pushAxis = true;
       
    for (var i=0; i < this.points.length-1; i++) {
       v1 = new Vector(this.points[i]);
       v2 = new Vector(this.points[i+1]);
 
       surfaceVector = v2.subtract(v1);
       axes.push(surfaceVector.perpendicular().normalize());
    }
 
    return axes;
 };
 
 Polygon.prototype.project = function (axis) {
    var scalars = [];
 
    this.points.forEach( function (point) {
       scalars.push(new Vector(point).dotProduct(axis));
    });
 
    return new Projection(Math.min.apply(Math, scalars),
                          Math.max.apply(Math, scalars));
 };
 
 Polygon.prototype.addPoint = function (x, y) {
    this.points.push(new Point(x,y));
 };
 
 Polygon.prototype.createPath = function (context) {
    if (this.points.length === 0)
       return;
       
    context.beginPath();
    context.moveTo(this.points[0].x,
                   this.points[0].y);
          
    for (var i=0; i < this.points.length; ++i) {
       context.lineTo(this.points[i].x,
                      this.points[i].y);
    }
 };
    
 Polygon.prototype.move = function (dx, dy) {
    var point, x;
    for(var i=0; i < this.points.length; ++i) {
       point = this.points[i];
      x += dx;
      y += dy;
    }
 };
 
 Polygon.prototype.collidesWith = function (shape, displacement) {
    if (shape.radius !== undefined) {
       return polygonCollidesWithCircle(this, shape, displacement);
    }
    else {
       return polygonCollidesWithPolygon(this, shape, displacement);
    }
 };
 
 Polygon.prototype.move = function (dx, dy) {
    for (var i=0, point; i < this.points.length; ++i) {
       point = this.points[i];
       point.x += dx;
       point.y += dy;
    }
 };
 
 Polygon.prototype.boundingBox = function (dx, dy) {
    var minx = BIG_NUMBER,
        miny = BIG_NUMBER,
        maxx = -BIG_NUMBER,
        maxy = -BIG_NUMBER,
        point;
 
    for (var i=0; i < this.points.length; ++i) {
       point = this.points[i];
       minx = Math.min(minx,point.x);
       miny = Math.min(miny,point.y);
       maxx = Math.max(maxx,point.x);
       maxy = Math.max(maxy,point.y);
    }
 
    return new BoundingBox(minx, miny,
                           parseFloat(maxx - minx),
                           parseFloat(maxy - miny));
 };
 
 Polygon.prototype.centroid = function () {
    var pointSum = new Point(0,0);
    
    for (var i=0, point; i < this.points.length; ++i) {
       point = this.points[i];
       pointSum.x += point.x;
       pointSum.y += point.y;
    }
    return new Point(pointSum.x/this.points.length, pointSum.y/this.points.length);
 }
 
 // Projections...................................................
 
 var Projection = function (min, max) {
    this.min = min;
    this.max = max;
 };
 
 Projection.prototype = {
    overlaps: function (projection) {
       return this.max > projection.min && projection.max > this.min;
    },
 
    getOverlap: function (projection) {
       var overlap;
 
       if (!this.overlaps(projection))
          return 0;
       
       if (this.max > projection.max) {
          overlap = projection.max - this.min;
       }
       else {
         overlap = this.max - projection.min;
       }
       return overlap;
    }
 };
 
 
 // MinimumTranslationVector.........................................
 
 var MinimumTranslationVector = function (axis, overlap) {
    this.axis = axis;
    this.overlap = overlap;
 };
 
 var ImageShape = function(imageSource, x, y, w, h) {
    var self = this;
 
    this.image = new Image();
    this.imageLoaded = false;
    this.points = [ new Point(x,y) ];
    this.x = x;
    this.y = y;
 
    this.image.src = imageSource;
 
    this.image.addEventListener('load', function (e) {
       self.setPolygonPoints();
       self.imageLoaded = true;
    }, false);
 }
 
 ImageShape.prototype = new Polygon();
 
 ImageShape.prototype.fill = function (context) {
 };
 
 ImageShape.prototype.setPolygonPoints = function() {
    this.points.push(new Point(this.x + this.image.width, this.y));
    this.points.push(new Point(this.x + this.image.width, this.y + this.image.height));
    this.points.push(new Point(this.x, this.y + this.image.height));
    this.points.push(new Point(this.x, this.y));
    this.points.push(new Point(this.x + this.image.width, this.y));
 };
 
 ImageShape.prototype.drawImage = function (context) {
    context.drawImage(this.image, this.points[0].x, this.points[0].y);
 };
 
 ImageShape.prototype.stroke = function (context) {
    var self = this;
    
    if (this.imageLoaded) {
       context.drawImage(this.image, this.points[0].x, this.points[0].y);
    }
    else {
       this.image.addEventListener('load', function (e) {
          self.drawImage(context);
       }, false);
    }
 };
 
 
 var SpriteShape = function (sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    sprite.left = x;
    sprite.top = y;
    this.setPolygonPoints();
 };
 
 SpriteShape.prototype = new Polygon();
 
 SpriteShape.prototype.move = function (dx, dy) {
    var point, x;
    for(var i=0; i < this.points.length; ++i) {
       point = this.points[i];
       point.x += dx;
       point.y += dy;
    }
    this.sprite.left = this.points[0].x;
    this.sprite.top = this.points[0].y;
 };
 
 SpriteShape.prototype.fill = function (context) {
 };
 
 SpriteShape.prototype.setPolygonPoints = function() {
    this.points.push(new Point(this.x, this.y));
    this.points.push(new Point(this.x, this.y + this.sprite.height));
    this.points.push(new Point(this.x + this.sprite.width, this.y + this.sprite.height));
    this.points.push(new Point(this.x + this.sprite.width, this.y));
    this.points.push(new Point(this.x, this.y));
 };
 /*
 SpriteShape.prototype.stroke = function (context) {
    this.sprite.paint(context);
 };
 */
 
 
```

## `pinball.js`

```js
var game = new Game('pinball', 'gameCanvas'),
   applyGravityAndFriction = false;

   TRY_AGAIN_X = 255,
   TRY_AGAIN_Y = 865,
   TRY_AGAIN_RADIUS = 35,
   showTryAgain = false,

   showingHighScores = true,

   // Flippers...................................................

   LEFT_FLIPPER = 1,
   RIGHT_FLIPPER = 2,

   LEFT_FLIPPER_PIVOT_X = 143,
   LEFT_FLIPPER_PIVOT_Y = 774,

   LEFT_FLIPPER_PIVOT_OFFSET_X = 28,
   LEFT_FLIPPER_PIVOT_OFFSET_Y = 29,

   FLIPPER_RISE_DURATION = 25,
   FLIPPER_FALL_DURATION = 175,

   MAX_FLIPPER_ANGLE = Math.PI/4,

   LEFT_FLIPPER_STRIKE_ZONE_LEFT = 175,
   LEFT_FLIPPER_STRIKE_ZONE_RIGHT = 260,

   FLIPPER_BOTTOM = 870,
   
   leftFlipperRiseTimer =
      new AnimationTimer(FLIPPER_RISE_DURATION,
                         AnimationTimer.makeEaseOut(3)),
   leftFlipperFallTimer =
      new AnimationTimer(FLIPPER_FALL_DURATION,
                         AnimationTimer.makeEaseIn(3)),

   rightFlipperRiseTimer =
      new AnimationTimer(FLIPPER_RISE_DURATION,
                         AnimationTimer.makeEaseOut(3)),
   rightFlipperFallTimer =
      new AnimationTimer(FLIPPER_FALL_DURATION,
                         AnimationTimer.makeEaseIn(3)),

   leftFlipperAngle = 0,
   rightFlipperAngle = 0,

   // Actuator...................................................

   ACTUATOR_LEFT = 468,
   ACTUATOR_TOP = 839,
   ACTUATOR_PLATFORM_WIDTH = 45,
   ACTUATOR_PLATFORM_HEIGHT = 10,

   actuatorSprite = new Sprite('actuator',
                     new ImagePainter('images/actuator-0.png')),

   // Ball.......................................................

   BALL_LAUNCH_LEFT = ACTUATOR_LEFT + 3,
   BALL_LAUNCH_TOP = ACTUATOR_TOP - 30,
   LAUNCH_VELOCITY_Y = 200,
   MAX_BALL_VELOCITY = 400,
   MIN_BALL_VELOCITY = 3,
   MIN_BALL_VELOCITY_OFF_FLIPPERS = 75,
   GAME_HEIGHT_IN_METERS = 2,
   GRAVITY = 9.8; // m/s/s

   lastBallPosition = new Point(),

   ballOutOfPlay = false,

   prepareForLaunch = function() {
      ballSprite.left = BALL_LAUNCH_LEFT;
      ballSprite.top = BALL_LAUNCH_TOP;

      ballSprite.velocityX = 0;
      ballSprite.velocityY = 0;

      applyGravityAndFriction = false;
      adjustRightBoundaryAfterLostBall();

      launching = true;
   },

   brieflyShowTryAgainImage = function (milliseconds) {
      showTryAgain = true;

      setTimeout( function (e) {
         showTryAgain = false;
      }, 2000);
   },

   applyFrictionAndGravity = function (time) {
      var lastElapsedTime = time / 1000,
          metersPerSecond = GRAVITY * lastElapsedTime * 0.1;

      if (Math.abs(ballSprite.velocityX) > MIN_BALL_VELOCITY) {
         ballSprite.velocityX *= Math.pow(0.5, lastElapsedTime);
      }

      if (Math.abs(ballSprite.velocityY) > MIN_BALL_VELOCITY) {
         ballSprite.velocityY *= Math.pow(0.5, lastElapsedTime);
      }

      ballSprite.velocityY += metersPerSecond *
         parseFloat(game.context.canvas.height / GAME_HEIGHT_IN_METERS);
   },
      
   ballMover = {
      execute: function (sprite, context, time) {
         if (!game.paused && !loading) {
            lastBallPosition.x = sprite.left;
            lastBallPosition.y = sprite.top;
            
            if ( !launching && sprite.left < ACTUATOR_LEFT &&
                 (sprite.top > FLIPPER_BOTTOM || sprite.top < 0)) {
               ballOutOfPlay = true;
            }
            
            sprite.left += game.pixelsPerFrame(time, sprite.velocityX);
            sprite.top  += game.pixelsPerFrame(time, sprite.velocityY);
         }
      },
   },

   ballSprite = new Sprite('ball',
                     new ImagePainter('images/ball.png'),
                     [ ballMover ]),

   ballShape = new SpriteShape(ballSprite, ballSprite.width, ballSprite.height),
         
   // Extra balls................................................

   EXTRA_BALLS_RIGHT = 430,
   EXTRA_BALL_WIDTH = 36,
   EXTRA_BALLS_BOTTOM = game.context.canvas.height - 55,
         
   // Launching..................................................

   launching = false,
   launchStep = 1,
   LAUNCH_STEPS = 8,
   launchImages = [], // filled in with images below
      
   // Loading....................................................

   loading = false,  // not yet, see the end of this file
   loadingToast = document.getElementById('loadingToast'),
   loadingToastTitle = document.getElementById('loadingToastTitle'),
   loadMessage = document.getElementById('loadMessage'),
   progressDiv = document.getElementById('progressDiv'),
   progressbar = new COREHTML5.Progressbar(300, 23, 'rgba(0,0,0,0.5)', 100, 130, 250),
   
   // Score......................................................
   
   scoreToast = document.getElementById('scoreToast'),
   scoreReadout = document.getElementById('score'),
   score = 0,
   lastScore = 0,
   lastScoreUpdate = undefined,

   // High Score.................................................
   
   HIGH_SCORES_DISPLAYED = 10,

   highScoreToast = document.getElementById('highScoreToast'),
   highScoreParagraph = document.getElementById('highScoreParagraph'),
   highScoreList = document.getElementById('highScoreList'),
   previousHighScoresTitle = document.getElementById('previousHighScoresTitle'),
   nameInput = document.getElementById('nameInput'),
   addMyScoreButton = document.getElementById('addMyScoreButton'),
   newGameButton = document.getElementById('newGameButton'),
   newGameFromHighScoresButton =
         document.getElementById('newGameFromHighScoresButton'),
   clearHighScoresCheckbox = document.getElementById('clearHighScoresCheckbox'),

   // Lives......................................................
   
   livesLeft = 3,
   life = 100,

   // Paused.....................................................
   
   pausedToast = document.getElementById('pausedToast'),

   // Game Over..................................................
   
   gameOverToast = document.getElementById('gameOverToast'),
   gameOver = false,

   // Collision Detection........................................

   shapes = [],

   flipperCollisionDetected = false,

   showPolygonsOnlyToast = document.getElementById('showPolygonsOnlyToast'),
   showPolygonsOnlyCheckbox = document.getElementById('showPolygonsOnlyCheckbox'),
   showPolygonsOnly = showPolygonsOnlyCheckbox.checked,

   fiveHundredBumper = new Circle(256, 187, 40),
   oneHundredBumperRight = new Circle(395, 328, 40),
   oneHundredBumperLeft = new Circle(116, 328, 40),
   fiftyBumper = new Circle(255, 474, 40),
   fiveXBumperLeft = new Polygon(),
   fiveXBumperRight = new Polygon(),
   twoXBumperLeft = new Polygon(),
   twoXBumperRight = new Polygon(),
   oneXBumperLeft = new Polygon(),
   oneXBumperRight = new Polygon(),
   upperLeftBarLeft = new Polygon(),
   upperLeftBarRight = new Polygon(),
   upperRightBarLeft = new Polygon(),
   upperRightBarRight = new Polygon(),
   lowerLeftBarLeft = new Polygon(),
   lowerLeftBarRight = new Polygon(),
   lowerRightBarLeft = new Polygon(),
   lowerRightBarRight = new Polygon(),
   leftFlipperShape = new Polygon(),
   leftFlipperBaselineShape = new Polygon(),
   rightFlipperShape = new Polygon(),
   rightFlipperBaselineShape = new Polygon(),
   actuatorPlatformShape = new Polygon(),
   leftBoundary = new Polygon(),
   rightBoundary = new Polygon();
   
// Pause and Auto-pause.......................................

togglePaused = function () {
   game.togglePaused();
   pausedToast.style.display = game.paused ? 'inline' : 'none';
};

pausedToast.onclick = function (e) {
   pausedToast.style.display = 'none';
   togglePaused();
};

window.onblur = function windowOnBlur() { 
   if (!launching && !loading && !gameOver && !game.paused) {
      game.togglePaused();
      pausedToast.style.display = game.paused ? 'inline' : 'none';
   }
};

window.onfocus = function windowOnFocus() {
   if (game.paused) {
      game.togglePaused();
      pausedToast.style.display = game.paused ? 'inline' : 'none';
   }
};

// New game ..................................................

newGameButton.onclick = function (e) {
   gameOverToast.style.display = 'none';
   startNewGame();
};

function startNewGame() {
   showPolygonsOnlyToast.style.display = 'block';
   highScoreParagraph.style.display = 'none';
   gameOver = false;
   livesLeft = 3;
   score = 0;
   showingHighScores = false;
   loading = false;
   actuatorSprite.visible = true;
   ballSprite.visible = true;
};

// High Scores................................................

// Change game display to show high scores when
// player bests the high score.
   
showHighScores = function () {
   highScoreParagraph.style.display = 'inline';
   highScoreParagraph.innerText = score;
   highScoreToast.style.display = 'inline';
   updateHighScoreList();
};

// The game shows the list of high scores in
// an ordered list. This method creates that
// list element, and populates it with the
// current high scores.
   
updateHighScoreList = function () {
   var el,
       highScores = game.getHighScores(),
       length = highScores.length,
       highScore,
       listParent = highScoreList.parentNode;

   listParent.removeChild(highScoreList);
   highScoreList = document.createElement('ol');
   highScoreList.id = 'highScoreList'; // So CSS takes effect
   listParent.appendChild(highScoreList);
      
   if (length > 0) {
      previousHighScoresTitle.style.display = 'block';
         
      length = length > 10 ? 10 : length;

      for (var i=0; i < length; ++i) {
            
         highScore = highScores[i];
         el = document.createElement('li');
         el.innerText = highScore.score +
                                    ' by ' + highScore.name;  
         highScoreList.appendChild(el);
      }
   }
   else {
      previousHighScoresTitle.style.display = 'none';
   }
}

// The browser invokes this method when the user clicks on the
// Add My Score button.
   
addMyScoreButton.onclick = function (e) {
   game.setHighScore({ name: nameInput.value, score: lastScore });
   updateHighScoreList();
   addMyScoreButton.disabled = 'true';
   nameInput.value = '';
};


// The browser invokes this method when the user clicks on the
// new game button.
   
newGameFromHighScoresButton.onclick = function (e) {
   highScoreToast.style.display = 'none';
   startNewGame();
};

// The Add My Score button is only enabled when there
// is something in the nameInput field.
   
nameInput.onkeyup = function (e) {
   if (nameInput.value.length > 0) {
      addMyScoreButton.disabled = false; 
   }
   else {
      addMyScoreButton.disabled = true; 
   }
};


var bumperLit = undefined;
var interval = undefined;

// Score Display..............................................

updateScore = function (shape) {
   if (shape && !loading && game.lastScoreUpdate !== undefined) {
      //if (game.gameTime - game.lastScoreUpdate > 500) {
         if (shape === fiveHundredBumper) score += 500;
         else if (shape === oneHundredBumperLeft) score += 100;
         else if (shape === oneHundredBumperRight) score += 100;
         else if (shape === fiftyBumper) score += 50;
   
         scoreToast.style.display = 'inline';
         scoreToast.innerHTML = score.toFixed(0);
         game.lastScoreUpdate = game.gameTime;
      //}
   }
   else {
      game.lastScoreUpdate = game.gameTime;
   }
};

// Collision Detection........................................

function drawCollisionShapes() {
   var centroid;
   
   shapes.forEach( function (shape) {
      shape.stroke(game.context);
      game.context.beginPath();
      centroid = shape.centroid();
      game.context.arc(centroid.x, centroid.y, 1.5, 0, Math.PI*2, false);
      game.context.stroke();
   });
}

function clampBallVelocity() {
   if (ballSprite.velocityX > MAX_BALL_VELOCITY)
      ballSprite.velocityX = MAX_BALL_VELOCITY;
   else if (ballSprite.velocityX < -MAX_BALL_VELOCITY)
      ballSprite.velocityX = -MAX_BALL_VELOCITY;
         
   if(ballSprite.velocityY > MAX_BALL_VELOCITY)
      ballSprite.velocityY = MAX_BALL_VELOCITY;
   else if (ballSprite.velocityY < -MAX_BALL_VELOCITY)
      ballSprite.velocityY = -MAX_BALL_VELOCITY;
};

function separate(mtv) {
   var dx, dy, velocityMagnitude, point, theta=0,
       velocityVector = new Vector(new Point(ballSprite.velocityX, ballSprite.velocityY)),
       velocityUnitVector = velocityVector.normalize();

   if (mtv.axis.x === 0) {
      theta = Math.PI/2;
   }
   else {
     theta = Math.atan(mtv.axis.y / mtv.axis.x);
   }

   dy = mtv.overlap * Math.sin(theta);
   dx = mtv.overlap * Math.cos(theta); 

   if (mtv.axis.x < 0 && dx > 0 || mtv.axis.x > 0 && dx < 0) dx = -dx; // account for negative angle
   if (mtv.axis.y < 0 && dy > 0 || mtv.axis.y > 0 && dy < 0) dy = -dy;

   ballSprite.left += dx;
   ballSprite.top  += dy;
}

function checkMTVAxisDirection(mtv, shape) {
   var centroid1, centroid2, centroidVector, centroidUnitVector, flipOrNot;
   centroid1 = new Vector(ballShape.centroid());
   centroid2 = new Vector(shape.centroid()),
   centroidVector = centroid2.subtract(centroid1),
   centroidUnitVector = (new Vector(centroidVector)).normalize();

   if (mtv.axis === undefined)
      return;
   
   if (centroidUnitVector.dotProduct(mtv.axis) > 0) {
      mtv.axis.x = -mtv.axis.x;
      mtv.axis.y = -mtv.axis.y;
   }
};

function bounce(mtv, shape, bounceCoefficient) {
   var velocityVector = new Vector(new Point(ballSprite.velocityX, ballSprite.velocityY)),
       velocityUnitVector = velocityVector.normalize(),
       velocityVectorMagnitude = velocityVector.getMagnitude(),
       reflectAxis, point;

   checkMTVAxisDirection(mtv, shape);
   
   if (!loading && !game.paused) {
      if (mtv.axis !== undefined) {
         reflectAxis = mtv.axis.perpendicular();
      }

      separate(mtv);

      point = velocityUnitVector.reflect(reflectAxis);

      if (shape === leftFlipperShape || shape === rightFlipperShape) {
         if (velocityVectorMagnitude < MIN_BALL_VELOCITY_OFF_FLIPPERS) 
            velocityVectorMagnitude = MIN_BALL_VELOCITY_OFF_FLIPPERS;
      }
   
      ballSprite.velocityX = point.x * velocityVectorMagnitude * bounceCoefficient;
      ballSprite.velocityY = point.y * velocityVectorMagnitude * bounceCoefficient;

      clampBallVelocity();
   }
}


function collisionDetected(mtv) {
   return mtv.axis !== undefined && mtv.overlap !== 0;
};

function detectCollisions() {
   var mtv, shape, displacement, position, lastPosition;

   if (!launching && !loading && !game.paused) {
      ballShape.x = ballSprite.left;
      ballShape.y = ballSprite.top;
      ballShape.points = [];
      ballShape.setPolygonPoints();

      position = new Vector(new Point(ballSprite.left, ballSprite.top));
      lastPosition = new Vector(new Point(lastBallPosition.x, lastBallPosition.y));
      displacement = position.subtract(lastPosition);
          
      for (var i=0; i < shapes.length; ++i) {
         shape = shapes[i];
         
         if (shape !== ballShape) {
            mtv = ballShape.collidesWith(shape, displacement);
            if (collisionDetected(mtv)) {
               updateScore(shape);

               setTimeout ( function (e) {
                  bumperLit = undefined;
               }, 100);

               if (shape === twoXBumperLeft        ||
                   shape === twoXBumperRight       ||
                   shape === fiveXBumperRight      ||
                   shape === fiveXBumperLeft       ||
                   shape === fiftyBumper           ||
                   shape === oneHundredBumperLeft  ||
                   shape === oneHundredBumperRight ||
                   shape === fiveHundredBumper) {
                  game.playSound('bumper');
                  bounce(mtv, shape, 4.5);
                  bumperLit = shape;
                  return true;

               }
               else if (shape === rightFlipperShape) {
                  if (rightFlipperAngle === 0) {
                     bounce(mtv, shape, 1 + rightFlipperAngle);
                     return true;
                  }
               }
               else if (shape === leftFlipperShape) {
                  if (leftFlipperAngle === 0) {
                     bounce(mtv, shape, 1 + leftFlipperAngle);
                     return true;
                  }
               }
               else if (shape === actuatorPlatformShape) {
                  bounce(mtv, shape, 0.2);
                  return true;
               }
               else {
                  bounce(mtv, shape, 0.96);
                  return true;
               }
            }
         }
      }

      flipperCollisionDetected = false;
      
      detectFlipperCollision(LEFT_FLIPPER);
      detectFlipperCollision(RIGHT_FLIPPER);

      return flipperCollisionDetected;
   }
   return false;
}

function detectFlipperCollision(flipper) {
   var v1, v2, l1, l2, surface, ip, bbox = {}, riseTimer;

   bbox.top  = 725;
   bbox.bottom = 850;

   if (flipper === LEFT_FLIPPER) {
      v1 = new Vector(leftFlipperBaselineShape.points[0].rotate(
                       LEFT_FLIPPER_ROTATION_POINT,
                       leftFlipperAngle));

      v2 = new Vector(leftFlipperBaselineShape.points[1].rotate(
                       LEFT_FLIPPER_ROTATION_POINT,
                       leftFlipperAngle));

      bbox.left = 170;
      bbox.right = 265;
      riseTimer = leftFlipperRiseTimer;
   }
   else if (flipper === RIGHT_FLIPPER) {
      v1 = new Vector(rightFlipperBaselineShape.points[0].rotate(
                       RIGHT_FLIPPER_ROTATION_POINT,
                       rightFlipperAngle));

      v2 = new Vector(rightFlipperBaselineShape.points[1].rotate(
                       RIGHT_FLIPPER_ROTATION_POINT,
                       rightFlipperAngle));

      bbox.left = 245;
      bbox.right = 400;
      riseTimer = rightFlipperRiseTimer;
   }

   if ( ! flipperCollisionDetected && riseTimer.isRunning() &&
        ballSprite.top + ballSprite.height > bbox.top && ballSprite.left < bbox.right) {

      surface = v2.subtract(v1);
      l1 = new Line(new Point(ballSprite.left, ballSprite.top), lastBallPosition),
      l2 = new Line(new Point(v2.x, v2.y), new Point(v1.x, v1.y)),
      ip = l1.intersectionPoint(l2);

      if (ip.x > bbox.left && ip.x < bbox.right) {
         reflectVelocityAroundVector(surface.perpendicular());

         ballSprite.velocityX = ballSprite.velocityX * 3.5;
         ballSprite.velocityY = ballSprite.velocityY * 3.5;

         if (ballSprite.velocityY > 0)
            ballSprite.velocityY = -ballSprite.velocityY;

         if (flipper === LEFT_FLIPPER && ballSprite.velocityX < 0)
            ballSprite.velocityX = -ballSprite.velocityX;

         else if (flipper === RIGHT_FLIPPER && ballSprite.velocityX > 0)
            ballSprite.velocityX = -ballSprite.velocityX;
      }
   }
}

function reflectVelocityAroundVector(v) {
   var velocityVector = new Vector(new Point(ballSprite.velocityX, ballSprite.velocityY)),
       velocityUnitVector = velocityVector.normalize(),
       velocityVectorMagnitude = velocityVector.getMagnitude(),
       point = velocityUnitVector.reflect(v);

   ballSprite.velocityX = point.x * velocityVectorMagnitude;
   ballSprite.velocityY = point.y * velocityVectorMagnitude;
}

// Game Loop..................................................

function showTryAgainImage() {
   game.context.save();
   game.context.arc(TRY_AGAIN_X, TRY_AGAIN_Y, TRY_AGAIN_RADIUS,
                    0, Math.PI*2, false);

   game.context.clip();

   game.context.drawImage(game.getImage('images/tryAgain.png'), 0,
                          game.context.canvas.height-200);
   game.context.restore();
};

function drawExtraBall(index) {
   game.context.drawImage(game.getImage('images/ball.png'),
      EXTRA_BALLS_RIGHT - EXTRA_BALL_WIDTH*index,
                          EXTRA_BALLS_BOTTOM);
};

function over() {
   var highScore;
   highScores = game.getHighScores();
   
   if (highScores.length == 0 || score > highScores[0].score) {
      showingHighScores = true;
      actuatorSprite.visible = false;
      ballSprite.visible = false;
      showHighScores();
   }
   else {
     gameOverToast.style.display = 'inline';
   }
   
   gameOver = true;
   lastScore = score;
   score = 0;
};

var FIVE_HUNDRED_BUMPER_LEFT = 216,
    FIVE_HUNDRED_BUMPER_RIGHT = 147,
    ONE_HUNDRED_BUMPER_LEFT = 77,
    ONE_HUNDRED_BUMPER_RIGHT = 288;

function drawLitBumper() {
   if (bumperLit === fiveHundredBumper) {
      game.context.drawImage(game.getImage('images/fiveHundredBumperBright.png'),
                             FIVE_HUNDRED_BUMPER_LEFT,
                             FIVE_HUNDRED_BUMPER_RIGHT);
   }
   else if (bumperLit === oneHundredBumperLeft) {
      game.context.drawImage(game.getImage('images/oneHundredBumperBright.png'),
                             ONE_HUNDRED_BUMPER_LEFT,
                             ONE_HUNDRED_BUMPER_RIGHT);
   }
   else if (bumperLit === oneHundredBumperRight) {
      game.context.drawImage(game.getImage('images/oneHundredBumperBright.png'),355,288);
   }
   else if (bumperLit === fiftyBumper) {
      game.context.drawImage(game.getImage('images/fiftyBumperBright.png'),215,434);
   }
   else if (bumperLit === oneXBumperLeft) {
      game.context.drawImage(game.getImage('images/oneXBumperLeftBright.png'),71,776);
   }
   else if (bumperLit === oneXBumperRight) {
      game.context.drawImage(game.getImage('images/oneXBumperRightBright.png'),305,775);
   }
   else if (bumperLit === twoXBumperLeft) {
      game.context.drawImage(game.getImage('images/twoXBumperLeftBright.png'), 93, 632);
   }
   else if (bumperLit === twoXBumperRight) {
      game.context.drawImage(game.getImage('images/twoXBumperRightBright.png'),333,631);
   }
   else if (bumperLit === fiveXBumperLeft) {
      game.context.drawImage(game.getImage('images/fiveXBumperLeftBright.png'),95,450);
   }
   else if (bumperLit === fiveXBumperRight) {
      game.context.drawImage(game.getImage('images/fiveXBumperRightBright.png'),350,450);
   }
}

game.startAnimate = function (time) {
   var collisionOccurred;

   if (loading || game.paused || launching)
      return;


   if (ballOutOfPlay) {
      ballOutOfPlay = false;
      prepareForLaunch();
      brieflyShowTryAgainImage(2000);
      livesLeft--;

      if (!gameOver && livesLeft === 0) {
         over();
      }
      return;
   }

   adjustRightFlipperCollisionPolygon();
   adjustLeftFlipperCollisionPolygon();

   collisionOccurred = detectCollisions();

   if (!collisionOccurred && applyGravityAndFriction) {
      applyFrictionAndGravity(parseFloat(time - game.lastTime)); // modifies ball velocity
   }
};

game.paintUnderSprites = function () {
   if (loading)
      return;
   
   updateLeftFlipper();
   updateRightFlipper();

   if (showPolygonsOnly) {
      drawCollisionShapes();
   }
   else {
      if (!showingHighScores) {
         game.context.drawImage(game.getImage('images/background.png'),0,0);

         drawLitBumper();

         if (showTryAgain) {
            showTryAgainImage();
         }

         paintLeftFlipper();
         paintRightFlipper();

         for (var i=0; i < livesLeft-1; ++i) {
            drawExtraBall(i);
         }
      }
   }
};


var fiveHundredBumper = new Circle(256, 187, 40);
var oneHundredBumperRight = new Circle(395, 328, 40);
var oneHundredBumperLeft = new Circle(116, 328, 40);
var fiftyBumper = new Circle(255, 474, 40);

//rightFlipperImage.src = 'images/rightFlipper.png';
//leftFlipperImage.src = 'images/leftFlipper.png';
//fiveHundredBumperBrightImage.src = 'images/fiveHundredBumper-bright.png';
//oneHundredBumperBrightImage.src = 'images/oneHundredBumper-bright.png';
//fiftyBumperBrightImage.src = 'images/fiftyBumper-bright.png';
//oneXBumperLeftBrightImage.src = 'images/oneXBumperLeft-bright.png';
//oneXBumperRightBrightImage.src = 'images/oneXBumperRight-bright.png';
//twoXBumperRightBrightImage.src = 'images/twoXBumperRight-bright.png';
//twoXBumperLeftBrightImage.src = 'images/twoXBumperLeft-bright.png';
//fiveXBumperRightBrightImage.src = 'images/fiveXBumperRight-bright.png';
//fiveXBumperLeftBrightImage.src = 'images/fiveXBumperLeft-bright.png';

var LEFT_FLIPPER_ROTATION_POINT = new Point(145, 775),
    RIGHT_FLIPPER_ROTATION_POINT = new Point(370, 775);

function adjustLeftFlipperCollisionPolygon() {
   if(leftFlipperRiseTimer.isRunning() || leftFlipperFallTimer.isRunning()) {
      for (var i=0; i < leftFlipperShape.points.length; ++i) {
         var rp = leftFlipperBaselineShape.points[i].rotate(
                              LEFT_FLIPPER_ROTATION_POINT,
                              leftFlipperAngle);

         leftFlipperShape.points[i].x = rp.x;
         leftFlipperShape.points[i].y = rp.y;
      }
   }
}

function adjustRightFlipperCollisionPolygon() {
   if(rightFlipperRiseTimer.isRunning() || rightFlipperFallTimer.isRunning()) {
      for (var i=0; i < rightFlipperShape.points.length; ++i) {
         var rp = rightFlipperBaselineShape.points[i].rotate(
                              RIGHT_FLIPPER_ROTATION_POINT,
                              -rightFlipperAngle);

         rightFlipperShape.points[i].x = rp.x;
         rightFlipperShape.points[i].y = rp.y;
       }
   }
}

function resetLeftFlipperCollisionPolygon() {
   for (var i=0; i < leftFlipperShape.points.length; ++i) {
      var point = leftFlipperBaselineShape.points[i];

      leftFlipperShape.points[i].x = leftFlipperBaselineShape.points[i].x;
      leftFlipperShape.points[i].y = leftFlipperBaselineShape.points[i].y;
  } 
}

function resetRightFlipperCollisionPolygon() {
   for (var i=0; i < rightFlipperShape.points.length; ++i) {
      var point = rightFlipperBaselineShape.points[i];

      rightFlipperShape.points[i].x = rightFlipperBaselineShape.points[i].x;
      rightFlipperShape.points[i].y = rightFlipperBaselineShape.points[i].y;
  } 
}

function updateLeftFlipper() {
   if (leftFlipperRiseTimer.isRunning()) {    // Flipper is rising
     if (leftFlipperRiseTimer.isOver()) {     // Finished rising
        leftFlipperRiseTimer.stop();          // Stop rise timer
        leftFlipperAngle = MAX_FLIPPER_ANGLE; // Set flipper angle
        leftFlipperFallTimer.start();         // Start falling
     }
     else {                                   // Flipper is still rising
       leftFlipperAngle =
          MAX_FLIPPER_ANGLE/FLIPPER_RISE_DURATION *
          leftFlipperRiseTimer.getElapsedTime();
       }
   }
   else if (leftFlipperFallTimer.isRunning()) { // Left flipper is falling
     if (leftFlipperFallTimer.isOver()) {       // Finished falling
         leftFlipperFallTimer.stop();           // Stop fall timer
         leftFlipperAngle = 0;                  // Set flipper angle
         resetLeftFlipperCollisionPolygon();    // Reset collision polygon
     }
     else {                                     // Flipper is still falling
       leftFlipperAngle = MAX_FLIPPER_ANGLE -
          MAX_FLIPPER_ANGLE/FLIPPER_FALL_DURATION *
          leftFlipperFallTimer.getElapsedTime();
     }
   }
}
         
function paintLeftFlipper() {
   if (leftFlipperRiseTimer.isRunning() || leftFlipperFallTimer.isRunning()) {
      game.context.save();
      game.context.translate(LEFT_FLIPPER_PIVOT_X, LEFT_FLIPPER_PIVOT_Y);
      game.context.rotate(-leftFlipperAngle);
      game.context.drawImage(game.getImage('images/leftFlipper.png'),
                             -LEFT_FLIPPER_PIVOT_OFFSET_X,
                             -LEFT_FLIPPER_PIVOT_OFFSET_Y);
      game.context.restore();
   }
   else {
      game.context.drawImage(game.getImage('images/leftFlipper.png'),
            LEFT_FLIPPER_PIVOT_X - LEFT_FLIPPER_PIVOT_OFFSET_X,
            LEFT_FLIPPER_PIVOT_Y - LEFT_FLIPPER_PIVOT_OFFSET_Y);
   }
}
function paintRightFlipper() {
   if (rightFlipperRiseTimer.isRunning() || rightFlipperFallTimer.isRunning()) {
      game.context.save();
      game.context.translate(370,776);
      game.context.rotate(rightFlipperAngle);
      game.context.drawImage(game.getImage('images/rightFlipper.png'),-99,-29);
      game.context.restore();
   }
   else {
      game.context.drawImage(game.getImage('images/rightFlipper.png'),272,745);
   }
}

function updateRightFlipper() {
   if (rightFlipperRiseTimer.isRunning()) {
     if (rightFlipperRiseTimer.isOver()) {
        rightFlipperRiseTimer.stop();
        flipperCollisionDetected = false;  // reset

        rightFlipperFallTimer.start();
        rightFlipperAngle = MAX_FLIPPER_ANGLE;
     }
     else {
        rightFlipperAngle =
           MAX_FLIPPER_ANGLE/FLIPPER_RISE_DURATION *
           rightFlipperRiseTimer.getElapsedTime();
        }
     }
     else if (rightFlipperFallTimer.isRunning()) {
        rightFlipperAngle = MAX_FLIPPER_ANGLE -
           MAX_FLIPPER_ANGLE/FLIPPER_FALL_DURATION *
           rightFlipperFallTimer.getElapsedTime();

        if (rightFlipperFallTimer.isOver()) {
            rightFlipperFallTimer.stop();
            rightFlipperAngle = 0;
            resetRightFlipperCollisionPolygon();
        }
    }
}

function adjustActuatorPlatformShape() {
   var i, point;

   for (i=0; i < actuatorPlatformShape.points.length; ++i) {
      point = actuatorPlatformShape.points[i];
      if ( i < 2 || i === actuatorPlatformShape.points.length-1) 
         point.y = ACTUATOR_TOP + launchStep*10;
      else
         point.y = ACTUATOR_TOP + launchStep*10 + 10;
   }
}

// Key Listeners..............................................

lastKeyListenerTime = 0,  // For throttling arrow keys

game.addKeyListener(
   {
      key: 'k',
      listener: function () {
         if ( !launching && !gameOver) {
            rightFlipperRiseTimer.start();
            rightFlipperAngle = 0;
            game.playSound('flipper');
         }
      }
   }
);
                    
game.addKeyListener(
   {
      key: 'd',
      listener: function () {
         if ( !launching && !gameOver) {
            leftFlipperRiseTimer.start();
            leftFlipperAngle = 0;
            game.playSound('flipper');
         }
      }
   }
);
                    
game.addKeyListener(
   {
      key: 'p',
      listener: function () {
         togglePaused();
      }
   }
);

game.addKeyListener(
   {
      key: 'up arrow',
      listener: function () {
         var now;

         if (!launching || launchStep === 1)
            return;

         now = +new Date();
         if (now - lastKeyListenerTime > 80) { // throttle
            lastKeyListenerTime = now;
            launchStep--;
            actuatorSprite.painter.image = launchImages[launchStep-1]; 
            ballSprite.top = BALL_LAUNCH_TOP + (launchStep-1) * 9;
            adjustActuatorPlatformShape();
         }
      }
   }
);

game.addKeyListener(
   {
      key: 'down arrow',
      listener: function () {
         var now;

         if (!launching || launchStep === LAUNCH_STEPS)
            return;

         now = +new Date();
         if (now - lastKeyListenerTime > 80) { // throttle
            lastKeyListenerTime = now;
            launchStep++;
            actuatorSprite.painter.image = launchImages[launchStep-1]; 
            ballSprite.top = BALL_LAUNCH_TOP + (launchStep-1) * 9;
            adjustActuatorPlatformShape();
         }
      }
   }
);

function adjustRightBoundaryAfterLostBall() {
   rightBoundary.points[1].x = 508;
}

function adjustRightBoundaryAfterLaunch() {
   rightBoundary.points[1].x = 460;
}

game.addKeyListener(
   {
      key: 'space',
      listener: function () {
         if (!launching && ballSprite.left === BALL_LAUNCH_LEFT &&
             ballSprite.velocityY === 0) {
            launching = true;
            ballSprite.velocityY = 0;
            applyGravityAndFriction = false;
            launchStep = 1;
         }
         if (launching) {
            ballSprite.velocityY = -300 * launchStep;
            launching = false;
            launchStep = 1;

            setTimeout( function (e) {
               actuatorSprite.painter.image = launchImages[0];
               adjustActuatorPlatformShape();
            }, 50);

            setTimeout( function (e) {
               applyGravityAndFriction = true;
               adjustRightBoundaryAfterLaunch();
            }, 2000);
         }
      }
   }
);

game.addKeyListener(
   {
      key: 'right arrow',
      listener: function () {
         var now = +new Date();
         if (now - lastKeyListenerTime > 200) { // throttle
            lastKeyListenerTime = now;
         }
      }
   }
);

game.addKeyListener(
   {
      key: 'left arrow',
      listener: function () {
         var now = +new Date();
         if (now - lastKeyListenerTime > 200) { // throttle
            lastKeyListenerTime = now;
         }
      }
   }
);

// Clear high scores checkbox.................................

clearHighScoresCheckbox.onclick = function (e) {
   if (clearHighScoresCheckbox.checked) {
      game.clearHighScores();
   }
};

// Load game..................................................

loading = true;
   var interval,
       percentComplete = 0;

   progressDiv.style.display = 'block';
   progressDiv.appendChild(progressbar.domElement);

// Start game.................................................

//progressDiv.style.display = 'none';
//loadingToast.style.display = 'none';   

ballSprite.top = BALL_LAUNCH_TOP;
ballSprite.left = BALL_LAUNCH_LEFT;
ballSprite.width = 33;
ballSprite.height = ballSprite.width;


leftBoundary.points.push(new Point(45, 235));
leftBoundary.points.push(new Point(45, game.context.canvas.height));
leftBoundary.points.push(new Point(-450, game.context.canvas.height));
leftBoundary.points.push(new Point(-450, 235));
leftBoundary.points.push(new Point(45, 235));

rightBoundary.points.push(new Point(508, 235));
rightBoundary.points.push(new Point(508, game.context.canvas.height));
rightBoundary.points.push(new Point(508*2, game.context.canvas.height));
rightBoundary.points.push(new Point(508*2, 235))
rightBoundary.points.push(new Point(508, 235));

actuatorPlatformShape.points.push(new Point(ACTUATOR_LEFT-5, ACTUATOR_TOP));
actuatorPlatformShape.points.push(new Point(ACTUATOR_LEFT-5 + ACTUATOR_PLATFORM_WIDTH,
                                            ACTUATOR_TOP));

actuatorPlatformShape.points.push(new Point(ACTUATOR_LEFT-5 + ACTUATOR_PLATFORM_WIDTH,
                                ACTUATOR_TOP + ACTUATOR_PLATFORM_HEIGHT));

actuatorPlatformShape.points.push(new Point(ACTUATOR_LEFT-5,
                                ACTUATOR_TOP + ACTUATOR_PLATFORM_HEIGHT));

actuatorPlatformShape.points.push(new Point(ACTUATOR_LEFT-5, ACTUATOR_TOP));

rightFlipperShape.points.push(new Point(365, 745));
rightFlipperShape.points.push(new Point(272, 836));
rightFlipperShape.points.push(new Point(293, 857));
rightFlipperShape.points.push(new Point(398, 781));
rightFlipperShape.points.push(new Point(365, 745));

leftFlipperShape.points.push(new Point(142, 743));
leftFlipperShape.points.push(new Point(239, 837));
leftFlipperShape.points.push(new Point(218, 855));
leftFlipperShape.points.push(new Point(116, 783));
leftFlipperShape.points.push(new Point(142, 743));

rightFlipperBaselineShape.points.push(new Point(365, 745));
rightFlipperBaselineShape.points.push(new Point(272, 836));
rightFlipperBaselineShape.points.push(new Point(293, 857));
rightFlipperBaselineShape.points.push(new Point(398, 781));
rightFlipperBaselineShape.points.push(new Point(365, 745));

leftFlipperBaselineShape.points.push(new Point(142, 743));
leftFlipperBaselineShape.points.push(new Point(239, 837));
leftFlipperBaselineShape.points.push(new Point(218, 855));
leftFlipperBaselineShape.points.push(new Point(116, 783));
leftFlipperBaselineShape.points.push(new Point(142, 743));

lowerRightBarLeft.points.push(new Point(294,525));
lowerRightBarLeft.points.push(new Point(306,525));
lowerRightBarLeft.points.push(new Point(306,590));
lowerRightBarLeft.points.push(new Point(294,590));
lowerRightBarLeft.points.push(new Point(294,525));

lowerRightBarRight.points.push(new Point(342,525));
lowerRightBarRight.points.push(new Point(354,525));
lowerRightBarRight.points.push(new Point(354,590));
lowerRightBarRight.points.push(new Point(342,590));
lowerRightBarRight.points.push(new Point(342,525));

lowerLeftBarLeft.points.push(new Point(156,525));
lowerLeftBarLeft.points.push(new Point(168,525));
lowerLeftBarLeft.points.push(new Point(168,590));
lowerLeftBarLeft.points.push(new Point(156,590));
lowerLeftBarLeft.points.push(new Point(156,525));

lowerLeftBarRight.points.push(new Point(204,525));
lowerLeftBarRight.points.push(new Point(216,525));
lowerLeftBarRight.points.push(new Point(216,590));
lowerLeftBarRight.points.push(new Point(204,590));
lowerLeftBarRight.points.push(new Point(204,525));

upperLeftBarLeft.points.push(new Point(86,185));
upperLeftBarLeft.points.push(new Point(86,263));
upperLeftBarLeft.points.push(new Point(98,263));
upperLeftBarLeft.points.push(new Point(98,185));
upperLeftBarLeft.points.push(new Point(86,185));

upperLeftBarRight.points.push(new Point(134,185));
upperLeftBarRight.points.push(new Point(136,263));
upperLeftBarRight.points.push(new Point(146,263));
upperLeftBarRight.points.push(new Point(146,185));
upperLeftBarRight.points.push(new Point(134,185));

upperRightBarLeft.points.push(new Point(368,185));
upperRightBarLeft.points.push(new Point(368,263));
upperRightBarLeft.points.push(new Point(380,263));
upperRightBarLeft.points.push(new Point(380,185));
upperRightBarLeft.points.push(new Point(368,185));

upperRightBarRight.points.push(new Point(417,185));
upperRightBarRight.points.push(new Point(417,263));
upperRightBarRight.points.push(new Point(427,263));
upperRightBarRight.points.push(new Point(427,185));
upperRightBarRight.points.push(new Point(417,185));

oneXBumperLeft.points.push(new Point(80,780));
oneXBumperLeft.points.push(new Point(215,875));
oneXBumperLeft.points.push(new Point(80,875));
oneXBumperLeft.points.push(new Point(80,780));

oneXBumperRight.points.push(new Point(300,875));
oneXBumperRight.points.push(new Point(435,775));
oneXBumperRight.points.push(new Point(435,875));
oneXBumperRight.points.push(new Point(300,875));

twoXBumperLeft.points.push(new Point(98,635));
twoXBumperLeft.points.push(new Point(180,715));
twoXBumperLeft.points.push(new Point(98,715));
twoXBumperLeft.points.push(new Point(98,635));

twoXBumperRight.points.push(new Point(420,630));
twoXBumperRight.points.push(new Point(420,715));
twoXBumperRight.points.push(new Point(330,715));
twoXBumperRight.points.push(new Point(420,630));

fiveXBumperLeft.points.push(new Point(98,450));
fiveXBumperLeft.points.push(new Point(163,450));
fiveXBumperLeft.points.push(new Point(98,505));
fiveXBumperLeft.points.push(new Point(98,450));

fiveXBumperRight.points.push(new Point(350,450));
fiveXBumperRight.points.push(new Point(415,450));
fiveXBumperRight.points.push(new Point(415,505));
fiveXBumperRight.points.push(new Point(350,450));

shapes.push(ballShape);
shapes.push(leftBoundary);
shapes.push(rightBoundary);

shapes.push(fiveHundredBumper);
shapes.push(oneHundredBumperLeft);
shapes.push(oneHundredBumperRight);
shapes.push(fiftyBumper);
shapes.push(fiveXBumperLeft);
shapes.push(fiveXBumperRight);
shapes.push(twoXBumperLeft);
shapes.push(twoXBumperRight);
shapes.push(upperLeftBarLeft);
shapes.push(upperLeftBarRight);
shapes.push(upperRightBarLeft);
shapes.push(upperRightBarRight);
//shapes.push(oneXBumperLeft);
//shapes.push(oneXBumperRight);
shapes.push(lowerLeftBarLeft);
shapes.push(lowerLeftBarRight);
shapes.push(lowerRightBarLeft);
shapes.push(lowerRightBarRight);

shapes.push(rightFlipperShape);
shapes.push(leftFlipperShape);

shapes.push(actuatorPlatformShape);

ballSprite.velocityX = 0;
ballSprite.velocityY = 0;
ballSprite.visible = false;

actuatorSprite.velocityX = 0;
actuatorSprite.velocityY = 0;
actuatorSprite.width = 60;
actuatorSprite.height = 100;
actuatorSprite.visible = true;

game.addSprite(actuatorSprite);
game.addSprite(ballSprite);

function windowToCanvas(e) {
   var x = e.x || e.clientX,
       y = e.y || e.clientY,
       bbox = game.context.canvas.getBoundingClientRect();

   return { x: x - bbox.left * (game.context.canvas.width  / bbox.width),
            y: y - bbox.top  * (game.context.canvas.height / bbox.height)
          };
}

function drawHorizontalLine (y) {
   game.context.moveTo(0,y+0.5);
   game.context.lineTo(game.context.canvas.width,y+0.5);
   game.context.stroke();
}

function drawVerticalLine (x) {
   game.context.moveTo(x+0.5,0);
   game.context.lineTo(x+0.5,game.context.canvas.height);
   game.context.stroke();
}

showPolygonsOnlyCheckbox.onclick = function (e) {
   showPolygonsOnly = showPolygonsOnlyCheckbox.checked;
   if (showPolygonsOnly) {
      ballSprite.visible = false;
      actuatorSprite.visible = false;
   }
   else {
      ballSprite.visible = true;
      actuatorSprite.visible = true;
   }
};

actuatorSprite.top = ACTUATOR_TOP,
actuatorSprite.left = ACTUATOR_LEFT,
actuatorSprite.visible = false;

function createDomePolygons(centerX, centerY, radius, sides) {
   var polygon,
       polygons = [],
       startTheta = 0,
       endTheta,
       midPointTheta,
       thetaDelta = Math.PI/sides,
       midPointRadius = radius*1.5;

   for (var i=0; i < sides; ++i) {
      polygon = new Polygon();

      endTheta = startTheta + thetaDelta;
      midPointTheta = startTheta + (endTheta - startTheta)/2;
      
      polygon.points.push(
        new Point(centerX + radius * Math.cos(startTheta),
                  centerY - radius * Math.sin(startTheta)));

      polygon.points.push(
        new Point(centerX + midPointRadius * Math.cos(midPointTheta),
                  centerY - midPointRadius * Math.sin(midPointTheta)));

      polygon.points.push(
        new Point(centerX + radius * Math.cos(endTheta),
                  centerY - radius * Math.sin(endTheta)));

      polygon.points.push(
        new Point(centerX + radius * Math.cos(startTheta),
                  centerY - radius * Math.sin(startTheta)));

      polygons.push(polygon);
      
      startTheta += thetaDelta;
   }
   return polygons;
}

var DOME_SIDES = 15,
    DOME_X = 275,
    DOME_Y = 235,
    DOME_RADIUS = 232,
    domePolygons = createDomePolygons(DOME_X, DOME_Y, DOME_RADIUS, DOME_SIDES);

domePolygons.forEach( function (polygon) {
  shapes.push(polygon); 
});

if (showPolygonsOnly)
   actuatorSprite.visible = false;

rightFlipperShape.centroid = function () {
   return new Point(450, 930);
};

leftFlipperShape.centroid = function () {
   return new Point(60, 930);
};

showingHighScores = false;

game.queueImage('images/rightFlipper.png');
game.queueImage('images/leftFlipper.png');
game.queueImage('images/ball.png');
game.queueImage('images/tryAgain.png');

game.queueImage('images/fiftyBumperBright.png');
game.queueImage('images/oneHundredBumperBright.png');
game.queueImage('images/fiveHundredBumperBright.png');

game.queueImage('images/oneXBumperLeftBright.png');
game.queueImage('images/oneXBumperRightBright.png');

game.queueImage('images/twoXBumperRightBright.png');
game.queueImage('images/twoXBumperLeftBright.png');

game.queueImage('images/fiveXBumperRightBright.png');
game.queueImage('images/fiveXBumperLeftBright.png');
game.queueImage('images/tryAgain.png');
game.queueImage('images/background.png');

for (var i=0; i < LAUNCH_STEPS; ++i) {
   game.queueImage('images/actuator-' + i + '.png');
}


var interval = setInterval( function (e) {
   var percentComplete = game.loadImages();

   progressbar.draw(percentComplete);

   if (percentComplete >= 100) {
      clearInterval(interval);

      progressDiv.style.display = 'none';
      loadingToast.style.display = 'none';   

      showPolygonsOnlyToast.style.display = 'block';
      showPolygonsOnlyToast.style.left = '290px';
      scoreToast.style.display = 'inline';

      launching = true;
      loading = false;

      score = 0;
      scoreToast.innerText = '0'; // won't get set till later, otherwise

      ballSprite.visible = true;
      actuatorSprite.visible = true;
      //game.playSound('pinball');

      for (var i=0; i < LAUNCH_STEPS; ++i) {
         launchImages[i] = new Image();
         launchImages[i].src = 'images/actuator-' + i + '.png';
      }
      game.start();
   }
}, 16);

```

