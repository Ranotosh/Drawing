//toggle active on hover
let color;

function activeToggle(divID, styleClass) {
    var header = document.getElementById(divID);
    var btns = header.getElementsByClassName(styleClass);
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
}

//toggle active on click

function activeToggleClick(divID, styleClass) {
    var header = document.getElementById(divID);
    var btns = header.getElementsByClassName(styleClass);
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
}

//canvas
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

function Drawing(tool, value, size) {

    let pencilDraw = false;
    console.log(tool, value, size);

    function start(e) {
        pencilDraw = true;
        // if (tool === 'highlighter') {
        //     let x = e.clientX - canvas.offsetLeft;
        //     let y = e.clientY - canvas.offsetTop;
        //     ctx.clearRect(x, y, canvas.height, canvas.width);
        // }
        draw(e);

    }

    function end() {
        pencilDraw = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!pencilDraw) return;
        ctx.lineWidth = size;
        ctx.lineCap = "round";
        ctx.strokeStyle = value ? value : 'black';
        ctx.globalAlpha = 0.5;
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
    }


    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("mousemove", draw);


}
//eraser
function ersasing(size) {

    canvas.addEventListener("mousemove", function(e) {
        mouseX = e.pageX - canvas.offsetLeft;
        mouseY = e.pageY - canvas.offsetTop;
        ctx.clearRect(mouseX, mouseY, size, size);
    });

}
//getting tools
document.querySelectorAll('.box').forEach(item =>
    item.addEventListener('click', () => {
        var tools = item.getAttribute("id");
        console.log(tools);
        switch (tools) {
            case 'highlighter':
                document.getElementById('colorDiv').style.display = 'block';
                document.getElementById('colorDivPen').style.display = 'none';
                document.getElementById('eraserDiv').style.display = 'none';
                Drawing('highlighter', 'black', '5');
                styleColour('highlighter', '.primary_color', '5');
                break;
            case 'pencil':
                document.getElementById('colorDiv').style.display = 'none';
                document.getElementById('colorDivPen').style.display = 'block';
                document.getElementById('eraserDiv').style.display = 'none';
                Drawing('pencil', 'black', '1');
                styleColour('pencil', '.primary_color_pen');
                sizeOfPen('pencil', '.sizeStylePen')
                break;
            case 'eraser':
                document.getElementById('colorDiv').style.display = 'none';
                document.getElementById('colorDivPen').style.display = 'none';
                document.getElementById('eraserDiv').style.display = 'block';
                sizeOfEraser('eraser', '.sizeStyleEraser')
                break;
        }
    })
)

//getting colours & size
function styleColour(tool, className, size) {
    var colorInput = document.querySelector(className);
    colorInput.addEventListener('input', () => {
        color = colorInput.value;
        Drawing(tool, `${color}`, size);
    })

}
//getting size pen
function sizeOfPen(tool, className) {
    document.querySelectorAll(className).forEach(item =>
        item.addEventListener('click', () => {
            var tools = item.getAttribute("id");
            console.log(tools);
            switch (tools) {
                case 'small':
                    Drawing(tool, `${color}`, '1');
                    break;
                case 'medium':
                    Drawing(tool, `${color}`, '3');
                    break;
                case 'large':
                    Drawing(tool, `${color}`, '5');
                    break;
            }
        })
    )
}

//getting size eraser
function sizeOfEraser(tool, className) {
    document.querySelectorAll(className).forEach(item =>
        item.addEventListener('click', () => {
            var tools = item.getAttribute("id");
            console.log(tools);
            switch (tools) {
                case 'smallE':
                    ersasing('3')
                    break;
                case 'mediumE':
                    ersasing('5')
                    break;
                case 'largeE':
                    ersasing('8')
                    break;
            }
        })
    )
}
//tooltip
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});

activeToggle('myDiv', 'box');
activeToggleClick('colorDiv', 'colorStyle');
activeToggleClick('colorDivPen', 'colorStylePen');
activeToggleClick('eraserDiv', 'sizeStylePen');