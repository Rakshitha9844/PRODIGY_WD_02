let startTime = 0; // Start time in milliseconds
let elapsedTime = 0; // Elapsed time in milliseconds
let timerInterval = null; // Reference to the interval
let running = false; // Stopwatch running state
let laps = []; // Store lap times

// Update the time display every 10ms
function updateTimeDisplay() {
    if (running) {
        elapsedTime = Date.now() - startTime; // Calculate elapsed time
    }

    const time = new Date(elapsedTime);
    const hours = String(time.getUTCHours()).padStart(2, '0');
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(time.getMilliseconds()).padStart(3, '0');

    document.getElementById("timeDisplay").textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Start or stop the stopwatch
function startStop() {
    if (running) {
        // Pause the stopwatch
        clearInterval(timerInterval);
        document.getElementById("startStopButton").textContent = "Start";
    } else {
        // Start the stopwatch
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimeDisplay, 10);
        document.getElementById("startStopButton").textContent = "Stop";
    }
    running = !running;
}

// Reset the stopwatch
function reset() {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    document.getElementById("timeDisplay").textContent = "00:00:00.000";
    document.getElementById("startStopButton").textContent = "Start";
    laps = [];
    document.getElementById("lapList").innerHTML = '';
}

// Record a lap time
function recordLap() {
    if (running) {
        const lapTime = new Date(elapsedTime);
        const hours = String(lapTime.getUTCHours()).padStart(2, '0');
        const minutes = String(lapTime.getUTCMinutes()).padStart(2, '0');
        const seconds = String(lapTime.getUTCSeconds()).padStart(2, '0');
        const milliseconds = String(lapTime.getMilliseconds()).padStart(3, '0');
        const lapDisplay = `${hours}:${minutes}:${seconds}.${milliseconds}`;

        laps.push(lapDisplay);
        updateLapList();
    }
}

// Update the lap list in the UI
function updateLapList() {
    const lapList = document.getElementById("lapList");
    lapList.innerHTML = ''; // Clear the list
    laps.forEach((lap, index) => {
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${index + 1}: ${lap}`;
        lapList.appendChild(lapItem);
    });
}
