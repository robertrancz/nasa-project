
import { useEffect } from 'react';
// import { Appear, Button, Loading, Paragraph } from "arwes";
// import {Routes, Route, useHistory} from 'react-router-dom';
// import Clickable from "../components/Clickable";

const Login = () => {

  // const history = useHistory();

  // const navigateToGoogleLogin = () => {    
  //   let path = 'https:8000/v1/auth/google-login';
  //   history.push(path);
  // };

  useEffect(() => {
    window.location.replace('https://localhost:8000/v1/auth/google-login');
  }, [])
    
    return (
        <div id="loginDiv" />
      //   <Clickable>
      //   <Button animate 
      //     onClick={navigateToGoogleLogin}       
          
      //     layer="success">
      //     Login with Google ✔
      //   </Button>
      // </Clickable>
    );
}

export default Login;