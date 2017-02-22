"use strict";
/**
 * Created by sdiemert on 2017-02-10.
 */

var TableInputViewManager = require("./TableInputViewManager").TableInputViewManager;
var TextInputViewManager = require("./TextInputViewManager").TextInputViewManager;
var SimViewManager = require("./SimViewManager").SimViewManager;

class ViewManager{

    constructor(control){
        this.control = control;

        // id's in view
        this.textOut = $("#text-output");
        this.executeButton = $("#execute-button");
        this.tapeInput = $("#tape-input");
        this.startInput = $("#start-state");

        this.doBindings();

        this.tableManager     = new TableInputViewManager();
        this.simManager       = new SimViewManager("sim-wrapper");
        this.textInputManager = new TextInputViewManager();

        this.tableManager.hide();
        this.textInputManager.show();
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

        if(this.tableManager.isVisible()){
            this.tableManager.digestMachine((M) => this.inputUpdateHandler(M));
        }else{
            this.textInputManager.digestMachine((M) => this.inputUpdateHandler(M));
        }

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

    inputUpdateHandler(M){
        this.control.updateModel(M);
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
        //this.tableManager.renderModel(M);
        this.simManager.renderTape(M.tape);
        this.startInput.val(M.start);
        this.textInputManager.renderModel(M);
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