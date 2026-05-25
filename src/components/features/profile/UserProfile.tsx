import { useState, type ChangeEvent } from "react";
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

const mockUser: UserInfo = {
  username: "Jan Novak",
  email: "jan.novak@email.cz",
  phone: "+420 777 123 456",
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
  const [user, setUser] = useState<UserInfo>(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserInfo>(mockUser);

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
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setEditForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
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

      <div className="profile-details">
        <h3>Personal info</h3>

        {isEditing ? (
          <div className="edit-form-details">
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
              <span className="detail-value">{user.phone}</span>
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
  );
}

export default UserProfile;
