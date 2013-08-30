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
        done: false,
        easing: true,

        init: function(settings) {
            this.timer = new ig.Timer();
            if(typeof settings === 'object') {
                ig.merge(this, settings);
            }
            this.value = this.start;
            if (this.start === this.end) {
                this.onDone();
            }
            ig.Interpolation.instances.push(this);
        },

        update: function() {
            if(this.done) {
                return;
            }
            else if(!this.done && this.timer.delta() >= this.duration) {
                this.value = this.end;
                this.onDone();
            }
            else if(!this.done && this.timer.delta() < this.duration) {
                var v = (this.duration - this.timer.delta()) / this.duration;
                if(this.easing) {
                    v = v * v * v * v; // Adds "higher power" easing.
                }
                this.value = (this.start * v) + (this.end * (1 - v));
            }
        },

        onDone: function() {
            this.done = true;
            if(typeof this.callback === 'function') {
                this.callback();
            }
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