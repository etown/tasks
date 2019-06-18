var trial = 0;

function shuffle(a) {
  var j, x, i;

  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }

  return a;
}

var distraction = "\n<style>\n.box {\ndisplay: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.dot {\n    margin: auto;\n    width: 50%;\n    padding: 10px;\n    height: 50%;\n    width: 50%;\n    background-color: red;\n    border-radius: 50%;\n    display: inline-block;\n}\n\n#custom_target {\n    overflow: hidden;\n    position: fixed;\n    text-align: center;\n    padding: 3%;\n    margin: 0;\n    top: 0;\n    left: 0;\n    width: 94%;\n    height: 100%;\n    background: rgba(255,255,255,1);\n}\n.grid {\n    margin: 0 auto;\n    height: 50%;\n    max-width: 40vh;\n    font-size: 1rem;\n    touch-action: manipulation;\n}\n.title{\n\n    font-size: 3em;\n      padding-top: 20px;\n    padding-bottom: 40px;\n}\n.row {\n    display: flex;\n    height: 20%;\n}\n.box {\n  -webkit-touch-callout: none; /* iOS Safari */\n    -webkit-user-select: none; /* Safari */\n     -khtml-user-select: none; /* Konqueror HTML */\n       -moz-user-select: none; /* Firefox */\n        -ms-user-select: none; /* Internet Explorer/Edge */\n            user-select: none;\n     font-size: 2em;\n    font-weight: bold;\n    flex: 1 0 auto;\n    position: relative;\n}\n.box:after {\n    content: \"\";\n    float:left;\n    display: block;\n    padding-top: 100%;\n}\n.box .inner {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    top: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n</style>\n<div class=\"title\">Touch the F's!</div>\n<div><div class=\"grid\">\n    <div class=\"row\">\n        <div class=\"box\"><div id=\"cell-1\" class=\"inner\"></div></div>\n        <div class=\"box\"><div id=\"cell-2\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-3\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-4\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-5\"   class=\"inner\"></div></div>\n    </div>\n    <div class=\"row\">\n        <div class=\"box\"><div  id=\"cell-6\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-7\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-8\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-9\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-10\"   class=\"inner\"></div></div>\n    </div>\n    <div class=\"row\">\n        <div class=\"box\"><div  id=\"cell-11\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-12\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-13\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-14\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-15\"   class=\"inner\"></div></div>\n    </div>\n    <div class=\"row\">\n        <div class=\"box\"><div  id=\"cell-16\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-17\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-18\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-19\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-20\"   class=\"inner\"></div></div>\n    </div>\n    <div class=\"row\">\n        <div class=\"box\"><div  id=\"cell-21\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-22\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-23\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-24\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-25\"  class=\"inner\"></div></div>\n    </div>\n    <div class=\"row\">\n        <div class=\"box\"><div  id=\"cell-26\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-27\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-28\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-29\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-30\"  class=\"inner\"></div></div>\n    </div>\n    <div class=\"row\">\n        <div class=\"box\"><div  id=\"cell-31\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-32\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-33\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-34\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-35\"  class=\"inner\"></div></div>\n    </div>\n    <div class=\"row\">\n        <div class=\"box\"><div  id=\"cell-36\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-37\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-38\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-39\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-40\"  class=\"inner\"></div></div>\n    </div>\n</div>\n</div> ";
var main = "\n<style>\n.box {\nborder-style: solid;\n    border-color: #222;\n    border-width: 5px;\ndisplay: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.dot {\n    margin: auto;\n    width: 50%;\n    padding: 10px;\n    height: 50%;\n    width: 50%;\n    background-color: red;\n    border-radius: 50%;\n    display: inline-block;\n}\n\n#custom_target {\n    overflow: hidden;\n    position: fixed;\n      text-align: center;\n    padding: 3%;\n    margin: 0;\n    top: 0;\n    left: 0;\n    width: 94%;\n    height: 100%;\n    background: rgba(255,255,255,1);\n}\n.grid {\n    margin: 0 auto;\n    height: 50%;\n    max-width: 60vh;\n    font-size: 1rem;\n    touch-action: manipulation;\n}\n.title{\n\n    font-size: 3em;\n      padding-top: 20px;\n    padding-bottom: 50px;\n}\n.row {\n    display: flex;\n    height: 20%;\n}\n.box {\n    color: white;\n    font-weight: bold;\n    flex: 1 0 auto;\n    position: relative;\n}\n.box:after {\n    content: \"\";\n    float:left;\n    display: block;\n    padding-top: 100%;\n}\n.box .inner {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    top: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n</style>\n<div class=\"title\">Remember the dot locations!</div>\n<div><div class=\"grid\">\n    <div class=\"row\">\n        <div class=\"box\"><div id=\"cell-1-1\" class=\"inner\"></div></div>\n        <div class=\"box\"><div id=\"cell-1-2\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-1-3\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-1-4\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-1-5\"   class=\"inner\"></div></div>\n    </div>\n    <div class=\"row\">\n        <div class=\"box\"><div  id=\"cell-2-1\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-2-2\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-2-3\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-2-4\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-2-5\"   class=\"inner\"></div></div>\n    </div>\n    <div class=\"row\">\n        <div class=\"box\"><div  id=\"cell-3-1\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-3-2\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-3-3\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-3-4\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-3-5\"   class=\"inner\"></div></div>\n    </div>\n    <div class=\"row\">\n        <div class=\"box\"><div  id=\"cell-4-1\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-4-2\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-4-3\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-4-4\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div  id=\"cell-4-5\"   class=\"inner\"></div></div>\n    </div>\n    <div class=\"row\">\n        <div class=\"box\"><div  id=\"cell-5-1\"   class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-5-2\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-5-3\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-5-4\"  class=\"inner\"></div></div>\n        <div class=\"box\"><div   id=\"cell-5-5\"  class=\"inner\"></div></div>\n    </div>\n</div>\n</div> ";
var recall = "\n<style>\n.box {\nborder-style: solid;\n    border-color: #222;\n    border-width: 5px;\ndisplay: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.dot {\n    margin: auto;\n    width: 50%;\n    padding: 10px;\n    height: 50%;\n    background-color: red;\n    border-radius: 50%;\n    display: inline-block;\n}\n\n#custom_target {\n    overflow: hidden;\n    position: fixed;\n      text-align: center;\n    padding: 3%;\n    margin: 0;\n    top: 0;\n    left: 0;\n    width: 94%;\n    height: 100vh;\n    background: rgba(255,255,255,1);\n}\n.grid {\n    margin: 0 auto;\n    height: 50%;\n    max-width: 60vh;\n    font-size: 1rem;\n    touch-action: manipulation;\n}\n.title{\n\n    font-size: 3em;\n      padding-top: 20px;\n    padding-bottom: 50px;\n}\n.row {\n    display: flex;\n    height: 20%;\n}\n.box {\n    color: white;\n    font-weight: bold;\n    flex: 1 0 auto;\n    position: relative;\n}\n.box:after {\n    content: \"\";\n    float:left;\n    display: block;\n    padding-top: 100%;\n}\n.box .inner {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    top: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.button {\n    background-color: #4CAF50; /* Green */\n    border: none;\n    color: white;\n    z-index: 2000;\n    padding: 15px 32px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    margin: 4px 2px;\n    margin-top: 10px;\n    cursor: pointer;\n}\n\n.button1 {\n    background-color: white; \n    color: black; \n    z-index: 2000;\n    border: 2px solid #4CAF50;\n    padding-bottom: 20px;\n}\n</style>\n<div class=\"title\">Where were the dots?</div>\n<div><div class=\"grid\">\n<div class=\"row\">\n<div class=\"box\"><div id=\"cell-1-1\" class=\"inner\"></div></div>\n<div class=\"box\"><div id=\"cell-1-2\"  class=\"inner\"></div></div>\n<div class=\"box\"><div  id=\"cell-1-3\"   class=\"inner\"></div></div>\n<div class=\"box\"><div  id=\"cell-1-4\"  class=\"inner\"></div></div>\n<div class=\"box\"><div  id=\"cell-1-5\"   class=\"inner\"></div></div>\n</div>\n<div class=\"row\">\n<div class=\"box\"><div  id=\"cell-2-1\"   class=\"inner\"></div></div>\n<div class=\"box\"><div  id=\"cell-2-2\"   class=\"inner\"></div></div>\n<div class=\"box\"><div  id=\"cell-2-3\"   class=\"inner\"></div></div>\n<div class=\"box\"><div  id=\"cell-2-4\"   class=\"inner\"></div></div>\n<div class=\"box\"><div  id=\"cell-2-5\"   class=\"inner\"></div></div>\n</div>\n<div class=\"row\">\n<div class=\"box\"><div  id=\"cell-3-1\"   class=\"inner\"></div></div>\n<div class=\"box\"><div  id=\"cell-3-2\"   class=\"inner\"></div></div>\n<div class=\"box\"><div  id=\"cell-3-3\"   class=\"inner\"></div></div>\n<div class=\"box\"><div  id=\"cell-3-4\"   class=\"inner\"></div></div>\n<div class=\"box\"><div  id=\"cell-3-5\"   class=\"inner\"></div></div>\n</div>\n<div class=\"row\">\n<div class=\"box\"><div  id=\"cell-4-1\"   class=\"inner\"></div></div>\n<div class=\"box\"><div   id=\"cell-4-2\"  class=\"inner\"></div></div>\n<div class=\"box\"><div  id=\"cell-4-3\"   class=\"inner\"></div></div>\n<div class=\"box\"><div   id=\"cell-4-4\"  class=\"inner\"></div></div>\n<div class=\"box\"><div  id=\"cell-4-5\"   class=\"inner\"></div></div>\n</div>\n<div class=\"row\">\n<div class=\"box\"><div  id=\"cell-5-1\"   class=\"inner\"></div></div>\n<div class=\"box\"><div   id=\"cell-5-2\"  class=\"inner\"></div></div>\n<div class=\"box\"><div   id=\"cell-5-3\"  class=\"inner\"></div></div>\n<div class=\"box\"><div   id=\"cell-5-4\"  class=\"inner\"></div></div>\n<div class=\"box\"><div   id=\"cell-5-5\"  class=\"inner\"></div></div>\n</div>\n</div><button class=\"button button1\">Done</button>\n</div> ";
var instructions = "\n<style>\n.wrapper {\n    font-size: 3em;\n    z-index: 2000;\n    padding: 25px;\n    margin: 0;\n    top: 0;\n    left: 0;\n    height: 100%;\n    background: rgba(255,255,255,1);\n}\n.button {\n    background-color: #4CAF50; /* Green */\n    border: none;\n    z-index: 2000;\n    color: white;\n    padding: 15px 32px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    margin: 4px 2px;\n    margin-top: 10px;\n    cursor: pointer;\n}\n\n.button1 {\n    background-color: white; \n    color: black; \n    z-index: 2000;\n    border: 2px solid #4CAF50;\n}\n</style>\n\n  <div class=\"wrapper\">\n<div>Each round of this task has three parts:\n<ol>\n  <li>You will see a grid with three red dots. Study and try to remember where the dots are.</li>\n  <li>You will see a screen with letters. When you see the letters, touch all the F's.</li>\n  <li>You will see a grid <b>WITHOUT</b> the red dots. Click the squares where the red dots were located on the previous grid.</li>\n</ol>\n \n<div>\nThere will be 12 rounds of this sequence. First try two practice rounds. Press any continue when you are ready to practice.</div>\n<div style=\"text-align: center;\"><button class=\"button button1\">Continue</button></div>\n\n</div>\n ";
var finalInstructions = "\n  <style>\n  .wrapper {\n     text-align: center;\n     font-size: 3em;\n      padding: 25px;\n      margin: 0;\n      top: 0;\n      left: 0;\n      height: 100%;\n      background: rgba(255,255,255,1);\n  }\n  .button {\n      background-color: #4CAF50; /* Green */\n      border: none;\n      color: white;\n      padding: 15px 32px;\n      text-align: center;\n      text-decoration: none;\n      display: inline-block;\n      font-size: 16px;\n      margin: 4px 2px;\n      margin-top: 10px;\n      cursor: pointer;\n      z-index: 2000;\n  }\n  \n  .button1 {\n    z-index: 2000;\n      background-color: white; \n      color: black; \n      border: 2px solid #4CAF50;\n  }\n  </style>\n  \n    <div class=\"wrapper\">\n  <div>Now, the 12 rounds will start. <b>Please pay attention!</b> The next round will begin immediately after the previous round. Press continue when you are ready to begin.\n \n  <div><button class=\"button button1\">Continue</button></div>\n  \n  \n  </div>\n   ";
var overlay = "\n    <style>\n    #overlay {\n        width: 100%;\n        height: 100%;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        background-color: white;\n        z-index: 2000;\n    }\n    </style>\n    \n    <div id=\"overlay\" ></div>\n     ";

window.setup = function (context) {
  var results = [];
  jQuery("#Buttons").hide();
  jQuery(".QuestionBody").hide();
  jQuery("#ProgressBar").hide();
  jQuery("#LogoContainer").hide();
  jQuery("#HeaderContainer").hide();
  jQuery("#Plug").hide();
  context.hideNextButton();
  context.hidePreviousButton();
  context.hideChoices(); //  $("#custom_target").parentElement.parentElement.parentElement.children[1].style.display = 'none'

  jQuery("#custom_target").html(instructions);

  var runTrial = function runTrial() {
    trial = trial + 1;
    jQuery("#custom_target").html(main);
    items = shuffle(jQuery('.inner'));
    context.memory_solution = [items[0], items[1], items[2]];
    context.f_score = 0;
    jQuery(items[0]).html("<div class='dot'></div>");
    jQuery(items[1]).html("<div class='dot'></div>");
    jQuery(items[2]).html("<div class='dot'></div>");
    setTimeout(function () {
      jQuery("#custom_target").html(distraction);
      var items = [];

      for (var i = 1; i <= 41; i++) {
        if (i < 9) {
          items.push('F');
        } else {
          items.push('E');
        }
      }

      items = shuffle(items);

      for (var _i = 1; _i <= 41; _i++) {
        jQuery("#cell-" + _i).append(items[_i]);
        jQuery("#cell-" + _i).on('click', function () {
          if (jQuery(this).text() == 'F') {
            context.f_score = context.f_score + 1;
            jQuery(this).css("background-color", "green");
          }
        });
      }

      setTimeout(function () {
        jQuery("#custom_target").html(recall);
        jQuery(".button1").on('click', function () {
          var selected = [];
          var cells = jQuery("[id^=cell-]");

          for (var _i2 = 0; _i2 < cells.length; _i2++) {
            if (jQuery(cells[_i2]).children().length) {
              selected.push(cells[_i2]);
            }
          }

          var distant_scores = [];

          for (var _i3 = 0; _i3 < context.memory_solution.length; _i3++) {
            var parts = context.memory_solution[_i3].id.split('-');

            var solution_row = parseInt(parts[1]);
            var solution_column = parseInt(parts[2]);
            var closest = void 0;

            for (var j = 0; j < selected.length; j++) {
              var _parts = selected[j].id.split('-');

              var selected_row = parseInt(_parts[1]);
              var selected_column = parseInt(_parts[2]);
              var distance = Math.abs(solution_row - selected_row) + Math.abs(solution_column - selected_column);

              if (closest == undefined || distance < closest[2]) {
                closest = [context.memory_solution[_i3], selected[j], distance];
              }
            }

            if (closest) {
              distant_scores.push(closest);
            }
          }

          var correct = distant_scores.filter(function (n) {
            return n[2] === 0;
          });
          var errors = distant_scores.filter(function (n) {
            return n[2] !== 0;
          });
          var result = {
            selected: selected.map(function (item) {
              var parts = item.id.split('-');
              return parts[1] + ',' + parts[2];
            }),
            distances: distant_scores.map(function (item) {
              return item[2];
            }),
            solution: context.memory_solution.map(function (item) {
              var parts = item.id.split('-');
              return parts[1] + ',' + parts[2];
            }),
            f_score: context.f_score,
            number_correct: correct.length,
            errors: errors.length
          };
          console.log(result);
          results.push(result);

          if (trial == 2) {
            jQuery("#custom_target").html(finalInstructions);
            jQuery(".button1").on('click', function () {
              runTrial();
            });
          } else if (trial == 14) {
            console.log(results);
            var time = Date.now() - window.start_time;
            var formatted = {
              trials: results,
              time: time
            };
            Qualtrics.SurveyEngine.setEmbeddedData("MemoryResult", JSON.stringify(formatted));
            context.clickNextButton();
          } else {
            jQuery("#custom_target").html(overlay);
            setTimeout(function () {
              runTrial();
            }, 1000);
          }
        });
        jQuery("[id^=cell-]").on('click', function () {
          var numItems = jQuery('.dot').length;

          if (jQuery(this).children().length) {
            jQuery(this).empty();
          } else {
            if (numItems > 2) {
              return;
            }

            jQuery(this).append("<div class='dot'></div>");
          }
        });
      }, 8000);
    }, 3000);
  };

  jQuery(".button1").on('click', function () {
    runTrial();
  });
};

window.start_time = Date.now();

if (window.Qualtrics) {
  Qualtrics.SurveyEngine.addOnload(function () {
    setup(this);
    window.experiment_context = this;
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