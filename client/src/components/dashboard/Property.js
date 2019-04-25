import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteProperty } from "../../actions/profileActions";

class Property extends Component {
  onDeleteClick(id) {
    this.props.deleteProperty(id);
  }

  render() {
    //The property is passed in from Dashboard component (the profile state has the property array) as a prop
    const property = this.props.property.map(pro => (
      <tr key={pro._id}>
        <td>${pro.propertyValue}</td>
        <td>${pro.deposit}</td>
        <td>{pro.postCode}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, pro._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4" style={{ color: "purple" }}>
          Property Information
        </h4>
        <table className="table">
          <thead>
            <tr>
              <th>Property Value</th>
              <th>Deposit</th>
              <th>Postcode</th>
              <th />
            </tr>
            {property}
          </thead>
        </table>
      </div>
    );
  }
}

Property.propTypes = {
  deleteProperty: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteProperty }
)(Property);
