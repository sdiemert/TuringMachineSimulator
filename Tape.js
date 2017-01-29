"use strict";
/**
 * Created by sdiemert on 2017-01-28.
 */

class Tape{

    constructor(){
        this.values = ["/", "#"];
        this.curr = 1;
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
        }else if(A === "#" || A === "1" || A === "0") {
            this.write(A)
        }else {
            throw new Error("Unknown action: " + A);
        }
    }

    /**
     * @returns {string}
     */
    toString(){
        var S = this.curr +" -- ";

        for (var v in this.values){

            S += " " + this.values[v];

        }

        return S
    }

}

module.exports = {Tape : Tape};