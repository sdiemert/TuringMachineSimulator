/**
 * Created by sdiemert on 2017-01-28.
 */

var TuringMachine = require("./TuringMachine").TuringMachine;
var State = require("./State").State;

var tm = new TuringMachine();

tm.addState(new State("s0", "R", {"#" : "s1", "1" : "s1", "0" : "s1"}));
tm.addState(new State("s1", "1", {"#" : "s2", "1" : "s2", "0" : "s2"}));
tm.addState(new State("s2", "R", {"#" : null, "1" : null, "0" : null}));

console.log(tm.toString());

tm.execute("s0");
