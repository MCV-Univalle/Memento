import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchQuestions } from "../../actions/questionsAction";
import { fetchRelations } from "../../actions/relationAction";

//React router for wrapping the page
import { withRouter } from "react-router-dom";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Header from "components/Header/Header.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Button from "components/CustomButtons/Button.jsx";
import moment from "moment";

//library to show notifications
import swal from "sweetalert";

// Material icons
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

import profileDefaultImg from "assets/img/faces/NotImage.png";
//import coverDefaultImg from "assets/img/EmptyImage.png"

import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";

class ProfilePage extends React.Component {
  componentDidMount() {
    console.log(this.props.questions.flagQuestions);
    if (!this.props.questions.flagQuestions) {
      this.props.fetchQuestions(this.props.auth.user.sub);
      this.props.fetchRelations(this.props.auth.user.sub);
    }
  }

  renderQuestion(question, key) {
    return (
      <div key={key}>
        <h5>{question.question}</h5>
        <p>{question.answer}</p>
      </div>
    );
  }

  capitalizeLetter = (name) =>{
      if (typeof name !== 'string') return ''
      name = name.split(" ");
      var str = ""
      var i;
      for (i = 0; i < name.length; i++) {
        var partName = name[i].charAt(0).toUpperCase() + name[i].slice(1)
        if (name.length-1==i){
          str = str + partName
        }
        else str = str + partName + " "
      }

      return str
  }

  imageClick = () => {
    swal("¿Quiéres cambiar tu foto de perfil?", {
      buttons: {
        cancel: "No",
        catch: {
          text: "Si",
          value: true,
        },
        defeat: false,
      },
    }).then((value) => {
      if (value) {
        this.redirectTo();
      }
    });
  };

  redirectTo = () => {
    this.props.history.push("/upload-imageProfile-person-page");
  };

  renderButtonComplete() {
    return (
      <div style={{ textAlign: "right" }}>
        <Button
          component={Link}
          color="success"
          size="lg"
          to="/activities-page"
          justIcon
          round
        >
          <PlayCircleOutlineIcon
            style={{ width: "60px", height: "60px", marginRight: "3px" }}
          />
        </Button>
        <br />

        <br />
        <br />
      </div>
    );
  }

  returnImgActual(img) {
    if (img == null || img == "") {
      return profileDefaultImg;
    } else return "../../../../../../" + img;
  }

  render() {
    const { userData } = this.props.auth;
    let momentob = new Date(userData.birthdate);
    var age = moment().diff(momentob, "years");
    const { questions } = this.props.questions;
    const imgPro = this.returnImgActual(userData.profileImg);
    const { classes, ...rest } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    return (
      <div>
        <Header
          //color="transparent"
          brand="Memento"
          rightLinks={<HeaderLinks completed={true} />}
          fixed
          changeColorOnScroll={{
            height: 300,
            color: "white",
          }}
          {...rest}
        />
        <Parallax filter small image={require("assets/img/EmptyImage.png")} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={10} sm={10} md={9}>
                  <div className={classes.profile}>
                    <div>
                      <img
                        src={imgPro}
                        alt="..."
                        className={imageClasses}
                        onClick={this.imageClick}
                        style={{ pointerEvents: "all", cursor: "pointer",}}
                      />
                    </div>
                    <div className={classes.name}>
                      <h2 className={classes.title}>
                        {" "}
                        {userData.name} {userData.last_name}
                      </h2>
                      <h4>
                        Hola, soy {this.capitalizeLetter(userData.name)}, tengo {age} años.{" "}
                      </h4>
                      {/*  {questions.length !== 0 ? questions[0].score : ""} </h4> 
                      {questions.map((question,key)=>{
                        return this.renderQuestion(question,key);
                      })} */}
                    </div>
                    {this.renderButtonComplete()}

                    {/* {questions.length === 0 ? this.renderButtonComplete() : "jkfjg"} */}
                  </div>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object,
  auth: PropTypes.object.isRequired,
  questions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  questions: state.questions,
});

export default connect(
  mapStateToProps,
  { fetchQuestions, fetchRelations }
)(withStyles(profilePageStyle)(withRouter(ProfilePage)));
