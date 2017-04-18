
cc.Class({
    extends: cc.Component,
    properties: {
        speed: 100,
        
        shootClip: {
            default: null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function () {
        cc.audioEngine.play(this.shootClip);
    },
    
    onCollisionEnter: function (other, self) {
        cc.log("other", other);
        cc.log("self", self);
        this.node.destroy();
    },

    update: function (dt) {
        this.node.y += this.speed * dt;
    },
});

