import React from "react";
import { Link } from "react-router-dom";

function ProfileActions() {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <Link to="/add-property" className="btn btn-light">
        <i className="fa fa-home text-info mr-1" />
        Add Property
      </Link>
    </div>
  );
}

export default ProfileActions;
