"use strict";
/**
 * Created by sdiemert on 2017-02-10.
 */

var InputViewManager = require("./InputViewManager").InputViewManager;

class ViewManager{

    constructor(control){
        this.control = control;

        // id's in view
        this.textOut = $("#text-output");
        this.executeButton = $("#execute-button");

        this.doBindings();

        this.inputManger = new InputViewManager((x,y,z) => this.inputUpdateHandler(x,y,z));
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
    }

    /**
     * Handler fired when the "execute" button is clicked.
     * Triggers reset and then execution.
     *
     * @param e {Event}
     */
    executeButtonHandler(e){

        console.log("Execute Clicked!");

        this.control.reset();
        this.control.execute();
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

}

module.exports = {ViewManager : ViewManager};