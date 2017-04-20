

cc.Class({
    extends: cc.Component,

    properties: {
         bulletPrefab: {
            default: null,
            type: cc.Prefab
        },
        speed:0,
        delayMove:0,
        delayShoot:0
    },

    onLoad: function () {
        this.anim = this.getComponent(cc.Animation);
        this.waitShoot = this.delayShoot;
        this.waitMove = this.delayMove;
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

    onCollisionEnter: function (other, self) {
        cc.log("other", other);
        cc.log("self", self);
        this.node.destroy();
    },

    update: function (dt) {
        this.node.x -= this.speed * dt;
        
        if (this.waitShoot >= 0) {
            this.waitShoot -= dt;
        } else {
            this.waitShoot = this.delayShoot;
            this.fire();
        }
        
        if (this.waitMove >= 0) {
            this.waitMove -= dt;
        } else {
            var player = cc.find('Canvas').getChildByName('player');

            if (this.node.x <= player.position.x) {
                return;
            }
            
            var moveGo = cc.moveTo(1, cc.p(this.node.x, player.position.y)).easing(cc.easeCubicActionOut());
            var moveBack = cc.moveTo(1, cc.p(this.node.position)).easing(cc.easeCubicActionOut());
            this.node.runAction(cc.sequence(moveGo, moveBack));
            this.waitMove = this.delayMove;
        }
    },
});
