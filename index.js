"use strict";
/**
 * Created by sdiemert on 2017-02-10.
 */

var TuringMachine = require("./TuringMachine").TuringMachine;
var State = require("./State").State;
var Controller = require("./Controller").Controller;
var ViewManager = require("./ViewManager").ViewManager;

var tm = new TuringMachine();

/*
var s0 = tm.addState(new State("s0", "R", {"#" : "s1", "1" : "s1", "0" : "s1"}));
var s1 = tm.addState(new State("s1", "1", {"#" : "s2", "1" : "s2", "0" : "s2"}));
var s2 = tm.addState(new State("s2", "R", {"#" : null, "1" : null, "0" : null}));
*/

var C = new Controller();

var V = new ViewManager(C);

C.model = tm;
C.view = V;


