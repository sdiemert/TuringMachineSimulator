/**
 * Created by sdiemert on 2017-02-22.
 */

class InputManager{

    constructor(id){

        this.entity = $("#" + id);
        this.visible = false;

    }

    show(){
        this.visible = true;
        this.entity.show();
    }

    hide(){
        this.visible = false;
        this.entity.hide();
    }

    /**
     * @returns {boolean}
     */
    isVisible(){
        return this.visible;
    }

}


module.exports = {InputManager : InputManager};