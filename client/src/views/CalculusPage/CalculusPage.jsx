import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

//notifications
import swal from 'sweetalert';

// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Button from "components/CustomButtons/Button.jsx";

//styles
import orientationStyle from "assets/jss/material-kit-react/views/landingPageSections/orientationStyle.jsx";

import bye from "assets/img/bye.gif"

const dashboardRoutes = [];

class CalculusPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialNumber: 100
    }
  }

  notData() {
    swal({
      title: "Por favor ingresa el dato",
      icon: "error",
      button: "Reintentar",
    });
  }

  finish() {
    swal({
      title: "Bien, hemos terminado por hoy!",
      icon: "success",
      button: "¡Si!",
    });
  }

  noticateAndNext = () => {
    swal({
      title: "Muy bien, continuemos",
      icon: "success",
      buttons: "Siguiente"
    })
    .then(data => {
      
    });
  }

  notificateEnd = () => {
    swal({
      title: "Actividad terminada",
      icon: bye,
      button: "Finalizar"
    })
  }

  verifyAndNext = () => {
    swal({
      title: "Ingresa la respuesta",
      content: "input",
      button: {
        text: "Verificar",
        closeModal: false,
      },
    })
      .then(data => {
        if(data === ""){
         this.notData()
        }
        else if(data==this.state.initialNumber-7){
          let { initialNumber } = this.state;
          this.setState({ initialNumber: initialNumber - 7 })
          this.noticateAndNext()
        }
        else {this.notificateEnd()}
      });
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="white"
          routes={dashboardRoutes}
          brand="Memento"
          rightLinks={<HeaderLinks completed={true} />}
          fixed
          {...rest}
        />
        <div style={{ paddingTop: "12rem" }}>

          <h2 className={classes.title}>Restas sucesivas</h2>

          <h2 className={classes.title}>{this.state.initialNumber} - 7</h2>

          <div style={{ textAlign: "center", paddingTop: "3rem" }}>
            <Button
              color="success"
              size="lg"
              style={{ width: "180px", heigth: "100px" }}
              onClick={() => { this.verifyAndNext() }}>
              Contestar
          </Button>
          <Button
              size="lg"
              style={{ width: "180px", heigth: "100px", backgroundColor: "#AF543C" }}
              onClick={() => { this.notificateEnd() }}>
              Detener actividad
          </Button>
          </div>

        </div>
      </div>
    );
  }
}

CalculusPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(orientationStyle)(CalculusPage);