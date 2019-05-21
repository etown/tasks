let trial = 0
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
let distraction = `
<style>
.box {
display: flex;
    justify-content: center;
    align-items: center;
}

.dot {
    margin: auto;
    width: 50%;
    padding: 10px;
    height: 50%;
    width: 50%;
    background-color: red;
    border-radius: 50%;
    display: inline-block;
}

#custom_target {
    overflow: hidden;
    position: fixed;
    text-align: center;
    padding: 3%;
    margin: 0;
    top: 0;
    left: 0;
    width: 94%;
    height: 100%;
    background: rgba(255,255,255,1);
}
.grid {
    margin: 0 auto;
    height: 50%;
    max-width: 40vh;
    font-size: 1rem;
    touch-action: manipulation;
}
.title{

    font-size: 3em;
      padding-top: 20px;
    padding-bottom: 40px;
}
.row {
    display: flex;
    height: 20%;
}
.box {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
     font-size: 2em;
    font-weight: bold;
    flex: 1 0 auto;
    position: relative;
}
.box:after {
    content: "";
    float:left;
    display: block;
    padding-top: 100%;
}
.box .inner {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
<div class="title">Touch the F's!</div>
<div><div class="grid">
    <div class="row">
        <div class="box"><div id="cell-1" class="inner"></div></div>
        <div class="box"><div id="cell-2"  class="inner"></div></div>
        <div class="box"><div  id="cell-3"   class="inner"></div></div>
        <div class="box"><div  id="cell-4"  class="inner"></div></div>
        <div class="box"><div  id="cell-5"   class="inner"></div></div>
    </div>
    <div class="row">
        <div class="box"><div  id="cell-6"   class="inner"></div></div>
        <div class="box"><div  id="cell-7"   class="inner"></div></div>
        <div class="box"><div  id="cell-8"   class="inner"></div></div>
        <div class="box"><div  id="cell-9"   class="inner"></div></div>
        <div class="box"><div  id="cell-10"   class="inner"></div></div>
    </div>
    <div class="row">
        <div class="box"><div  id="cell-11"   class="inner"></div></div>
        <div class="box"><div  id="cell-12"   class="inner"></div></div>
        <div class="box"><div  id="cell-13"   class="inner"></div></div>
        <div class="box"><div  id="cell-14"   class="inner"></div></div>
        <div class="box"><div  id="cell-15"   class="inner"></div></div>
    </div>
    <div class="row">
        <div class="box"><div  id="cell-16"   class="inner"></div></div>
        <div class="box"><div   id="cell-17"  class="inner"></div></div>
        <div class="box"><div  id="cell-18"   class="inner"></div></div>
        <div class="box"><div   id="cell-19"  class="inner"></div></div>
        <div class="box"><div  id="cell-20"   class="inner"></div></div>
    </div>
    <div class="row">
        <div class="box"><div  id="cell-21"   class="inner"></div></div>
        <div class="box"><div   id="cell-22"  class="inner"></div></div>
        <div class="box"><div   id="cell-23"  class="inner"></div></div>
        <div class="box"><div   id="cell-24"  class="inner"></div></div>
        <div class="box"><div   id="cell-25"  class="inner"></div></div>
    </div>
    <div class="row">
        <div class="box"><div  id="cell-26"   class="inner"></div></div>
        <div class="box"><div   id="cell-27"  class="inner"></div></div>
        <div class="box"><div   id="cell-28"  class="inner"></div></div>
        <div class="box"><div   id="cell-29"  class="inner"></div></div>
        <div class="box"><div   id="cell-30"  class="inner"></div></div>
    </div>
    <div class="row">
        <div class="box"><div  id="cell-31"   class="inner"></div></div>
        <div class="box"><div   id="cell-32"  class="inner"></div></div>
        <div class="box"><div   id="cell-33"  class="inner"></div></div>
        <div class="box"><div   id="cell-34"  class="inner"></div></div>
        <div class="box"><div   id="cell-35"  class="inner"></div></div>
    </div>
    <div class="row">
        <div class="box"><div  id="cell-36"   class="inner"></div></div>
        <div class="box"><div   id="cell-37"  class="inner"></div></div>
        <div class="box"><div   id="cell-38"  class="inner"></div></div>
        <div class="box"><div   id="cell-39"  class="inner"></div></div>
        <div class="box"><div   id="cell-40"  class="inner"></div></div>
    </div>
</div>
</div> `;
let main = `
<style>
.box {
border-style: solid;
    border-color: #222;
    border-width: 5px;
display: flex;
    justify-content: center;
    align-items: center;
}

.dot {
    margin: auto;
    width: 50%;
    padding: 10px;
    height: 50%;
    width: 50%;
    background-color: red;
    border-radius: 50%;
    display: inline-block;
}

#custom_target {
    overflow: hidden;
    position: fixed;
      text-align: center;
    padding: 3%;
    margin: 0;
    top: 0;
    left: 0;
    width: 94%;
    height: 100%;
    background: rgba(255,255,255,1);
}
.grid {
    margin: 0 auto;
    height: 50%;
    max-width: 60vh;
    font-size: 1rem;
    touch-action: manipulation;
}
.title{

    font-size: 3em;
      padding-top: 20px;
    padding-bottom: 50px;
}
.row {
    display: flex;
    height: 20%;
}
.box {
    color: white;
    font-weight: bold;
    flex: 1 0 auto;
    position: relative;
}
.box:after {
    content: "";
    float:left;
    display: block;
    padding-top: 100%;
}
.box .inner {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
<div class="title">Remember the dot locations!</div>
<div><div class="grid">
    <div class="row">
        <div class="box"><div id="cell-1-1" class="inner"></div></div>
        <div class="box"><div id="cell-1-2"  class="inner"></div></div>
        <div class="box"><div  id="cell-1-3"   class="inner"></div></div>
        <div class="box"><div  id="cell-1-4"  class="inner"></div></div>
        <div class="box"><div  id="cell-1-5"   class="inner"></div></div>
    </div>
    <div class="row">
        <div class="box"><div  id="cell-2-1"   class="inner"></div></div>
        <div class="box"><div  id="cell-2-2"   class="inner"></div></div>
        <div class="box"><div  id="cell-2-3"   class="inner"></div></div>
        <div class="box"><div  id="cell-2-4"   class="inner"></div></div>
        <div class="box"><div  id="cell-2-5"   class="inner"></div></div>
    </div>
    <div class="row">
        <div class="box"><div  id="cell-3-1"   class="inner"></div></div>
        <div class="box"><div  id="cell-3-2"   class="inner"></div></div>
        <div class="box"><div  id="cell-3-3"   class="inner"></div></div>
        <div class="box"><div  id="cell-3-4"   class="inner"></div></div>
        <div class="box"><div  id="cell-3-5"   class="inner"></div></div>
    </div>
    <div class="row">
        <div class="box"><div  id="cell-4-1"   class="inner"></div></div>
        <div class="box"><div   id="cell-4-2"  class="inner"></div></div>
        <div class="box"><div  id="cell-4-3"   class="inner"></div></div>
        <div class="box"><div   id="cell-4-4"  class="inner"></div></div>
        <div class="box"><div  id="cell-4-5"   class="inner"></div></div>
    </div>
    <div class="row">
        <div class="box"><div  id="cell-5-1"   class="inner"></div></div>
        <div class="box"><div   id="cell-5-2"  class="inner"></div></div>
        <div class="box"><div   id="cell-5-3"  class="inner"></div></div>
        <div class="box"><div   id="cell-5-4"  class="inner"></div></div>
        <div class="box"><div   id="cell-5-5"  class="inner"></div></div>
    </div>
</div>
</div> `;
let recall = `
<style>
.box {
border-style: solid;
    border-color: #222;
    border-width: 5px;
display: flex;
    justify-content: center;
    align-items: center;
}

.dot {
    margin: auto;
    width: 50%;
    padding: 10px;
    height: 50%;
    background-color: red;
    border-radius: 50%;
    display: inline-block;
}

#custom_target {
    overflow: hidden;
    position: fixed;
      text-align: center;
    padding: 3%;
    margin: 0;
    top: 0;
    left: 0;
    width: 94%;
    height: 100vh;
    background: rgba(255,255,255,1);
}
.grid {
    margin: 0 auto;
    height: 50%;
    max-width: 60vh;
    font-size: 1rem;
    touch-action: manipulation;
}
.title{

    font-size: 3em;
      padding-top: 20px;
    padding-bottom: 50px;
}
.row {
    display: flex;
    height: 20%;
}
.box {
    color: white;
    font-weight: bold;
    flex: 1 0 auto;
    position: relative;
}
.box:after {
    content: "";
    float:left;
    display: block;
    padding-top: 100%;
}
.box .inner {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    z-index: 2000;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    margin-top: 10px;
    cursor: pointer;
}

.button1 {
    background-color: white; 
    color: black; 
    z-index: 2000;
    border: 2px solid #4CAF50;
    padding-bottom: 20px;
}
</style>
<div class="title">Where were the dots?</div>
<div><div class="grid">
<div class="row">
<div class="box"><div id="cell-1-1" class="inner"></div></div>
<div class="box"><div id="cell-1-2"  class="inner"></div></div>
<div class="box"><div  id="cell-1-3"   class="inner"></div></div>
<div class="box"><div  id="cell-1-4"  class="inner"></div></div>
<div class="box"><div  id="cell-1-5"   class="inner"></div></div>
</div>
<div class="row">
<div class="box"><div  id="cell-2-1"   class="inner"></div></div>
<div class="box"><div  id="cell-2-2"   class="inner"></div></div>
<div class="box"><div  id="cell-2-3"   class="inner"></div></div>
<div class="box"><div  id="cell-2-4"   class="inner"></div></div>
<div class="box"><div  id="cell-2-5"   class="inner"></div></div>
</div>
<div class="row">
<div class="box"><div  id="cell-3-1"   class="inner"></div></div>
<div class="box"><div  id="cell-3-2"   class="inner"></div></div>
<div class="box"><div  id="cell-3-3"   class="inner"></div></div>
<div class="box"><div  id="cell-3-4"   class="inner"></div></div>
<div class="box"><div  id="cell-3-5"   class="inner"></div></div>
</div>
<div class="row">
<div class="box"><div  id="cell-4-1"   class="inner"></div></div>
<div class="box"><div   id="cell-4-2"  class="inner"></div></div>
<div class="box"><div  id="cell-4-3"   class="inner"></div></div>
<div class="box"><div   id="cell-4-4"  class="inner"></div></div>
<div class="box"><div  id="cell-4-5"   class="inner"></div></div>
</div>
<div class="row">
<div class="box"><div  id="cell-5-1"   class="inner"></div></div>
<div class="box"><div   id="cell-5-2"  class="inner"></div></div>
<div class="box"><div   id="cell-5-3"  class="inner"></div></div>
<div class="box"><div   id="cell-5-4"  class="inner"></div></div>
<div class="box"><div   id="cell-5-5"  class="inner"></div></div>
</div>
</div><button class="button button1">Done</button>
</div> `;
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
.button {
    background-color: #4CAF50; /* Green */
    border: none;
    z-index: 2000;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    margin-top: 10px;
    cursor: pointer;
}

.button1 {
    background-color: white; 
    color: black; 
    z-index: 2000;
    border: 2px solid #4CAF50;
}
</style>

  <div class="wrapper">
<div>Each round of this task has three parts:
<ol>
  <li>You will see a grid with three red dots. Study and try to remember where the dots are.</li>
  <li>You will see a screen with letters. When you see the letters, touch all the F's.</li>
  <li>You will see a grid <b>WITHOUT</b> the red dots. Click the squares where the red dots were located on the previous grid.</li>
</ol>
 
<div>
There will be 12 rounds of this sequence. First try two practice rounds. Press any continue when you are ready to practice.</div>
<div style="text-align: center;"><button class="button button1">Continue</button></div>

</div>
 `;
let finalInstructions = `
  <style>
  .wrapper {
     text-align: center;
     font-size: 3em;
      padding: 25px;
      margin: 0;
      top: 0;
      left: 0;
      height: 100%;
      background: rgba(255,255,255,1);
  }
  .button {
      background-color: #4CAF50; /* Green */
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      margin-top: 10px;
      cursor: pointer;
      z-index: 2000;
  }
  
  .button1 {
    z-index: 2000;
      background-color: white; 
      color: black; 
      border: 2px solid #4CAF50;
  }
  </style>
  
    <div class="wrapper">
  <div>Now, the 12 rounds will start. <b>Please pay attention!</b> The next round will begin immediately after the previous round. Press continue when you are ready to begin.
 
  <div><button class="button button1">Continue</button></div>
  
  
  </div>
   `;
let overlay = `
    <style>
    #overlay {
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
        context.hideChoices();
        //  $("#custom_target").parentElement.parentElement.parentElement.children[1].style.display = 'none'
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