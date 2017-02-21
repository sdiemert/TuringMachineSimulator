"use strict";
/**
 * Created by sdiemert on 2017-02-20.
 */

var CELL_WIDTH = 30;
var CELL_HEIGHT = 40;
var CELL_TOP_MARGIN = 35;
var CELL_LEFT_MARGIN = 2;

class SimViewManager{

    constructor(parentId){
        this.snap = Snap("#sim-svg");

        this.width = $("#sim-svg").width();
    }

    initDOM(){
        // TODO: use or delete me.
    }

    /**
     *
     * @param T {Tape}
     */
    renderTape(T){
        this.snap.clear();

        var start = 0;
        var end = 1;
        var curr = T.curr;

        var maxCells = this.width / (CELL_WIDTH + 2*CELL_LEFT_MARGIN);

        while((curr - start) > maxCells){
            start = start + 1;
        }

        end = (T.values.length < maxCells ? maxCells : T.values.length);

        for(var i = start; i < end; i++){
            this.drawTapeCell(i - start, T.values[i] || "#", (T.curr === i));
        }
    }

    /**
     * Draws a tape cell number i with the value v inside of it
     * @param i {number} the cell number of the tape (from the left of svg canvas) starts at 0.
     * @param v {string} the value to show.
     * @param curr {boolean}
     */
    drawTapeCell(i, v, curr){

        var fillColor = (curr ? "#00a1ff" : "none");

        var g = this.snap.group();

        g.add(
            this.snap.rect(i*CELL_WIDTH + CELL_LEFT_MARGIN, CELL_TOP_MARGIN, CELL_WIDTH, CELL_HEIGHT).attr({stroke:"#000", fill:fillColor})
        );

        g.add(
            this.snap.text(i*CELL_WIDTH + CELL_WIDTH/2 - 2, CELL_TOP_MARGIN + CELL_HEIGHT/2 + 5, v).attr({"font-size" : 12})
        );
    }

}

module.exports = {SimViewManager : SimViewManager};
