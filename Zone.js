Zone = function(x, y, xx, yy, text) {
	this.x = x;
	this.y = y;
	this.xx = xx;
	this.yy = yy;
    this.text = text;
    this.type = 'zone';
    this.recalculate();
}

Zone.prototype.draw = function(context, color) {
    context.fillStyle = color;
    context.fillRect(this.x, this.y, this.xx - this.x, this.yy - this.y);
    context.font="12px Arial";
    context.fillStyle = '#000000';
    context.fillText(this.text, this.x, this.y);
}

Zone.prototype.recalculate = function() {
    this.width = Math.abs(this.xx - this.x);
    this.height = Math.abs(this.yy - this.y);
}