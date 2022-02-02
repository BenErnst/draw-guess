import { forwardRef, useEffect } from 'react';

export const Canvas = forwardRef((props, ref) => {
    const { onStartDrawing, onFinishDrawing, onDraw } = props;

    useEffect(() => {
        // console.log(ref.current);
        ref.current.addEventListener('touchstart', (ev) => {
            onStartDrawing(ev);
        });
        ref.current.addEventListener('touchend', () => {
            onFinishDrawing();
        });
        ref.current.addEventListener('touchmove', (ev) => {
            onDraw(ev);
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
            }}
        />
    );
});
