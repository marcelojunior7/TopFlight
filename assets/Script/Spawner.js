cc.Class({
    extends: cc.Component,

    properties: {
        spawnTime:0,
        enemyPrefab: {
            default: null,
            type: cc.Prefab
        },
    },

    // use this for initialization
    onLoad: function () {
        this.delay = this.spawnTime;
        this.canvas = cc.find('Canvas');
    },

    update: function (dt) {
        if (this.delay >= 0) {
            this.delay -= dt;
        } else {
            var min = 0;
            var max = this.canvas.height;
            this.node.y = Math.random() * (max - min) + min;
            var enemy = cc.instantiate(this.enemyPrefab);
            var nodePositionOnCanvas = this.canvas.convertToNodeSpaceAR(this.node.position);
            enemy.setPosition(nodePositionOnCanvas);
            this.canvas.addChild(enemy);
            this.delay = this.spawnTime;
        }
    },
});
