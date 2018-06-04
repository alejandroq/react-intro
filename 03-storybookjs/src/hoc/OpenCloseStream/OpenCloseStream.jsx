import { mapPropsStream, createEventHandler } from 'recompose';
import { map, combineLatest } from 'rxjs/operators';

export const openCloseStream = mapPropsStream(props$ => {
  const { stream: onClick$, handler: onClick } = createEventHandler();

  let visible = false;

  const visibility$ = onClick$
    .pipe(
      combineLatest(props$),
      map(e => {
        visible = !visible;
        return visible;
      })
    )
    .startWith(visible);

  return visibility$.map(visibility => ({ visibility, onClick }));
});
