import React, { Component } from "react";

export default class AddVolunteer extends Component {
  // Set initial state
  state = {
    name: "",
    email: "",
    phone: "",
    image: "",
    gender: "",
    location: "",
    dateJoined: "",
    organizationId: "",
    notes: ""
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
      organizationId: parseInt(this.state.organizationId),
      notes: this.state.notes
    };

    // Create the volunteer and redirect user to volunteer list
    this.props
      .addVolunteer(volunteer)
      .then(() => this.props.history.push("/volunteers"));
  };

  render() {
    return <React.Fragment>stuff</React.Fragment>;
  }
}
