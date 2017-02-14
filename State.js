"use strict";
/**
 * Created by sdiemert on 2017-01-28.
 */

class State{

    /**
     * Creates a new state object
     *
     * @param name {string}
     * @param move {string} L or R
     * @param write {string} 1, O, or #
     * @param next {object} - the next relation, keys are symbols, values are next state id's
     */
    constructor(name, move, write, next){

        this.name = name;
        this.move = move;
        this.write = write;
        this.next = next;

    }

    /**
     * @return {string}
     */
    toString(){
        var ret = this.name +"\t"+this.write+ "\t" + this.move ;
        var syms = ["1","0","#"];
        for(var x in syms){

            var n = syms[x];

            if(!this.next[n]){
                ret += "\t(null)"
            }else{
                ret += "\t(";
                for(var s in this.next[n]){
                    ret += "(" + s + "," + this.next[n][s].toFixed(1)+"),"
                }
                ret = ret.substring(0, ret.length-1);
                ret += ")";
            }

        }

        return ret;
    }

    /**
     * Gets the next state - uses next relation
     * @param n {string} the input into the next relation
     */
    getNext(n){
        return this.selectWithProbability(this.next[n]);
    }

    selectWithProbability(R){

        // R is an object with {"s1": p1, "s2":p2,...}
        // we know that sum pi will be = 1.0

        // X is a random variable that may take
        // values s1, s2, ... si with probabilities
        // p1, p2, ..., pi

        var r = Math.random();

        var s = 0;

        for(var k in R){
            if(!R.hasOwnProperty(k)) continue;

            if(r >= s && r < s + R[k]){
                return k;
            }

            s += R[k];
        }
    }
}

module.exports = {State : State};
