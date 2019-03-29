import React, { Component } from "react";
import { Box, Image, Anchor, Paragraph } from "grommet";
import logo from "../../images/VMS.png";

const FootBox = props => (
  <Box
    tag="footer"
    direction="row"
    align="center"
    justify="between"
    background="light"
    pad={{ left: "small", right: "small", vertical: "small" , top: "0", bottom: "0"}}
    elevation="small"
  
    {...props}
  />
);
export default class Footer extends Component {
  render() {
    return (
      <FootBox>
       
          <Box height="50px">
            <Image fit="contain" src={logo} />
          </Box>
          <Box pad="small" direction="row" flex justify="between" align="center">
            <Paragraph size="small">9 Any Street, Any Town, WV, USA</Paragraph>
         
            <Anchor href="mailto:email@email.com">supportemail@email.co</Anchor>
         
          <Anchor href="/help">Help</Anchor>
        </Box>
		
      </FootBox>
    );
  }
}
