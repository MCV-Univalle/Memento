import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

//notifications
import swal from "sweetalert";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Button from "components/CustomButtons/Button.jsx";

//styles
import orientationStyle from "assets/jss/material-kit-react/views/landingPageSections/orientationStyle.jsx";

import bye from "assets/img/bye.gif";

const _ = require("lodash");
const dashboardRoutes = [];
const layout = _.range(0, 16).map((n) => {
  const row = Math.floor(n / 4);
  const col = n % 4;
  return [80 * col, 80 * row];
});

// style
const game = {
  display: "flex",
  lineHeight: "70px",
  height: "300px",
  width: "100%",
  justifyContent: "center",
  marginLeft: "-80px",
};

const cell = {
  ...game,
  width: "70px",
  height: "70px",
  borderRadius: "4px",
  background: "white",
  color: "#333",
  fontSize: " 1.2rem",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "all .3s ease-in",
  position: "absolute",
};

const empty = {
  opacity: "0",
};

class PuzzlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialNumber: 100,
      positions: _.shuffle(_.range(0, 16)),
    };
  }

  updatePosition(index) {
    let { positions } = this.state;
    let emptyIndex = positions.indexOf(0);
    let targetIndex = positions.indexOf(index);
    const dif = Math.abs(targetIndex - emptyIndex);

    if (dif == 1 || dif == 4) {
      positions[emptyIndex] = index;
      positions[targetIndex] = 0;
      this.setState({ positions });
      let win = _.every(positions, (value, index, array) => {
        value = value || 16;
        return index === 0 || parseInt(array[index - 1]) <= parseInt(value);
      });
      if (win) {
        window.alert("U Win!!!");
      }
    }
  }

  notificateWin = () => {
    swal({
      title: "¡Ganaste!",
      icon: bye,
      button: "Finalizar",
    });
  };

  notificateEnd = () => {
    swal({
      title: "Actividad terminada",
      icon: bye,
      button: "Finalizar",
    });
  };

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div
        style={{
          backgroundColor: "#ffcccc",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Header
          color="white"
          routes={dashboardRoutes}
          brand="Memento"
          rightLinks={<HeaderLinks completed={true} />}
          fixed
          {...rest}
        />

        <div
          style={{
            alignItems: "center",
            paddingTop: "100px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 className={classes.title}>Puzzle</h2>
          <div style={game}>
            {this.state.positions.map((i, key) => {
              let cellClass = key ? cell : { ...empty, ...cell };
              let [x, y] = layout[this.state.positions.indexOf(key)];
              return (
                <div
                  key={key}
                  onClick={this.updatePosition.bind(this, key)}
                  style={{
                    transform: `translate3d(${x}px,${y}px,0) scale(1.1)`,
                    ...cellClass,
                  }}
                >
                  {key}
                </div>
              );
            })}
          </div>

          <div
            style={{
              marginTop: "50px",
              textAlign: "center",
              height: "100px",
              width: "100vw",
            }}
          >
            <Button
              size="lg"
              style={{
                backgroundColor: "#ff8080",
              }}
              onClick={() => {
                this.notificateEnd();
              }}
            >
              Detener actividad
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

PuzzlePage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(orientationStyle)(PuzzlePage);
