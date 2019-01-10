// variables related to the canvas
var canvas = document.getElementById("canvas");
var canvas2D = canvas.getContext("2d");

var jCanvas = $("#canvas");
var canvasOffset = jCanvas.offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;

// variables related to the mouse position
var clickX = 0;
var clickY = 0;
var mouseX = 0;
var mouseY = 0;

// variables for text objects
var text = document.getElementById("textField");
var jText = $("#textField");
var text_list = [];
var idx_text = -1;

// variables for color selector
var color = document.getElementById("color");
var jColor = $("#color");
var selectedColor = "black";

// variables for color selector
var font = document.getElementById("font");
var jFont = $("#font");
var selectedFont;

// listeners
canvas.addEventListener("mousedown", onMouseClick);
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mouseup", onMouseRelease);

color.addEventListener("change", changeSelectorColor);

font.addEventListener("change", changeSelectorFont);

text.addEventListener("change", changeSelectorColor);
text.addEventListener("change", changeSelectorFont);



// methods for checking status
function checkMouseOnText(mouseX, mouseY){
    var idx = -1

    if (text_list.length == 0){
        idx = -1
        return idx;
    }
    else {
        //check if the mouse is on any text objects
        for(i=0; i<text_list.length; i++){
            var left = text_list[i].x;
            var top = text_list[i].y - text_list[i].height;
            var right = text_list[i].x + text_list[i].width;
            var bottom = text_list[i].y ;
              
            if (mouseX >= left && mouseX <= right && 
                mouseY >= top  && mouseY <= bottom){
                
                idx = i;
            }
        }
    }

    return idx;
}

// methods for mouse events
function onMouseClick(e){

    mouseX = startX = parseInt(e.clientX - offsetX);
    mouseY = startY = parseInt(e.clientY - offsetY)-5;

    idx_text = checkMouseOnText(mouseX, mouseY)

    if (idx_text < 0){
        var textObj = {
            text: $("#textField").val(),
            x: mouseX,
            y: mouseY
        };

        canvas2D.font = "30px verdana";
        textObj.width = canvas2D.measureText(textObj.text).width;
        textObj.height = 30;
        textObj.color = selectedColor;
        textObj.font = selectedFont;

        text_list.push(textObj);

        drawText();
    
    }
    
}

function onMouseMove(e){
    if (idx_text < 0){
        return;
    }
    else {

        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY)-5;

        var dx = parseInt(mouseX - startX);
        var dy = parseInt(mouseY - startY);

        startX = mouseX;
        startY = mouseY;

        var theText = text_list[idx_text];
        theText.x += dx;
        theText.y += dy;
        
        drawText();
    }
}

function onMouseRelease(e){
    idx_text = -1;
}

// methods for the canvas
function drawText(){
    canvas2D.clearRect(0, 0, canvas.width, canvas.height);
    text_list.forEach( (text) => {
        canvas2D.fillStyle = text.color;
        canvas2D.font = "40px " + text.font;
        canvas2D.fillText(text.text, text.x, text.y);

    })
}

// methods for color selection
function changeSelectorColor() {
    selectedColor = $("#color option:selected").val();
    jColor.css("background-color", selectedColor);
    jText.css("color", selectedColor);

}

// methods for font selection
function changeSelectorFont() {
    selectedFont = $("#font option:selected").val();
    jText.css("font-family", selectedFont);
}


