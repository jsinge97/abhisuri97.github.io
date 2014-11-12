/*global $, jQuery, parley, removeNextSpeaker, timereg*/
/*jslint devel:true browser:true plusplus:false*/ (function () {
    'use strict';
    var timing = {
        timeFormatErrorMsg: "Please enter a valid time. Format is 00:00:00, 00:00, or the exact number of seconds.",
        existingTimers: {},
        prependZero: function (i) {
            if (i < 10) {
                return "0" + i;
            }
            else {
                return i;
            }
        },
        /*format is hh:mm:ss*/
        toSeconds: function (textString) {
            var hours, mins, secs, arr = textString.split(":");
            switch (arr.length) { //this could be replaced by iterating over the array backwards, because that's how the fields are entered
            case 3:
                hours = parseInt(arr[0], 10);
                mins = parseInt(arr[1], 10);
                secs = parseInt(arr[2], 10);
                break;
            case 2:
                hours = 0;
                mins = parseInt(arr[0], 10);
                secs = parseInt(arr[1], 10);
                break;
            case 1:
                hours = 0;
                mins = 0;
                secs = parseInt(arr[0], 10);
                break;
            }
            /*console.log(hours + " " + mins + " " + secs + " " + parseInt((hours * 60 * 60) + (mins * 60) + secs, 10));*/
            return parseInt((hours * 60 * 60) + (mins * 60) + secs, 10);
        },
        formatSeconds: function (seconds) {
            var minutes, hours, secondsRemainder;
            minutes = (seconds - (seconds % 60)) / 60; // remove the remainder
            hours = (minutes - (minutes % 60)) / 60;
            minutes = minutes % 60;
            secondsRemainder = seconds - (hours * 60 * 60) - (minutes * 60);
            /*console.log("seconds: " + seconds +
                        " hours: " + hours +
                        " minutes: " + minutes +
                        " remainder: " + secondsRemainder);*/
            return timing.prependZero(hours) + ":" + timing.prependZero(minutes) + ":" + timing.prependZero(secondsRemainder);
        },
        //returns the timer associated with that id, if none are associated creates a new timer
        getTimer: function (e) {
            var callingDiv = e.target.parentNode.id;
            console.log(callingDiv + " called getTimer");
            if (timing.existingTimers.hasOwnProperty(callingDiv)) {
                console.log("getTimer was called with " + callingDiv + " and is returning with " + timing.existingTimers[callingDiv].elementid);
                return timing.existingTimers[callingDiv];
            }
            else {
                timing.existingTimers[callingDiv] = new timing.Timer(callingDiv);
                console.log("getTimer was called with " + callingDiv + " and is returning with " + timing.existingTimers[callingDiv].elementid);
                return timing.existingTimers[callingDiv];
            }
        },
        Timer: function (id) {
            this.elementid = id; //id of the parent div
            this.ticking = false;
            this.ticker = undefined; //timeout
            this.timerPosition = 0; //number of seconds the timer should display
            this.timeLeft = 0; //number of seconds the timer should run, resets to this value after timeout
            this.endTimer = function (remove) {
                console.log(this.elementid + "timer is ended");
                clearInterval(this.ticker);
                //TODO: flash the button
                //set the button to zero
                if (remove) {
                    window.removeNextSpeaker();
                }
                this.setText("00:00:00");
                this.timerPosition = 0;
            };
            this.startTimer = function (e, clockNum) {
                this.ticking = true;
                window.currentTimer = this;
                console.log("clock is starting, time left: " + this.timeLeft + " position: " + this.timerPosition);
                if (this.timeLeft === 0) {
                    console.log(id + " timer never started");
                    this.endTimer(false);
                    return;
                }
                var tick = function (id) {
                    var t = timing.existingTimers[id];
                    console.log("tick");
                    if (t.timerPosition > 0) {
                        t.timerPosition = t.timerPosition - 1;
                        console.log("time left: " + t.timeLeft + " position: " + t.timerPosition);
                        //decrement the visual timer
                        t.setText(timing.formatSeconds(t.timerPosition));
                    }
                    else {
                        if (t.elementid == 'm') {
                            t.endTimer(true);
                        }
                        t.endTimer(false);
                        console.log("time's up!");
                    }
                };
                this.ticker = window.setInterval(tick, 1000, this.elementid);
                window.currentTimer = null;
            };
            this.stopTimer = function () {
                this.ticking = false;
                clearInterval(this.ticker);
            };
            this.setText = function (message) {
                $("#time-" + id).html(message);
            };
            return this;
        },
        toggleTimer: function (e) {
            var t = timing.getTimer(e);
            if (t.ticking) {
                console.log("stopping timer " + t.elementid);
                t.stopTimer();
            }
            else {
                console.log("starting timer " + t.elementid);
                t.startTimer();
            }
        },
        getInputBox: function (e) {
            var inputid = e.target.parentNode.id;
            switch (inputid) {
            case 'l':
                return $("#timebox-l");
            case 'r':
                return $("#timebox-r");
            case 'm':
                return $("#timebox-m");
            }
        },
        setTimer: function (e) {
            console.log("settin time!");
            var t = timing.getTimer(e),
                input = timing.getInputBox(e).val();
            t.stopTimer();
            console.log(input);
            if (input == "") {
                t.timerPosition = t.timeLeft;
                t.setText(timing.formatSeconds(t.timerPosition));
            }
            else if (timereg.test(input)) {
                t.timeLeft = timing.toSeconds(input);
                t.timerPosition = t.timeLeft;
                t.setText(timing.formatSeconds(t.timerPosition));
                timing.getInputBox(e).val('');
            }
            else {
                alert(timing.timeFormatErrorMsg); //TODO: add a visual bell
            }
            console.log("timeLeft: " + t.timeLeft);
        }
    };
    window.timing = timing;
    $(".timeinput").on("keydown", function (e) {
        // Enter is pressed
        if (e.keyCode === 13) {
            timing.setTimer(e);
        }
    });
}());