ig.module('plugins.joncom.interpolation.interpolation')
.requires('impact.impact', 'impact.game')
.defines(function(){

    ig.Interpolation = ig.Class.extend({

        start: null,
        end: null,
        duration: null,
        timer: null,
        done: null,
        value: null,

        init: function(start, end, duration) {
            this.start = start;
            this.end = end;
            this.duration = duration;
            this.timer = new ig.Timer();
            var instance = this;
            Object.defineProperty(this, 'done', {
                get: function() {
                    return (instance.timer.delta() >=
                        instance.duration);
                }
            });
            Object.defineProperty(this, 'value', {
                get: function() {
                    if(instance.done) {
                        return instance.end;
                    }
                    else {
                        return instance._calculateValue();
                    }
                }
            });
        },

        _calculateValue: function() {
            var v = (this.duration - this.timer.delta()) / this.duration;
            v = v * v * v * v; // Adds "higher power" easing.
            return (this.start * v) + (this.end * (1 - v));
        }

    });

});