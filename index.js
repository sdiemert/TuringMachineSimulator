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


tm.start = "ss";

var C = new Controller();

var V = new ViewManager(C);

C.model = tm;
C.view = V;

C.showModel();


