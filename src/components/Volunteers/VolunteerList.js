import React, { Component } from 'react';
import { Box, Button, Select, Table, TableBody, TableCell, TableHeader, TableRow } from 'grommet';
import { Add, Search, Trash } from 'grommet-icons';
import VolunteerListItem from './VolunteerListItem';

export default class VolunteerList extends Component {
	state = {
		search: '',
		volunteers: [],
		value: '',
		options: []
	};

	totalHours = (volunteerId) => {
		const hours = this.props.hours
			.filter((hours) => hours.volunteerId === volunteerId)
			.map((hours) => hours.quantity)
			.reduce((a, b) => a + b, 0);
		return hours;
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
				<Box elevation="medium" pad="medium">
					<Box direction="row" justify="between">
						Volunteers
						<Button
							label="Add Volunteer"
							type="button"
							onClick={() => {
								this.props.history.push('/volunteers/add');
							}}
						/>
					</Box>
					<Table>
						<TableHeader>
							<TableRow>
								<TableCell scope="col">
									<Button icon={<Add color="brand" />} onClick={() => {}} />
								</TableCell>
								<TableCell scope="col">Name</TableCell>
								<TableCell scope="col">Date Joined</TableCell>
								<TableCell scope="col">Hours Logged</TableCell>
							</TableRow>
						</TableHeader>
						<TableBody>
							{this.props.volunteers.map((volunteer) => {
								return (
									<VolunteerListItem
										{...this.props}
										volunteer={volunteer}
										totalHours={this.totalHours}
										hours={this.props.hours}
										projects={this.props.projects}
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
