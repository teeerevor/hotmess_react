import React, {PropTypes} from 'react';
import SongList from '../containers/SongList';

const Hottest100Page = (props) => {
  return (
    <div>
      <h1>some text</h1>
      <SongList />
    </div>
  );
};

export default Hottest100Page;

//Hottest100Page.propTypes = {
  //actions: PropTypes.object.isRequired,
  //fuelSavings: PropTypes.object.isRequired
//};
//window.App = React.createClass({
  //render() {
    //return (
      //<div>
        //<div className='lists'>
          //<nav className='item-index alpha-index'> {this.renderIndex()} </nav>
          //<Shortlist />
          //<SongList index={this.state.index} sortBy={this.state.sortBy} {...this.props} />
        //</div>
      //</div>
    //);
  //},
  //renderIndex() {
    //return ['TOP'].concat("ABCDEFGHIJKLMNOPQRSTUVW".split('')).concat('XYZ').map((index) => {
      //return <a key={index} onClick={this.changeFilter}>{index}</a>;
    //});
  //},
  //getInitialState: function(){
    //return {
      //index:'top'
    //};
  //},
  //changeFilter(e) {
    //this.setState({index: e.target.text.toLowerCase()});
  //}
//});


//function mapStateToProps(state) {
  //return {
    //fuelSavings: state.fuelSavings
  //};
//}

//function mapDispatchToProps(dispatch) {
  //return {
    //actions: bindActionCreators(actions, dispatch)
  //};
//}

//export default connect(
  //mapStateToProps,
  //mapDispatchToProps
//)(FuelSavingsPage);
