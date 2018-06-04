import { mapPropsStream, createEventHandler } from 'recompose';
import { map, combineLatest } from 'rxjs/operators';

export const openCloseStream = mapPropsStream(props$ => {
  const {
    stream: toggleVisibility$,
    handler: toggleVisibility,
  } = createEventHandler();

  let visible = false;

  const visibility$ = toggleVisibility$
    .pipe(
      map(e => {
        visible = !visible;
        return visible;
      })
    )
    .startWith(visible);

  return visibility$.pipe(
    combineLatest(props$),
    map(([visibility, props]) => ({ ...props, visibility, toggleVisibility }))
  );
});
