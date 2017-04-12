cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {

        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                var touchLoc = touch.getLocation();
                var locationInNode = self.player.parent.convertToNodeSpaceAR(touchLoc);
                cc.log("touch", locationInNode);
                var moveAction = cc.moveTo(2, cc.p(locationInNode)).easing(cc.easeCubicActionOut());
                self.player.runAction(moveAction);
                self.player.runAction(locationInNode.x > self.player.position.x ? self.player.getComponent('Player').flipRight() : self.player.getComponent('Player').flipLeft());
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

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
