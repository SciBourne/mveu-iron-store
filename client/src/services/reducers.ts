enum FetchActions {
  PROGRESS = "progress",
  SUCCESS  = "success",
  ERROR    = "error"
}


interface Action {
  type: FetchActions
  data?: any
  error?: any
}


interface InitialState {
  data: any
  loading: boolean
  error: any
}




function reducer(state: InitialState, action: Action) {
  switch (action.type) {
    case FetchActions.PROGRESS: {
      return {
        ...state,
        loading: true,
      }
    }

    case FetchActions.SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.data,
      }
    }

    case FetchActions.ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    default: {
      return state;
    }
  }
}




export {
  type Action,
  type InitialState,

  FetchActions,
  reducer
}
