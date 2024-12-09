import React from 'react';
import { Link } from 'react-router-dom';

const ProfileCard = () => {
  return (
    <div className="profile-card">
      <ul className="profile-card__list">
        <li>
          <Link to="/Profile">Your Profile</Link>
        </li>
        <li>
          <Link to="/Reports">Your Reports</Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileCard;