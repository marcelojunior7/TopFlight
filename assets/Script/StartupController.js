cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {

    },
    
    buttonPlay: function() {
        cc.director.loadScene("Game");
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
