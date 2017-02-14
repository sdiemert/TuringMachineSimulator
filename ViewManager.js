"use strict";
/**
 * Created by sdiemert on 2017-02-10.
 */

var InputViewManager = require("./InputViewManager").InputViewManager;
var TextInputViewManager = require("./TextInputViewManager").TextInputViewManager;

class ViewManager{

    constructor(control){
        this.control = control;

        // id's in view
        this.textOut = $("#text-output");
        this.executeButton = $("#execute-button");
        this.tapeInput = $("#tape-input");
        this.startInput = $("#start-state");

        this.doBindings();

        this.inputManger = new InputViewManager();
    }


    /**
     * Clear's outputs and resets inputs to match
     * model from controller.
     */
    reset(){
        this.clearTextOut();
    }

    /**
     * Clears textarea that contains the textual
     * ouput from the TM execution.
     */
    clearTextOut(){
        this.textOut.text("");
    }

    // ----------- Event Handler Functions -------------

    /**
     * Sets up event bindings, associate actions
     * on DOM elements with handler functions.
     */
    doBindings(){
        this.executeButton.click(() => this.executeButtonHandler());
        this.tapeInput.blur(() => this.tapeInputHandler());
    }

    /**
     * Handler fired when the "execute" button is clicked.
     * Triggers reset and then execution.
     *
     * @param e {Event}
     */
    executeButtonHandler(e){

        console.log("Execute Clicked!");

        this.inputManger.digestMachine((x,y,z) => this.inputUpdateHandler(x,y,z));

        this.control.reset();
        this.control.execute(this.startInput.val());
    }

    tapeInputHandler(){

        var v = this.tapeInput.val();

        this.tapeInput.removeClass("input-error");

        if(this.validTape(v)) {
            this.control.updateTape(v);
        }else{
            this.tapeInput.addClass("input-error");
        }
    }

    /**
     * Adds a string to the text output panel in the DOM.
     * @param s {string}
     */
    addTextOutput(s){
        this.textOut.append(s + "\n");
    }

    inputUpdateHandler(state, input, value){
        this.control.updateModel(state, input, value);
    }


    validTape(s){
        for(var i = 0 ; i < s.length; i++){
            if(s[i] !== "1" && s[i] !== "0" && s[i] !== "#"){
                return false;
            }
        }
        return true;
    }

    showModel(M){
        this.inputManger.renderModel(M);
        this.startInput.val(M.start);
    }

    getTape(){
        var t = this.tapeInput.val();
        if(this.validTape(t)){
            return t;
        }else{
            return null;
        }
    }

}

module.exports = {ViewManager : ViewManager};