import React from 'react';
import { closeScreen, resetScreen } from '../Store/Gamescreen/screenActions';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  console.log(state);
  const { isUserWinner } = state.screenSystem;
  return { isUserWinner: isUserWinner };
}

const mapDispatchToProps = dispatch => {
  return {
    gsClose: () => dispatch(closeScreen()),
    gsReset: () => { dispatch(resetScreen()) }
  }
};

class Win extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const winnerProfile = (this.props.isUserWinner ?<img className="winGif" src='jasonWin.gif'/> : <img className="winGif" src='jadeWin.gif'/>);
    const replayButton = <button className='replayBTNHidden' onClick={this.props.gsReset}><img className='replayBTNImage' src="replayBTN.gif"/></button>
    const closeButton = <button onClick={this.props.gsClose}>Close "Jason vs Jade"</button>
    return (
      <div className="winScreen">{closeButton}
        <div className="winpage">
          <div className="animatedResult">
            <div>
            {winnerProfile}
            </div>
            <div className="btnDiv">
            {replayButton}
            </div>
          </div>
          
          
        </div>
      </div>
    );
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Win);

