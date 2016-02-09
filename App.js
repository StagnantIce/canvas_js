function getType() {
    if ($('#direction').is(':checked')) {
        return 'direction';
    }
    if ($('#zone').is(':checked')) {
        return 'zone';
    }
}

$(function(){

    var c = new Canvas();

    $('#c').mousedown(function(e){
        c.setPosition(e);
        c.select(c.x, c.y);
        if (c.focusElement) {
            $('#x').val(c.focusElement.x);
            $('#xx').val(c.focusElement.xx);
            $('#y').val(c.focusElement.y);
            $('#yy').val(c.focusElement.yy);
        }
        if (!c.selectElement && !c.newElement) {
            if (getType() == 'zone') {
                c.newElement = new Zone(c.x, c.y, c.x, c.y, c.index('zone')+1);
            }
            if (getType() == 'direction') {
                c.newElement = new Direction(c.x, c.y, c.x, c.y, c.index('direction')+1)
            }
        }
    });

    $('#c').mousemove(function(e) {
        c.setPosition(e);
        if (c.selectElement) {
            c.selectElement.x = (2 * c.x - c.selectElement.width) / 2;
            c.selectElement.y = (2* c.y - c.selectElement.height) / 2;
            c.selectElement.xx = c.selectElement.x + c.selectElement.width;
            c.selectElement.yy = c.selectElement.y + c.selectElement.height;
            c.redraw();
        } else if (c.newElement) {
            c.newElement.xx = c.x;
            c.newElement.yy = c.y;
            c.newElement.recalculate();
            c.redraw();
        }
    });

    $('#c').mouseup(function(){
        if (c.selectElement) {
            c.selectElement = null;
        } else if (c.newElement) {
            if (c.index(c.newElement.type) >= 5) {
                c.newElement = null;
                c.redraw();
                alert('Максимум 5');
                return;
            }
            c.elements.push(c.newElement);
            c.focusElement = c.newElement;
            $('#x').val(c.focusElement.x);
            $('#xx').val(c.focusElement.xx);
            $('#y').val(c.focusElement.y);
            $('#yy').val(c.focusElement.yy);
            c.newElement = null;
        }
        c.redraw();
    });

    $('#remove').click(function(){
        c.remove();
    });


    $('#add').click(function(){
        if (c.index(getType()) >= 5) {
            alert('Максимум 5');
            return;
        }
        var x = $('#x').val(), y = $('#y').val(), xx = $('#xx').val(), yy = $('#yy').val();
        var newElement = null;
        if (getType() == 'zone') {
            newElement = new Zone(x, y, xx, yy, c.index('zone')+1);
        }
        if (getType() == 'direction') {
            newElement = new Direction(x, y, xx, yy, c.index('direction')+1)
        }
        c.focusElement = newElement;
        c.elements.push(c.focusElement);
        c.redraw();
    });

    $('#change').click(function(){
        var x = $('#x').val(), y = $('#y').val(), xx = $('#xx').val(), yy = $('#yy').val();
        if (c.focusElement) {
            c.focusElement.x = x;
            c.focusElement.y = y;
            c.focusElement.xx = xx;
            c.focusElement.yy = yy;
            c.focusElement.recalculate();
        }
        c.redraw();
    });

    $('#upload').click(function(){
        $.ajax({
            url: "upload.php",
            type: "POST",
            data: new FormData($('#image_form')[0]),
            contentType: false,
            cache: false,
            processData:false,
            success: function(data)
            {
                c.drawImage(data.url);
            }
        });
    });

    $('#save').click(function(){
        $.ajax({
            url: "save.php",
            type: "POST",
            data: {
                elements: JSON.stringify(c.elements)
            },
            success: function() {
                alert('Сохранено');
            }
        });
    });

    $('#load').click(function(){
        $.ajax({
            url: "load.php",
            type: "GET",
            dataType: 'JSON',
            success: function(data) {
                var elements = [];
                for(var i = 0; i < data.length; i++) {
                    if (data[i].type == 'zone') {
                        elements.push(new Zone(data[i].x, data[i].y, data[i].xx, data[i].yy, data[i].text));
                    }
                    if (data[i].type == 'direction') {
                        elements.push(new Direction(data[i].x, data[i].y, data[i].xx, data[i].yy, data[i].text));
                    }
                }
                c.elements = elements;
                c.redraw();
            }
        });
    });

});
