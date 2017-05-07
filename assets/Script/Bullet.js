
var DirectionBullet = cc.Enum({
   Left: 0,
   Right: 1,
   Top: 2,
   Bottom: 3
});


cc.Class({
    extends: cc.Component,
    properties: {
        speed: 100,
        
        shootClip: {
            default: null,
            url: cc.AudioClip
        },
        
        direction: {
            default: DirectionBullet.Right,
            type: DirectionBullet
        },
    },

    // use this for initialization
    onLoad: function () {
        cc.audioEngine.play(this.shootClip);
    },
    
    onCollisionEnter: function (other, self) {
        this.node.destroy();
    },

    update: function (dt) {
        switch (this.direction) {
            case DirectionBullet.Right:
            this.node.x += this.speed * dt;
            break;
                
            case DirectionBullet.Left:
            this.node.x -= this.speed * dt;
            break;
                
            case DirectionBullet.Top:
            this.node.y += this.speed * dt;
            break;
                
            case DirectionBullet.Bottom:
            this.node.y -= this.speed * dt;
            break;
            
            default:
            break;
        }
    },
});

