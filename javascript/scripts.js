$(function () {
    let clock = new Clock();
    clock.displayCurrentTime();
    clock.displaySessionTime();
    clock.displayBreakTime();
    clock.displaySessionCount();

    // Event Listeners
    $(".time-session .plus").click(function(){
        clock.changeSessionTime("add");
    });
    $(".time-session .minus").click(function(){
        clock.changeSessionTime("subtract");
    });
    $(".time-break .plus").click(function(){
        clock.changeBreakTime("add");
    });
    $(".time-break .minus").click(function(){
        clock.changeBreakTime("subtract");
    });

});

function Clock() {
    var startTime = 1500,
        currentTime = 1500,
        sessionTime = 1500,
        breakTime = 300,
        sessionCount = 0,
        mode = "Session";
        active = false;
    // Function to convert a number of seconds into a formatted time string
    function formatTime(secs) {

        var result = "";
        let seconds = secs % 60;
        let minutes = parseInt(secs / 60) % 60;
        let hours = parseInt(secs / 3600);

        function addLeadingZeroes(time) {
            if (time < 10) {
                return "0" + time;
            } else {
                return time;
            }
        }
        // If we have a value for hours greater than 0 we need to show it on our time output.
        if (hours > 0) {
            result += (hours + ":");
        }

        result += (addLeadingZeroes(minutes) + ":" + addLeadingZeroes(seconds));
        // Build up the result string with minutes and seconds
        return result;
    }
    this.displayCurrentTime = function () {
        $(".main-display").text(formatTime(currentTime));
    }
    //Function to display the session time
    this.displaySessionTime = function(){
        $(".time-session-display").text(parseInt(sessionTime / 60) + " min");
    }
    // Function to display the break time
    this.displayBreakTime = function(){
        $(".time-break-display").text(parseInt(breakTime / 60) + " min");
    }
    // Function to control the session count text
    this.displaySessionCount = function(){
        // If our session count is 0, we should show the text Pomodoro Clock
        if (sessionCount === 0){
            $(".session-count").html("<h2>Pomodoro Clock</h2>")
        } else if (mode === "Session"){
            // If our session count is greater than 0 and we're in a session, we should show which session we're in.
            $(".session-count").html("<h2>Session " + sessionCount + "</h2>");
        } else if (mode === "Break"){
            $(".session-count").html("<h2>Break!</h2>");
        }
        
        // If we're in a break we should show the text Break.
    }
    // CHANGE THE FUNCTIONS
    // Function to add or subtract from the session time whenever the plus or minus buttons are interacted with.
    this.changeSessionTime = function(command){
        if (!active){
            if (command === 'add'){
                sessionTime += 60;
            } else if (sessionTime > 60){
                sessionTime -= 60;
            }
            currentTime = sessionTime;
            startTime = sessionTime;
            this.displaySessionTime();
            this.displayCurrentTime();
        }
    }
    this.changeBreakTime = function(command){
        if (!active){
            if(command === "add"){
                breakTime += 60;
            } else if (breakTime > 60){
                breakTime -= 60;
            }
            this.displayBreakTime();
        }
    }
}