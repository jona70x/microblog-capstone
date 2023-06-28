
var _content = [ 
	"thoughts", 
	"feelings", 
	"ideas", 
	"questions",
    "favorite places"
];

var _part = 0;
var _part_index = 0;
var _interval_val;
var _element = document.querySelector("#text");
var _cursor = document.querySelector("#cursor");


function Type() { 
	var text =  _content[_part].substring(0, _part_index + 1);
	_element.innerHTML = text;
	_part_index++;

	if(text === _content[_part]) {
		_cursor.style.display = 'none';
		clearInterval(_interval_val);
		setTimeout(function() {
			_interval_val = setInterval(Delete, 50);
		}, 1000);
	}
}

function Delete() {
	var text =  _content[_part].substring(0, _part_index - 1);
	_element.innerHTML = text;
	_part_index--;
	if(text === '') {
		clearInterval(_interval_val);
		if(_part == (_content.length - 1))
			_part = 0;
		else
			_part++;
		
		_part_index = 0;
		setTimeout(function() {
			_cursor.style.display = 'inline-block';
			_interval_val = setInterval(Type, 100);
		}, 200);
	}
}

_interval_val = setInterval(Type, 100);