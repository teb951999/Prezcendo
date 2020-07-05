/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import "../../css/VersionB.css";
import { connect } from "react-redux";
import { Component } from "react";

import { FlexRow, FlexCol } from "./common";
import SettingsControl from "./settingsControl";

import HistoryBar from "../algorithmInterface/historyBar";
import MusicBox from '../algorithmInterface/musicBox';

const EditingPage = ({ onExit }) => {
  return (
    <div>
      <FlexRow
        css={css`
          justify-content: center;
          background: rgba(38, 38, 38);
          height: 100px;
        `}
      >
        <HistoryBar bridgeID={0} />
      </FlexRow>
      <FlexRow
        css={css`
          height: 50vh;
        `}
      >
        <FlexCol
          css={css`
            width: 50%;
            margin-right: 3%;
          `}
        >
          <MusicBox />
        </FlexCol>
        <FlexCol
          css={css`
            width: 50%;
            align-items: center;
            justify-content: center;
          `}
        >
          {/* Selection Box */}

          <SettingsControl onExit={onExit} />
        </FlexCol>


      </FlexRow>
    </div>
  );
};

EditingPage.propTypes = {
  onExit: PropTypes.func,
  bridgeVersionA: PropTypes.bool,
  revisions: PropTypes.array,
  dispatch: PropTypes.func,
};

function mapStateToProps(state, ownProps) {
  return {
    revisions: state.bridges[0].revisions,
    ...ownProps,
  };
}

export default connect(mapStateToProps)(EditingPage);

class VersionBGenerate extends Component {
  constructor(props) {
      super(props);

      this.state= {
        happySad:{
            names: [ "Happy", "Sad" ],
            min: 0,
            max: 1,
            value: 0.5,
        },
        simpleComplex:{
          names: [ "Simple", "Complex" ],
          min: 0,
          max: 1,
          value: 0.5,
        },
        duration:{
          names: [ "Duration", "(seconds)" ],
          min: 0,
          max: 10,
          value: 5,
        },
      }
  }

  createRevision = () => {
    if(this.props.revisions.length == 0) {
        // Create a revision
        this.props.dispatch(actions.createRevision(0, 0)); // Create a dummy revision
    }
  }

  render() {
    return(
      <div className="VersionB Generate">
        <img 
          src={require("../../assets/GenreMap.PNG")}
          alt="Genre Map"
          style={{ height: "350px"}}
        />
        <Col>
          { Object.keys(this.state).map( ( parameter, i ) =>
            <Col key={ i }>
              <Row>
                <Col>
                  <Typography>{ this.state[parameter].names[0] }</Typography>
                </Col>
                <Col>
                  <Input
                    type="range"
                    min={ this.state[parameter].min }
                    max={ this.state[parameter].max }
                    value={ this.state[parameter].value }
                    onChange={ (e) => this.setState({ [parameter]: {...this.state[parameter], value: e.target.value }})}
                  ></Input>
                </Col>
                <Col>
                  <Typography>{ this.state[parameter].names[1] }</Typography>
                </Col>
              </Row>
              <Row style={{ justifyContent:"center"}}>
                <Typography>{ this.state[parameter].value }</Typography>
              </Row>
            </Col>
          ) }
        </Col>
        
        <div className="VersionB Button-Container">
          <button className="VersionB Button" onClick={this.createRevision}>
            Generate
          </button>
          <button className="VersionB Button">
            Clear
          </button>
        </div>
      </div>
    );
  }
}

VersionBGenerate.propTypes = {
  dispatch: PropTypes.func,
  revisions: PropTypes.array,
};
