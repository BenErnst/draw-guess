import { forwardRef, useEffect } from 'react';

export const Canvas = forwardRef((props, ref) => {
    const { onStartDrawing, onFinishDrawing, onDraw } = props;

    // useEffect(() => {
    //     // console.log(ref.current);
    //     ref.current.addEventListener('touchstart', (ev) => {
    //         console.log(ev.type);
    //         onStartDrawing(ev);
    //     });
    //     ref.current.addEventListener('touchend', () => {
    //         onFinishDrawing();
    //     });
    //     ref.current.addEventListener('touchmove', (ev) => {
    //         console.log(ev.type);
    //         onDraw(ev);
    //     });
    // }, []);

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
