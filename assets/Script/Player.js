

cc.Class({
    extends: cc.Component,

    properties: {
         bulletPrefab: {
            default: null,
            type: cc.Prefab
        },
    },

    onLoad: function () {
        this.anim = this.getComponent(cc.Animation);
    },

    flipLeft: function() {
        cc.log("flipLeft");
        var animState = this.anim.play('FlipLeft');
        animState.repeatCount = 1;
        animState.wrapMode = cc.WrapMode.Normal;
        animState.speed = 1.5;
    },
    
    flipRight: function() {
        cc.log("flipRight");
        var animState = this.anim.play('FlipRight');
        animState.repeatCount = 1;
        animState.wrapMode = cc.WrapMode.Normal;
        animState.speed = 1.5;
    },
    
    fire: function() {
        var bulletNode = cc.instantiate(this.bulletPrefab);
        bulletNode.setPosition(new cc.Vec2(0,0));
        this.node.addChild(bulletNode);
    },

    update: function (dt) {

    },
});
