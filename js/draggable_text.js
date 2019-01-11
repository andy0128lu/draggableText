// variables related to the canvas
var canvas = document.getElementById("canvas");
var canvas2D = canvas.getContext("2d");

var jCanvas = $("#canvas");
//var canvasOffset = jCanvas.offset();
var canvasOffset = canvas.getBoundingClientRect();
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

// variables for font selector
var font = document.getElementById("font");
var jFont = $("#font");
var selectedFont;

// variables for google font selector
var googleFont = document.getElementById("googleFont");
var jGoogleFont = $("#googleFont");

// Execution on ready
$(document).ready ( () => {
    changeSelectorGoogleFont();
})

// event listeners
canvas.addEventListener("mousedown", onMouseClick);
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mouseup", onMouseRelease);

color.addEventListener("change", changeSelectorColor);

googleFont.addEventListener("change", changeSelectorGoogleFont);

text.addEventListener("change", changeSelectorColor);


// methods for checking status
// checkMouseOnText(): return the index of the text object if anyone is found, or return -1
function checkMouseOnText(mouseX, mouseY){
    var idx = -1

    if (text_list.length == 0){
        idx = -1
        return idx;
    }
    else {
        //checking if the mouse in on any text objects
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
    mouseY = startY = parseInt(e.clientY - offsetY)+38;

    idx_text = checkMouseOnText(mouseX, mouseY)
    
    //no existing text objects detected on the position of mouse clicking,
    //and then create new one
    if (idx_text < 0){
        var textObj = {
            text: $("#textField").val(),
            x: mouseX,
            y: mouseY
        };

        //define the properties of the text object
        canvas2D.font = "30px "+ selectedFont;
        textObj.width = canvas2D.measureText(textObj.text).width;
        textObj.height = canvas2D.measureText('M').width
        textObj.color = selectedColor;
        textObj.font = selectedFont;
        
        //push the object into the list of text objects
        text_list.push(textObj);

        //re-draw the canvas
        drawText();
    }
}

function onMouseMove(e){
    if (idx_text < 0){
        return;
    }
    else {
        //keep the text showing on the canvas while drag the text around
        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY)+38;

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
    //reset the index of the selected text object to none
    idx_text = -1;
}

// methods for the canvas
function drawText(){
    //clear the canvas
    canvas2D.clearRect(0, 0, canvas.width, canvas.height);

    //re-draw all text objects
    text_list.forEach( (text) => {
        canvas2D.fillStyle = text.color;
        canvas2D.font = "30px " + text.font;
        canvas2D.fillText(text.text, text.x, text.y);
    
    })
}

// methods for color selection
function changeSelectorColor() {
    //get the value of color that the user chose
    selectedColor = $("#color option:selected").val();

    //reflect the color change on the color selector
    jColor.css("background-color", selectedColor);

    //reflect the color change on the text field
    jText.css("color", selectedColor);

}

// methods for font selection
function changeSelectorFont() {
    //get the value of color that the user chose
    selectedFont = $("#font option:selected").val();

    //reflect the color change on the text field
    jText.css("font-family", selectedFont);
}

// methods for google font selection
function changeSelectorGoogleFont(){
    jGoogleFont.fontselect().change(function(){
    
        // replace + signs with spaces for css
        var font = $(this).val().replace(/\+/g, ' ');
        
        // split font into family and weight
        font = font.split(':');

        selectedFont =font[0];
      
        //reflect the color change on the text field
        jText.css('font-family', font[0]);
    });
}





