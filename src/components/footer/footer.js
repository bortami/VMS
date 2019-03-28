import React, { Component } from 'react';
import { Box, Image, Anchor, Paragraph } from 'grommet';
import logo from '../../images/VMS.png';

const FootBox = (props)=>(
	<Box
		tag="footer"
		direction="row"
		align="center"
		justify="between"
		background="light"
		pad={{ left: 'small', right: 'small', vertical: 'small' }}
		elevation="none"
		style={{ zIndex: '1' }}
		{...props}
	/>
);
export default class Footer extends Component {
    
	render() {
		return (
			<FootBox>
				<Box direction="column">
					<Anchor href="/help">Help</Anchor>
					<Anchor href="/help/faq">FAQs</Anchor>
					<Anchor href="/help/contact">Contact Us</Anchor>
					<Anchor href="/help/tc">Terms and Conditions</Anchor>
				</Box>
				<Box direction="row">
					<Box width="200" height="75px">
						<Image fit="contain" src={logo} />
					</Box>
					<Box>
						<Paragraph size="small">
							9 Any Street<br />Any Town, WV, USA
						</Paragraph>
						<Anchor href="mailto:email@email.com">supportemail@email.co</Anchor>
					</Box>
				</Box>
			</FootBox>
		);
	}
}
