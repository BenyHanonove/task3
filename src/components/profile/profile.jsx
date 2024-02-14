import React from "react";
import { MdEmail, MdLocationOn, MdCake } from "react-icons/md";
import "./profile.css";

import ProfileButton from "../buttons/profileButton/profile-button";
import { logoutUser } from "../../utils/storageHandler";

export default function Profile({ userData }) {
  const editInformation = () => {};
  const disconnectUser = () => {
    logoutUser();
    window.location.reload();
  };
  const moveToGame = () => {
    const gameUrl = "https://www.1001games.com/g/impostor";
    window.location.href = gameUrl;
  };

  return (
    <div className="profile-container">
      <h3 className="profile-header">{`${userData.firstName} ${userData.lastName}`}</h3>

      <div className="profile-content">
        <div className="profile-details">
          <div className="profile-detail">
            <p className="profile-text">{`${userData.email}`}</p>
            <MdEmail className="profile-icon" />
          </div>
          <div className="profile-detail">
            <p className="profile-text">{`${userData.street} ${userData.number}, ${userData.city}`}</p>
            <MdLocationOn className="profile-icon" />
          </div>
          <div className="profile-detail">
            <p className="profile-text">{`${userData.birthday}`}</p>
            <MdCake className="profile-icon" />
          </div>
        </div>

        <div className="image-container">
          <img
            className="profile-image"
            key={userData.username}
            src={userData.image}
            alt="User pic"
          />
        </div>
      </div>

      <div className="profile-buttons">
        <ProfileButton
          ButtonColor={"gray"}
          text={"עדכון פרטים"}
          clickHandler={editInformation}
        />
        <ProfileButton
          ButtonColor={"blue"}
          text={"למשחק"}
          clickHandler={moveToGame}
        />
        <ProfileButton
          ButtonColor={"red"}
          text={"התנתק"}
          clickHandler={disconnectUser}
        />
      </div>
    </div>
  );
}
