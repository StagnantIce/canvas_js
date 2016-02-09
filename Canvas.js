var Canvas = function() {
    this.$el = $('#c');
    this.canvas = this.$el[0];
    this.x = this.y = 0;
    this.context = this.canvas.getContext('2d');
    this.elements = [];
    this.newElement = null;
    this.selectElement = null;
    this.focusElement = null;
    this.image = null;
}

Canvas.prototype.drawImage = function(url) {
    var context = this.context, canvas = this;
    var imageObj = new Image();

    imageObj.onload = function() {
        context.drawImage(imageObj, 0, 0);
        canvas.redraw();
    };
    imageObj.src = url;
    this.image = imageObj;
}

Canvas.prototype.addRect = function(x, y, xx, yy, color) {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, xx - x, yy-y);
}

Canvas.prototype.addElement = function(el, color) {
    el.draw(this.context, color);
}

Canvas.prototype.clear = function() {
     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Canvas.prototype.setPosition = function(e) {
    var rect = this.canvas.getBoundingClientRect();
    this.x = (e.clientX - rect.left) * (this.canvas.width / this.$el.width());
    this.y = (e.clientY - rect.top) * (this.canvas.height / this.$el.height());
}

Canvas.prototype.select = function(x, y) {
    for(var i = 0; i < this.elements.length; i++) {
        if (x >= Math.min(this.elements[i].x, this.elements[i].xx) && y >= Math.min(this.elements[i].y,this.elements[i].yy) && x <= Math.max(this.elements[i].xx, this.elements[i].x) && y <= Math.max(this.elements[i].yy,this.elements[i].y)  ) {
            this.focusElement = this.selectElement = this.elements[i];
            return;
        }
    }
    this.selectElement = null;
}

Canvas.prototype.redraw = function() {
    this.clear();
    if (this.image) {
        this.context.drawImage(this.image, 0, 0);
    }
    for(var i = 0; i < this.elements.length; i++) {
        if (this.focusElement && this.elements[i] === this.focusElement) {
            color = 'red';
        } else {
            color = '#05EFFF';
        }
        this.addElement(this.elements[i], color);
    }
    if (this.newElement) {
        this.addElement(this.newElement, '#05EFFF');
    }
}

Canvas.prototype.remove = function() {
    if (this.focusElement) {
        type = this.focusElement.type;
        for(var i = 0; i < this.elements.length; i++) {
            if (this.elements[i] === this.focusElement) {
                this.elements.splice(i, 1);
            }
        }
        var j = 0;
        for(var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].type == type) {
                j++;
                this.elements[i].text = j;
            }
        }
        this.redraw();
    }
}

Canvas.prototype.index = function(type) {
    var j = 0;
    for(var i = 0; i < this.elements.length; i++) {
        if (this.elements[i].type == type) {
            j++;
        }
    }
    return j;
}