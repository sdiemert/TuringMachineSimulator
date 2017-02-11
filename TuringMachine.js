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
        this.start = null;
    }

    /**
     * Adds a new state to the turing machine.
     * @param S {State}
     *
     * @return {Boolean} - true if successfully added, false otherwise
     */
    addState(S){
        var name = S.name;
        var action = S.action;
        var relation = S.relation;

        console.log("adding state", name);

        if(!this.states[name]){
            // not already in states list
            this.states[name] = S;

            return S;
        }else{
            return null;
        }
    }

    /**
     * Removes a state from the list of states in the turing machine.
     * @param k
     */
    removeState(k){
        delete this.states[k];
    }


    execute(S, viewCallback){

        if(!S){
            return null;
        }else{

            S = this.states[S];

            this.tape.doAction(S.action);

            viewCallback(S.name);

            //console.log(this.tape.toString());

            return this.execute(S.next[this.tape.read()], viewCallback);
        }
    }

    /**
     * Allows the values on the tape to be set
     * @param pos
     * @param vals
     */
    setTape(pos, vals){
        this.tape.curr = pos;
        this.tape.values = vals;
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

    /**
     * Resets the turing machine
     */
    reset(){
        this.tape.reset();
    }

    stateAsText(){
        return this.tape.toString();
    }

    getStartState(){
        return Object.keys(this.states)[0];
    }

}

module.exports = {TuringMachine : TuringMachine};
