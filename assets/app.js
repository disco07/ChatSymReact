import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import {Provider} from "react-redux";
import store from "./redux/store";

const App = () => {

    return (
        <Provider store={store}>
            <HashRouter>
                <main>
                    <Switch>
                        <Route path="/conversation" component={ChatPage}/>
                        <Route path="/register" component={RegisterPage}/>
                        <Route path="/" component={LoginPage}/>
                    </Switch>
                </main>
            </HashRouter>
        </Provider>
    );
}

export default App;

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement)
