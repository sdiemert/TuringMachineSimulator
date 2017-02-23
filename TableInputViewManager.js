"use strict";
/**
 * Created by sdiemert on 2017-02-12.
 */

var InputViewManager = require("./InputManager").InputManager;

var INPUT_FIELD_IDS = ["input-id", "input-write", "input-move", "input-next-one", "input-next-zero", "input-next-null"];

class TableInputViewManager extends InputViewManager{
    /**
     * Basic constructor
     */
    constructor(){
        super("table-input-wrapper");
        this.rows = [0];
        this.body = $("#input-table-body");
    }

    addNewRow(){

        var n = this.rows[this.rows.length - 1] + 1;

        this.rows.push(n);




    }


    digestMachine(cb){

    }

    renderModel(M){

    }

}

module.exports = {TableInputViewManager : TableInputViewManager};
