import React, { Component } from 'react';
import NavBar from './components/navigation/NavBar';
import { Box, Grommet, ResponsiveContext } from 'grommet';
import ApplicationViews from './ApplicationViews';
import Footer from './components/footer/footer';

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
	state = {
		login: false
	};
	isAuthenticated = () => sessionStorage.getItem('userId') !== null || localStorage.getItem('userId') !== null;
	logout = () => {
		sessionStorage.clear();
		localStorage.clear();
		this.setState({ login: false });
	};
	render() {
		return (
			<Grommet theme={theme} full>
				<ResponsiveContext.Consumer>
					{(size) => (
						<Box fill>
							<NavBar isAuthenticated={this.isAuthenticated} logout={this.logout} />
							<ApplicationViews isAuthenticated={this.isAuthenticated} />
							{/* <Footer/> */}
						</Box>
					)}
				</ResponsiveContext.Consumer>
			</Grommet>
		);
	}
}

export default App;
