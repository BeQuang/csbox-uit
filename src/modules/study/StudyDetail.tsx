import { useParams } from "react-router-dom";

export default function StudyDetail() {
  // Lấy giá trị 'id' từ đường dẫn /study/:id
  const { id } = useParams<{ id: string }>();

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <h2>Chi tiết bài học</h2>
      <p>
        Hello Study with id: <strong>{id}</strong>
      </p>
    </div>
  );
}
