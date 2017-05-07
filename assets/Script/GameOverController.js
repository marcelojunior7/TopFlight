cc.Class({
    extends: cc.Component,

    properties: {
        modal: {
            default: null,
            type: cc.Node
        },
        
        labelScore: {
            default: null,
            type: cc.Label 
        },
        
        labelRecord: {
            default: null,
            type: cc.Label 
        },
    },

    // use this for initialization
    onLoad: function () {
        var moveAction = cc.moveTo(0.8, cc.p(0,0)).easing(cc.easeElasticOut(0.8));
        this.modal.runAction(moveAction);

        cc.log('score', cc.sys.localStorage.getItem('Score'));
                cc.log('record', cc.sys.localStorage.getItem('Record'));

        var score = cc.sys.localStorage.getItem('Score');
        if (score === null) {
            score = 0;
        } 
        this.labelScore.string = "Score: " + score;
        
        var record = cc.sys.localStorage.getItem('Record');
        if (record === null) {
            record = score;
        } 
        this.labelRecord.string = "Record: " + record;
    },
    
    buttonPlay: function() {
        cc.director.loadScene("Game");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
