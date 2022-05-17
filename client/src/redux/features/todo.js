const initialState = {
  todos: [],
  loading: true,
  error: null,
};

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'todos/load/pending':
      return {
        ...state,
        loading: true,
      };
    case "todos/load/fulfilled":
      return {
        ...state,
        todos: action.payload,
        loading: false
      };
    case "todos/load/rejected":
      return {
        ...state,
        error: action.payload,
      };
    case "todos/create/pending":
      return {
        ...state,
        loading: true,
      };
    case "todos/create/fulfilled":
      return {
        ...state,
        todos: [...state.todos, action.payload],
        loading: false,
      };
    case "todos/create/rejected":
      return {
        ...state,
        error: action.payload,
      };
    case "todos/update/complete/pending":
      return {
        ...state,
        loading: true,
      };
    case "todos/update/complete/fulfilled":
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item._id === action.payload._id) {
            item.completed = !item.completed;
            return item;
          }
          return item;
        }),
        loading: false,
      };
    case " todos/update/complete/rejected":
      return {
        ...state,
        error: action.payload,
      };
    case "todos/update/text/pending":
      return {
        ...state,
        loading: true,
      };
    case "todos/update/text/fulfilled":
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item._id === action.payload._id) {
            item.text = action.payload.text;
            return item;
          }
          return item;
        }),
        loading: false,
      };
    case "todos/update/text/rejected":
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'todos/delete/pending':
      return {
        ...state,
        loading: true
      }
    case'todos/delete/fulfilled':
      return {
        ...state,
        todos: state.todos.filter((item)=> {
          if (item._id !== action.payload) {
            return item
          }
          return  state
        }),
        loading: false
      };
    case 'todos/delete/rejected':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
};

export const loadTodos = () => {
  return async (dispatch) => {
    dispatch({type: 'todos/load/pending'});
    try {
      const resp = await fetch('/todos');
      const todos = await resp.json();
      dispatch({type: 'todos/load/fulfilled', payload: todos});
    }catch (e){
      dispatch({type: 'todos/load/rejected', payload: e})

    }
  }
}

export const createTodo = (name, text) => {
  return async (dispatch) => {
    dispatch({ type: "todos/create/pending" });
    try {
      const response =await fetch("/create/todo", {
        method: "POST",
        body: JSON.stringify({ name, text }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const todo = await response.json();
      dispatch({ type: "todos/create/fulfilled", payload: todo._id });
      dispatch(loadTodos())
    } catch (e) {
      dispatch({ type: "todos/create/rejected", payload: e });
    }
  };
};

export const textUpdateTodo = (id, text) => {
  return async (dispatch) => {
    dispatch({ type: "todos/update/text/pending" });
    try {
      const response = await fetch(`/todo/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ text: text }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const todo = await response.json();
      dispatch({ type: "todos/update/text/fulfilled", payload: todo });
    } catch (e) {
      dispatch({ type: "todos/update/text/rejected", payload: e });
    }
  };
};

export const completeUpdateTodo = (id, completed) => {
  return async (dispatch) => {
    dispatch({ type: "todos/update/complete/pending" });
    try {
      const response = await fetch(`/admin/todo/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: !completed }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const todo = await response.json();
      dispatch({ type: "todos/update/complete/fulfilled", payload: todo});
    } catch (e) {
      dispatch({ type: "todos/update/complete/rejected", payload: e });
    }
  };
};

export const deleteTodo = (id) => {
  return async (dispatch) => {
    dispatch({ type: "todos/delete/pending" });
    try {
      await fetch(`/admin/todo/delete/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "todos/delete/fulfilled", payload: id });
      dispatch(loadTodos())
    } catch (e) {
      dispatch({ type: "todos/delete/rejected", payload: e });
    }
  };
};
