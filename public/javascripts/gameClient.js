
      document.getElementById('namebutton').onclick = function () {
          var name = document.getElementById('nametext').value;
          document.getElementById("nameSpan").innerHTML = "Welcome to the game " + name + ".";
          console.log("Name is " + name);
          setName(name);
          //This closed the modal automatically when the submit button is pressed
          modal.style.display = "none";

var timerSpan = document.getElementById("timer");
setInterval(function(){
	seconds++;
  timerSpan.innerHTML = seconds + " seconds";
},1000);

      };



window.onload = function () {

    //
    // document.getElementById('button').onclick = function () {
    //     document.getElementById('modal').style.display = "none"
    // };
};

var startTime =  Date.now() / 1000
console.log("This is start time " + startTime)
var endTime;
var seconds = 0;

(function () {  //This function continually updates the frame
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 600,
    height = 480,
    player = {
        x: 200,
        y: 200,
        width: 8,
        height: 18,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false

    },

    keys = [],
    friction = 0.8;
    // gravity = 0.3;

var opponents = [];
var boxes = [];  //Set up an array of boxes to be displayed on the canvas
var goal = [];  //Set up an array with a goal that will have a different set of instructions when the player collides with this object

// This is creating a goal box object in the goal array
goal.push({
  x: 20,
  y: 40,
  width: 43,
  height: 34,

})

// These three boxes are the boundary boxes for the canvas.  Without these, the player would fall off the canvas
boxes.push({  //left boundary
    x: 0,
    y: 0,
    width: 10,
    height: height
});
boxes.push({  //bottom boundary
    x: 0,
    y: height - 2,
    width: width,
    height: 50
});
boxes.push({  //right boundary
    x: width - 10,
    y: 0,
    width: 50,
    height: height
});

boxes.push({  //top boundary
    x: 0,
    y: 0,
    width: width,
    height: 2
});



canvas.width = width;  //These two settings are setting the width and height of the canvas
canvas.height = height;

function update() {  //This is the main loop.  It is checking for changes to what needs to be displayed, and redraws the canvas
    // check keys



sendPosition(player);

    if (keys[39]) {
        // right arrow
        if (player.velX < player.speed) {  //This moves the player to the right, and accelerates their velocity.  But they cannot go faster than the speed setting
            player.velX++;
        }
    }
    if (keys[37]) {
        // left arrow
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }

    if (keys[38]) {
        // up arrow
        if (player.velY > -player.speed) {
            player.velY--;
        }
    }

    if (keys[40]) {
        // down arrow
        if (player.velY < player.speed) {
            player.velY++;
        }
    }


    player.velX *= friction;
    player.velY *= friction;


      //Friction will parabollically slow the player down on the x axis
    // player.velY += gravity;  //gravity has a constant force on the player on the y axix

    ctx.clearRect(0, 0, width, height);  //This clears the screen after each frame after a player action
    ctx.fillStyle = "black";
    ctx.beginPath();

    player.grounded = false;   //
    for (var i = 0; i < boxes.length; i++) {  //This goes through all of the boxes, and draws them in their locations
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);

        var dir = colCheck(player, boxes[i]);  //This variable checks to see if the player and a box is colliding

        // Keeps the player within the boundary on all sides
        if (dir === "l" || dir === "r") {
            player.velX = 0;  //This stops the player if they collide with a box from the left or right
        } else if (dir === "t" || dir === "b") {
            player.velY = 0;  //This stops the player if they collide with a box from the top or bottom

        }

    }


    for (var i = 0; i < goal.length; i++) {  //This is doing collision detection for the goal object
        ctx.rect(goal[i].x, goal[i].y, goal[i].width, goal[i].height);

        var dirGoal = colCheck(player, goal[i]);  //uses the function colCheck below

        if (dirGoal === "l" || dirGoal === "r" || dirGoal === "b" || dirGoal === "t") {  //If the player collides with the goal from any side, an end result will happen
          endGame();
            // player.width = 300;
            // player.height = 300;
            // player.speed = 10;
        }

    }

    player.x += player.velX;
    player.y += player.velY;


    ctx.fill();
    // ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);


    for (var opId in opponents) {

      var op = opponents[opId];

      if (!op) {
        continue;  // undefined opponents - probably buggy connect code at the server
      }

      if (opId == player.id) {
        //that's us, ignore
        continue;
      }
      draw(op, 'op');

    }




    requestAnimationFrame(update);  //This finishes the update function, and redraws the canvas
}

// function showCoords(event) {  //this function runs on a mouseclick.  I used this in the process of pinpointing where I wanted to place the boxes
//     var x = event.clientX;
//     var y = event.clientY;
//     console.log(x);
//     console.log(y);
//   }

// This function would stop the timer
function endGame() {
  endTime = Date.now() / 1000;
  console.log("This is endTime " + endTime);
  totalTime = endTime - startTime;
  console.log("This is totalTime " + totalTime);

  //This makes an alert box for the total time since the page loaded...not from the start time of the modal closing
  alert("This is total time " + totalTime)
  // TODO emit totalTime to server
}

function draw(actor, who) {

  if (who == "op") {
    // ctx.fillStyle = "blue"
  }

  else {
    ctx.fillStyle = actor.fillStyle;
  }


  ctx.fill();
  // ctx.fillStyle = "green";
  ctx.fillRect(actor.x, actor.y, actor.width, actor.height);

}

function colCheck(shapeA, shapeB) {  //This function is running the collision checks.  I followed an online guide at this URL  http://www.somethinghitme.com/2013/01/09/creating-a-canvas-platformer-tutorial-part-one/
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


window.addEventListener("load", function () {
    update();
});
