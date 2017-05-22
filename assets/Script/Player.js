var Airplane = require('Airplane');

cc.Class({
    extends: Airplane,
    
    onLoad: function() {
        this.load();
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
});
