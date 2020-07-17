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
import identificationStyle from "assets/jss/material-kit-react/views/landingPageSections/identificationStyle.jsx";

const dashboardRoutes = [];

class IdentificationPage extends React.Component {
  constructor(props) {
    super(props)
    var randAnimal = (Math.floor(Math.random() * 7) + 1)
    this.state = {
      score: 0,
      actualAnimal: "Pajaro",
      actualImg: "birds/" + randAnimal + ".jpeg"
    }
  }

  answerClick = () => {
    swal({
      title: this.state.actualAnimal,
      buttons: {
        catch: {
          text: "Si, acerté",
          value: true,
        },
        cancel: "No acerté",
        defeat: false,
      },
    })
    .then((value) => {
      if (value) {
        this.point()
      }
      else this.notPoint()
    });
  }

  point = () => {
    swal({
      title: "Felicidades tienes +1 punto",
      icon: "success",
      buttons: {
        catch: {
          text: "Siguiente",
          value: true,
        },
      },
    })
    .then((value) => {
      if (value) {
        this.returnImg()
        let { score } = this.state;
        this.setState({ score: score + 1});
      }
    });
  }

  notPoint = () => {
    swal({
      title: "¡Sigue intentandolo!",
      icon: "error",
      buttons: {
        catch: {
          text: "Siguiente",
        },
      },
    })
    .then(
        this.returnImg()
    );
  }

  areYouSure = () => {
    swal({
      title: "¿Estás seguro de terminar el juego?",
      text: "Se guardara la puntuación y serás redirigido al perfil",
      icon: "warning",
      buttons: ["¡No!", "Si, terminar"],
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        this.props.history.push("/profile-page");
      }
    });
  }

  returnImg = () => {
    var img = ""
    let randAnimal = (Math.floor(Math.random() * 7) + 1)
    
    if(randAnimal===1){
      this.setState({ actualAnimal: "Pajaro" });

      let animal = "birds/"
      let randAnimal = (Math.floor(Math.random() * 7) + 1)
    
      img = animal  + randAnimal  + ".jpeg"
    }

    if(randAnimal===2){
      this.setState({ actualAnimal: "Gato" });

      let animal = "cats/c"
      let randAnimal = (Math.floor(Math.random() * 7) + 1)

      img = animal  + randAnimal + ".jpeg"
    }

    if(randAnimal===3){
      this.setState({ actualAnimal: "Vaca" });

      let animal = "cows/"
      let randAnimal = (Math.floor(Math.random() * 7) + 1)

      img = animal + "c" + randAnimal + ".jpeg"
    }

    if(randAnimal===4){
      this.setState({ actualAnimal: "Perro" });

      let animal = "dogs/"
      let randAnimal = (Math.floor(Math.random() * 7) + 1)

      img = animal + "c" + randAnimal + ".jpg"
    }

    if(randAnimal===5){
      this.setState({ actualAnimal: "Pez" });

      let animal = "fish/"
      let randAnimal = (Math.floor(Math.random() * 7) + 1)

      img = animal + "f" + randAnimal + ".jpeg"
    }

    if(randAnimal===6){
      this.setState({ actualAnimal: "Cerdo" });

      let animal = "pigs/"
      let randAnimal = (Math.floor(Math.random() * 7) + 1)

      img = animal + "p" + randAnimal + ".jpeg"
    }

    if(randAnimal===7){
      this.setState({ actualAnimal: "Conejo" });

      let animal = "rabbits/"
      let randAnimal = (Math.floor(Math.random() * 7) + 1)

      img = animal + "r" + randAnimal + ".jpeg"
    }

    if(randAnimal===8){
      this.setState({ actualAnimal: "Tortuga" });

      let animal = "turtles/"
      let randAnimal = (Math.floor(Math.random() * 7) + 1)

      img = animal + "t" + randAnimal + ".jpeg"
    }

    this.setState({ actualImg: img });

  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="white"
          routes={dashboardRoutes}
          brand="Memento"
          rightLinks={<HeaderLinks completed={true}/>}
          fixed
          {...rest}
        />
        <div style={{paddingTop:"6rem"}}>
          <img src={require("assets/img/domesticAnimals/" + this.state.actualImg)} alt="..." className={classes.img} />

          <div>

          <h2 className={classes.title}>¿Qué animal es?</h2>
          </div>

          <div style={{textAlign: "center"}}>
          <Button
              color="success"
              size="lg"
              style={{width:"280px"}}
              onClick={() => { this.answerClick() }}>
              Respuesta
          </Button>
          <Button
              color="danger"
              size="lg"
              style={{width:"280px",
                backgroundColor: "#ff8080"
              }}
              onClick={() => { this.areYouSure() }}>
              Terminar juego
          </Button>

          </div>

        </div>
      </div>
    );
  }
}

IdentificationPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(identificationStyle)(IdentificationPage);