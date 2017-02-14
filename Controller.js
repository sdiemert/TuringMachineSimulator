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

    /**
     * Executes the model and causes changes, when the model
     * requests, to be reflected in the view.
     */
    execute(ss){

        this.view.reset();
        this.model.reset();

        this.view.showModel(this.model);

        this.updateTape(this.view.getTape());

        this.model.start = ss;

        this.model.execute((n) => this._modelCallback(n));

    }


    /**
     * Halts the execution of the model and puts
     * everything back in the initial state so that it
     * can run again - does not effect any of the model's
     * actual "programming".
     */
    reset(){
        this.view.reset();
        this.model.reset();
    }


    /**
     * Callback used to reflect changes in the view
     * after each "step" the model takes.
     *
     * @param s
     * @private
     */
    _modelCallback(s){
        this.view.addTextOutput(s + "\t" + this.model.stateAsText());
    }

    updateModel(state, input, value){
        this.model.updateState(state, input, value);
    }

    updateTape(t){
        this.model.tape.setValues(t);
    }

    showModel(){
        this.view.showModel(this.model);
    }

}

module.exports = {Controller : Controller};
