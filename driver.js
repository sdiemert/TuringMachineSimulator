"use strict";

/**
 * Created by sdiemert on 2017-02-22.
 */

var fs = require("fs");
var TuringMachineBuilder = require("./TuringMachineBuilder").TuringMachineBuilder;
var Controller = require("./Controller").Controller;

// var Ts = JSON.parse(fs.readFileSync("./fixtures/parity-prob.json", "utf-8"));

var Ts = JSON.parse(fs.readFileSync("./fixtures/zero-prob.json", "utf-8"));

var builder = new TuringMachineBuilder();

function trial(input, output){
    var Tm = builder.build(Ts);
    Tm.start = "ss";
    Tm.tape.setValues(input);
    Tm.execute((x, cb) => cb());
    return parseInt(Tm.tape.values[output]);
}


function trial2(input, resultCheck){

    var Tm = builder.build(Ts);
    Tm.start = "ss";
    Tm.tape.setValues(input);
    Tm.execute((x, cb) => cb());


    return resultCheck(Tm);
}



function experiment(){
    var input = "0000#";
    var output = input.length + 3;

    var numTrials = 1000000;

    var sum = 0;

    for(var i = 0; i < numTrials; i++){
        sum += trial2(input, function(Tm){
            return Tm.curr.name === "s1" ? 0 : 1
        });
    }

    console.log(sum, sum/numTrials);
}

experiment();



