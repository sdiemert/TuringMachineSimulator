"use strict";
/**
 * Created by sdiemert on 2017-01-28.
 */

var State = require("./State").State;
var Tape = require("./Tape").Tape;

class TuringMachine{

    constructor(){
        this.states = {};
        this.tape = new Tape();
        this.start = null;
        this.curr = null;
    }

    /**
     * Adds a new state to the turing machine.
     * @param S {State}
     *
     * @return {Boolean} - true if successfully added, false otherwise
     */
    addState(S){
        var name = S.name;

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

    execute(vCb){
        this._execute(this.start, vCb);
    }

    _execute(S, viewCallback){

        var next = null;

        if(!S){
            return null;
        }else{

            S = this.states[S];

            this.curr = S;

            next = S.getNext(this.tape.read());

            this.tape.doAction(next[1]);

            var that = this;

            viewCallback(S.name, function(){

                if(next[2] === "H"){
                    return;
                }else{
                    that.tape.doAction(next[2]);
                }

                return that._execute(next[3], viewCallback);

            });
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

    clear(){
        this.tape.clear();
        this.tape.reset();
    }

    stateAsText(){
        return this.tape.toString();
    }

    getStartState(){
        return Object.keys(this.states)[0];
    }

    updateState(state, field, value){

        console.log(this.states);
        console.log(state, field, value);

        if(field === "input-id"){
            this.addState(new State(value, "","",{}));
        }else if(field === "input-write"){
            this.states[state].write = value;
        }else if(field === "input-move"){
            this.states[state].move = value;
        }else if(field === "input-next-one"){
            this.states[state].next["1"] = value;
        }else if(field === "input-next-zero"){
            this.states[state].next["0"] = value;
        }else if(field === "input-next-null"){
            this.states[state].next["#"] = value;
        }
    }

}

module.exports = {TuringMachine : TuringMachine};
