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
        this.rows = [];
        this.body = $("#input-table-body");
        this.addRowButton = $("#add-row-button");


        // bindings

        this.addRowButton.on("click", () => this._newRowHandler());
    }

    addNewRow(name, v1, v0, vNull){

        var n = null;

        if(this.rows.length === 0){
            n = 0;
        }else{
            n = this.rows[this.rows.length - 1] + 1;
        }

        this.rows.push(n);

        var newRow = this._makeInputRow(n);

        newRow.append(this._makeStateName(n, name));
        newRow.append(this._makeNext("one", n, v1));
        newRow.append(this._makeNext("zero", n, v0));
        newRow.append(this._makeNext("null", n, vNull));
        newRow.append(this._makeRemoveButton(n));

        this.body.append(newRow);

    }

    digestMachine(cb){

        var obj = {};
        var v1, v0, vNull;

        for(var i = 0; i < this.rows.length; i++) {

            try{
                v1 = JSON.parse(this._readNext("one", this.rows[i]));
            }catch(e){
                obj = null;
                this._showError("one", this.rows[i]);
                break;
            }

            try{
                v0 = JSON.parse(this._readNext("zero", this.rows[i]));
            }catch(e){
                obj = null;
                this._showError("zero", this.rows[i]);
                break;
            }

            try{
                vNull = JSON.parse(this._readNext("null", this.rows[i]));
            }catch(e){
                obj = null;
                this._showError("null", this.rows[i]);
                break;
            }

            obj[this._readName(this.rows[i])] = {
                "1": v1,
                "0": v0,
                "#": vNull,
            }
        }

        if(obj === null){
            throw new Error("Invalid Machine Entry");
        }else{
            cb(obj);
        }


    }

    /**
     *
     * @param M {TuringMachine}
     */
    renderModel(M){

        this.body.empty();

        for(var s in M.states){
            this.renderState(M.states[s]);
        }

    }

    /**
     *
     * @param S {State}
     */
    renderState(S){
        this.addNewRow(
            S.name,
            JSON.stringify(S.trans["1"]),
            JSON.stringify(S.trans["0"]),
            JSON.stringify(S.trans["#"])
        );
    }


    // --------- PRIVATE WORKER METHODS ------------------

    _makeInputRow(n){
        return $("<tr>").attr("id", "input-row-"+n).attr("class", "input-row");
    }

    _makeStateName(n, name){
        return $("<td>").append(
            $("<input>").attr("type", "text").attr("id", "input-id-"+n).val(name ? name : "")
        );
    }

    _makeNext(s, n, v){
        return $("<td>")
            .attr("class", "next")
            .append(
                $("<input>")
                    .attr("type", "text")
                    .attr("id", "input-"+s+"-"+n)
                    .attr("class", "next")
                    .val((v ? v : ""))
        );
    }

    _makeRemoveButton(n){
        return $("<td>").append(
            $("<button>").append("Remove").on("click", () => this._removeHandler(n))
        )
    }

    _removeHandler(n){
        $("#input-row-"+n).remove();
        this.rows.splice(this.rows.indexOf(n), 1);
    }

    _newRowHandler(){
        this.addNewRow(null, null, null, null)
    }

    _readNext(s,n){
        return $("#input-"+s+"-"+n).val();
    }

    _readName(n){
        return $("#input-id-"+n).val();
    }

    _showError(s, n){

        console.log("Parse error on table input ", s, n);

        $("#input-"+s+"-"+n).addClass("input-error");
    }

    _removeError(s, n){
        $("#input-"+s+"-"+n).removeClass("input-error");
    }
}

module.exports = {TableInputViewManager : TableInputViewManager};
