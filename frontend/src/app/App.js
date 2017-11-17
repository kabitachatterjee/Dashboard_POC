import React, { Component } from 'react';
import './App.css';
import {connect} from "react-redux";

class App extends Component {
  state = {

  };



  render() {
    return (
      <div className="App">

      </div>
    );
  }
}



function mapStateToProps ({ food, calendar }) {

	return {
		calendar: dayOrder.map((day) => ({
			day,
			meals: Object.keys(calendar[day]).reduce((meals, meal) => {
				meals[meal] = calendar[day][meal]
					? food[calendar[day][meal]]
					: null;

				return meals
			}, {})
		})),
	}
}

function mapDispatchToProps (dispatch) {
	return {
		selectRecipe: (data) => dispatch(addRecipe(data)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)