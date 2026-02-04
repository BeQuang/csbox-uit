// src/modules/users/UserRoles.tsx
import { Outlet, useNavigate } from "react-router-dom";
import CSButton from "@/components/core/CSButton";

export default function UserRoles() {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <CSButton onClick={() => navigate("/users/roles/new")}>
          Điều hướng trong trang (Tới New)
        </CSButton>
        <CSButton
          onClick={() => navigate("/users/roles")}
          style={{ marginLeft: "10px" }}
        >
          Quay lại danh sách
        </CSButton>
      </div>

      {/* 👇 Nội dung thay đổi (List hoặc New) sẽ hiện ở đây */}
      <div className="roles-content-area">
        <Outlet />
      </div>
    </div>
  );
}
