Direction = function(x, y, xx, yy, text) {
	this.x = x;
	this.y = y;
	this.xx = xx;
	this.yy = yy;
	this.text = text;
	this.type = 'direction';
}


Direction.prototype.draw = function(context, color) {
    context.beginPath();
    context.strokeStyle = color;
    context.moveTo(this.x, this.y);
    context.lineTo(this.xx, this.yy);
    context.stroke();

    context.beginPath();
    context.moveTo(this.xx, this.yy);
    context.strokeStyle = 'blue';
    var angle = Math.atan((this.yy - this.y) / (this.xx - this.x));

    angle = this.xx >= this.x ? 3.14 +  angle : angle;
    context.lineTo(this.xx - 5 * Math.cos(angle- 10), this.yy - 5 * Math.sin(angle -10));
	context.moveTo(this.xx, this.yy);
    context.lineTo(this.xx - 5 * Math.cos(angle + 10), this.yy - 5 * Math.sin(angle +10));
    context.stroke();
    context.font="12px Arial";
    context.fillStyle = '#000000';
    context.fillText(this.text, this.x, this.y);
}

Direction.prototype.recalculate = function() {
    this.width = this.xx - this.x;
    this.height = this.yy - this.y;
}