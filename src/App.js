import './App.sass';
import { Provider } from 'react-redux';
import history from './core/history';
import AppRouter from './core/routes';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import store from './core/services/redux/store';


function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <AppRouter />
      </Router>
    </Provider>
  );
}

export default App;
