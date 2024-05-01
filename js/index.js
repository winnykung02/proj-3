console.log("hello!!!");


const runawayBtn = document.getElementById("runaway-btn")
const OFFSET = 50 //how close mouse needs to be before it starts moving//

//alert pops up and index.html opens in a new tab when button is clicked//
runawayBtn.addEventListener("click", () => {
    alert("no snitching!");
    window.open("index-copy.html");
})

//math stuff//
document.addEventListener("mousemove", (e) => {
    const x = e.pageX
    const y = e.pageY
    const buttonBox = runawayBtn.getBoundingClientRect()
    console.log(buttonBox.x, buttonBox.y)
    const horizontalDistanceFrom = distanceFromCenter(buttonBox.x, x, buttonBox.width)
    const verticalDistanceFrom = distanceFromCenter(buttonBox.y, y, buttonBox.height)
    const horizontalOffset = buttonBox.width / 2 + OFFSET
    const verticalOffset = buttonBox.height / 2 + OFFSET
    if (Math.abs(horizontalDistanceFrom) <= horizontalOffset && Math.abs(verticalDistanceFrom) <= verticalOffset) {
        setButtonPosition(
            buttonBox.x + horizontalOffset / horizontalDistanceFrom * 10, //closer mouse is further it moves//
            buttonBox.y + verticalOffset / verticalDistanceFrom * 10 //closer mouse is further it moves//
        )
    }
})

function setButtonPosition(left, top) {
    const windowBox = document.body.getBoundingClientRect()
    const buttonBox = runawayBtn.getBoundingClientRect()
    //wraps so that the button cannot move off screen//
    if (distanceFromCenter(left, windowBox.left, buttonBox.width) < 0) {
        left = windowBox.right - buttonBox.width - OFFSET
    }
    if (distanceFromCenter(left, windowBox.right, buttonBox.width) > 0) {
        left = windowBox.left + OFFSET
    }
    if (distanceFromCenter(top, windowBox.top, buttonBox.height) < 0) {
        left = windowBox.bottom - buttonBox.height - OFFSET
    }
    if (distanceFromCenter(top, windowBox.bottom, buttonBox.height) > 0) {
        left = windowBox.top + OFFSET
    }


    console.log(left, top)
    runawayBtn.style.left = '${left}px'; //why is the entire string orange when ${} should be an expression//
    runawayBtn.style.top = "${top}px"; //should be moving away here but it isn't??//
}

function distanceFromCenter(boxPosition, mousePosition, boxSize) {
    return boxPosition - mousePosition + boxSize / 2
}



//click on background changes background color, looped between pink & dark gray//

var box = document.querySelector("body"),
    colors = ["#e5c055", "rgb(30, 30, 35)"];

box.onclick = function () {
    color = colors.shift();
    colors.push(color);

    box.style.backgroundColor = color;
};