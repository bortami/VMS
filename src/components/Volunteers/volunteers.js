import React, { Component } from 'react';
import { Box, Button, Heading, Table, TableBody, TableCell, TableHeader, TableRow, TextInput } from 'grommet';
import { Search } from 'grommet-icons';
import VolunteerListItem from './VolunteerListItem';

export default class Volunteers extends Component {
	state = {
		search: '',
		volunteers: []
	};

	totalHours = (volunteerId) => {
		const hours = [].reduce((a, b) => a + b, 0);
		if (this.props.hours.volunteer_Id === volunteerId) {
			hours.push(this.props.hours.quanity);
			return hours;
		} else {
			return 'N/A';
		}
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
				<Box elevation="medium" pad="medium" width="50vw">
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
								<TableCell scope="col" />
								<TableCell scope="col">Name</TableCell>

								<TableCell scope="col">Date Joined</TableCell>
								<TableCell scope="col">Hours Logged</TableCell>
							</TableRow>
						</TableHeader>
						<TableBody>
							{this.state.volunteers.map((volunteer) => {
								return (
									<VolunteerListItem
										{...this.props}
										volunteer={volunteer}
										totalHours={this.totalHours}
									/>
								);
							})}
						</TableBody>
					</Table>
					<Box direction="row" pad="mediium" align="center">
						<Button label="Add to Project" />

						<Button label="Generate List" />
					</Box>
				</Box>
			</Box>
		);
	}
}
