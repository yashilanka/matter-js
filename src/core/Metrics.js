/**
* _Internal Class_, not generally used outside of the engine's internals.
*
* @class Metrics
*/

var Metrics = {};

(function() {

    /**
     * Description
     * @method create
     * @return {metrics} A new metrics
     */
    Metrics.create = function() {
        return {
            narrowDetections: 0,
            narrowphaseTests: 0,
            midphaseTests: 0,
            broadphaseTests: 0,
            narrowEff: 0.0001,
            midEff: 0.0001,
            broadEff: 0.0001,
            collisions: 0,
            buckets: 0,
            bodies: 0,
            pairs: 0
        };
    };

    /**
     * Description
     * @method reset
     * @param {metrics} metrics
     */
    Metrics.reset = function(metrics) {
        metrics.narrowDetections = 0;
        metrics.narrowphaseTests = 0;
        metrics.midphaseTests = 0;
        metrics.broadphaseTests = 0;
        metrics.narrowEff = 0;
        metrics.midEff = 0;
        metrics.broadEff = 0;
        metrics.collisions = 0;
        metrics.buckets = 0;
        metrics.pairs = 0;
        metrics.bodies = 0;
    };

    /**
     * Description
     * @method update
     * @param {metrics} metrics
     * @param {engine} engine
     */
    Metrics.update = function(metrics, engine) {
        var world = engine.world,
            broadphase = engine.broadphase[engine.broadphase.current];
        
        metrics.collisions = metrics.narrowDetections;
        metrics.pairs = engine.pairs.list.length;
        metrics.bodies = world.bodies.length;
        metrics.midEff = (metrics.narrowDetections / (metrics.midphaseTests || 1)).toFixed(2);
        metrics.narrowEff = (metrics.narrowDetections / (metrics.narrowphaseTests || 1)).toFixed(2);
        metrics.broadEff = (1 - (metrics.broadphaseTests / (world.bodies.length || 1))).toFixed(2);
        if (broadphase.instance)
            metrics.buckets = Common.keys(broadphase.instance.buckets).length;
    };

})();