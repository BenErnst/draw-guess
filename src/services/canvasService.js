
export const canvasService = {
    getCenter,
    getCircle,
    isCircleClicked
}

function getCenter(canvas) {
    return {
        x: canvas.width / 4,
        y: canvas.height / 4,
    }
}

function getCircle(pos) {
    return {
        pos,
        size: 30,
        color: 'blue'
    }
}

function isCircleClicked(clickedPos, circle) {
    const { pos, size } = circle;
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2);
    return distance <= size;
}
