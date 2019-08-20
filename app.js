var budgetController = (function(){

	var Expense = function(id,description,value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function(id,description,value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		}
	}

})();


var UIController = (function(){

	var DOMselector = {
		type: '.add__type',
		desc: '.add__description',
		value: '.add__value',
		add_btn: '.add__btn'
	};

	return {
		getInput: function() {
			return {
			inputType: document.querySelector(DOMselector.type).value,
			inputDescription: document.querySelector(DOMselector.desc).value,
			inputValue: document.querySelector(DOMselector.value).value,
			};
		},

		getSelector: function() {
			return DOMselector;
		}
	};

})();


var controller = (function(budgetCtrl, uiCtrl) {

	var eventListner = function() {
		var DOM = uiCtrl.getSelector();

		document.querySelector(DOM.add_btn).addEventListener('click', function() {
			ctrlAddItem();
		});

		document.addEventListener('keypress', (event) => {
			if (event.keyCode === 13) {
				ctrlAddItem();
			}
		});

	}

	var ctrlAddItem = function() {
		var input = uiCtrl.getInput();
		console.log(input);
	}

	return {
		init: function() {
			eventListner();
		}

	}

	

})(budgetController, UIController);


controller.init();