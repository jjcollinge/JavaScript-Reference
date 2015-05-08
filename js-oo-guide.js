/*  
	Guide to Object-Oriented JavaScript
	-----------------------------------
	Credit: https://www.youtube.com/watch?v=PMfcsYzj-9M
*/

//----------------------------
//Object Fundamentals
//----------------------------

//###### Primitive Types ######
//Undefined		|	undefined
//Null			|	null
//Boolean		|	true
//String		|	"foo"
//Number		|	3.14159
//Object		|	{ bar: "baz" }

//###### Special Objects ######
//Function 		|	function qux() {...}
//Array			|	["hoge", 42]
//RegExp		|	/qiyo/

//Objects in JavaScript are collections of key-value pairs.
//Any key can be used as long as it is a string, each key
//can be associated with any value of any type.
//var myObject = {
//	a: undefined,
//	b: null,
//	c: true,
//	d: "foo",
//	e: 3.14159
//};

//Note:
//Primitives are passed by value.
//Objects are passed by reference.

//----------------------------
//Function & Methods
//----------------------------

//Functions are just regular JavaScript objects.
//When you define a function, JavaScript creates an
//object with 3 default properties: name, length and 
//prototype.

//Methods are just functions defined within an object.
//This means that the 'this' keyword is available, which
//references the encapsulating object.

//Caution: the 'this' keyword concerns the encapsulating
//object and not the function itself.

//'using strict' mode will force 'this' to be undefined
//when it is in the global scope.

//#### Useful Methods ######

//The call() method allows you to set the context ('this' value)
//and pass the parameters in explicity to a function.
//func.call(this, arg1, arg2);

//The apply() method allows you to set the context ('this' value)
//and pass in parameters as an array of a function.
//func.apply(this, [arg1, arg2]);

//The bind() same as call() except it returns the new bound function
//instead of invoking the function.
//var func2 = func.bind(this, arg1, arg2);

//----------------------------
//Prototypal Inheritance
//----------------------------

var parent = {
	get: function fn() {
		return this.val;
	},
	val: 42
}

var child = Object.create(parent);
child.val = 3.14159;

//JavaScript will recursively work up the prototype chain
//looking for a matching function or property.

//Every object you create has the prototype Object.prototype set by default.
//Every function you create has the prototype Function.prototypeset by default.

//----------------------------
//Polymorphism & Method Overriding
//----------------------------

var answer = {
	get: function fn1() {
		return this.val;
	},
	val: 42
};

var firmAnswer = Object.create(answer);
firmAnswer.get = function fn2() {
	//Set the context of the function get() to this object.
	return answer.get.call(this) + "!!";	
};

//----------------------------
//Classes & Instantiations
//----------------------------

var AnswerPrototype = {
	constructor: function fn0(value) {
		this._val = value;	
	},
	get: function fn1() {
		return this._val;
	}
};

//#### Instances ######

var lifeAnswer = Object.create(AnswerPrototype);
lifeAnswer.constrcutor(42);
lifeAnswer.get();	//42

var dessertAnswer = Object.create(AnswerPrototype);
dessertAnswer.constrcutor(3.14159);
dessertAnswer.get(); //3.14159

//#### Subclasses ######

var FirmishAnswer = Object.create(AnswerPrototype);
FirmishAnswer.get = function fn2() {
	return AnswerPrototype.get.call(this) + "!";
};

var magicAnswer = Object.create(FirmishAnswer);
magicAnswer.constructor(7);
magicAnswer.get() //7!

//----------------------------
//The Classical Model
//----------------------------

function fun() {
	//Creating this function, will create a corresponding fun.prototype object
	//The fun.prototype has a constructor property which points back to this
	//function.	
};

//This will also create a Answer.prototype which constructor
//property will point back to this object.
function Answer(value) {
	this._val = value;
};

//Automatically generated...
//function Answer.prototype() {
//	this.constructor = Answer;
//};

Answer.prototype.get = function fn1() {
	return this._val;	
};

// new instance's prototype property will point to Answer.prototype
var lifeAnswer = new Answer(42);
lifeAnswer.get();	//42

var dessertAnswer = new Answer(3.14159);
dessertAnswer.get();	//3.14159

//Sub-classes
function FirmAnswer(value) {
	Answer.call(this, value);
};

//This is not needed, we need the prototype to point to the Answer.prototype
//function FirmAnswer.prototype() {
//	this.constructor = FirmAnswer;
//}

//Create a new object which links to Answer.prototype
FirmAnswer.prototype = Object.create(Answer.prototype);
//Set the constructor of that prototype to point back to this object
FirmAnswer.prototype.constructor = FirmAnswer;

//Override methods
FirmAnswer.prototype.get = function fn2() {
	return Answer.prototype.get.call(this) + "!!";
};

//Create instance
var luckyAnswer = new FirmAnswer(7);
luckyAnswer.get(); //7!!