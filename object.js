var car = {
	name : "sonata",
	ph : "500ph",
	start : function () {
		console.log("engine is starting");
	},
	stop : function () {
		console.log("engine is stoped");
	}
}

var person = {
    name : "gwanwoo",
    age : 32
}

console.log(car.name);
car.start();