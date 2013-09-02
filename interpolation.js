ig.module('plugins.joncom.interpolation.interpolation')
.defines(function(){

    ig.Interpolation = function(start, end, duration, _easeFn) {
        this._start = start || 0;
        this._end = end || 0;
        this._duration = duration || 0;
        this._easeFn = _easeFn || function(v) { return v; };
        this._startTime = ig.Timer.time;
        return this;
    };

    ig.Interpolation.prototype.valueOf = function() {
        if (this.done) {
            return this._end;
        }
        var elapsed = ig.Timer.time - this._startTime
        var v = (this._duration - elapsed) / this._duration;
        if (this._easeFn) {
            v = this._easeFn(v);
        }
        return (this._start * v) + (this._end * (1-v));
    };

    Object.defineProperty(ig.Interpolation.prototype, 'value', {
        get: this.valueOf
    });

    Object.defineProperty(ig.Interpolation.prototype, 'done', {
        get: function() {
            var elapsed = ig.Timer.time - this._startTime;
            return (elapsed >= this._duration);
        }
    });

});