var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
var latency_task = "\n<style>\n\n#custom_target {\n    overflow: hidden;\n    position: fixed;\n    text-align: center;\n    margin: 0;\n    top: 0;\n    left: 0;\n    text-align: center;\n    width: 100%;\n    height: 100%;\n    touch-action: manipulation;\n    background: rgba(255,255,255,1);\n}\nhtml, body, .cont {\n    height: 100%;\n}\nbody {\n    font-family: helvetica;\n    margin: 0; padding: 0;\n}\n\n.cont {\n    height: 100%;\n    margin-bottom: 50px;\n}\n.warning {\n    position: fixed;\n    display: none;\n    z-index: 100;\n    top: 50%;\n    left: 50%;\n    font-size: 200px;\n    color:red;\n    /* bring your own prefixes */\n    transform: translate(-50%, -50%);\n}\n.circle {\n    z-index: 3;\n    height: 40px;\n    line-height: 40px;\n    font-size: 30px;\n    width: 40px;\n    text-align: center;\n    color: #fff;\n    background-color: #2aE;\n    border-radius: 150px;\n    position: absolute;\n}\n\n.line {\n    height: 3px;\n    background-color: #aaa;\n    transform-origin: left center;\n    position: absolute;\n    z-index: 1;\n}\n</style>\n\n<div class=\"warning\" id=\"warning\">\nX\n</div>\n<div class=\"cont\">\n\n</div>\n ";
var overlay = "\n    <style>\n    #overlay {\n        position: fixed;\n        width: 100%;\n        height: 100%;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        background-color: white;\n        z-index: 2000;\n    }\n    </style>\n    \n    <div id=\"overlay\" ></div>\n     ";
var instructions = "\n     <style>\n     .wrapper {\n        font-size: 3em;\n        z-index: 2000;\n        padding: 25px;\n        margin: 0;\n        top: 0;\n        left: 0;\n        height: 100%;\n        background: rgba(255,255,255,1);\n     }\n     </style>\n     \n       <div class=\"wrapper\">\n     <div>The next screen has numbers and letters in circles. Starting with the number 1 (in red), ".concat(supportsTouch ? 'tap' : 'click', " on each number and letter, alternating between the two. Start at the number 1, ").concat(supportsTouch ? 'tap' : 'click', " on 1, then ").concat(supportsTouch ? 'tap' : 'click', " on the letter A, then ").concat(supportsTouch ? 'tap' : 'click', " on the number 2, and then ").concat(supportsTouch ? 'tap' : 'click', " on the letter B, and so on. A line will appear between the circles when the order is correct. <br><br>\n     If you make a mistake, a red <span style=\"color:red\">X</span> will appear on the screen. When you see the <span style=\"color:red\">X</span>, ").concat(supportsTouch ? 'tap' : 'click', " the correct circle to continue. \n     <br><br>\n     Work as quickly and accurately as you can.\n     \n     \n     First there will be a short practice round. ").concat(supportsTouch ? 'Tap' : 'Click', " to start.\n     </div>\n     </div>\n      ");
var finalInstructions = "\n           <style>\n           .wrapper {\n              line-height: 1.2em;\n               z-index: 2000;\n               margin: 1em;\n               font-size: 4vw;\n               background: rgba(255,255,255,1);\n           }\n           </style>\n           \n\n             <div class=\"wrapper\">\n           <div>Now try again. Remember to work as fast and as accurately as possible. If you make a mistake, choose the correct circle and keep going.<br><br>".concat(supportsTouch ? 'Tap' : 'Click', " to start.\n           </div>\n           </div>\n            ");
window.experiment_state = 'instructions_1';
window.trial_time = 0;
window.trial_error_count = 0;
window.experiment_error_count = 0;

setup = function setup(context) {
  var results = [];
  context.hideNextButton();
  context.hidePreviousButton();
  context.hideChoices();
  jQuery("#Buttons").hide();
  jQuery(".QuestionBody").hide();
  jQuery("#ProgressBar").hide();
  jQuery("#LogoContainer").hide();
  jQuery("#HeaderContainer").hide();
  jQuery('.QuestionText').css('padding', '0px');
  jQuery("#Plug").hide();
  jQuery("#custom_target").html(instructions); //  jQuery("#custom_target").html(latency_task)
};

window.handleExperimentInput = function (context) {
  if (window.experiment_state == 'instructions_1') {
    var conflict;

    (function () {
      window.experiment_state = 'block_1';
      window.trial_start = new Date();
      jQuery("#custom_target").html(latency_task);
      window.circles = jQuery('<div class="circle">'), cont = jQuery('.cont'), targets = ['1', 'A', '2', 'B', '3', 'C', '4', 'D'];
      var n = targets.length;
      var next = 0;
      var attempts = 0;
      var boxes = []; //generate circles

      while (n--) {
        var circle = window.circles.clone().text(targets[n]);

        if (targets[n] == '1') {
          circle.css('color', 'red');
        }

        circle.attr('id', targets[n]);

        if (jQuery(window).width() < 800) {
          circle.attr('height', '40px');
          circle.attr('width', '40px');
        }

        cont.append(circle);
        conflict = true;

        while (conflict) {
          attempts = attempts + 1;
          circle.css('top', Math.floor(Math.random() * 85) + 1 + '%');
          circle.css('left', Math.floor(Math.random() * 85) + 1 + '%');
          conflict = false;

          for (i = 0; i < boxes.length; i++) {
            if (is_colliding(boxes[i], circle)) {
              conflict = true;
              break;
            } else {
              conflict = false;
            }
          }

          if (attempts > 1000) {
            break;
          }
        }

        boxes.push(circle);
        circle.click(function () {
          if (jQuery(this).attr('id') == targets[0]) {
            next = 1;
            return;
          }

          if (jQuery(this).attr('id') == targets[next]) {
            var pos0 = jQuery('#' + jQuery(this).attr('id')).position(),
                pos1 = jQuery('#' + targets[next - 1]).position();
            if (pos1 == undefined) return;
            var x0 = pos0.left,
                y0 = pos0.top,
                x1 = pos1.left,
                y1 = pos1.top;
            line(x0, y0, x1, y1);
            next = next + 1;

            if (next >= targets.length) {
              window.experiment_state = 'instructions_2';
              window.trial_time = new Date() - window.trial_start;
              jQuery("#custom_target").html(finalInstructions);
            }
          } else {
            jQuery('#warning').fadeToggle();
            setTimeout(function () {
              jQuery('#warning').fadeToggle();
            }, 400);
            window.trial_error_count++;
          }
        });
      }
    })();
  } else if (window.experiment_state == 'instructions_2') {
    var conflict;

    (function () {
      window.experiment_state = 'block_2';
      window.experiment_start = new Date();
      jQuery("#custom_target").html(latency_task);
      window.circles = jQuery('<div class="circle">'), cont = jQuery('.cont'), targets = ['1', 'A', '2', 'B', '3', 'C', '4', 'D', '5', 'E', '6', 'F', '7', 'G', '8', 'H', '9', 'I', '10', 'J', '11', 'K', '12', 'L', '13', 'M'];
      var n = targets.length;
      var next = 0;
      var attempts = 0;
      var boxes = []; //generate circles

      while (n--) {
        var circle = window.circles.clone().text(targets[n]);

        if (targets[n] == '1') {
          circle.css('color', 'red');
        }

        circle.attr('id', targets[n]);

        if (jQuery(window).width() < 800) {
          circle.attr('height', '40px');
          circle.attr('width', '40px');
        }

        cont.append(circle);
        conflict = true;

        while (conflict) {
          attempts = attempts + 1;
          circle.css('top', Math.floor(Math.random() * 85) + 1 + '%');
          circle.css('left', Math.floor(Math.random() * 85) + 1 + '%');
          conflict = false;

          for (i = 0; i < boxes.length; i++) {
            if (is_colliding(boxes[i], circle)) {
              conflict = true;
              break;
            } else {
              conflict = false;
            }
          }

          if (attempts > 1000) {
            break;
          }
        }

        boxes.push(circle);
        circle.click(function () {
          if (jQuery(this).attr('id') == targets[0]) {
            next = 1;
            return;
          }

          if (jQuery(this).attr('id') == targets[next]) {
            var pos0 = jQuery('#' + jQuery(this).attr('id')).position(),
                pos1 = jQuery('#' + targets[next - 1]).position();
            if (pos1 == undefined) return;
            var x0 = pos0.left,
                y0 = pos0.top,
                x1 = pos1.left,
                y1 = pos1.top;
            line(x0, y0, x1, y1);
            next = next + 1;

            if (next >= targets.length) {
              Qualtrics.SurveyEngine.setEmbeddedData("TrailResult", JSON.stringify({
                trial_time: window.trial_time,
                trial_error_count: window.trial_error_count,
                experiment_time: new Date() - window.experiment_start,
                experiment_error_count: window.experiment_error_count
              }));
              window.experiment_context.clickNextButton();
            }
          } else {
            jQuery('#warning').fadeToggle();
            setTimeout(function () {
              jQuery('#warning').fadeToggle();
            }, 400);
            window.experiment_error_count++;
          }
        });
      }
    })();
  } else if (window.experiment_state == 'block_1') {} else if (window.experiment_state == 'block_2') {}
};

if (window.Qualtrics) {
  Qualtrics.SurveyEngine.addOnload(function () {
    setup(this);
    window.experiment_context = this;
  });
  window.addEventListener('touchstart', function () {
    handleExperimentInput(this);
  });
  window.addEventListener('keydown', function () {
    handleExperimentInput(this);
  });
  window.addEventListener('mousedown', function () {
    handleExperimentInput(this);
  });
} else {
  var stub = {
    hideNextButton: function hideNextButton() {},
    hidePreviousButton: function hidePreviousButton() {},
    hideChoices: function hideChoices() {},
    SurveyEngine: {
      setEmbeddedData: function setEmbeddedData() {}
    }
  };
  window.setup(stub);
}

window.addEventListener('touchstart', function () {
  handleExperimentInput();
});
window.addEventListener('keydown', function () {
  handleExperimentInput();
});
window.addEventListener('mousedown', function () {
  handleExperimentInput();
});

function is_colliding(jQuerydiv1, jQuerydiv2) {
  // Div 1 data
  var d1_offset = jQuerydiv1.offset();
  var d1_height = jQuerydiv1.outerHeight(true);
  var d1_width = jQuerydiv1.outerWidth(true);
  var d1_distance_from_top = d1_offset.top + d1_height;
  var d1_distance_from_left = d1_offset.left + d1_width; // Div 2 data

  var d2_offset = jQuerydiv2.offset();
  var d2_height = jQuerydiv2.outerHeight(true);
  var d2_width = jQuerydiv2.outerWidth(true);
  var d2_distance_from_top = d2_offset.top + d2_height;
  var d2_distance_from_left = d2_offset.left + d2_width;
  var not_colliding = d1_distance_from_top < d2_offset.top || d1_offset.top > d2_distance_from_top || d1_distance_from_left < d2_offset.left || d1_offset.left > d2_distance_from_left; // Return whether it IS colliding

  return !not_colliding;
}

function line(x, y, x1, y1) {
  var l = jQuery("<div class='line'>"); //soh cah TOA and pythargoream theorem

  var w = window.circles.width() / 2;
  l.css({
    top: y + w + 20,
    left: x + w + 20,
    width: Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y)),
    transform: 'rotate(' + Math.atan2(y1 - y, x1 - x) + 'rad)'
  });
  cont.append(l);
}