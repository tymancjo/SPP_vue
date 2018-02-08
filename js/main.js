// General section of the app	

	var globalData = { // global object to carry all data tht may be saved
		tasks: [],
		markedFW: [],
		
		minTime: 0,
		maxTime: 0,
		inPixels: false,
		fontSize: 14,
	};

	var dynamicData = {  // some dymaic data to be available for all objects. But not intended to be saved.
		selected: null,
		mouseX: 0,
		mouseY: 0,
		dragging: null,
	};



// VUE related stuff
// components definitions

const listItem = {
	template: 	`
				<div class="task-row row">
					<div class="before-task" 
					v-bind:style="{ 'width': task.getLeft() }"></div>
					
					<div class="task row" 
					v-bind:style="{ 'width': task.getWidth() }"
					v-on:mousemove="showInfo(task)"
					v-on:mouseleave="showInfo(null)">
					<span>
						{{index}} {{ task.name }}  
					</span>
					
					</div>
				</div>
				`,

	props: ['task',
			'index'],
	data() {
		return {
			dynamic: dynamicData
		};
	},
	methods: {
		showInfo(item) {
			if(!this.dynamic.dragging){
			this.dynamic.selected = item;
			}
		}
	}
};

const itemInfo = {
	template: 	`
		<div class="modal info-box"
		v-bind:class =" { 'invisible' : !item}"
		v-bind:style=" {'left': data.mouseX + 10 + 'px', 'top': data.mouseY + 10 + 'px'} ">
		<div v-if="item">
		<h1> {{ item.name }} </h1>
		{{item.findIndex(globaldata.tasks)}}
		<h3> {{ item.owner }} </h3>		
		<h3> Start: {{ item.startTxt }} </h3>		
		<h3> End: {{ item.endTxt }} </h3>
		<h3> Duration: {{ item.duration }}wk </h3>
		</div>
		</div>
				`,
	props: ['item'],
	data() {
		return {
			data: dynamicData,
			globaldata: globalData
		};
	}
};


// Main Vue App

app = new Vue({
	el: '#vueApp',
	data(){
		return {
			data: globalData,
			dynamic: dynamicData
		};
	},

	components: {
		'item-li': 		listItem,
		'item-info': 	itemInfo
	},

	methods: {
		deleteItem: function(index){

			this.data.myList.splice(index,1);
		},

		addRandom() {
			this.data.myList.push(Math.random());	
		}
	}
});


