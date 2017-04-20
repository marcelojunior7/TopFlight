cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        //cc.director.getCollisionManager().enabledDebugDraw = true;
        
        this.canvas = cc.find('Canvas');
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                
                if (self.isMoving) {
                    return;
                }
                
                self.isMoving = true;
                var touchLoc = touch.getLocation();
                var locationInNode = self.canvas.convertToNodeSpaceAR(touchLoc);
                var moveAction = cc.moveTo(2, cc.p(locationInNode)).easing(cc.easeCubicActionOut());
                self.player.runAction(cc.sequence(moveAction, cc.callFunc(self.moveActionDone, self)));
                locationInNode.x > self.player.position.x ? self.player.getComponent('Player').flipRight() : self.player.getComponent('Player').flipLeft();
                return true
            },
            onTouchMoved: function(touch, event) {
                return true
            },
            onTouchEnded: function(touch, event) {
                return true
            }
        }, self.node);

    },
    
    moveActionDone: function() {
        this.isMoving = false;
        cc.log("CHEGOU");
    },
    
    buttonFire: function() {
        this.player.getComponent('Player').fire();
    },
    
    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
