import React, { Component } from 'react';
import { Box, Button, Heading, Table, TableBody, TableCell, TableHeader, TableRow, TextInput, CheckBox } from 'grommet';
import { Search } from 'grommet-icons';
import ProjectsListItem from './ProjectsListItem';

export default class ProjectList extends Component {
	state = {
		search: '',
		Projects: []
	};
	handleFieldChange = (e) => {
		const stateToChange = {};
		stateToChange[e.target.id] = e.target.value;
		this.setState(stateToChange);
	};
	render() {
		return (
			<Box
				direction="column"
				pad="medium"
				basis="full"
				fill
				align="center"
				flex
				overflow={{ horizontal: 'hidden' }}
			>
				{/*This is the search functionality that has is not ready to be displayed yet. When Search is added, uncomment and display this section*/}
				{/* <Box direction="column" pad="medium" width="50vw" align="center">
					<Box fill="horizontal" direction="row">
						<TextInput
							placeholder="Search by Name or email address"
							onChange={(e) => this.handleFieldChange(e)}
							id="search"
							name="search-input"
						/>
						<Button icon={<Search />} label="Search" onClick={() => {}} />
					</Box>
					<Box direction="row" pad="medium" align="center">
						<Heading level={4} pad="medium">
							Quick Search:{' '}
						</Heading>
						<Button label="Top Hours" />
						<Button label="Top Rated" />
						<Button label="Newest" />
					</Box>
				</Box> */}
				{/*To add volunteers to a project in bulk with checkboxes: create indivual objects inside a bigger object, then push the entire object as a post. Or find a  copy() method to copy based on number of volunteers....keep brainstorming. there's a way to do it. Checkout "Seasons" on grommet */}
				<Box elevation="medium" pad="medium">
					<Box direction="row" justify="between">
						Projects
						<Button
							label="Add Project"
							type="button"
							onClick={() => {
								this.props.history.push('/projects/add');
							}}
						/>
					</Box>
					<Table>
						<TableHeader>
							<TableRow>
								<TableCell scope="col">
									<CheckBox />
								</TableCell>
								<TableCell scope="col">Name</TableCell>
								<TableCell scope="col">Date Created</TableCell>
								<TableCell scope="col">Total Volunteers</TableCell>
								<TableCell scope="col">Hours Logged</TableCell>
							</TableRow>
						</TableHeader>
						<TableBody>
							{this.props.projects.map((project) => {
								return (
									<ProjectsListItem
										{...this.props}
										singleProject={project}
										hours={this.props.hours}
									/>
								);
							})}
						</TableBody>
					</Table>
				</Box>
			</Box>
		);
	}
}
