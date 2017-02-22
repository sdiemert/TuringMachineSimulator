"use strict";
/**
 * Created by sdiemert on 2017-01-28.
 */

class State{

    /**
     * Creates a new state object
     *
     * @param name {string}
     * @param trans {object} - the transition relation {read : [(prob, write, move, next)]}
     */
    constructor(name, trans){
        this.name = name;
        this.trans = trans;
    }

    /**
     * @return {string}
     */
    toString(){
       return "State.toString() - FIXME";
    }

    /**
     * Gets the next state - uses next relation
     * @param read {string} the input into the next relation
     *
     * @return {Array} [prob, write, move, next_state]
     */
    getNext(read){
        return this.selectWithProbability(this.trans[read]);
    }

    selectWithProbability(R){

        // R is an array of items [(p, w, m, s), ....]
        // we know that sum of all p's will be 1.0

        // X is a random variable that may take
        // values s1, s2, ... si with probabilities
        // p1, p2, ..., pi

        var r = Math.random();

        var s = 0;

        for(var i = 0; i < R.length; i++){
           if(r >= s && r < s + R[i][0]){
                return R[i]; // return the relation tuple
            }

            s += R[i][0];
        }
    }
}

module.exports = {State : State};
