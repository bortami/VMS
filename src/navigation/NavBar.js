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
						{ icon: '', label: 'Your Volunteers', href: '/volunteers' },
						{ icon: <Group />, label: 'Groups', href: 'volunteers/groups' }
					]}
				/>
				<Menu
					label="Projects"
					items={[
						{ label: 'Your Projects', href: '/projects' },
						{ label: 'Create', href: '/projects/create' }
					]}
				/>
				<Menu
					label="Reports"
					items={[
						{ label: 'Projects', href: '/reports/projects' },
						{ label: 'Volunteers', href: '/reports/volunteers' },
						{ label: 'Hours', href: '/reports/hours' }
					]}
				/>
				<Menu
					label="Account"
					items={[
						{ icon: <User />, label: 'Your Profile', href: '/account/userprofile' },
						{ icon: <Organization />, label: 'Your Organization', href:'/account/orgprofile' },
						{ icon: <PowerShutdown />, label: 'Logout', onClick: () => {} }
					]}
				/>
			</AppBar>
		);
	}
}
