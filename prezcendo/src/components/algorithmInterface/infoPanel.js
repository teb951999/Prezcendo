import PropTypes from "prop-types";
import "../../css/VersionB.css";
import { connect } from "react-redux";
import React, { Component } from "react";

import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { FlexRow, FlexCol, Typography, TooltipButton, SlidersDisplay } from "./common";
import actions from "../../store/actions";

import MusicBox from './musicBox';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    bridgeInfo: state.bridges[state.interfaceSettings.modal.selectedBridge],
    revisionID: state.interfaceSettings.modal.selectedRevision,
    isLastRevision: state.interfaceSettings.modal.selectedRevision == state.bridges[state.interfaceSettings.modal.selectedBridge].revisions.length -1,
  };
}

class InfoPanel extends Component {
  constructor(props) {
      super(props);

      this.state= {
        parameters: {
          happySad: 54,
          simpleComplex: 52,
          duration: 9,
        },
        editorOpen: false,
      };
  }

  closeEditor = () => this.setState({editorOpen: false});

  createRevision = () => {
    this.props.dispatch(actions.createRevision(0)); // Create a dummy revision
  }

  changeSlider( parameter, value ) {
    var newParam = this.state.parameters;
    newParam[parameter] = value;
    this.setState({ parameters: newParam });
  }

  render() {
    return(
      <FlexCol className="VersionB Generate">
        <MusicBox bridge={0} rev={0} />
        <Typography>NAME: { this.props.bridgeInfo.revisions[this.props.revisionID].name ? this.props.bridgeInfo.revisions[this.props.revisionID].name : ("Generation " + (this.props.revisionID + 1) ) }</Typography>
        <Typography> GENERATION: {this.props.revisionID + 1} </Typography>
        <SlidersDisplay parameters={this.state.parameters} />

        <TooltipButton buttonText="DELETE GENERATION AND ALL DESCENDENTS" />
        <TooltipButton buttonText="SET AS BRIDGE" />
        { this.props.isLastRevision && 
          <TooltipButton 
            buttonText="CREATE NEW GENERATION" 
            tooltipText="Generate children using this bridge as a parent" 
            onClick={() => this.setState({ editorOpen: true})} 
          />
        }

        <Modal isOpen={this.state.editorOpen} toggle={this.closeEditor} >
          <ModalHeader toggle={this.closeEditor}>
            NEW GENERATION
          </ModalHeader>
          <ModalBody>
            <Typography> Parent: </Typography>
            <MusicBox bridge={0} rev={0} style={{ width: "30%"}}/>
            <SlidersDisplay 
              parameters={this.state.parameters}
              changeSlider={(parameter, value) => this.changeSlider(parameter, value)}
            />
            <FlexRow>
              <TooltipButton buttonText="Reset to Parent" />
              <TooltipButton buttonText="GENERATE" />
            </FlexRow>
          </ModalBody>
        </Modal>  
      </FlexCol>
    );
  }
}

InfoPanel.propTypes = {
  bridgeInfo: PropTypes.object,
  dispatch: PropTypes.func,
  revisionID: PropTypes.number,
  isFirstRevision: PropTypes.bool,
  isLastRevision: PropTypes.bool,
};

export default connect(mapStateToProps)(InfoPanel);
