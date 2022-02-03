
import { storageService } from './storageService.js';

export const canvasService = {
    // saveDrawing,
    // loadDrawing
    // getCenter,
    // getCircle,
    // isCircleClicked
}

// const STORAGE_KEY = 'drawing';

// function saveDrawing(dataURL) {
//     storageService.localStore(STORAGE_KEY, dataURL);
// }

// function loadDrawing() {
//     const drawing = storageService.localLoad(STORAGE_KEY);
//     return Promise.resolve(drawing);
// }

// function getCenter(canvas) {
//     return {
//         x: canvas.width / 4,
//         y: canvas.height / 4,
//     }
// }

// function getCircle(pos) {
//     return {
//         pos,
//         size: 30,
//         color: 'blue'
//     }
// }

// function isCircleClicked(clickedPos, circle) {
//     const { pos, size } = circle;
//     const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2);
//     return distance <= size;
// }
