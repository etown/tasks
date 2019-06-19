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
    touch-action: manipulation;
    background: rgba(255,255,255,1);
}
html, body, .cont {
    height: 100%;
}
body {
    font-family: helvetica;
    margin: 0; padding: 0;
}

.cont {
    height: 100%;
    margin-bottom: 50px;
}
.warning {
    position: fixed;
    display: none;
    z-index: 100;
    top: 50%;
    left: 50%;
    font-size: 200px;
    color:red;
    /* bring your own prefixes */
    transform: translate(-50%, -50%);
}

.circle {
    z-index: 3;
    height: 100px;
    line-height: 100px;
    font-size: 40px;
    width: 100px;
    text-align: center;
    color: #fff;
    background-color: #2aE;
    border-radius: 150px;
    position: absolute;
}

.line {
    height: 3px;
    background-color: #aaa;
    transform-origin: left center;
    position: absolute;
    z-index: 1;
}
</style>

<div class="warning" id="warning">
X
</div>
<div class="cont">

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

let instructions = `
     <style>
     .wrapper {
        font-size: 3em;
        z-index: 2000;
        padding: 25px;
        margin: 0;
        top: 0;
        left: 0;
        height: 100%;
        background: rgba(255,255,255,1);
     }
     </style>
     
       <div class="wrapper">
     <div>The next screen has numbers and letters in circles. Starting with the number 1 (in red), ${supportsTouch ? 'tap' : 'click'} on each number and letter, alternating between the two. Start at the number 1, ${supportsTouch ? 'tap' : 'click'} on 1, then ${supportsTouch ? 'tap' : 'click'} on the letter A, then ${supportsTouch ? 'tap' : 'click'} on the number 2, and then ${supportsTouch ? 'tap' : 'click'} on the letter B, and so on. A line will appear between the circles when the order is correct. <br><br>
     If you make a mistake, a red <span style="color:red">X</span> will appear on the screen. When you see the <span style="color:red">X</span>, ${supportsTouch ? 'tap' : 'click'} the correct circle to continue. 
     <br><br>
     Work as quickly and accurately as you can.
     
     
     First there will be a short practice round. ${supportsTouch ? 'Tap' : 'Click'} to start.
     </div>
     </div>
      `;
let finalInstructions = `
           <style>
           .wrapper {
              line-height: 1.2em;
               z-index: 2000;
               margin: 1em;
               font-size: 4vw;
               background: rgba(255,255,255,1);
           }
           </style>
           

             <div class="wrapper">
           <div>Now try again. Remember to work as fast and as accurately as possible. If you make a mistake, choose the correct circle and keep going.<br><br>${supportsTouch ? 'Tap' : 'Click'} to start.
           </div>
           </div>
            `;
window.experiment_state = 'instructions_1';
window.trial_time = 0
window.trial_error_count = 0
window.experiment_error_count = 0
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
    //  jQuery("#custom_target").html(latency_task)




};

window.handleExperimentInput = function (context) {
    if (window.experiment_state == 'instructions_1') {
        window.experiment_state = 'block_1'
        window.trial_start = new Date()
        jQuery("#custom_target").html(latency_task)

        window.circles = jQuery('<div class="circle">'),
            cont = jQuery('.cont'),
            targets = ['1', 'A', '2', 'B', '3', 'C', '4', 'D'];
        let n = targets.length
        let next = 0
        let attempts = 0
        let boxes = []
        //generate circles
        while (n--) {
            let circle = window.circles.clone().text(targets[n])
            if (targets[n] == '1') {
                circle.css('color', 'red');
            }
            circle.attr('id', targets[n]);
            if (jQuery(window).width() < 800) {
                circle.attr('height', '40px');
                circle.attr('width', '40px');
            }
            cont.append(circle);
            var conflict = true;
            while (conflict) {
                attempts = attempts + 1
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
            boxes.push(circle)
            circle.click(function () {

                if (jQuery(this).attr('id') == targets[0]) {
                    next = 1
                    return
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
                    next = next + 1
                    if (next >= targets.length) {
                        window.experiment_state = 'instructions_2'
                        window.trial_time = new Date()-window.trial_start
                        jQuery("#custom_target").html(finalInstructions)
                    }
                } else {
                    jQuery('#warning').fadeToggle()
                    setTimeout(() => {
                        jQuery('#warning').fadeToggle()
                    }, 400)
                    window.trial_error_count++
                }
            })
        }


    } else if (window.experiment_state == 'instructions_2') {
        window.experiment_state = 'block_2'
        window.experiment_start = new Date()
        jQuery("#custom_target").html(latency_task)

        window.circles = jQuery('<div class="circle">'),
            cont = jQuery('.cont'),
            targets = ['1', 'A', '2', 'B', '3', 'C', '4', 'D', '5', 'E', '6', 'F', '7', 'G', '8', 'H', '9', 'I', '10', 'J', '11', 'K', '12', 'L', '13', 'M'];
        let n = targets.length
        let next = 0
        let attempts = 0
        let boxes = []
        //generate circles
        while (n--) {
            let circle = window.circles.clone().text(targets[n])
            if (targets[n] == '1') {
                circle.css('color', 'red');
            }
            circle.attr('id', targets[n]);
            if (jQuery(window).width() < 800) {
                circle.attr('height', '40px');
                circle.attr('width', '40px');
            }
            cont.append(circle);
            var conflict = true;
            while (conflict) {
                attempts = attempts + 1
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
            boxes.push(circle)
            circle.click(function () {

                if (jQuery(this).attr('id') == targets[0]) {
                    next = 1
                    return
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
                    next = next + 1

                    if (next >= targets.length) {
                        Qualtrics.SurveyEngine.setEmbeddedData("TrailResult", JSON.stringify({
                            trial_time:window.trial_time,
                            trial_error_count:window.trial_error_count,
                            experiment_time:new Date()-window.experiment_start,
                            experiment_error_count:window.experiment_error_count
                        }));
                        window.experiment_context.clickNextButton();
                    }
                } else {
                    jQuery('#warning').fadeToggle()
                    setTimeout(() => {
                        jQuery('#warning').fadeToggle()
                    }, 400)
                    window.experiment_error_count++
                }
            })
        }
    } else if (window.experiment_state == 'block_1') {
    } else if (window.experiment_state == 'block_2') {
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
    window.addEventListener('mousedown', function () {
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

    window.setup(stub)
}

window.addEventListener('touchstart', function () {
    handleExperimentInput()
});
window.addEventListener('keydown', function () {
    handleExperimentInput()
});
window.addEventListener('mousedown', function () {
    handleExperimentInput()
});
function is_colliding(jQuerydiv1, jQuerydiv2) {
    // Div 1 data
    var d1_offset = jQuerydiv1.offset();
    var d1_height = jQuerydiv1.outerHeight(true);
    var d1_width = jQuerydiv1.outerWidth(true);
    var d1_distance_from_top = d1_offset.top + d1_height;
    var d1_distance_from_left = d1_offset.left + d1_width;

    // Div 2 data
    var d2_offset = jQuerydiv2.offset();
    var d2_height = jQuerydiv2.outerHeight(true);
    var d2_width = jQuerydiv2.outerWidth(true);
    var d2_distance_from_top = d2_offset.top + d2_height;
    var d2_distance_from_left = d2_offset.left + d2_width;

    var not_colliding = (d1_distance_from_top < d2_offset.top || d1_offset.top > d2_distance_from_top || d1_distance_from_left < d2_offset.left || d1_offset.left > d2_distance_from_left);

    // Return whether it IS colliding
    return !not_colliding;
}

function line(x, y, x1, y1) {
    var l = jQuery("<div class='line'>");
    //soh cah TOA and pythargoream theorem
    var w = window.circles.width() / 2;
    l.css({
        top: y + w + 50,
        left: x + w + 50,
        width: Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y)),
        transform: 'rotate(' + Math.atan2((y1 - y), (x1 - x)) + 'rad)'
    });
    cont.append(l);
}