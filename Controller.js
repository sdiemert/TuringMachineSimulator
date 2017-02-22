"use strict";
/**
 * Created by sdiemert on 2017-02-10.
 */

var TuringMachineBuilder = require("./TuringMachineBuilder").TuringMachineBuilder;

class Controller{

    constructor(){
        /** @type {ViewManager} */
        this.view = null;

        /** @type {TuringMachine} */
        this.model = null;

        this.modelBuilder = new TuringMachineBuilder();
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

        this.model.execute((n, cb) => this._modelCallback(n, cb));

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
    _modelCallback(s, cb){
        this.view.addTextOutput(s + "\t" + this.model.stateAsText());
        this.view.showModel(this.model);

        setTimeout(function(){cb();}, 400);
    }

    updateModel(M){

        console.log("Building new model", M);

        this.model = this.modelBuilder.build(M);
    }

    updateTape(t){
        this.model.tape.setValues(t);
    }

    showModel(){
        this.view.showModel(this.model);
    }

}

module.exports = {Controller : Controller};
