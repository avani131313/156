AFRAME.registerComponent("game-play", {
  schema: {
    elementId: { type: "string", default: "#ring1" },    
  },
  update: function () {
    this.isCollided(this.data.elementId);
  },

  init: function () {
    var duration = 10;
    const timerEl = document.querySelector("#timer");
    this.startTimer(duration, timerEl);
  },

  startTimer: function (duration, timerEl) {
    var minutes;
    var seconds;

    var timer = setInterval(countDown, 1000);

    function countDown() {
      if (duration >= 0) {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);

        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        timerEl.setAttribute("text", {
          value: minutes + ":" + seconds,
        });

        duration -= 1;
      } 
      else {
        clearInterval(timer);
        this.gameOver()        
      }
    }
  },
  isCollided: function (elemntId) {
    const element = document.querySelector(elemntId);
    element.addEventListener("collide", (e) => {
      if (elemntId.includes("#ring")) {
        element.setAttribute("visible",false)
        this.updateScore()
        this.updateTargets()
        
      }
      else {
        this.gameOver()
      }
    });
  },
  gameOver: function(){
  var plane_el = document.querySelector("#plane_model")
  var text_el = document.querySelector("#game_over_text")
  text_el.setAttribute("visible",true)
  plane_el.setAttribute("dynamic_body",{mass:1})
  console.log("I AM WORKING!")
  },
  updateTargets: function(){
    var element = document.querySelector("#targets")
    var count = element.getAttribute("text").value
    var currentTargets = parseInt(count)
    currentTargets-=1
    element.setAttribute("text",{value:currentTargets})
  },

  updateScore: function(){
    var element = document.querySelector("#score")
    var count = element.getAttribute("text").value
    var currentScore = parseInt(count)
    currentScore+=50
    element.setAttribute("text",{value:currentScore})
  }
  
});
