import { mapPropsStream, createEventHandler } from 'recompose';
import { map } from 'rxjs/operators';

export const mouseTracker = mapPropsStream(props$ => {
    const { stream: onMouseMove$, handler: onMouseMove } = createEventHandler();
    console.log('MOUSE TRACKER', onMouseMove$)
    return onMouseMove$.pipe(
        map(e => {
            console.log(e.nativeElement.offsetX, e.nativeElement.offsetY);
            return {
                onMouseMove,
                x: e.nativeElement.offsetX,
                y: e.nativeElement.offsetY,
            }
        })
    );
});