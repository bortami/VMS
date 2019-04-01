import React, { Component } from 'react';

import { Box, Image, Heading, Anchor, Layer, Button } from 'grommet';
import { MailOption, AddCircle, Trash, Close } from 'grommet-icons';

export default class SingleVolunteerView extends Component {
	state = {};

	onOpen = () => this.setState({ open: true });

	onClose = () => this.setState({ open: undefined });
	render() {
		const { open } = this.state;
		const volunteer =
			this.props.volunteers.find((a) => a.id === parseInt(this.props.match.params.volunteerId)) || {};
		return (
			<Box key={volunteer.id} direction="column" width="horizontal">
				<Box direction="row" align="between" width="horizontal">
					<Box alignSelf="start">
						<Image src={volunteer.image} />
					</Box>
					<Heading level={3}>{volunteer.name}</Heading>
					<Box id="icons" direction="row">
						<Anchor href={`mailto:${volunteer.email}`} margin="small">
							<MailOption />
						</Anchor>
						<Anchor onClick={() => {}} margin="small">
							<AddCircle />
						</Anchor>
						<Anchor onClick={this.onOpen} margin="small">
							<Trash />
						</Anchor>
						{open && (
							<Layer position="top-right">
								<Box height="small" overflow="auto" elevation="medium">
									<Box pad="medium">
										Are you sure you want to delete {volunteer.name.split(' ')[0]}? This is
										permanent and cannot be undone!
									</Box>
									<Box pad="medium">
										<Button
											icon={<Trash />}
											onClick={this.props.delete(volunteer.id)}
											label="Yes, Delete Them"
										/>
										<Button primary icon={<Close />} onClick={this.onClose} label="No, Nevermind" />
									</Box>
								</Box>
							</Layer>
						)}
					</Box>
				</Box>
                <Box direction
			</Box>
		);
	}
}
