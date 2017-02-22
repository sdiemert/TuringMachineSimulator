"use strict";
/**
 * Created by sdiemert on 2017-02-12.
 */

var InputManager = require("./InputManager").InputManager;

class TextInputViewManager extends InputManager {

    /**
     * Constructor for a text input field
     */
    constructor(){
        super("json-input-wrapper");
        this.textarea = $("#json-input");


    }

    /**
     * Renders the TM to the textarea as a JSON string.
     *
     * @param M {TuringMachine}
     */
    renderModel(M){
        var s = "{\n";
        for(var k in M.states){
            s += '\t"' + k + '" : { \n' ;
            for(var c in M.states[k].trans){
                s += '\t\t"' + c +'" : ' + JSON.stringify(M.states[k].trans[c]) + ',\n'
            }
            s = s.substring(0, s.length - 2) + "\n\t},\n";
        }

        s = s.substring(0, s.length - 2);

        s += "\n}\n";

        this.textarea.val(s);
    }

    /**
     * Digests the input from the textarea (JSON) and
     * passes it into a callback funciton.
     */
    digestMachine(cb){

        console.log(this.textarea.val());

        cb(JSON.parse(this.textarea.val()));
    }

}

module.exports = {TextInputViewManager : TextInputViewManager};
