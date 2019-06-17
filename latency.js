var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

let latency_task = `
<style>

#custom_target {
    overflow: hidden;
    position: fixed;
    text-align: center;
    margin: 0;
    top: 0;
    left: 0;
    text-align: center;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,1);
}
.latency{
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    background: black;
}
.stimulus {
    position: relative;
    display: none;
    top: 50%;
    transform: translateY(-50%);
    font-size: 100px;
    color: red;
}
</style>
<div class="latency">
<div style="
    display: inline-block;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 200px;
    height: 200px;
    margin: auto;
    background-color: #f3f3f3;"><div class="stimulus" id="stimulus">X</div>
</div>
</div>
 `;
 let instructions = `
 <style>
 .wrapper {
    font-size: 3em;
    z-index: 2000;
    padding: 25px;
    margin: 0;
    top: 0;
    left: 0;
    text-align: Center;
    height: 100%;
    background: rgba(255,255,255,1);
 }
 </style>
 
   <div class="wrapper">
 <div>For the next task, an <span style="color:red">X</span> will appear in the box on the screen. Each time it appears you should ${supportsTouch?'tap the screen':'press any key'} as quickly as you can.
 Don't hold ${supportsTouch?'your finger':'the key'} down - press and release it when the <span style="color:red">X</span> appears. Use the index finger of your preferred hand to ${supportsTouch?'tap the screen':'press the key'} throughout the test. 
 <br/> <br/>
 First you will have a short practice session.
 <br/><br/> 
 When you are ready, ${supportsTouch?'tap the screen':'press any key'} to start.
 
 </div>
 </div>
  `;
let finalInstructions = `
<style>

.wrapper {
    font-size: 3em;
    z-index: 2000;
    text-align: Center;
    margin: 0;
    top: 0;
    left: 0;
    height: 100%;
    background: rgba(255,255,255,1);
 }
</style>

  <div class="wrapper">
  <div>Now an <span style="color:red">X</span> will appear another 20 times. You should ${supportsTouch?'tap the screen':'press any key'} as quickly as you can, as in the practice. When you are ready, ${supportsTouch?'tap the screen':'press any key'} to start.
</div>
  `;
let overlay = `
    <style>
    #overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
        z-index: 2000;
    }
    </style>
    
    <div id="overlay" ></div>
     `;
setup = (context) => {
    let results = []
    context.hideNextButton()
    context.hidePreviousButton()
    context.hideChoices()
    jQuery("#Buttons").hide();
    jQuery(".QuestionBody").hide();
    jQuery("#ProgressBar").hide();
    jQuery("#LogoContainer").hide();
    jQuery("#HeaderContainer").hide();
    jQuery('.QuestionText').css('padding', '0px');
    jQuery("#Plug").hide();
    jQuery("#custom_target").html(instructions)


};
window.experiment_state = 'instructions_1';
window.experiment_count = 0;
window.experiment_visible = false;
window.trial_delays = [];
window.trial_latencies = [];
window.experiment_delays = [];
window.experiment_latencies = [];
window.experiment_start = 0
window.run_trial = function (delays) {

    var max = 3000;
    var min = 1000;
    var delay = Math.floor(Math.random() * (max - min + 1) + min);
    delays.push(delay)
    console.log(delay)
    setTimeout(function () {

        window.experiment_count++
        window.experiment_visible = true
        jQuery("#stimulus").show()
        window.experiment_start = performance.now()
    }, delay);
}
window.handleExperimentInput = function (context) {
    if (window.experiment_state == 'instructions_1') {
        window.experiment_state = 'block_1'
        jQuery("#custom_target").html(latency_task)
        run_trial(trial_delays)

    } else if (window.experiment_state == 'instructions_2') {
        window.experiment_state = 'block_2'
        jQuery("#custom_target").html(latency_task)
        run_trial(experiment_delays)
    } else if (window.experiment_state == 'block_1') {
        if (window.experiment_visible) {
            trial_latencies.push(performance.now() - window.experiment_start)
            window.experiment_visible = false
            jQuery("#stimulus").hide()
            if (window.experiment_count < 8) {
                run_trial(trial_delays)
            } else {
                window.experiment_count = 0
                window.experiment_state = 'instructions_2'
                jQuery("#custom_target").html(finalInstructions)
            }
        }
    } else if (window.experiment_state == 'block_2') {
        if (window.experiment_visible) {
            experiment_latencies.push(performance.now() - window.experiment_start)
            window.experiment_visible = false
            jQuery("#stimulus").hide()

            if (window.experiment_count < 20) {
                run_trial(experiment_delays)
            } else {
                let formatted = {
                    trial_delays,trial_latencies,experiment_delays,experiment_latencies
                }
                Qualtrics.SurveyEngine.setEmbeddedData("LatencyResult", JSON.stringify(formatted));
                window.experiment_context.clickNextButton();
            }
        }
    }
}

if (window.Qualtrics) {
    Qualtrics.SurveyEngine.addOnload(function () {
        setup(this)
        window.experiment_context = this
    });

    window.addEventListener('touchstart', function () {
        handleExperimentInput(this)
    });
    window.addEventListener('keydown', function () {
        handleExperimentInput(this)
    });
} else {
    let stub = {
        hideNextButton: function () {

        },
        hidePreviousButton: function () {

        },
        hideChoices: function () {

        },
        SurveyEngine: {
            setEmbeddedData: function () {

            }
        },
    }

    window.experiment_context = stub
    window.addEventListener('touchstart', function () {
        handleExperimentInput(stub)
    });
    window.addEventListener('keydown', function () {
        handleExperimentInput(stub)
    });
    window.setup(stub)
}