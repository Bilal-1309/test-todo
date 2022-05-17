const initialState = {
  loading: false,
  users: [],
  error: null,
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "auth/signUp/pending":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case " auth/signUp/fulfilled":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case "auth/signUp/rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "auth/signIn/pending":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "auth/signIn/fulfilled":
      return {
        ...state,
        loading: false,
        id: action.payload.json.id,
        token: action.payload.json.token,
      };
    case "auth/signIn/rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "auth/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "auth/load/fulfilled":
      return {
        ...state,
        loading: false,
        users: action.payload

      };
    case "auth/load/rejected":
      return {
        ...state,
        error: action.payload,
      };
    case "auth/logOut/fulfilled":
      return {
        ...state,
        token: null,
        id: null,
      };
    default:
      return state;
  }
};

export const createUser = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: "auth/signUp/pending" });
    const responseCreateUser = await fetch("/user/create", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const jsonCreateUser = await responseCreateUser.json();
    if (jsonCreateUser.error) {
      dispatch({ type: "auth/signUp/rejected", error: jsonCreateUser.error });
    } else {
      dispatch({ type: "auth/signUp/fulfilled", payload: jsonCreateUser });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: "auth/signIn/pending" });
    const response = await fetch("/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();
    if (json.error) {
      dispatch({ type: "auth/signIn/rejected", error: json.error });
    } else {
      dispatch({ type: "auth/signIn/fulfilled", payload: { json } });
      localStorage.setItem("token", json.token);
      localStorage.setItem("id", json.id);
    }
  };
};

export const loadUsers = () => {
  return async (dispatch) => {
    dispatch({ type: "auth/load/pending" });
    try {
      const response = await fetch("/users");
      const users = await response.json();
      dispatch({ type: "auth/load/fulfilled", payload: users })
    } catch (e) {
      dispatch({ type: "auth/load/rejected", payload: e });
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch({ type: "auth/logOut/fulfilled" });
    localStorage.clear();
  };
};
