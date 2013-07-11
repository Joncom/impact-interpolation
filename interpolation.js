ig.module('plugins.joncom.interpolation.interpolation')
.requires('impact.impact', 'impact.game')
.defines(function(){

    ig.Interpolation = ig.Class.extend({

        value: 0,

        start: 0,
        end: 100,
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
            ig.Interpolation.instances.push(this);
        },

        update: function() {
            if(this.timer.delta() >= this.duration) {
                this.value = this.end;
                if(typeof this.callback === 'function') {
                    this.callback();
                }
            } else {
                var v = (this.duration - this.timer.delta()) / this.duration;
                v = v * v * v * v; // Adds "higher power" easing.
                this.value = (this.start * v) + (this.end * (1 - v));
            }
        },

        getValue: function() {
            return this.currentValue;
        }

    });

    ig.Interpolation.instances = [];

    ig.Game.inject({
        update: function() {
            var instanceCount = ig.Interpolation.instances.length;
            for(var i=0; i<instanceCount; i++) {
                var instance = ig.Interpolation.instances[i];
                instance.update();
            }
            this.parent();
        }
    });

});