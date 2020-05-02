import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Fingerprint from "@material-ui/icons/Fingerprint";
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

//Style for the page
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

//library to show notifications
import swal from 'sweetalert';

//Image font
import image from "assets/img/hola.jpeg";

//Redux
import { connect } from "react-redux";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

//Front and backend
import { loginUser } from "../../actions/authActions";

//React router for wrapping the page
import { withRouter } from "react-router-dom";


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      cc: 0,
      password: "",
      errorcc: false,
      errorPassword: false,
      errors: {},
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile-page");
    }

    // we add a hidden class to the card and after 300 ms we delete it and the transition appears
    setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      300
    );

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/profile-page"); // push user to dashboard when they login
    }
    if (this.props.errors!==nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
      this.errorNotificationBack(nextProps.errors.msg)
    }
  }

  errorNotificationBack = (msg) => {
    swal({
      title: "Error",
      text: msg,
      icon: "error",
      button: "Reintentar",
    })
  }

  validateInfo() {
    var validate = true

    if (this.state.cc === 0) {
      this.setState({ errorcc: true });
      validate = false
    }

    if (this.state.password === "") {
      this.setState({ errorPassword: true });
      validate = false
    }

    return validate
  }

  renderButtonComplete() {
    return <div style={{textAlign: "right"}}>
      
      <Button
        component={Link}
        color="success"
        size="lg"
        to="/"
        justIcon 
        round
      >
        <ExitToAppIcon  style={{width: "60px", height: "60px", marginRight: "3px"}}  />
      </Button>
      <br />

      <br />
      <br />
    </div>
  }

  errorNotification = () => {
    swal({
      title: "Faltan datos",
      text: "Completa todo el formulario",
      icon: "error",
      button: "Reintentar",
    })
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    var valit = this.validateInfo()

    if (valit) {

      const userData = {
        cc: this.state.cc,
        password: this.state.password,
      };

      this.props.loginUser(userData);
    } else {
  
      this.errorNotification();
    }
  };

  render() {
    const { classes, errors, ...rest } = this.props;

    return (
      <div>
        <Header
          absolute
          /* color="transparent"*/
          brand="Memento"
          rightLinks={<HeaderLinks />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form} noValidate onSubmit={this.onSubmit}>
                    <CardHeader color="info" className={classes.cardHeader}>
                      <h4 className={classes.subtitle}>Inicia sesión</h4>
                    </CardHeader>
                    <CardBody>
                    <CustomInput
                        value={this.state.cc}
                        labelText="Cedula de ciudadania"
                        id="cc"
                        error={this.state.errorcc}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          onChange: this.onChange,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Fingerprint className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />

                      <CustomInput
                        value={this.state.pass}
                        labelText="Contraseña"
                        id="password"
                        error={this.state.errorPassword}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.onChange,
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          autoComplete: "off"
                        }}
                      />

                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        simple color="info"
                        size="lg"
                        type="submit"
                      >
                        Iniciar terapia
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>

            {this.renderButtonComplete()}
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser })(withStyles(loginPageStyle)(withRouter(LoginPage)));
