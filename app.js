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
	};


	return {
		addItem: function(type, desc, val) {
			var newItem,ID;

			if(data.allItems[type].length>0){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}			

			if (type === 'inc') {
				newItem = new Income(ID, desc, val);
			} else if(type === 'exp') {
				newItem = new Expense(ID, desc, val);
			}

			data.allItems[type].push(newItem);

			return newItem;
		},

		testing: function() {
			console.log(data);
		}
	}

})();




var UIController = (function(){

	var DOMselector = {
		type: '.add__type',
		desc: '.add__description',
		value: '.add__value',
		add_btn: '.add__btn',
		expenses_list: '.expenses__list',
		income_list: '.income__list',
	};

	return {
		getInput: function() {
			return {
			inputType: document.querySelector(DOMselector.type).value,
			inputDescription: document.querySelector(DOMselector.desc).value,
			inputValue: document.querySelector(DOMselector.value).value,
			};
		},

		addItemList: function(obj, type) {
			var html,newhtml,element;

			if (type === 'inc') {
				element = DOMselector.income_list;
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if(type === 'exp') {
				element = DOMselector.expenses_list;
				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			newhtml = html.replace('%id%', obj.id);
			newhtml = newhtml.replace('%description%', obj.description);
			newhtml = newhtml.replace('%value%', obj.value);

			document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);
		},

		clearFields: function() {
			var fields, fieldArr;

			fields = document.querySelectorAll(DOMselector.desc + ',' + DOMselector.value);

			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach( function(current, index, array) {
				current.value = "";
			});

			fieldsArr[0].focus();

//			console.log("dataValue : " + fieldsArr);
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
//		console.log(input);
		var newItem = budgetCtrl.addItem(input.inputType, input.inputDescription, input.inputValue);

		uiCtrl.addItemList(newItem, input.inputType);

		uiCtrl.clearFields();
	}

	return {
		init: function() {
			eventListner();
		}

	}

	

})(budgetController, UIController);


controller.init();