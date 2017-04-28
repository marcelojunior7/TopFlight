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
        
        this.prepareLifes();
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
                var moveAction = cc.moveTo(1, cc.p(locationInNode)).easing(cc.easeBackOut());
                self.player.runAction(cc.sequence(moveAction, cc.callFunc(self.moveActionDone, self)));
                locationInNode.y > self.player.position.y ? self.player.getComponent('Player').flipRight() : self.player.getComponent('Player').flipLeft();
                return true
            },
            onTouchMoved: function(touch, event) {
                return true
            },
            onTouchEnded: function(touch, event) {
                return true
            }
        }, self.node);


        this.player.getComponent('Player').onCollisionEnterCallback(function() {
            self.removeLife();
        });
    },
    
    prepareLifes: function() {
        this.lifes = [];
        this.lifesContent = cc.find('Canvas').getChildByName('lifesContent');
        for (var i = 0; i < this.player.getComponent('Player').lifes; i++) {
            this.addLife();
        }
    },
    
    addLife: function() {
        var node = new cc.Node("New Sprite");
        node.parent = this.lifesContent;
        node.setContentSize(30, 30);
        node.setPosition(this.lifes.length * 30, node.position.y);
        
        var url = cc.url.raw("Texture/life.png");
        var texture = cc.textureCache.addImage(url);
        
        var spriteLife = node.addComponent(cc.Sprite);
        spriteLife.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        spriteLife.spriteFrame = new cc.SpriteFrame(texture);
        
        this.lifes.push(node);
    },
    
    removeLife:function() {
        if (this.lifes.length > 0) {
            var lifeNode = this.lifes[this.lifes.length-1];
            this.lifes.pop();
            lifeNode.destroy();
            if (this.lifes.length === 0) {
                cc.director.loadScene('GameOver');
            }
        }
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
