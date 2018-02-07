// General section of the app	

	var globalData = { // global object to carry all data
		tasks: [],
		markedFW: [],
		myList: ['adam','bartek','rodżer','stefan'],
		selected: null,
		minTime: 0,
		maxTime: 0,
		inPixels: false,
		fontSize: 14,
	};

// VUE related stuff
// components definitions

const listItem = {
	template: 	`<div style="background-color: blue; color: white"
				v-on:mousemove="showInfo(task)"
				v-on:mouseleave="showInfo(null)">

				{{index}} {{ task.name }} 
				
				<button>Hover For Info</button>	
				</div>
				`,

	props: ['task',
			'index'],
	data() {
		return {
			dane: globalData
		};
	},
	methods: {
		showInfo(item) {
			this.dane.selected = item;
		}
	}
};

const itemInfo = {
	template: 	`<div v-if="item">
				<h1> {{ item.name }} </h1>
				</div>`,
	props: ['item'],
};


// Main Vue App

app = new Vue({
	el: '#vueApp',
	data(){
		return {
			data: globalData
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


