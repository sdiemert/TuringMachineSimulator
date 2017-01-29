"use strict";
/**
 * Created by sdiemert on 2017-01-28.
 */

class State{

    /**
     * Creates a new state object
     *
     * @param name {string}
     * @param action {string}
     * @param next {object} - the next relation, keys are symbols, values are next state id's
     */
    constructor(name, action, next){

        if(!name || !action || !next){
            throw Error("Invalid name, action, or next relation for state");
        }

        this.name = name;
        this.action = action;
        this.next = next;

    }

    /**
     * @return {string}
     */
    toString(){
        var ret = "{" + this.name +" -- "+this.action+ " : " ;

        for(var n in this.next){
            ret += n + ":" +this.next[n]+ ", ";
        }

        ret += "}";

        return ret;
    }

}

module.exports = {State : State};
