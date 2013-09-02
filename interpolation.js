ig.module('plugins.joncom.interpolation.interpolation')
.defines(function(){

    ig.Interpolation = function(start, end, duration, _easeFunction) {
        this.start = start || 0;
        this.end = end || 0;
        this.duration = duration || 0;
        this._easeFunction = _easeFunction;
        this._startTime = ig.Timer.time;
        return this;
    };

    ig.Interpolation.prototype.valueOf = function() {
        if (this.done) {
            return this.end;
        }
        var elapsed = ig.Timer.time - this._startTime
        var v = (this.duration - elapsed) / this.duration;
        if (this._easeFunction) {
            v = this._easeFunction(v);
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

    ig.Interpolation.EASE = {
        IN: function(v) {
            return 1 - (1 - v) * (1 - v) * (1 - v) * (1 - v);
        },
        OUT: function(v) {
            return v * v * v * v;
        }
    }

});