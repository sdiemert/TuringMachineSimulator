"use strict";
/**
 * Created by sdiemert on 2017-02-10.
 */

var TuringMachine = require("./TuringMachine").TuringMachine;
var State = require("./State").State;
var Controller = require("./Controller").Controller;
var ViewManager = require("./ViewManager").ViewManager;

var tm = new TuringMachine();

// the current program determines the parity of a binary number
// that is given on the tape - assumes tape is initially of form: # X X ... X X # 0 #


var ss = tm.addState(new State("ss", {"#" : [[1.0, "#", "R", "ss"]], "1" : [[1.0, "1", "R", "ss"]], "0" : [[1.0, "0", "R", "sh"]]}));

var sh = tm.addState(new State("sh", {"#" : [[1.0, "#", "H", "sh"]], "1" : [[1.0, "#", "H", "sh"]], "0" : [[1.0, "#", "H", "sh"]]}));



/*var ss = tm.addState(new State("ss", "R", "#", {"#" : {"sh" : 1.0}, "1" : {"s1" : 1.0}, "0" : {"s0" : 1.0}}));

var s0 = tm.addState(new State("s0", "R", "0", {"#" : {"se0" : 1.0}, "1" : {"s1" : 1.0}, "0" : {"s0" : 1.0}}));
var s1 = tm.addState(new State("s1", "R", "0", {"#" : {"se1" : 1.0}, "1" : {"s0" : 1.0}, "0" : {"s1" : 1.0}}));

var se0 = tm.addState(new State("se0", "R", "#", {"#" : {"sh0" : 1.0}, "1" : {"sh0" : 1.0}, "0" : {"sh0" : 1.0}}));
var se1 = tm.addState(new State("se1", "R", "#", {"#" : {"sh1" : 1.0}, "1" : {"sh1" : 1.0}, "0" : {"sh1" : 1.0}}));

var sh0 = tm.addState(new State("sh0", "R", "0", {"#" : {"sh" : 1.0}, "1" : {"sh" : 1.0}, "0" : {"sh" : 1.0}}));
var sh1 = tm.addState(new State("sh1", "R", "1", {"#" : {"sh" : 1.0}, "1" : {"sh" : 1.0}, "0" : {"sh" : 1.0}}));

var sh = tm.addState(new State("sh", "H", "#", {"#" : null, "1" : null, "0" : null}));

*/

tm.start = "ss";

var C = new Controller();

var V = new ViewManager(C);

C.model = tm;
C.view = V;

C.showModel();


