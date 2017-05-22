cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        },
        
        touchArea: {
            default: null,
            type: cc.Node
        },
        
        prefabLife: {
            default: null,
            type: cc.Prefab
        },
        
        labelScore: {
            default: null,
            type: cc.Label
        },
    },

    // use this for initialization
    onLoad: function () {
        cc.sys.localStorage.setItem('Score', 0);
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        this.prepareLifes();
        this.canvas = cc.find('Canvas');
        var self = this;
        this.touchArea.on('touchstart', function(event) {
            console.log('touchstart', event.getLocation());
            if (self.isMoving) {
                return;
            }
            self.isMoving = true;
            var touchLoc = event.getLocation();
            var locationInNode = self.canvas.convertToNodeSpaceAR(touchLoc);
            var moveAction = cc.moveTo(1, cc.p(locationInNode)).easing(cc.easeBackOut());
            self.player.runAction(cc.sequence(moveAction, cc.callFunc(self.moveActionDone, self)));
            locationInNode.y > self.player.position.y ? self.player.getComponent('Player').flipRight() : self.player.getComponent('Player').flipLeft();
        });

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
        var life = cc.instantiate(this.prefabLife);
        life.setPosition(this.lifes.length * 30, life.position.y);
        this.lifesContent.addChild(life);
        this.lifes.push(life);
    },
    
    removeLife:function() {
        if (this.lifes.length > 0) {
            var lifeNode = this.lifes[this.lifes.length-1];
            this.lifes.pop();
            lifeNode.destroy();
            if (this.lifes.length === 0) {
                var score = cc.sys.localStorage.getItem('Score');
                var record = cc.sys.localStorage.getItem('Record');
                if (record === null || parseInt(score) > parseInt(record)) {
                    cc.sys.localStorage.setItem('Record', score);
                } 
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
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.labelScore.string = cc.sys.localStorage.getItem('Score');
    },
});
