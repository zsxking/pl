goog.provide('pl.retained.Container');

goog.require('goog.array');
goog.require('pl.retained.Element');

/**
 * @constructor
 * @param {number} width
 * @param {number} height
 * @param {number=} opt_x
 * @param {number=} opt_y
 * @param {boolean=} opt_enableCache
 * @extends {pl.retained.Element}
 */
pl.retained.Container = function(width, height, opt_x, opt_y, opt_enableCache) {
  goog.base(this, width, height, opt_x, opt_y, opt_enableCache);
  this._children = [];
};
goog.inherits(pl.retained.Container, pl.retained.Element);

/**
 * @param {!pl.retained.Element} element
 **/
pl.retained.Container.prototype.addElement = function(element) {
  this._children.push(element);
  this.onChildrenChanged();
};

/**
 * @param {!pl.retained.Element} element
 * @param {number=} opt_i The index at which to insert the object. If omitted,
 *      treated as 0. A negative index is counted from the end of the array.
 **/
pl.retained.Container.prototype.insertAt = function(element, opt_i) {
  goog.array.insertAt(this._children, element, opt_i);
  this.onChildrenChanged();
};

/**
 * returns {!Array.<!pl.retained.Element>}
 */
pl.retained.Container.prototype.getVisualChildren = function() {
  return goog.array.clone(this._children);
};

pl.retained.Container.prototype.onChildrenChanged = goog.nullFunction;

/**
 * returns {?math.google.Rect}
 */
pl.retained.Container.prototype.getChildBounds = function() {
  var bounds = null;
  if (this._children.length) {
    bounds = this._children[0].getBounds();

    goog.array.forEach(this._children, function(child) {
      bounds.boundingRect(child.getBounds());
    },
    this);
  }
  return bounds;
};

/**
 * @param {!CanvasRenderingContext2D} ctx
 **/
pl.retained.Container.prototype.draw = function(ctx) {
  goog.array.forEach(this._children, function(element) {
    element._drawInternal(ctx);
  },
  this);
};
