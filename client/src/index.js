import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import {persistor, store} from "./store";
import { PersistGate } from 'redux-persist/lib/integration/react';

// private route for login
import PrivateRoute from "./views/LoginPage/PrivateRoute";

import "assets/scss/material-kit-react.scss?v=1.7.0";

// pages in the project
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import RegisterPage from "views/RegisterPage/RegisterPage.jsx";
import ActivitiesPage from "views/ActivitiesPage/ActivitiesPage";
import QuestionsPage from "views/QuestionsPage/QuestionsPage";
import AlbumUploadPage from "views/AlbumUploadPage/AlbumUploadPage";
import FamiliarUploadPage from "views/FamiliarUploadPage/FamiliarUploadPage";
import AlbumPage from "views/AlbumPage/Albumpage";
import SelectAlbumViewPage from "views/SelectAlbumViewPage/AlbumViewPage";
import AlbumCarouselPage from "views/AlbumCarouselPage/AlbumCarouselpage";
import AlbumPersonPage from "views/AlbumPersonPage/AlbumPersonPage";
import UploadProfilePage from "views/UploadProfilePage/UploadProfilePage";
import MementoLandingPage from "views/MementoLandingPage/MementoLandingPage"
import SpatialOptionsPage from "views/SpatialOptionsPage/SpatialOptionsPage"
import IdentificationPage from "views/IdentificationPage/IdentificationPage"
import OrientationPage from "views/OrientationPage/OrientationPage"
import QuizAlbumPage from "views/QuizAlbumPage/QuizAlbumPage"
import CalculusPage from "views/CalculusPage/CalculusPage"

var hist = createBrowserHistory();

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() /1000; // to get in milliseconds
  
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login-page";
  }
}

ReactDOM.render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <Router history={hist}>
        <Switch>
          <Route path="/login-page" component={LoginPage} />
          <Route path="/register-page" component={RegisterPage} />
          <PrivateRoute exact path="/activities-page" component={ActivitiesPage} />
          <PrivateRoute exact path="/espatial-page" component={SpatialOptionsPage} />
          <PrivateRoute exact path="/questions-page" component={QuestionsPage} />
          <PrivateRoute exact path="/albumUpload-page" component={AlbumUploadPage} />
          <PrivateRoute exact path="/familiarUpload-page" component={FamiliarUploadPage}/>
          <PrivateRoute exact path="/album-page" component={AlbumPage}/>
          <PrivateRoute exact path="/album-carousel-page" component={AlbumCarouselPage}/>
          <PrivateRoute exact path="/select-view-album-page" component={SelectAlbumViewPage}/>
          <PrivateRoute exact path="/select-person-album-page" component={AlbumPersonPage}/>
          <PrivateRoute exact path="/upload-imageProfile-person-page" component={UploadProfilePage}/>
          <PrivateRoute exact path="/identification-page" component={IdentificationPage} />
          <PrivateRoute exact path="/orientation-page" component={OrientationPage} />
          <PrivateRoute exact path="/calculus-page" component={CalculusPage} />
          <PrivateRoute exact path="/quiz-album-page" component={QuizAlbumPage} />
          <PrivateRoute exact path="/profile-page" component={ProfilePage} />
          <Route path="/" component={MementoLandingPage} />
        </Switch>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
