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
		edit: null,
		mouseX: 0,
		mouseY: 0,
		dragging: null,
		gantt: true,
	};





// VUE related stuff
// components definitions


const listItem = {
// the Gantt chart line display 
	template: 	`
				<div class="task-row row">
					<div class="before-task" 
					v-bind:style="{ 'width': task.getLeft() }"></div>
					
					<div class="task row" 
					v-bind:style="{ 'width': task.getWidth() }"
					v-bind:class =" { 'green' : task.follow}"
					v-on:mousemove="showInfo(task)"
					v-on:mouseleave="showInfo(null)"
					v-on:click="editTask(task)">
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
		},

		editTask(task){
			this.dynamic.edit = task;
		},
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
			globaldata: globalData,
		};
	}
};

const editBox ={
	template: `
		<div class="modal info-box">

			<h3> Here is the task babe</h3>
			<h4>{{ internaltask.name }}</h4>
			<input v-model="internaltask.name" placeholder="internaltask.name">

		<div id="edit-buttons" class="row">
			<button v-on:click="shiftTask(-1);">[<]</button>
			<button v-on:click="shiftTask(1);">[>]</button>

			<button v-on:click="extendTask(-1);">[-]</button>
			<button v-on:click="extendTask(1);">[+]</button>
			
			<button v-bind:class =" { 'red' : task.follow}" v-on:click="attachTask();">[#]</button>
		</div>

		<div id="edit-buttons" class="row">
			<button v-on:click="applyAction();">Apply</button>
			<button v-on:click="cancelAction();">Cancel</button>
		</div>
		</div>		
	`,

	props: ['task'],

	data(){
		return {
			global: globalData,
			dynamic: dynamicData,
		};
	},

	computed: {
    // a computed value of internal task clone object
			internaltask: function() {
				return this.task.clone();
			},
    },

	methods: {
		cancelAction: function(){
			this.dynamic.edit = null;
		},
		applyAction: function(){
			this.task.updateFrom(this.internaltask);

		},

		shiftTask(delta){
			this.task.shift(delta);
			updateTasks();
		},

		extendTask(delta){
			this.task.extend(delta);
			updateTasks();
		},

		attachTask(){
			this.task.attach();
			updateTasks();
		},
	}


};

const editInput = {
// List in form of editable Table set

	template: `
			<div class="list-line row bottom-border">
				<div v-if="task != dynamic.edit" class="row">
					<span v-if="task.follow" class="list-input one-column">
					</span>
					<span v-bind:class =" { 'red' : task.follow, 
					'green' : !task.follow}"
					class="list-input one-column">#:{{ index }} 
					</span>
					<span v-if="!task.follow" class="list-input one-column">
					</span>
					<span class="list-input name">Name: {{ task.name }} 
					</span>
					<span class="list-input">
						Owner: {{ task.owner }}
					</span>
					
					<span class="list-input">
						Tags: {{ task.tags }} 
					</span>

					<div class="list-input">
						Start: {{ task.startTxt }} 
					</div>
					<div class="list-input">
						End: {{ task.endTxt }} 
					</div>
					<div class="list-input">
						Duration: {{ task.duration }} 
					</div>
					<div class="list-input">
						<button v-on:click="editTask(task)">Edit</button> 
					</div>
				</div>

				<div v-if="task == dynamic.edit"  class="row green">
					<span v-if="task.follow" class="list-input one-column">
					</span>
					<span v-bind:class =" { 'red' : task.follow, 
					'green' : !task.follow}"
					class="list-input one-column">#:{{ index }} 
					</span>
					<span v-if="!task.follow" class="list-input one-column">
					</span>
					<span class="list-input">Name: <input v-model="task.name" placeholder="task.name"> 
					</span>
					<span class="list-input">
						Owner: <input v-model="task.owner" placeholder="task.owner"> 
					</span>
					
					<span class="list-input">
						Tags: <input v-model="task.tags" placeholder="task.tags"> 
					</span>

					<div class="list-input">
						Start: {{ task.startTxt }} 
					</div>
					<div class="list-input">
						End: {{ task.endTxt }} 
					</div>
					<div class="list-input">
						Duration: {{ task.duration }} 
					</div>
					<div class="list-input">
						<button v-on:click="editTask(null)">Close</button> 
					</div>
				</div>
			</div>
	`,

	props: ['task',
			'index'],

	data(){
		return {
			global: globalData,
			dynamic: dynamicData,
		};
	},

	methods: {
		editTask(task){
			this.dynamic.edit = task;
		},
	},

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
		'item-info': 	itemInfo,
		'item-edit':  	editInput,
		'edit-box':  	editBox,
	},

	methods: {
		deleteItem: function(index){

			this.data.myList.splice(index,1);
		},

		
	}
});

// Temporarly hardcoded data fro development
lista = `0, none, MCC VBB tool, , 2018-01-22, 0, 0 
0, none, Tool trials, y, 2018-01-22, 2, 0 
0, none, Tool Update, y, 2018-02-05, 2, 0 
0, none, Final Tool Placement, y, 2018-02-19, 1, 0 
0, none, first batch, y, 2018-02-26, 1, 0 
0, none, Parts Available, y, 2018-03-05, 0, 0 
0, none, Thermoset Tools, , 2018-03-12, 0, 0 
0, none, Tool trials, y, 2018-03-12, 4, 0 
0, none, Tool Update, y, 2018-04-09, 2, 0 
0, none, Final Tool Placement, y, 2018-04-23, 1, 0 
0, none, first batch, y, 2018-04-30, 1, 0 
0, none, Thermosets In Hand, y, 2018-05-07, 0, 0 
0, none, Shutters tools, , 2018-05-14, 0, 0 
0, none, Tool trials, y, 2018-05-14, 4, 0 
0, none, Tool Update, y, 2018-06-11, 2, 0 
0, none, Final Tool Placement, y, 2018-06-25, 1, 0 
0, none, first batch, y, 2018-07-02, 1, 0 
0, none, Covers tools, , 2018-06-11, 0, 0 
0, none, Tool trials, y, 2018-06-11, 4, 0 
0, none, Tool Update, y, 2018-07-09, 2, 0 
0, none, Final Tool Placement, y, 2018-07-23, 1, 0 
0, none, first batch, y, 2018-07-30, 1, 0 
`;

getTasks(lista);
