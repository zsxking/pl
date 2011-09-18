goog.provide('demos.SwapDemo');

goog.require('goog.math.Size');
goog.require('pl.ex');
goog.require('pl.retained.Animation');
goog.require('pl.retained.Panel');
goog.require('pl.retained.Shape');
goog.require('pl.retained.Stage');

/**
 * @constructor
 * @implements {demos.Demo}
 */
demos.SwapDemo = function(canvas) {
  this._size = new goog.math.Size(canvas.width, canvas.height);
  var container = new pl.retained.Panel(canvas.width, canvas.height);
  this._stage = new pl.retained.Stage(canvas, container);
  this._count = 0;
};

demos.SwapDemo.prototype.frame = function() {
  var updated = this._stage.draw();

  if (this._count <= 0) {
    this._count = 50;
    var shape = demos.SwapDemo.createShape(this._size.width, this._size.height);
    this._stage._element.insertAt(shape);
  }
  this._count--;
  return updated;
};

demos.SwapDemo.createShape = function(w, h) {
  var shape = new pl.retained.Shape(w, h);
  shape.fillStyle = pl.ex.getRandom(demos.SwapDemo._fills);
  var tx = shape.addTransform();

  var frameCount = 200;
  new pl.retained.Animation(shape, frameCount, function(i, element) {
    var ratio = (frameCount - i) / frameCount;
    pl.gfx.affineOffsetScale(tx, ratio, ratio, element.width / 2, element.height / 2);
    element.alpha = ratio;
    element.invalidateDraw();
  },
  function(element) {
    element._parent.remove(element);
  });

  return shape;
};

demos.SwapDemo._fills = ['red', 'green', 'blue', 'yellow'];