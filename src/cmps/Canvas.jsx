import { forwardRef } from 'react';

export const Canvas = forwardRef((props, ref) => {
    const { onStartDrawing, onFinishDrawing, onDraw } = props;

    return (
        <canvas
            onMouseDown={onStartDrawing}
            onMouseUp={onFinishDrawing}
            onMouseMove={onDraw}
            ref={ref}
            style={{
                width: `${window.innerWidth / 2}px`,
                height: `${window.innerHeight / 2}px`,
                background: 'lightgray',
            }}
        />
    );
});
