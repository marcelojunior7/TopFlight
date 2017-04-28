cc.Class({
    extends: cc.Component,

    properties: {
        modal: {
            default: null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        var moveAction = cc.moveTo(0.8, cc.p(0,0)).easing(cc.easeElasticOut(0.8));
        this.modal.runAction(moveAction);
        cc.director.preloadScene("Game");
    },
    
    buttonPlay: function() {
        cc.director.loadScene("Game");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
