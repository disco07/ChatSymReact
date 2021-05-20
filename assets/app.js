import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import {Provider} from "react-redux";
import store from "./redux/store";
import AuthContext from "./contexts/AuthContext";
import Services from "./services/Services"
import PrivateRoute from "./components/PrivateRoute";

Services.setup()

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(Services.isAuthenticated);
    return (
        <Provider store={store}>
            <AuthContext.Provider value={{
                isAuthenticated,
                setIsAuthenticated
            }}>
                <HashRouter>
                    <main>
                        <Switch>
                            <PrivateRoute path="/conversation" component={ChatPage}/>
                            <Route path="/register" component={RegisterPage}/>
                            <Route path="/" component={LoginPage}/>
                        </Switch>
                    </main>
                </HashRouter>
            </AuthContext.Provider>
        </Provider>
    );
}

export default App;

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement)
