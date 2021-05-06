import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
    console.log('bonjour')
    return (
        <HashRouter>
            <main>
                <Switch>
                    <Route path="/register" component={RegisterPage}/>
                    <Route path="/" component={LoginPage}/>
                </Switch>
            </main>
        </HashRouter>
    );
}

export default App;

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement)
