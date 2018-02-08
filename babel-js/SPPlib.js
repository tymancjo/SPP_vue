'use strict';

// SPP library functions and general methods.

function getUID() {
    // generating unique id code
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
        return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
    });
}

function getTasks(inputData) {
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '\t';

    // this function analyze the delivered text data to generate tasks from it

    inputData = inputData.split('\n'); // separating by new lines

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = inputData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var line = _step.value;
            // trying with the separator
            var task = line.split(separator);

            if (task.length === 1) {
                // trying with the comma
                task = line.split(',');
            }

            if (task.length === 1) {
                // trying with the semicolon
                task = line.split(';');
            }

            if (task.length > 1 && task[2]) {
                // if there are some tasks and task have name
                if (task[2] !== '_fwx_') {
                    // if this not the line about FWmarks

                    var startDate = task[4].trim();

                    var duration = Number(task[5] * 7 * 24 * 60 * 60 * 1000);
                    var follow = void 0;

                    if (task[3].trim() === 'y') {
                        follow = true;
                    } else {
                        follow = false;
                    }

                    // generting new task object
                    var zadanie = new sppTask(task[2].trim(), // name
                    task[1].trim(), // owner
                    startDate, // start
                    Number(task[5]), // duration
                    follow, // follow
                    task[0], // tags
                    false // completed
                    );

                    if (zadanie.start && zadanie.start < globalData.minTime || globalData.minTime === 0) {
                        globalData.minTime = zadanie.start;
                    } // capturing the global min time

                    if (zadanie.end && zadanie.end > globalData.maxTime) {
                        globalData.maxTime = zadanie.end;
                    } // capturing the global endTime

                    globalData.tasks.push(zadanie);
                    // console.log(zadanie.nazwa);
                } else {
                    // fwx takinc care
                    globalData.markedFW = task[3].split('#');
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}