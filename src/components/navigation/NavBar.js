import React, { Component } from 'react';
import { Anchor, Box, Menu } from 'grommet';
import { Group, Organization, PowerShutdown, User } from 'grommet-icons';

const AppBar = (props) => (
	<Box
		tag="header"
		direction="row"
		align="center"
		justify="between"
		background="accent"
		pad={{ left: 'medium', right: 'small', vertical: 'small' }}
		elevation="medium"
		style={{ zIndex: '1' }}
		{...props}
	/>
);
export default class NavBar extends Component {
	render() {
		return (
			<AppBar>
				<Anchor href="/" primary label="Volunteer Management System" />
				<Menu
					label="Volunteers"
					items={[
						{ icon: '', label: 'All Volunteers', href: '/volunteers' },
						{ icon: '', label: 'Add Volunteer', href: 'volunteers/add' }
					]}
				/>
				<Menu
					label="Projects"
					items={[
						{ label: 'All Projects', href: '/projects' },
						{ label: 'Add Project', href: '/projects/add' }
					]}
				/>
				{/*Re-Add once you add report functionality */}
				{/* <Menu label="Reports" items={[ { label: 'All Reports', href: '/reports' } ]} /> */}
				<Menu
					label="Account"
					items={[
						{ icon: <Organization />, label: 'Your Profile', href: '/profile' },
						{ icon: <PowerShutdown />, label: 'Logout', onClick: () => {} }
					]}
				/>
			</AppBar>
		);
	}
}
