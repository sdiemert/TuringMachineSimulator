"use strict";
/**
 * Created by sdiemert on 2017-02-12.
 */

class TextInputViewManager{

    /**
     *
     * @param onChangeCallback {function} called when the Input element is
     *  changed and needs to update the model.
     */
    constructor(){
        this.textarea = $("#text-input");
        this.wrapper = $("#text-input-wrapper");
    }

    show(){
        this.wrapper.show();
    }

    hide(){
        this.wrapper.hide();
    }

    /**
     * Renders the TM to the text display using the toString for each
     * state in the TM.
     *
     * @param M {TuringMachine}
     */
    renderModel(M){
        this.textarea.empty();
        var s = "";
        for(var i in M.states){
            if(!M.states.hasOwnProperty(i)) continue;
            console.log(M.states[i]);
            s += M.states[i].toString() + "\n";
        }
        this.textarea.append(s);
    }

    /**
     *
     */
    digestMachine(cb){

    }

}

module.exports = {TextInputViewManager : TextInputViewManager};
