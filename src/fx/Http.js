const httpFx = (dispatch, props) => {
  fetch(props.url, props.options)
    .then((res) => res[props.method || 'json']())
    .then((data) => dispatch(data))
    .catch((err) => dispatch(err))
}

export const Http = (props) => [httpFx, props]
