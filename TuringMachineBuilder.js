"use strict";
/**
 * Created by sdiemert on 2017-01-28.
 */

var TuringMachine = require("./TuringMachine").TuringMachine;
var State = require("./State").State;

class TuringMachineBuilder{

    constructor(){
        // empty.
    }

    /**
     * Receives a JSON description of the machine
     * and then returns a new Model
     * @param M {TuringMachine} a JSON description of the turing machine
     */
    build(M){

        var T = new TuringMachine();

        for(var s in M){
            if(!M.hasOwnProperty(s)) continue;
            T.addState(new State(s, M[s]));
        }
        return T;
    }

}

module.exports = {TuringMachineBuilder : TuringMachineBuilder};