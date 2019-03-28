import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Box } from 'grommet';

export default class ApplicationViews extends Component {
	state = {};
	componentDidMount() {}

	render() {
		return (
			<Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
				<Box flex align="center" justify="center" >
                <Route exact path="/" render={(props)=>{return (null)}}/>
                <Route exact path="/volunteers" render={(props)=>{return(null)}}/>
                
                </Box>
			</Box>
		);
	}
}
