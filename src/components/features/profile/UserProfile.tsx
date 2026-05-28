import { useState, useEffect, type ChangeEvent } from "react";
import "./UserProfile.css";

interface UserInfo {
  username: string;
  email: string;
  phone: string;
  avatarUrl: string;
}

interface OrderHistory {
  id: string;
  date: string;
  total: number;
  status: "delivered" | "inTransit" | "cancelled";
}

const emptyUser: UserInfo = {
  username: "",
  email: "",
  phone: "",
  avatarUrl: "",
};

const mockOrders: OrderHistory[] = [
  {
    id: "OBJ-2026-001",
    date: "15. 05. 2026",
    total: 129.99,
    status: "delivered",
  },
  {
    id: "OBJ-2026-002",
    date: "22. 05. 2026",
    total: 45.5,
    status: "inTransit",
  },
];

const orderStatusLabels: Record<OrderHistory["status"], string> = {
  delivered: "Delivered",
  inTransit: "In transit",
  cancelled: "Cancelled",
};

function UserProfile() {
  const [user, setUser] = useState<UserInfo>(emptyUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserInfo>(emptyUser);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("currentUser");
    
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      const currentUserData: UserInfo = {
        username: parsedUser.username,
        email: parsedUser.email,
        phone: parsedUser.phone || "", 
        avatarUrl: parsedUser.avatarUrl || "",
      };
      
      setUser(currentUserData);
      setEditForm(currentUserData);
    } else {
      window.location.href = "/";
    }
  }, []);

  const initials = user.username
    ? user.username
        .split(" ")
        .map((namePart) => namePart[0])
        .join("")
        .toUpperCase()
    : "U";

  const handleEdit = () => {
    setEditForm(user);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setUser(editForm);
    setIsEditing(false);

    const loggedInUserStr = localStorage.getItem("currentUser");
    if (!loggedInUserStr) return;
    
    const loggedInUser = JSON.parse(loggedInUserStr);
    const updatedUser = { ...loggedInUser, ...editForm };
    
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const allUsersStr = localStorage.getItem("users");
    if (allUsersStr) {
      const allUsers = JSON.parse(allUsersStr);
      const updatedAllUsers = allUsers.map((u: any) => 
        u.id === updatedUser.id ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(updatedAllUsers));
    }
    window.dispatchEvent(new Event("userUpdated"));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; 
    
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        return;
      }

      const reader = new FileReader();
      
      reader.onloadend = () => {
        setEditForm((currentForm) => ({
          ...currentForm,
          avatarUrl: reader.result as string, 
        }));
      };
      
      reader.readAsDataURL(file);
    }
  };

  const displayedAvatar = isEditing ? editForm.avatarUrl : user.avatarUrl;

  return (
    <div className="profile-container">
      <div className="profile-header">
        
        {displayedAvatar ? (
          <img
            src={displayedAvatar}
            alt={user.username}
            className="profile-avatar"
          />
        ) : (
          <div className="avatar-placeholder">{initials}</div>
        )}

        <div className="profile-title">
          <h2>{user.username}</h2>
        </div>

        {!isEditing && (
          <button onClick={handleEdit} className="btn-edit">
            Edit
          </button>
        )}
      </div>

      <hr className="profile-divider" />
      <div className="profile-components">
        <div className="profile-details">
          <h3>Personal info</h3>

          {isEditing ? (
            <div className="edit-form-details">
              
              <div className="detail-item edit-item">
                <label className="detail-label" htmlFor="avatarUpload">
                  Profile Picture:
                </label>
                <input
                  id="avatarUpload"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg" 
                  onChange={handleImageUpload}
                  className="edit-input"
                  style={{ padding: "5px 0", border: "none" }} 
                />
              </div>

              <div className="detail-item edit-item">
                <label className="detail-label" htmlFor="username">
                  Name:
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={editForm.username}
                  onChange={handleChange}
                  className="edit-input"
                />
              </div>

              <div className="detail-item edit-item">
                <label className="detail-label" htmlFor="email">
                  E-mail:
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleChange}
                  className="edit-input"
                />
              </div>

              <div className="detail-item edit-item">
                <label className="detail-label" htmlFor="phone">
                  Phone:
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleChange}
                  className="edit-input"
                />
              </div>

              <div className="profile-actions">
                <button onClick={handleSave} className="btn-save">
                  Save
                </button>
                <button onClick={handleCancel} className="btn-cancel">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="detail-item">
                <span className="detail-label">E-mail:</span>
                <span className="detail-value">{user.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{user.phone ? user.phone : "Not specified"}</span>
              </div>
            </>
          )}
        </div>

        <div className="profile-orders">
          <h3>Order history</h3>

          {mockOrders.length === 0 ? (
            <p>You have not placed any orders yet.</p>
          ) : (
            <div className="orders-list">
              {mockOrders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-info">
                    <span className="order-id">{order.id}</span>
                    <span className="order-date">{order.date}</span>
                  </div>
                  <div className="order-status-price">
                    <span className={`status-tag status-${order.status}`}>
                      {orderStatusLabels[order.status]}
                    </span>
                    <span className="order-price">
                      {order.total.toFixed(2)} EUR
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;