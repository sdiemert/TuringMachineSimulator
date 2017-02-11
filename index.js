"use strict";
/**
 * Created by sdiemert on 2017-02-10.
 */

var TuringMachine = require("./TuringMachine").TuringMachine;
var State = require("./State").State;

var tm = new TuringMachine();

var s0 = tm.addState(new State("s0", "R", {"#" : "s1", "1" : "s1", "0" : "s1"}));
var s1 = tm.addState(new State("s1", "1", {"#" : "s2", "1" : "s2", "0" : "s2"}));
var s2 = tm.addState(new State("s2", "R", {"#" : null, "1" : null, "0" : null}));

console.log(tm.toString());

function cb(s, T){
    // s is the current state, T the machine
    $("#text-output").append(s + " " +T.tape.toString() + "\n");
}

// Event Handlers - TODO: move to view manager

function executeButton(){

    clearSim();

    tm.execute('s0', cb);
}

function clearSim(){

    tm.reset();

    clearTextOut();

}

function clearTextOut(){

    $("#text-output").text("");
}


// UI Event Bindings - TODO: move these to a view manager at some point

$("#execute-button").click(executeButton);


