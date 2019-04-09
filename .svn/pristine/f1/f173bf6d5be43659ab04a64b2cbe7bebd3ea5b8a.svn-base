/**
    * 2019-1-20 轨迹回放类，By:zz
    * 维璟（北京）科技有限公司
    */
//扩展Marker设置角度类
(function() {
    // save these original methods before they are overwritten
    var proto_initIcon = L.Marker.prototype._initIcon;
    var proto_setPos = L.Marker.prototype._setPos;

    var oldIE = (L.DomUtil.TRANSFORM === 'msTransform');

    L.Marker.addInitHook(function() {
        var iconOptions = this.options.icon && this.options.icon.options;
        var iconAnchor = iconOptions && this.options.icon.options.iconAnchor;
        if (iconAnchor) {
            iconAnchor = (iconAnchor[0] + 'px ' + iconAnchor[1] + 'px');
        }
        this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || 'center center';
        this.options.rotationAngle = this.options.rotationAngle || 0;

        // Ensure marker keeps rotated during dragging
        this.on('drag', function(e) {
            e.target._applyRotation();
        });
    });

    L.Marker.include({
        _initIcon: function() {
            proto_initIcon.call(this);
        },

        _setPos: function(pos) {
            proto_setPos.call(this, pos);
            this._applyRotation();
        },

        _applyRotation: function() {
            if (this.options.rotationAngle) {
                this._icon.style[L.DomUtil.TRANSFORM + 'Origin'] = this.options.rotationOrigin;

                if (oldIE) {
                    // for IE 9, use the 2D rotation
                    this._icon.style[L.DomUtil.TRANSFORM] = 'rotate(' + this.options.rotationAngle + 'deg)';
                } else {
                    // for modern browsers, prefer the 3D accelerated version
                    this._icon.style[L.DomUtil.TRANSFORM] += ' rotateZ(' + this.options.rotationAngle + 'deg)';
                }
            }
        },

        setRotationAngle: function(angle) {
            this.options.rotationAngle = angle;
            this.update();
            return this;
        },

        setRotationOrigin: function(origin) {
            this.options.rotationOrigin = origin;
            this.update();
            return this;
        }
    });
})();

//根据路线移动Marker
L.interpolatePosition = function(p1, p2, duration, t) {
    var k = t / duration;
    k = (k > 0) ? k : 0;
    k = (k > 1) ? 1 : k;
    return L.latLng(p1.lat + k * (p2.lat - p1.lat), p1.lng + k * (p2.lng - p1.lng));
};

L.Marker.MovingMarker = L.Marker.extend({
    statics: {
        notStartedState: 0,
        endedState: 1,
        pausedState: 2,
        runState: 3
    },

    options: {
        autostart: false,
        loop: false,
    },

    initialize: function(latlngs, durations, options) {
        L.Marker.prototype.initialize.call(this, latlngs[0], options);

        this._latlngs = latlngs.map(function(e, index) {
            return L.latLng(e);
        });

        this._durations = durations;
        this._currentDuration = 0;
        this._currentIndex = 0;

        this._state = L.Marker.MovingMarker.notStartedState;
        this._startTime = 0;
        this._startTimeStamp = 0;
        this._pauseStartTime = 0;
        this._animId = 0;
        this._animRequested = false;
        this._currentLine = [];
    },

    isRunning: function() {
        return this._state === L.Marker.MovingMarker.runState;
    },

    isEnded: function() {
        return this._state === L.Marker.MovingMarker.endedState;
    },

    isStarted: function() {
        return this._state !== L.Marker.MovingMarker.notStartedState;
    },

    isPaused: function() {
        return this._state === L.Marker.MovingMarker.pausedState;
    },

    start: function() {
        if (this.isRunning()) {
            return;
        }

        if (this.isPaused()) {
            this.resume();
        } else {
            this._loadLine(0);
            this._startAnimation();
            this.fire('start');
        }
    },

    resume: function() {
        if (!this.isPaused()) {
            return;
        }
        this._currentLine[0] = this.getLatLng();
        this._currentDuration -= (this._pauseStartTime - this._startTime);
        this._startAnimation();
    },

    addLatLng: function(latlng, duration) {
        this._latlngs.push(L.latLng(latlng));
        this._durations.push(duration);
    },

    moveTo: function(latlng, duration) {
        this._stopAnimation();
        this._latlngs = [this.getLatLng(), L.latLng(latlng)];
        this._durations = [duration];
        this._state = L.Marker.MovingMarker.notStartedState;
        this.start();
        this.options.loop = false;
    },

    addStation: function(pointIndex, duration) {
        if (pointIndex > this._latlngs.length - 2 || pointIndex < 1) {
            return;
        }
        var t = this._latlngs[pointIndex];
        this._latlngs.splice(pointIndex + 1, 0, t);
        this._durations.splice(pointIndex, 0, duration);
    },

    _startAnimation: function() {
        this._startTime = Date.now();
        this._state = L.Marker.MovingMarker.runState;
        this._animId = L.Util.requestAnimFrame(function(timestamp) {
            this._startTimeStamp = timestamp;
            this._animate(timestamp);
        }, this, true);
        this._animRequested = true;
    },

    _resumeAnimation: function() {
        if (!this._animRequested) {
            this._animId = L.Util.requestAnimFrame(function(timestamp) {
                this._animate(timestamp);
            }, this, true);
        }
    },

    _stopAnimation: function() {
        if (this._animRequested) {
            L.Util.cancelAnimFrame(this._animId);
            this._animRequested = false;
        }
    },

    _loadLine: function(index) {
        this._currentIndex = index;
        this._currentDuration = this._durations[index];
        this._currentLine = this._latlngs.slice(index, index + 2);
    },


    _updateLine: function(timestamp) {
        var elapsedTime = timestamp - this._startTimeStamp;

        if (elapsedTime <= this._currentDuration) {
            return elapsedTime;
        }

        var lineIndex = this._currentIndex;
        var lineDuration = this._currentDuration;

        while (elapsedTime > lineDuration) {
            elapsedTime -= lineDuration;
            lineIndex++;

            if (lineIndex >= this._latlngs.length - 1) {

                if (this.options.loop) {
                    lineIndex = 0;
                    this.fire('loop', {
                        elapsedTime: elapsedTime
                    });
                } else {
                    this.setLatLng(this._latlngs[this._latlngs.length - 1]);
                    this.stop(elapsedTime);
                    return null;
                }
            }
            lineDuration = this._durations[lineIndex];
        }

        this._loadLine(lineIndex);
        this._startTimeStamp = timestamp - elapsedTime;
        this._startTime = Date.now() - elapsedTime;
        return elapsedTime;
    },

    _animate: function(timestamp, noRequestAnim) {
        var elapsedTime;
        this._animRequested = false;
        elapsedTime = this._updateLine(timestamp);

        if (elapsedTime === null) {
            return;
        }
        var p = L.interpolatePosition(this._currentLine[0],
            this._currentLine[1],
            this._currentDuration,
            elapsedTime);
        var angle = this.getAngle(this._latlng.lng, this._latlng.lat, p.lng, p.lat);
        console.log(angle);
        this.setLatLng(p);
        this.setRotationAngle(angle);

        if (!noRequestAnim) {
            this._animId = L.Util.requestAnimFrame(this._animate, this, false);
            this._animRequested = true;
        }
    },
    getAngle: function(startx, starty, endx, endy) {
        var tan = 0
        if (endx == startx) {
            tan = 90;
        } else {
            tan = Math.atan(Math.abs((endy - starty) / (endx - startx))) * 180 / Math.PI;

        }

        if (endx >= startx && endy >= starty) //第一象限
        {
            return -tan;
        } else if (endx > startx && endy < starty) //第四象限
        {
            return tan;
        } else if (endx < startx && endy > starty) //第二象限
        {
            return tan - 180;
        } else {
            return 180 - tan; //第三象限
        }
    },
    onAdd: function(map) {
        L.Marker.prototype.onAdd.call(this, map);

        if (this.options.autostart && (!this.isStarted())) {
            this.start();
            return;
        }

        if (this.isRunning()) {
            this._resumeAnimation();
        }
    },

    onRemove: function(map) {
        L.Marker.prototype.onRemove.call(this, map);
        this._stopAnimation();
    },

    pause: function() {
        if (!this.isRunning()) {
            return;
        }

        this._pauseStartTime = Date.now();
        this._state = L.Marker.MovingMarker.pausedState;
        this._stopAnimation();
        this._animate(this._startTimeStamp +
            (this._pauseStartTime - this._startTime), true);
    },

    stop: function(elapsedTime) {
        if (this.isEnded()) {
            return;
        }

        this._stopAnimation();

        if (typeof(elapsedTime) === 'undefined') {
            elapsedTime = 0;
            this._animate(this._startTimeStamp +
                (Date.now() - this._startTime), true);
        }

        this._state = L.Marker.MovingMarker.endedState;
        this.fire('end', {
            elapsedTime: elapsedTime
        });
    }
});

L.Marker.movingMarker = function(latlngs, duration, options) {
    return new L.Marker.MovingMarker(latlngs, duration, options);
};