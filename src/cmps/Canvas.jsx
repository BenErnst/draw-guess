import { memo, forwardRef, useEffect } from 'react';

export const _Canvas = forwardRef((props, ref) => {
    const { onStartDrawing, onFinishDrawing, onDraw, touchEvs } = props;

    useEffect(() => {
        const funcs = [onStartDrawing, onFinishDrawing, onDraw];
        funcs.forEach((func, i) => ref.current.addEventListener(touchEvs[i], func));
    }, []);

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

export const Canvas = memo(_Canvas);
