import React from "react";

const AdminHeader = ({ title, subtitle, actions }) => (
  <div className="admin-header">
    <div>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
    {actions && <div className="admin-actions">{actions}</div>}
  </div>
);

export default AdminHeader;
