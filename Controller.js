"use strict";
/**
 * Created by sdiemert on 2017-02-10.
 */

class Controller{

    constructor(){
        /** @type {ViewManager} */
        this.view = null;

        /** @type {TuringMachine} */
        this.model = null;
    }

    execute(){

        this.view.reset();
        this.model.reset();
        this.model.execute(this.model.getStartState(), (n) => this._modelCallback(n));

    }


    _modelCallback(s){
        this.view.addTextOutput(s + " " + this.model.stateAsText());
    }

    reset(){
        this.view.reset();
        this.model.reset();
    }

}

module.exports = {Controller : Controller};
