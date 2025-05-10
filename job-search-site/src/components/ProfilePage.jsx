import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleDelete = () => {
    setShowDeletePopup(false);
    setShowSuccessPopup(true);

    setTimeout(() => {
      setUser(null);
      navigate("/");
    }, 1000); // 1 sec
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear persisted data
    setUser(null);
    navigate("/");
  };

  return (
    <div className="main">
      <header className="header">
        <div>
          <h2>Welcome, {user?.username || "User"}</h2>
        </div>
        <div className="header-buttons">
          <button className="home-btn" onClick={() => navigate("/home")}>
            Home
          </button>
          <button className="logout-btn header-logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </header>

      <section className="profile-card">
        <div className="profile-header">
          <div className="profile-info">
            <img alt="Photo" />
            <div>
              <h3>{user?.username || "username"}</h3>
              <p>{user?.email || "username@gmail.com"}</p>
            </div>
          </div>
          <button className="edit-btn" onClick={toggleEdit}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="form-grid">
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Your First Name" disabled={!isEditing} />
          </div>
          <div className="input-group">
            <label>Nickname</label>
            <input type="text" placeholder="Your Nickname" disabled={!isEditing} />
          </div>
          <div className="input-group">
            <label>Gender</label>
            <select name="gender" id="gender" disabled={!isEditing}>
              <option value="" disabled selected>Your Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
          <div className="input-group">
            <label>Country</label>
            <input type="text" placeholder="Your Country" disabled={!isEditing} />
          </div>
          <div className="input-group">
            <label>Language</label>
            <input type="text" placeholder="Your Language" disabled={!isEditing} />
          </div>
          <div className="input-group">
            <label>Province</label>
            <input type="text" placeholder="Your Province" disabled={!isEditing} />
          </div>
        </div>

        <div className="email-section">
          <h4>My email Address</h4>
          <div className="email-box">
            <span>📧</span>
            <div>
              <p>{user?.email || "username@gmail.com"}</p>
            </div>
          </div>
          <div className="account-actions">
            <button className="delete-account" onClick={() => setShowDeletePopup(true)}>
              Delete Account
            </button>
          </div>
        </div>
      </section>

      {showDeletePopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Delete Account</h3>
            <p>Are you sure you want to delete your account?</p>
            <div className="popup-buttons">
              <button className="confirm-btn" onClick={handleDelete}>Yes, Delete</button>
              <button className="cancel-btn" onClick={() => setShowDeletePopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="delete-success">
              <h3>Deleted Account Successfully...</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
