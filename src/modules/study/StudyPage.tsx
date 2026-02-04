// src/modules/study/StudyPage.tsx
import { Outlet, useNavigate } from "react-router-dom";
import CSButton from "@/components/core/CSButton";

export default function StudyPage() {
  const navigate = useNavigate();

  return (
    <div className="study-container">
      <div
        className="study-navigation"
        style={{ marginBottom: 20, padding: 10, background: "#f5f5f5" }}
      >
        <CSButton onClick={() => navigate("/study")}>
          Tổng quan bài học
        </CSButton>
        <CSButton
          onClick={() => navigate("/study/new-interface")}
          style={{ marginLeft: 10 }}
        >
          Giao diện học mới
        </CSButton>
      </div>

      <div className="study-render-area">
        {/* 👇 Giao diện con sẽ thay đổi ở đây khi bấm nút */}
        <Outlet />
      </div>
    </div>
  );
}
