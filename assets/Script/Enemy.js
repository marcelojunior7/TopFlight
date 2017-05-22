var Airplane = require('Airplane');

cc.Class({
    extends: Airplane,

    properties: {
        speed:0,
        delayMove:0,
        delayShoot:0,
        points:10,
    },

    onLoad: function () {
        this.load();
        this.waitShoot = this.delayShoot;
        this.waitMove = this.delayMove;
    },

    onCollisionEnter: function (other, self) {
        if (other.tag === self.tag) {
            return;
        }
        var score = cc.sys.localStorage.getItem('Score');
        var newScore = score !== null ? parseInt(score) + this.points : this.points;
        cc.sys.localStorage.setItem('Score', newScore);
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
            
            var moveGo = cc.moveTo(1.8, cc.p(this.node.x, player.position.y)).easing(cc.easeCubicActionOut());
            var moveBack = cc.moveTo(1.8, cc.p(this.node.position)).easing(cc.easeCubicActionOut());
            this.node.runAction(cc.sequence(moveGo, moveBack));
            this.waitMove = this.delayMove;
        }
    },
});
