import PropTypes from "prop-types";
import "../../css/VersionB.css";
import { connect } from "react-redux";
import React, { Component } from "react";

import { Tooltip, Modal, ModalHeader, ModalBody } from "reactstrap";
import { FlexRow, FlexCol, Typography } from "./common";
import actions from "../../store/actions";
import {
  Row,
  Col,
  Input,
  Button,
} from "reactstrap";


import MusicBox from './musicBox';

class InfoPanel extends Component {
  constructor(props) {
      super(props);
      
      this.state={
        tooltipOpen: false,
        favTrack: null,
      };
  }

  render () {
    return (
      <div className="VersionB">
        <VersionBGenerate revisions={ this.props.bridgeInfo.revisions } dispatch={ this.props.dispatch }/>
        { this.props.bridgeInfo.revisions && this.props.bridgeInfo.revisions.length != 0 && 
          <div className="VersionB Playback">
            { this.props.bridgeInfo.revisions.map( ( bridge, i ) =>
              <div key={ i } className="VersionB Playback-Button" onClick={ () => console.log("Playing track ", i + 1) }>
                Track {i+1}
                <i className={ this.state.favTrack == i ? "fas fa-star": "far fa-star"} onClick={ () => this.setState({ favTrack: i }) } />
                <Button color={"primary"} style={{ width: "140px", height: "70px"}}>
                  <i className="fa fa-play" />
                </Button>
              </div>
            ) }
          </div>
        }
      </div>
    );
  }
}

InfoPanel.propTypes = {
  onExit: PropTypes.func,
  bridgeVersionA: PropTypes.bool,
  bridgeInfo: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    bridgeInfo: state.bridges[state.interfaceSettings.modal.selectedBridge]
  };
}

export default connect(mapStateToProps)(InfoPanel);

class VersionBGenerate extends Component {
  constructor(props) {
      super(props);

      this.state= {
        parameters: {
          happySad:{
            names: [ "Happy", "Sad" ],
            min: 0,
            max: 100,
            value: 50,
          },
          simpleComplex:{
            names: [ "Simple", "Complex" ],
            min: 0,
            max: 100,
            value: 50,
          },
          duration:{
            names: [ "Duration", "(seconds)" ],
            min: 0,
            max: 10,
            value: 5,
          },
        },
        tooltipOpen: false,
        editorOpen: false,
      };
  }

  closeEditor = () => this.setState({editorOpen: false});

  createRevision = () => {
    this.props.dispatch(actions.createRevision(0)); // Create a dummy revision
  }

  changeSlider( parameter, value ) {
    var newParam = this.state.parameters;
    newParam[parameter].value = value;
    this.setState({ parameters: newParam });
  }

  render() {
    const param = this.state.parameters;
    return(
      <div className="VersionB Generate">
        <Col>
          { Object.keys(param).map( ( parameter, i ) =>
            <Col key={ i }>
              <Row>
                <Col>
                  <Typography>{ param[parameter].names[0] }</Typography>
                </Col>
                <Col>
                  <Input
                    type="range"
                    min={ param[parameter].min }
                    max={ param[parameter].max }
                    value={ param[parameter].value }
                    onChange={ (e) => this.changeSlider( parameter, e.target.value )}
                  />
                </Col>
                <Col>
                  <Typography>{ param[parameter].names[1] }</Typography>
                </Col>
              </Row>
              <Row style={{ justifyContent:"center"}}>
                <Typography>{ param[parameter].value }</Typography>
              </Row>
            </Col>
          ) }
        </Col>

        <Modal isOpen={this.state.editorOpen} toggle={this.closeEditor} >
          <ModalHeader toggle={this.closeEditor}>
            NEW GENERATION
          </ModalHeader>
          <ModalBody>
            SECOND MODAL
          </ModalBody>
        </Modal>
        
        <div className="VersionB Button-Container">
          <Button color={"primary"} onClick={this.createRevision}>
            Generate
          </Button>
          <Button color={"primary"}
            onClick={() => this.setState({editorOpen: true})}
          >
            Clear
          </Button>
          <Button color={"primary"} id="TooltipHistory">
            History
          </Button>
          <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target="TooltipHistory" toggle={ () => this.setState({ tooltipOpen: !this.state.tooltipOpen })}>
            Currently not available
          </Tooltip>
        </div>
      </div>
    );
  }
}

VersionBGenerate.propTypes = {
  dispatch: PropTypes.func,
  revisions: PropTypes.array,
};
