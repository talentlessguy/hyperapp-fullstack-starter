const httpFx = (dispatch, props) => {
  fetch(props.url, props.options)
    .then((res) => res[props.method || 'json']())
    .then((data) => dispatch(props.action, data))
    .catch((err) => dispatch(props.action, err))
}

export const Http = (props) => [httpFx, props]
