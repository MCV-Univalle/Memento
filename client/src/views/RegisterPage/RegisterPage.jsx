import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Phone from "@material-ui/icons/Phone";
import Location from "@material-ui/icons/LocationOn";
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
import RadioInput from "components/CustomInput/RadioInput.jsx";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";

//library to show notifications
import swal from 'sweetalert';

//Styles of login using in  the page too
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
//Font of the page
//import image from "assets/img/cute.jpeg";
import mel from "assets/img/Mel.jpg"
//Connection with redux
import { connect } from "react-redux";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

//
import { registerUser } from "../../actions/authActions";
//React router for wrapping the page
import { withRouter } from "react-router-dom";
//classnames
import classnames from "classnames";


class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      name: "",
      last_name: "",
      cc: 0,
      adress: "",
      phone: 0,
      password: "",
      equalpassword: "",
      demential_stage: "",
      date: "",
      errorName: false,
      errorLast_name: false,
      errorcc: false,
      errorAdress: false,
      errorPhone: false,
      errorPassword: false,
      errorEqualpassword: false,
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
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

  componentDidMount() {
    // we add a hidden class to the card and after 300 ms we delete it and the transition appears
    setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      300
    );
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeExa = date => {
    this.setState({ date: date.format('YYYY-MM-DD') });
  };

  handleChangeEnabled = event => {
    this.setState({ demential_stage: event.target.value });
  };

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

  validateInfo() {
    var validate = true
    if (this.state.name === "") {
      this.setState({ errorName: true });
      validate = false
    }

    if (this.state.last_name === "") {
      this.setState({ errorLast_name: true });
      validate = false
    }

    if (this.state.cc === 0) {
      this.setState({ errorcc: true });
      validate = false
    }

    if (this.state.adress === "") {
      this.setState({ errorAdress: true });
      validate = false
    }

    if (this.state.phone === 0) {
      this.setState({ errorPhone: true });
      validate = false
    }

    if (this.state.password === "") {
      this.setState({ errorPassword: true });
      validate = false
    }

    if (this.state.equalpassword === "") {
      this.setState({ errorEqualpassword: true });
      validate = false
    }
    if (this.state.demential_stage === "" ||
      this.state.date === "") {
      validate = false
    }
    return validate
  }

  errorNotification = () => {
    swal({
      title: "Faltan datos",
      text: "Completa todo el formulario",
      icon: "error",
      button: "Reintentar",
    })
  }

  errorNotificationEqualPass = () => {
    swal({
      title: "Las contraseñas deben coincidir",
      text: "Verifica y vuelve a intentarlo",
      icon: "error",
      button: "Reintentar",
    })
  }

  errorLengthPass = () => {
    swal({
      title: "La contraseña debe ser de 8 o más caracteres de longitud",
      text: "Verifica y vuelve a intentarlo",
      icon: "error",
      button: "Reintentar",
    })
  }

  validateLength() {
    var limit = true
    if (this.state.password.length < 8) {
      limit = false
    }
    return limit
  }

  validateEqualPass() {
    var equal = true
    if (this.state.password !== this.state.equalpassword) {
      equal = false
    }
    return equal
  }

  verifyDate = current => {
    var yesterday = Datetime.moment().subtract(1, 'day')
    return current.isBefore( yesterday );
  }

  onSubmit = e => {
    e.preventDefault();
    var valit = this.validateInfo()

    if (valit) {
      if (this.validateEqualPass()) {
        if (this.validateLength()) {
          const newUser = {
            name: this.state.name.toLowerCase(),
            last_name: this.state.last_name.toLowerCase(),
            cc: this.state.cc,
            adress: this.state.adress.toLowerCase(),
            phone: this.state.phone,
            password: this.state.password,
            dementia_stage: this.state.demential_stage,
            birthdate: this.state.date,
            profileImg: ""
          };

          this.props.registerUser(newUser, this.props.history); 
        }
        else {
          this.errorLengthPass();
        }

      }
      else {
        this.errorNotificationEqualPass();
      }

    }
    else {
      this.errorNotification();
    }

  };

  render() {
    const { classes, errors, ...rest } = this.props;

    return (
      <div>
        <Header
          absolute
          brand="Memento"
          rightLinks={<HeaderLinks />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + mel + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={5}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form} noValidate onSubmit={this.onSubmit}>
                    <CardHeader color="info" className={classes.cardHeader}>
                      <h4 className={classes.subtitle}> Registrate</h4>
                    </CardHeader>
                    <CardBody>
                      <h4 className={classes.lineSubtitle}>Información basica</h4>
                      <CustomInput
                        value={this.state.name}
                        labelText="Nombre(s)"
                        id="name"
                        error={this.state.errorName}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          onChange: this.onChange,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Person className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        value={this.state.last_name}
                        labelText="Apellidos"
                        id="last_name"
                        error={this.state.errorLast_name}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          onChange: this.onChange,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Person className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
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
                        value={this.state.adress}
                        labelText="Dirección"
                        id="adress"
                        error={this.state.errorAdress}
                        className={classnames("", {
                          invalid: errors.adress
                        })}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          onChange: this.onChange,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Location className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        value={this.state.phone}
                        labelText="Telefono"
                        id="phone"
                        error={this.state.errorPhone}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          onChange: this.onChange,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Phone className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        value={this.state.password}
                        labelText="Contraseña"
                        id="password"
                        error={this.state.errorPassword}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          onChange: this.onChange,
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
                      <CustomInput
                        value={this.state.equalpassword}
                        labelText="Repetir contraseña"
                        id="equalpassword"
                        error={this.state.errorEqualpassword}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          onChange: this.onChange,
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
                      <br />
                      <br />
                      <Datetime
                        value={this.state.date}
                        timeFormat={false}
                        onChange={this.onChangeExa}
                        isValidDate={this.verifyDate}
                        closeOnSelect={true}
                        inputProps={{
                          placeholder: "Fecha de nacimiento",
                          style: { fontFamily: '"Nunito", "Roboto"' }

                        }}
                      />
                      <br />
                      <br />

                      <h4 className={classes.lineSubtitle}>Estado de la demencia</h4>

                      <RadioInput
                        checked={this.state.demential_stage === "Inicial"}
                        onChange={this.handleChangeEnabled}
                        value="Inicial"
                        label="Inicial"
                      ></RadioInput>

                      <RadioInput
                        checked={this.state.demential_stage === "Moderada"}
                        onChange={this.handleChangeEnabled}
                        value="Moderada"
                        label="Moderada"
                      ></RadioInput>

                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        simple color="info"
                        size="lg"
                        type="submit"
                      >
                        Registrar paciente
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

RegisterPage.propTypes = {
  classes: PropTypes.object,
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(
  mapStateToProps,
  { registerUser })(withStyles(loginPageStyle)(withRouter(RegisterPage)));