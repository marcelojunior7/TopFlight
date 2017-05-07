

cc.Class({
    extends: cc.Component,

    properties: {
         bulletPrefab: {
            default: null,
            type: cc.Prefab
        },
        lifes:0
    },

    onLoad: function () {
        this.anim = this.getComponent(cc.Animation);
        this.canvas = cc.find('Canvas');
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
        bulletNode.setPosition(this.node.position);
        this.canvas.addChild(bulletNode);
    },
    
    onCollisionEnterCallback:function(callback) {
        this.onCollisionCallback = callback;
    },
    
    onCollisionEnter: function (other, self) {
        if (other.tag === self.tag) {
            return;
        }
        this.lifes--;
        this.onCollisionCallback();
    },

    update: function (dt) {

    },
});
