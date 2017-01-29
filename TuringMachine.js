"use strict";
/**
 * Created by sdiemert on 2017-01-28.
 */

var State = require("./State").State;
var Tape = require("./Tape").Tape;

class TuringMachine{

    constructor(){
        this.states = {};
        this.tape = new Tape(); // TODO: make a new tape object here.
    }

    /**
     * Adds a new state to the turing machine.
     * @param S {State}
     *
     * @return {Boolean} - true if successfully added, false otherwise
     */
    addState(S){
        if(!this.states[S.name]){
            // not already in states list
            this.states[S.name] = S;
            return true;
        }else{
            return false;
        }
    }

    /**
     * Removes a state from the list of states in the turing machine.
     * @param k
     */
    removeState(k){
        delete this.states[k];
    }


    execute(S){

        console.log(this.tape.toString());

        if(!S){
            return null;
        }else{

            S = this.states[S];

            this.tape.doAction(S.action);

            return this.execute(S.next[this.tape.read()]);
        }
    }

    /**
     * returns a string representation of the turing machine.
     * @return {string}
     */
    toString(){
        var ret = "";

        for(var s in this.states){
            ret += this.states[s].toString() + " ";
        }

        ret += " tape: " + this.tape.toString();

        return ret;

    }

}

module.exports = {TuringMachine : TuringMachine};
