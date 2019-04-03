import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TableCell, TableRow, CheckBox, Anchor, Button } from 'grommet';
import { Add } from 'grommet-icons';
import Moment from 'react-moment';

export default class VolunteerListItem extends Component {
	render() {
		return (
			<TableRow>
				<TableCell>
					<Button icon={<Add size="small" color="brand" />} onClick={() => {}} />
				</TableCell>
				<TableCell>
					<Anchor
						id={this.props.volunteer.id}
						onClick={() => {
							this.props.history.push(`/volunteers/${this.props.volunteer.id}`);
						}}
					>
						{this.props.volunteer.name}
					</Anchor>
				</TableCell>

				<TableCell>
					<Moment format="MM/DD/YYYY">{this.props.volunteer.dateJoined}</Moment>
				</TableCell>
				<TableCell>{this.props.totalHours(this.props.volunteer.id)}</TableCell>
			</TableRow>
		);
	}
}
