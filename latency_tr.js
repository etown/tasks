var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
var latency_task = "\n<style>\n\n#custom_target {\n    overflow: hidden;\n    position: fixed;\n    text-align: center;\n    margin: 0;\n    top: 0;\n    left: 0;\n    text-align: center;\n    width: 100%;\n    height: 100%;\n    touch-action: manipulation;\n    background: rgba(255,255,255,1);\n}\n.latency{\n    height: 100vh;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    touch-action: manipulation;\n    background: black;\n}\n.stimulus {\n    touch-action: manipulation;\n    position: relative;\n    display: none;\n    top: 50%;\n    transform: translateY(-50%);\n    font-size: 100px;\n    color: red;\n}\n</style>\n<div class=\"latency\">\n<div style=\"\n    display: inline-block;\n    position: fixed;\n    top: 0;\n    touch-action: manipulation;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    width: 200px;\n    height: 200px;\n    margin: auto;\n    background-color: #f3f3f3;\"><div class=\"stimulus\" id=\"stimulus\">X</div>\n</div>\n</div>\n ";
var instructions = "\n <style>\n .wrapper {\n    font-size: 3em;\n    z-index: 2000;\n    padding: 25px;\n    margin: 0;\n    top: 0;\n    left: 0;\n    text-align: Center;\n    height: 100%;\n    background: rgba(255,255,255,1);\n }\n </style>\n \n   <div class=\"wrapper\">\n <div>For the next task, an <span style=\"color:red\">X</span> will appear in the box on the screen. Each time it appears you should ".concat(supportsTouch ? 'tap the screen' : 'press any key', " as quickly as you can.\n Don't hold ").concat(supportsTouch ? 'your finger' : 'the key', " down - press and release it when the <span style=\"color:red\">X</span> appears. Use the index finger of your preferred hand to ").concat(supportsTouch ? 'tap the screen' : 'press the key', " throughout the test. \n <br/> <br/>\n First you will have a short practice session.\n <br/><br/> \n When you are ready, ").concat(supportsTouch ? 'tap the screen' : 'press any key', " to start.\n \n </div>\n </div>\n  ");
var finalInstructions = "\n<style>\n\n.wrapper {\n    font-size: 3em;\n    z-index: 2000;\n    text-align: Center;\n    margin: 0;\n    top: 0;\n    left: 0;\n    height: 100%;\n    background: rgba(255,255,255,1);\n }\n</style>\n\n  <div class=\"wrapper\">\n  <div>Now an <span style=\"color:red\">X</span> will appear another 20 times. You should ".concat(supportsTouch ? 'tap the screen' : 'press any key', " as quickly as you can, as in the practice. When you are ready, ").concat(supportsTouch ? 'tap the screen' : 'press any key', " to start.\n</div>\n  ");
var overlay = "\n    <style>\n    #overlay {\n        position: fixed;\n        width: 100%;\n        height: 100%;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        background-color: white;\n        z-index: 2000;\n    }\n    </style>\n    \n    <div id=\"overlay\" ></div>\n     ";

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
  jQuery("#custom_target").html(instructions);
};

window.experiment_state = 'instructions_1';
window.experiment_count = 0;
window.experiment_visible = false;
window.trial_delays = [];
window.trial_latencies = [];
window.experiment_delays = [];
window.experiment_latencies = [];
window.experiment_start = 0;

window.run_trial = function (delays) {
  var max = 3000;
  var min = 1000;
  var delay = Math.floor(Math.random() * (max - min + 1) + min);
  delays.push(delay);
  console.log(delay);
  setTimeout(function () {
    window.experiment_count++;
    window.experiment_visible = true;
    jQuery("#stimulus").show();
    window.experiment_start = performance.now();
  }, delay);
};

window.handleExperimentInput = function (context) {
  if (window.experiment_state == 'instructions_1') {
    window.experiment_state = 'block_1';
    jQuery("#custom_target").html(latency_task);
    run_trial(trial_delays);
  } else if (window.experiment_state == 'instructions_2') {
    window.experiment_state = 'block_2';
    jQuery("#custom_target").html(latency_task);
    run_trial(experiment_delays);
  } else if (window.experiment_state == 'block_1') {
    if (window.experiment_visible) {
      trial_latencies.push(performance.now() - window.experiment_start);
      window.experiment_visible = false;
      jQuery("#stimulus").hide();

      if (window.experiment_count < 8) {
        run_trial(trial_delays);
      } else {
        window.experiment_count = 0;
        window.experiment_state = 'instructions_2';
        jQuery("#custom_target").html(finalInstructions);
      }
    }
  } else if (window.experiment_state == 'block_2') {
    if (window.experiment_visible) {
      experiment_latencies.push(performance.now() - window.experiment_start);
      window.experiment_visible = false;
      jQuery("#stimulus").hide();

      if (window.experiment_count < 20) {
        run_trial(experiment_delays);
      } else {
        var formatted = {
          trial_delays: trial_delays,
          trial_latencies: trial_latencies,
          experiment_delays: experiment_delays,
          experiment_latencies: experiment_latencies
        };
        Qualtrics.SurveyEngine.setEmbeddedData("LatencyResult", JSON.stringify(formatted));
        window.experiment_context.clickNextButton();
      }
    }
  }
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
} else {
  var stub = {
    hideNextButton: function hideNextButton() {},
    hidePreviousButton: function hidePreviousButton() {},
    hideChoices: function hideChoices() {},
    SurveyEngine: {
      setEmbeddedData: function setEmbeddedData() {}
    }
  };
  window.experiment_context = stub;
  window.addEventListener('touchstart', function () {
    handleExperimentInput(stub);
  });
  window.addEventListener('keydown', function () {
    handleExperimentInput(stub);
  });
  window.setup(stub);
}