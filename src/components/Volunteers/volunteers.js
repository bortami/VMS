import React, { Component } from 'react';
import { Box, Button, CheckBox, Table, TextInput, TableHeader, TableRow, TableCell, TableBody, Heading } from 'grommet';
import { Search, Checkbox, Star, StarHalf } from 'grommet-icons';

export default class Volunteers extends Component {
	state = {
		search: '',
    volunteers:[]
	};
	rating = (param) => {
		return param === 1 ? (
			<Star color="accent" />
		) : param === 2 ? (
			<Box direction="row">
				<Star color="accent" />
				<Star color="accent" />
			</Box>
		) : param === 3 ? (
			<Box direction="row">
				<Star color="accent" />
				<Star color="accent" />
				<Star color="accent" />
			</Box>
		) : param === 4 ? (
			<Box direction="row">
				<Star color="accent" />
				<Star color="accent" />
				<Star color="accent" />
				<Star color="accent" />{' '}
			</Box>
		) : param === 5 ? (
			<Box direction="row">
				<Star color="accent" />
				<Star color="accent" />
				<Star color="accent" />
				<Star color="accent" />
				<Star color="accent" />{' '}
			</Box>
		) : (
			<StarHalf />
		);
	};
  totalHours =(volunteerId)=>{
    const hours =[].reduce((a,b) => a+b, 0)
    if (this.props.hours.volunteer_Id === volunteerId){
      hours.push(this.props.hours.quanity);
      return hours
    } else{
      return "N/A"
    }
  }


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
				<Box direction="row" pad="medium" width="50vw" align="center">
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
				<Box elevation="medium" pad="medium">
					Volunteer Results
					<Table>
						<TableHeader>
							<TableRow>
								<TableCell scope="col">
									<CheckBox />
								</TableCell>
								<TableCell scope="col">Name</TableCell>
								<TableCell scope="col">Rating</TableCell>
								<TableCell scope="col">Date Joined</TableCell>
								<TableCell scope="col">Hours Logged</TableCell>
								<TableCell scope="col">Active Status</TableCell>
							</TableRow>
						</TableHeader>
						<TableBody>
							{this.state.volunteers.map((volunteer) => {
								return (
									<TableRow>
										<TableCell scope="row">
											<Checkbox />
										</TableCell>
										<TableCell><span onClick={()=>{this.props.history.push(`/profile/${volunteer.id}`)}}>{volunteer.name}</span></TableCell>
										<TableCell>{this.rating(volunteer.rating)}</TableCell>
										<TableCell>{volunteer.dateRegistered}</TableCell>
										<TableCell>{this.totalHours(volunteer.id)}</TableCell>
										<TableCell>{volunteer.isActive ? 'Active' : 'Inactive'}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
					<Box direction="row" pad="mediium" align="center">
						<Button label="Add to Project" />
						<Button label="Email" />
						<Button label="Add to Group" />
						<Button label="Generate List" />
					</Box>
				</Box>
			</Box>
		);
	}
}
