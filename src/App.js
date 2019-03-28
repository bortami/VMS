import React, { Component } from 'react';
import NavBar from './components/navigation/NavBar';
import { Box, Grommet, ResponsiveContext } from 'grommet';
import ApplicationViews from './ApplicationViews';

const theme = {
	global: {
		colors: {
			brand: '#51291e',
			dark: '#301014',
			white: '#edf4ed',
			accent: '#abd1b5',
			basic: '#79b791'
		},
		font: {
			family: [ 'Josefin Sans' ],
			size: '14px',
			height: '20px'
		}
	}
};

class App extends Component {
	render() {
		return (
			<Grommet theme={theme} full>
				<ResponsiveContext.Consumer>
					{(size) => (
						<Box fill>
							<NavBar />
							<ApplicationViews />
						</Box>
					)}
				</ResponsiveContext.Consumer>
			</Grommet>
		);
	}
}

export default App;
