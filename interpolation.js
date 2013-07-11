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

        dynamicEnd: {
            object: null,
            property: ''
        },

        init: function(settings) {
            this.timer = new ig.Timer();
            this.value = start;
            if(typeof settings === 'object') {
                ig.merge(this, settings);
            }
            var endWasSet = settings.hasOwnProperty('end');
            if (endWasSet && this.start === this.end) {
                this.done = true;
                if(typeof this.callback === 'function') {
                    this.callback();
                }
            }
            ig.Interpolation.instances.push(this);
        },

        update: function() {
            if(this.done) {
                return;
            }
            else if(!this.done && this.timer.delta() >= this.duration) {
                this.done = true;
                this.value = (
                    this.dynamicEnd.object ?
                    this.dynamicEnd.object[this.dynamicEnd.property] :
                    this.end
                );
                if(typeof this.callback === 'function') {
                    this.callback();
                }
            }
            else if(!this.done && this.timer.delta() < this.duration) {
                var end = (
                    this.dynamicEnd.object ?
                    this.dynamicEnd.object[this.dynamicEnd.property] :
                    this.end
                );
                var v = (this.duration - this.timer.delta()) / this.duration;
                v = v * v * v * v; // Adds "higher power" easing.
                this.value = (this.start * v) + (end * (1 - v));
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