import HomePage from "./components/HomePage";
import SignUp from "./components/Sign/SignUp";
import {Provider} from "react-redux";
import {store} from "./redux/configureStore";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from "./components/Sign/SignIn";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/signup' element={<SignUp/>}/>
                    <Route path='/signin' element={<SignIn/>}/>
                    <Route path='/todos' element={<TodoList/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    </div>
  );
}

export default App;
