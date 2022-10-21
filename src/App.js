import Home from './components/Home';
import Auth from './components/Auth';
import { Fragment } from 'react';

const App = ()=>{
  const token = localStorage.getItem("token");

  return (
    <Fragment>
      {token?<Home/>:<Auth/>}
    </Fragment>
  );
}

export default App;