import { forwardRef, useEffect } from 'react';

export const Canvas = forwardRef((props, ref) => {
    const { onStartDrawing, onFinishDrawing, onDraw } = props;

    useEffect(() => {
        console.log(ref.current);
        ref.current.addEventListener('touchstart', () => {
            onStartDrawing();
        });
        ref.current.addEventListener('touchend', () => {
            onFinishDrawing();
        });
        ref.current.addEventListener('touchmove', () => {
            onDraw();
        });
    }, []);

    return (
        <canvas
            onMouseDown={onStartDrawing}
            onMouseUp={onFinishDrawing}
            onMouseMove={onDraw}
            ref={ref}
            // touchstart={onStartDrawing}
            // touchend={onFinishDrawing}
            // touchmove={onDraw}
            style={{
                width: `${window.innerWidth / 2}px`,
                height: `${window.innerHeight / 2}px`,
                background: 'lightgray',
                touchAction: 'manipulation',
            }}
        />
    );
});
