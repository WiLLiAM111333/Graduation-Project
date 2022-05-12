var map = document.getElementById("map");
var zoomCounter = document.getElementById("zoom-counter");

var zoomLevel = 100, zoomLevelStr = "", maxZoom = 400, minZoom = 100;
var moveY = 0, moveYStr = "", moveX = 0, moveXStr = "";

var mapActive = "1";

var magickNum = 20;

function zoom(inputValue){
    
    if(inputValue == "in" && zoomLevel < maxZoom){
        zoomLevel += magickNum;
    }
    else if(inputValue == "out" && zoomLevel > minZoom){
        zoomLevel -= magickNum;
    }

    zoomLevelStr = zoomLevel + "%";
    map.style.width = zoomLevelStr;
    map.style.height = zoomLevelStr;
    zoomCounter.innerHTML = zoomLevelStr;
}

function moveMap(inputValue){
    if(inputValue == 'up' && moveY < zoomLevel - minZoom){
        moveY += magickNum;
        moveYStr = moveY +"%";
        map.style.marginTop = moveYStr;
    }

    else if(inputValue == 'left' && moveX < zoomLevel - minZoom){
        moveX += magickNum;
        moveXStr = moveX +"%";
        map.style.marginLeft = moveXStr;
    }

    else if(inputValue == 'right' && moveX > minZoom - zoomLevel){
        moveX -= magickNum;
        moveXStr = moveX +"%";
        map.style.marginLeft = moveXStr;
    }

    if(inputValue == 'down' && moveY > minZoom - zoomLevel){
        moveY -= magickNum;
        moveYStr = moveY +"%";
        map.style.marginTop = moveYStr;
    }
}

function mapReset(){
    map.style.marginTop = "0";
    map.style.marginLeft = "0";
    map.style.width = "100%";
    map.style.height = "100%";
    zoomCounter.innerHTML = "100%";

    // Resetting all the values on zoom and move
    zoomLevel = 100, zoomLevelStr = "", maxZoom = 400, minZoom = 100;
    moveY = 0, moveYStr = "", moveX = 0, moveXStr = "";
}

function changeMapLevel(inputValue){
    var newLevel = "mapSystem/mapLevel" + inputValue + ".png";

    if(map.src != newLevel){
        map.src = newLevel;

        document.getElementById("map-level-" + mapActive).classList.remove("map-level-active");
        document.getElementById("map-level-" + inputValue).classList.add("map-level-active");
        mapActive = inputValue;
    }
} // function changeMapLevel