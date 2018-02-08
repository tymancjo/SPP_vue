'use strict';

// General section of the app	

var globalData = { // global object to carry all data
	tasks: [],
	markedFW: [],
	myList: ['adam', 'bartek', 'rodżer', 'stefan'],
	selected: null,
	minTime: 0,
	maxTime: 0,
	inPixels: false,
	fontSize: 14
};

// VUE related stuff
// components definitions

var listItem = {
	template: '\n\t\t\t\t<div class="task-row row">\n\t\t\t\t\t<div class="before-task" \n\t\t\t\t\tv-bind:style="{ \'width\': task.getLeft() }"></div>\n\t\t\t\t\t\n\t\t\t\t\t<div class="task row" \n\t\t\t\t\tv-bind:style="{ \'width\': task.getWidth() }"\n\t\t\t\t\tv-on:mousemove="showInfo(task)"\n\t\t\t\t\tv-on:mouseleave="showInfo(null)">\n\t\t\t\t\t<span>\n\t\t\t\t\t\t{{index}} {{ task.name }}  \n\t\t\t\t\t</span>\n\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t',

	props: ['task', 'index'],
	data: function data() {
		return {
			dane: globalData
		};
	},

	methods: {
		showInfo: function showInfo(item) {
			this.dane.selected = item;
		}
	}
};

var itemInfo = {
	template: '<div v-if="item">\n\t\t\t\t<h1> {{ item.name }} </h1>\n\t\t\t\t{{item.findIndex(data.tasks)}}\n\t\t\t\t<h3> {{ item.owner }} </h3>\t\t\n\t\t\t\t<h3> Start: {{ item.startTxt }} </h3>\t\t\n\t\t\t\t<h3> End: {{ item.endTxt }} </h3>\n\t\t\t\t<h3> Duration: {{ item.duration }}wk </h3>\n\n\t\t\t\t</div>',
	props: ['item'],
	data: function data() {
		return {
			data: globalData
		};
	}
};

// Main Vue App

app = new Vue({
	el: '#vueApp',
	data: function data() {
		return {
			data: globalData
		};
	},


	components: {
		'item-li': listItem,
		'item-info': itemInfo
	},

	methods: {
		deleteItem: function deleteItem(index) {
			this.data.myList.splice(index, 1);
		},

		addRandom: function addRandom() {
			this.data.myList.push(Math.random());
		}
	}
});