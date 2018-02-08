'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//  this is the Task object definiotn file for SPP v2(vue)

var sppTask = function () {
    function sppTask(name, owner, start) {
        var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var follow = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var tags = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
        var completed = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

        _classCallCheck(this, sppTask);

        // this define the task object that will carry 
        // all data and will have the required methods.
        //
        // inputs:
        // name - string for name
        // owner - string for owner
        // start - date as string DD-MM-YYYY
        // duration - duration in weeks - number
        // follow - boolean - if the task follows the task before
        // tags - string of keywords for filtering
        // completed - staus of the task - boolean
        //
        // props
        // durationTime - for display width
        // end - end timestamp

        this.name = name + ''; // Name as string
        this.owner = owner + ''; // owner as string
        this.start = moment(start, ["DD-MM-YYYY", "YYYY-MM-DD"]).valueOf();
        this.duration = parseFloat(duration);
        this.follow = follow;
        this.tags = tags + ''; // tags as string
        this.completed = completed;

        this.uid = getUID(); // getting the unique ID 

        this.updateData();
    }

    _createClass(sppTask, [{
        key: 'updateData',
        value: function updateData() {

            if (this.duration === 0) {
                // case its milestone
                this.durationTime = Number(3 * 24 * 60 * 60 * 1000); // duration in ms
            } else {
                this.durationTime = Number(this.duration * 7 * 24 * 60 * 60 * 1000); // duration in ms
            }

            this.end = this.start + Number(this.duration * 7 * 24 * 60 * 60 * 1000);

            this.startTxt = moment(this.start).format('DD-MM-YYYY');
            this.endTxt = moment(this.end).format('DD-MM-YYYY');
        }
    }, {
        key: 'extend',
        value: function extend(delta) {
            // this method extends the duration of the task
            // by delat in weeks
            if (delta) {

                this.duration += Number(delta);

                if (this.duration < 0) {
                    this.duration = 0;
                }

                this.updateData();
            }
        }
    }, {
        key: 'shift',
        value: function shift(delta) {
            //  this method shift the tasks start time by
            // delta in weeks

            if (delta) {
                this.start += Number(delta) * 7 * 24 * 60 * 60 * 1000;
                this.updateData();
            }
        }
    }, {
        key: 'clone',
        value: function clone() {
            // this method return new task object as a cone copy of itself

            return new sppTask(this.name, this.owner, moment(this.start).format('DD-MM-YYYY'), this.duration, this.follow, this.tags, false);
        }
    }, {
        key: 'findIndex',
        value: function findIndex(theArray) {
            // this method returns the index of this task
            var index = theArray.indexOf(this);
            if (index === -1) {
                return false;
            } else {
                return index;
            }
        }
    }, {
        key: 'getWidth',
        value: function getWidth() {
            // this will return the width of task depending of its duration as a string with %

            return Math.round(10000 * (this.durationTime / (globalData.maxTime - globalData.minTime))) / 100 + '%';
        }
    }, {
        key: 'getLeft',
        value: function getLeft() {
            // this will return the left of task depending of its duration as a string with %

            return Math.round(10000 * ((this.start - globalData.minTime) / (globalData.maxTime - globalData.minTime))) / 100 + '%';
        }
    }]);

    return sppTask;
}();