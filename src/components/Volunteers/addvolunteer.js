import React, { Component } from "react";
import {
  Box,
  Button,
  Form,
  TextInput,
  TextArea,
  Paragraph,
  Heading,
  Select
} from "grommet";

export default class AddVolunteer extends Component {
  // Set initial state
  state = {
    name: "",
    email: "",
    phone: "",
    image: "",
    gender: "",
    location: "",
    notes: "",
    options: ["Female", "Male", "Other"],
    value: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  /*
        Local method for validation, creating volunteer object, and
        invoking the function reference passed from parent component
     */
  constructNewVolunteer = evt => {
    evt.preventDefault();
    const volunteer = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      image: this.state.image,
      gender: this.state.gender,
      location: this.state.location,
      dateJoined: new Date(),
      // Make sure the employeeId is saved to the database as a number since it is a foreign key.
      organizationId: parseInt(sessionStorage.getItem("userId")),
      notes: this.state.notes
    };

    // Create the volunteer and redirect user to volunteer list
    this.props
      .addVolunteer(volunteer)
      .then(() => this.props.history.push("/volunteers"));
  };

  render() {
    const { options, value } = this.state;
    return (
      <Box direction="column">
        <Heading level={2}>Add Volunteer Information</Heading>
        <Form>
          <Paragraph>
            Name:
            <TextInput
              name="name"
              id="name"
              label="Name"
              onChange={this.handleFieldChange}
            />
          </Paragraph>
          <Paragraph>
            Email:
            <TextInput
              name="email"
              id="email"
              label="Email"
              type="email"
              onChange={this.handleFieldChange}
            />
          </Paragraph>
          <Paragraph>
            Phone Number:
            <TextInput
              name="phone"
              id="phone"
              label="Phone Number"
              type="tel"
              onChange={this.handleFieldChange}
            />
          </Paragraph>
          <Paragraph>
            Link to Image:
            <TextInput
              name="image"
              id="image"
              label="Image Link"
              type="url"
              onChange={this.handleFieldChange}
            />
          </Paragraph>
          <Paragraph>
            Gender:
            <Select
              id="gender"
              name="gender"
              placeholder="Select Gender"
              value={value}
              options={options}
              onChange={({ option }) => this.setState({ gender: option })}
            />
          </Paragraph>
          <Paragraph>
            Location:
            <TextInput
              name="location"
              id="location"
              label="Location"
              onChange={this.handleFieldChange}
            />
          </Paragraph>
          <Paragraph>
            Additional Notes:
            <TextArea
              name="notes"
              id="notes"
              label="Notes"
              onChange={this.handleFieldChange}
            />
          </Paragraph>
          <Button
            type="submit"
            primary
            label="Submit"
            onClick={this.constructNewVolunteer}
          />
        </Form>
      </Box>
    );
  }
}
