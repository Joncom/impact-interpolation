ig.module('plugins.joncom.interpolation.interpolation')
.defines(function(){

    ig.Interpolation = function(start, end, duration, _easeFn) {
        this.start = start || 0;
        this.end = end || 0;
        this.duration = duration || 0;
        this._easeFn = _easeFn || function(v) { return v; };
        this._startTime = ig.Timer.time;
        return this;
    };

    ig.Interpolation.prototype.valueOf = function() {
        if (this.done) {
            return this.end;
        }
        var elapsed = ig.Timer.time - this._startTime
        var v = (this.duration - elapsed) / this.duration;
        if (this._easeFn) {
            v = this._easeFn(v);
        }
        return (this.start * v) + (this.end * (1-v));
    };

    Object.defineProperty(ig.Interpolation.prototype, 'value', {
        get: this.valueOf
    });

    Object.defineProperty(ig.Interpolation.prototype, 'done', {
        get: function() {
            var elapsed = ig.Timer.time - this._startTime;
            return (elapsed >= this.duration);
        }
    });

});