"use strict";
/**
 * Created by sdiemert on 2017-02-12.
 */

var INPUT_FIELD_IDS = ["input-id", "input-write", "input-move", "input-next-one", "input-next-zero", "input-next-null"];

class InputViewManager{

    /**
     *
     * @param onChangeCallback {function} called when the Input element is
     *  changed and needs to update the model.
     */
    constructor(){

        this.rowIds = [0];

        this.doBindings();
    }

    /**
     * Adds event bindings to the inputs.
     *  - all input rows get bindings to update the
     *    state machine properties.
     *  - remove buttons get click bindings to remove the row
     *  - the last row gets a "edited" binding - used to trigger
     *    addition of a new row.
     */
    doBindings(){

        for(var i=0; i < this.rowIds.length; i++){
            for(var j=0; j < INPUT_FIELD_IDS.length; j++){
                (function(i,j, that) {
                    $("#" + INPUT_FIELD_IDS[j] + "-" + that.rowIds[i]).blur(
                        () => that.inputHandler(that.rowIds[i], INPUT_FIELD_IDS[j]));
                })(i,j, this);
            }
        }

        var lastRow = this.rowIds[this.rowIds.length - 1];

        for(var j=0; j < INPUT_FIELD_IDS.length; j++){
            (function(that){
                $("#"+INPUT_FIELD_IDS[j]+"-"+lastRow).blur(() => that.addNewRow());
            })(this);

        }

    }

    removeBindings(){
        for(var i=0; i < this.rowIds.length; i++){
            for(var j=0; j < INPUT_FIELD_IDS.length; j++){
                $("#"+INPUT_FIELD_IDS[j]+"-"+this.rowIds[i]).off("blur");
            }
        }
    }

    addNewRow(){
        var n = this.rowIds[this.rowIds.length - 1] + 1;
        this.rowIds.push(n);

        var R = $("<tr>").attr("class", "input-row");

        for(var i = 0 ; i < INPUT_FIELD_IDS.length; i++) {
                R.append($("<td>")
                    .append($("<input>")
                        .attr("id", INPUT_FIELD_IDS[i]+"-" + n)
                        .attr("type", "text")
                    )
                );
        }

        R.append($("<button>").text("remove"));

        $("#input-table").find("tbody").append(R);

        this.removeBindings();
        this.doBindings();

    }

    /**
     * Handles a new/changed input on an input field by first validating it
     * and then propogating the change up to the model.
     *
     * @param rowId {number} the row in the table that was changed
     * @param inputName {string} the name of the field
     */
    inputHandler(rowId, inputName){

        var elemId = "#" + inputName +"-" + rowId;

        var s = $(elemId).val();

        this.constructor.removeInputError(elemId);

        this.reEvaluateErrors();
    }

    digestMachine(cb){
        for(var i=0; i < this.rowIds.length - 1; i++){
            for(var j=0; j < INPUT_FIELD_IDS.length; j++){
                var e = $("#" + INPUT_FIELD_IDS[j] + "-" + this.rowIds[i]);
                if(this.validateInput(e.val(), INPUT_FIELD_IDS[j])){
                    var state = $("#input-id-" + this.rowIds[i]).val();
                    cb(state, INPUT_FIELD_IDS[j], e.val());
                }else{

                }
            }
        }
    }

    getStateNames(){
        var S = [null];
        for(var i = 0; i < this.rowIds.length; i++){
            S.push($("#input-id-"+this.rowIds[i]).val());
        }
        return S;
    }

    validateMachine(){
        var f = true;

        for(var i=0; i < this.rowIds.length - 1; i++){
            for(var j=0; j < INPUT_FIELD_IDS.length; j++){
                var e = $("#" + INPUT_FIELD_IDS[j] + "-" + this.rowIds[i]);
                if(!this.validateInput(e.val(), INPUT_FIELD_IDS[j])){
                    f = false;
                }
            }
        }
        return f;
    }

    reEvaluateErrors(){
        for(var i=0; i < this.rowIds.length - 1; i++){
            for(var j=0; j < INPUT_FIELD_IDS.length; j++){
                var e = $("#" + INPUT_FIELD_IDS[j] + "-" + this.rowIds[i]);
                e.removeClass('input-error');
                if(!this.validateInput(e.val(), INPUT_FIELD_IDS[j])){
                    e.addClass("input-error");
                }
            }
        }
    }

    /**
     * Determines if the input is syntactically correct.
     *
     * @param s {string} the input to validate
     * @param field {string} the field the string was from.
     *
     * @return {boolean} true if OK, false otherwise.
     */
     validateInput(s, field){

        switch(field) {
            case "input-id":
                // nothing there ... any id is valid.
                break;
            case "input-write":
                if(s.toUpperCase() !== "0" && s.toUpperCase() !== "1" && s.toUpperCase() !== "#"){
                    return false;
                }
                break;
            case "input-move":
                if(s.toUpperCase() !== "L" && s.toUpperCase() !== "R" && s.toUpperCase() !== "H"){
                    return false;
                }
                break;
            case "input-next-one":
                if(this.getStateNames().indexOf(s) < 0){
                    return false;
                }
                break;
            case "input-next-zero":
                if(this.getStateNames().indexOf(s) < 0){
                    return false;
                }
                break;
            case "input-next-null":
                if(this.getStateNames().indexOf(s) < 0){
                    return false;
                }
                break;
            default:
                break;
        }

        return true;
    }

    static addInputError(id){
        $(id).addClass("input-error");
    }

    static removeInputError(id){
        $(id).removeClass("input-error");
    }

}

module.exports = {InputViewManager : InputViewManager};
