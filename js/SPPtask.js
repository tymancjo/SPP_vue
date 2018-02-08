//  this is the Task object definiotn file for SPP v2(vue)

class sppTask {
    constructor(name, owner, start, duration=1, follow = false, tags = '', completed = false) {

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
        this.tags = tags+''; // tags as string
        this.completed = completed;

        this.uid = getUID(); // getting the unique ID 

        this.updateData();
    }

    updateData(){
    	
    	if(this.duration === 0){ // case its milestone
    	this.durationTime = Number( 3 * 24 * 60 * 60 * 1000); // duration in ms
    	} else {
    	this.durationTime = Number( this.duration * 7 * 24 * 60 * 60 * 1000); // duration in ms
    	}

    	this.end = this.start + Number( this.duration * 7 * 24 * 60 * 60 * 1000);

    	this.startTxt = moment(this.start).format('DD-MM-YYYY');
    	this.endTxt = moment(this.end).format('DD-MM-YYYY');
    }

    extend(delta){
    	// this method extends the duration of the task
    	// by delat in weeks
    	if (delta){
    		
    		this.duration += Number(delta);
    		
    		if (this.duration < 0){
    			this.duration = 0;
    		}

    		this.updateData();
    	}
    }

    shift(delta){
    	//  this method shift the tasks start time by
    	// delta in weeks

    	if(delta){
    		this.start += Number(delta) * 7 * 24 * 60 * 60 * 1000;
    		this.updateData();
    	}
    }

    clone(){
    	// this method return new task object as a cone copy of itself

    	return new sppTask(this.name, this.owner, moment(this.start).format('DD-MM-YYYY'), this.duration, this.follow, this.tags, false);


    }

    findIndex(theArray){
    	// this method returns the index of this task
    	let index = theArray.indexOf(this);
    	if(index === -1){
    		return false;
    	} else {
    		return index;
    	}
    }

    getWidth(){
    	// this will return the width of task depending of its duration as a string with %

    	return (Math.round(10000*(this.durationTime / (globalData.maxTime - globalData.minTime)))/100) + '%';

    }

    getLeft(){
    	// this will return the left of task depending of its duration as a string with %

    	return (Math.round(10000*((this.start - globalData.minTime) / (globalData.maxTime - globalData.minTime)))/100) + '%';

    }
}