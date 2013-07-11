ig.module('plugins.joncom.interpolation.interpolation')
.requires('impact.impact')
.defines(function(){

    ig.Interpolation = ig.Class.extend({

        start: 0,
        end: 100,
        currentValue: 0,
        timer: null,
        duration: 1,
        callback: null,

        init: function(start, end, duration, callback) {
            this.timer = new ig.Timer();
            this.start = start;
            this.end = end;
            this.duration = duration;
            if(callback) {
                this.callback = callback;
            }
        },

        update: function() {
            if(this.timer.delta() < this.duration) {
                var v = (this.duration - this.timer.delta()) / this.duration;
                v = v * v * v * v; // Adds "higher power" easing.
                this.currentValue = (this.start * v) + (this.end * (1 - v));
            } else {
                this.currentValue = this.end;
                if(typeof this.callback === 'function') {
                    this.callback();
                }
            }
        },

        getValue: function() {
            return this.currentValue;
        }

    });

});