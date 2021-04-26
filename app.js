const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("control__color");
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');


canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "#010103";
ctx.fillStyle = "#010103";
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;


function stopPainting(){
    painting = false;

}


function startPainting(){
    painting = true;
    
}


function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY

    if (!painting || filling === true){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else{
        ctx.lineTo(x, y);
        ctx.stroke();      
    }

}


function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

}


function handleRangeControl(event){
    const brushSize = event.target.value;
    ctx.lineWidth = brushSize;

}


function handleModeClick(){
    if(filling === false){
        filling = true;
        mode.innerText = "Paint";
    }
    else{
        filling = false;
        mode.innerText = "Fill";
    }

}


function handleCanvasClick(event){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

}

function handleCM(event){
    event.preventDefault();
    console.log(event);

}


function handleSaveBtn(){
    const imageUrl = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "🎨newPainting🎨"; /*download 는 link 주소로 가지는게 아니라  저장하는지 물어보는것*/
    link.click();                       /* link를 클릭해야 저장이 된다  */

}


/*출력*/

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup" , stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if(range){
    range.addEventListener("input", handleRangeControl)
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));


if(mode){
    mode.addEventListener("click", handleModeClick);

}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveBtn);

}