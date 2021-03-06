"use strict";
/**
 * Created by sdiemert on 2017-01-28.
 */

var defaultVals = ['/', "#"];

class Tape{

    constructor(){
        this.clear();
    }

    /**
     * Reads the value at the current spot on the tape.
     * @return {string}
     */
    read(){
        return this.values[this.curr];
    }

    /**
     * @param v {string}
     */
    write(v){
        this.values[this.curr] = v;

        if(this.curr === this.values.length - 1){
            this.values.push("#")
        }
    }

    left(){
        if(this.curr <= 0){
            this.curr = 0;
        }else{
            this.curr = this.curr - 1;
        }
    }

    right(){
        this.curr = this.curr + 1;

        if(this.curr >= this.values.length) {
            this.values.push("#");
        }

    }

    doAction(A){

        if(A === "L") {
            this.left();
        }else if(A == "R") {
            this.right();
        }else if(A == "H") {
            // do nothing...
        }else if(A === "#" || A === "1" || A === "0") {
            this.write(A)
        }else {
            throw new Error("Unknown action: " + A);
        }
    }

    /**
     * Resets the tape
     */
    clear(){
        this.values = [];
        for(var i = 0; i < defaultVals.length; i++){
            this.values.push(defaultVals[i]);
        }
        this.curr = 1;
    }

    reset(){
        this.curr = 1;
    }

    /**
     * @returns {string}
     */
    toString(){
        var S = this.curr +" -- ";

        for (var v in this.values){

            S += " ";

            if(v == this.curr){
                S += "[";
            }

            S += this.values[v];
            if(v == this.curr){
                S += "]";
            }

        }

        return S
    }

    setValues(T){
        this.clear();
        for(var i = 0; i < T.length; i++){
            this.values.push(T[i]);
        }
        this.curr = 1;

        this.values.push("#");
    }

}

module.exports = {Tape : Tape};