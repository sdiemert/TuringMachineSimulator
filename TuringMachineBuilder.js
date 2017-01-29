"use strict";
/**
 * Created by sdiemert on 2017-01-28.
 */

var TuringMachine = require("./TuringMachine").TuringMachine;
var fs = require("fs");

function parse(f){

    var S = fs.readFileSync(f, 'utf-8');

    S = S.toUpperCase(); // first cast everything to upper case to avoid confusion.

    S = S.split("\n");

    var tm = new TuringMachine();

    // Read the tape information
    var tape_vals = [];
    var tape_curr = -1;
    var s = S[0].split(" ");
    for(var c in s[0]){
        tape_vals.push(s[0][c]);
    }
    tape_curr = parseInt(s[1]);

    tm.setTape(tape_curr, tape_vals);

    // Read the state information

    // read the top row
    s = 2;
    var row = null;
    var relation = {};
    var itemCount = 0;
    var sname = null;
    var saction = null;
    while(S[s] != "----"){
        row = S[s].split(" ");
        console.log(S[s]);
        relation = {};
        itemCount = 0;
        sname = null;
        saction = null;
        for(var r in row){
            if(row[r] !== " " && row[r]){

                var x = row[r].trim().trimLeft();

                if(itemCount === 0){
                    sname = x;
                }else if(itemCount === 1){
                    saction = x;
                }else if (itemCount === 2){
                    if(x === "-"){
                        relation['#'] = null;
                    }else{
                        relation['#'] = x;
                    }

                }else if (itemCount === 3){
                    if(x === "-"){
                        relation['1'] = null;
                    }else{
                        relation['1'] = x;
                    }
                }else if (itemCount === 4){
                    if(x === "-"){
                        relation['0'] = null;
                    }else{
                        relation['0'] = x;
                    }
                }else {
                    console.log("Error - unable to parse: " + row);
                }
                itemCount++;
            }
        }
        tm.addState(sname, saction, relation);

        console.log(tm.toString());
        s++;
    }

    tm.start = S[s+1].trim().trimLeft();

    return tm;

}


module.exports = {parse : parse};
