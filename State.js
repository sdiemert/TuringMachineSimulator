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
        var ret = "{" + this.name +" -- "+this.move+ "," + this.write+ " : " ;

        for(var n in this.next){
            ret += n + ":" +this.next[n]+ ", ";
        }

        ret += "}";

        return ret;
    }

}

module.exports = {State : State};
