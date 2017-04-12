cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad: function () {
        this.anim = this.getComponent(cc.Animation);
    },

    flipLeft: function() {
        cc.log("flipLeft");
        var animState = this.anim.play('FlipLeft');
        animState.repeatCount = 1;
        animState.wrapMode = cc.WrapMode.Normal;
    },
    
    flipRight: function() {
        cc.log("flipRight");
        var animState = this.anim.play('FlipRight');
        animState.repeatCount = 1;
        animState.wrapMode = cc.WrapMode.Normal;
    },

    update: function (dt) {

    },
});
