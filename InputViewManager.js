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

        for(var i=0; i < this.rowIds.length-1; i++){
            for(var j=0; j < INPUT_FIELD_IDS.length; j++){
                (function(i,j, that) {
                    $("#" + INPUT_FIELD_IDS[j] + "-" + that.rowIds[i]).blur(
                        () => that.inputHandler(that.rowIds[i], INPUT_FIELD_IDS[j]));
                })(i,j, this);
            }

            (function (x, that){

                console.log("bindng click", x);

                $("#input-row-" + that.rowIds[x]+" button").click(() => that.removeHandler(that.rowIds[x]))
            })(i, this);

        }

        var lastRow = this.rowIds[this.rowIds.length - 1];

        for(var j=0; j < INPUT_FIELD_IDS.length; j++){
            (function(that){
                $("#"+INPUT_FIELD_IDS[j]+"-"+lastRow).blur(() => that.addNewRow());
            })(this);
        }

    }

    removeBindings(){
        for(var i=0; i < this.rowIds.length - 1; i++){
            for(var j=0; j < INPUT_FIELD_IDS.length; j++){
                $("#"+INPUT_FIELD_IDS[j]+"-"+this.rowIds[i]).off("blur");
            }
            $("#input-row-"+this.rowIds[i]+ " button").off("click");
        }
    }

    addNewRow(){
        var n = null;

        if(this.rowIds.length < 1){
            n = 0;
        }else{
            n = this.rowIds[this.rowIds.length - 1] + 1;
        }


        this.rowIds.push(n);

        var R = $("<tr>").attr("class", "input-row").attr("id", "input-row-"+n);

        for(var i = 0 ; i < INPUT_FIELD_IDS.length; i++) {
                R.append($("<td>")
                    .append($("<input>")
                        .attr("id", INPUT_FIELD_IDS[i]+"-" + n)
                        .attr("type", "text")
                    )
                );
        }

        R.append($("<td>").append($("<button>").text("remove")));

        $("#input-table-body").append(R);

        $("#input-next-null-"+n).attr("class", "next");
        $("#input-next-one-"+n).attr("class", "next");
        $("#input-next-zero-"+n).attr("class", "next");

        this.removeBindings();
        this.doBindings();

        return n;

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
                var x = this.parseInput(e.val(), INPUT_FIELD_IDS[j]);
                if(x){
                    var state = $("#input-id-" + this.rowIds[i]).val();
                    cb(state, INPUT_FIELD_IDS[j], x);
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
                if(!this.parseInput(e.val(), INPUT_FIELD_IDS[j])){
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
                if(!this.parseInput(e.val(), INPUT_FIELD_IDS[j])){
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
     * @return {object} the parsed input, string or object depending on field type.
     */
     parseInput(s, field){

        switch(field) {
            case "input-id":
                return s;
                break;
            case "input-write":
                if(s.toUpperCase() !== "0" && s.toUpperCase() !== "1" && s.toUpperCase() !== "#"){
                    return null;
                }else{
                    return s;
                }
                break;
            case "input-move":
                if(s.toUpperCase() !== "L" && s.toUpperCase() !== "R" && s.toUpperCase() !== "H"){
                    return null;
                }else{
                    return s;
                }
                break;
            case "input-next-one":
                return this.parseNextInput(s);
                break;
            case "input-next-zero":
                return this.parseNextInput(s);
                break;
            case "input-next-null":
                return this.parseNextInput(s);
                break;
            default:
                return s;
                break;
        }
    }

    /**
     * Input is a string that must be parsed, will be of one of the following forms:
     *  - "sx" - referring to a transition to state sx with 1.0 probability.
     *  - "s1(n1), s2(n2), ... - n1,n2,... referring the probability of each transition
     *                           sum n_i = 1.0, unlisted states are 0.0 probability.
     *  @param S {string} containing the string to parse.
     *  @return {object} state ids are keys, values are numerical probabilities, null if parse error.
     */
    parseNextInput(S){

        var A = $.trim(S).split(",");

        var D = {};

        var m = null, s = null, w = null;

        if(A.length === 1){

            // matches exactly a state name, nothing else.
            m = (new RegExp("^([a-zA-z0-9]+)$")).exec($.trim(A[0]));

            if(m){

                if(this.getStateNames().indexOf(m[1]) < 0){
                    return null;
                }else{
                    D[m[1]] = 1.0;
                }
            }else{
                // possibly a number was provided
                m = (new RegExp("([a-zA-z0-9]+)\\(([0,1]\\.[0-9]+)\\)")).exec($.trim(A[0]));

                if(m){
                    s = m[1]; // matched state name
                    w = parseFloat(m[2]); // matched probability

                    if(w <= 0 || w > 1.0 || this.getStateNames().indexOf(s) < 0) {
                        return null;
                    }else{
                        D[s] = w;
                    }
                }else{
                    return null
                }
            }

        }else{
            for(var a = 0; a < A.length; a++){
                // this will match and extract the state names and numbers
                m = (new RegExp("([a-zA-z0-9]+)\\(([0,1]\\.[0-9]+)\\)")).exec($.trim(A[a]));

                if(!m) return null;
                else{
                    s = m[1]; // matched state name
                    w = parseFloat(m[2]); // matched probability

                    if(w <= 0 || w > 1.0 || this.getStateNames().indexOf(s) < 0) {
                        return null;
                    }else{
                        D[s] = w;
                    }
                }
            }
        }

        var t = Object.values(D).reduce((acc, val)=> acc+val);
        if(t !== 1.0){
            return null;
        }else{
            return D;
        }
    }

    removeHandler(rowId){
        var i = this.rowIds.indexOf(rowId);

        console.log("remove", rowId, i);
        if(i > -1){
            this.rowIds.splice(i, 1);
            $("#input-row-"+rowId).remove();
        }
    }

    static addInputError(id){
        $(id).addClass("input-error");
    }

    static removeInputError(id){
        $(id).removeClass("input-error");
    }

    nextAsString(N){
        var s = "";
        for(var k in N){
            if(!N.hasOwnProperty(k)) continue;
            s += k + "(" + N[k].toFixed(1)+"),";
        }
        return s.substring(0, s.length-1);
    }

    /**
     *
     * @param n {number}
     * @param S {State}
     */
    addNewState(n, S){
        $("#input-id-"+n).val(S.name);
        $("#input-write-"+n).val(S.write);
        $("#input-move-"+n).val(S.move);
        $("#input-next-one-"+n).val(this.nextAsString(S.next["1"]));
        $("#input-next-zero-"+n).val(this.nextAsString(S.next["0"]));
        $("#input-next-null-"+n).val(this.nextAsString(S.next["#"]));
    }

    renderModel(M){

        $("#input-table-body").empty();

        this.rowIds = [];
        var n = null;

        for(var i in M.states){
            n = this.addNewRow();

            this.addNewState(n, M.states[i]);
        }

        this.reEvaluateErrors();
    }

}

module.exports = {InputViewManager : InputViewManager};
