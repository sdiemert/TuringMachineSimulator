"use strict";
/**
 * Created by sdiemert on 2017-02-10.
 */

var TuringMachine = require("./TuringMachine").TuringMachine;
var State = require("./State").State;
var Controller = require("./Controller").Controller;
var ViewManager = require("./ViewManager").ViewManager;

var tm = new TuringMachine();

var s0 = tm.addState(new State("s0", "R", "1", {"#" : {"s1" : 1.0}, "1" : {"s1" : 1.0}, "0" : {"s1" : 1.0}}));
var s1 = tm.addState(new State("s1", "R", "1",{"#" : {"s2" : 1.0}, "1" : {"s2" : 1.0}, "0" : {"s2" : 1.0}}));
var s2 = tm.addState(new State("s2", "H", "1",{"#" : null, "1" : null, "0" : null}));

var C = new Controller();

var V = new ViewManager(C);

C.model = tm;
C.view = V;

C.showModel();


