// SPP library functions and general methods.

function getMousePos(event) {
	// method to grab the global mouse position.
	dynamicData.mouseX = event.pageX;
	dynamicData.mouseY = event.pageY;

}

function getUID() {
	// generating unique id code
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}


function getTasks(inputData, separator = '\t') {
    // this function analyze the delivered text data to generate tasks from it

    inputData = inputData.split('\n');  // separating by new lines

    for(let line of inputData) { // trying with the separator
       	let task = line.split(separator);

        if (task.length === 1) { // trying with the comma
            task = line.split(',');
        }

        if (task.length === 1) { // trying with the semicolon
            task = line.split(';');
        }


        if (task.length > 1 && task[2]) { // if there are some tasks and task have name
            if (task[2] !== '_fwx_') { // if this not the line about FWmarks
                
                let startDate = task[4].trim();

                let duration = Number(task[5] * 7 * 24 * 60 * 60 * 1000);
                let follow;

                if (task[3].trim() === 'y') {
                    follow = true;
                } else {
                    follow = false;
                }




                // generting new task object
                let zadanie = new sppTask(
                	task[2].trim(), // name
                	task[1].trim(), // owner
                	startDate, // start
                	Number(task[5]), // duration
                	follow, // follow
                	task[0], // tags
                	false // completed
                	);


                if ((zadanie.start && zadanie.start < globalData.minTime) || globalData.minTime === 0) { globalData.minTime = zadanie.start; } // capturing the global min time
                
                if (zadanie.end && zadanie.end > globalData.maxTime) { globalData.maxTime = zadanie.end; } // capturing the global endTime

                globalData.tasks.push(zadanie);
                // console.log(zadanie.nazwa);
            } else { // fwx takinc care
                globalData.markedFW = task[3].split('#');
            }
        }
    }
}