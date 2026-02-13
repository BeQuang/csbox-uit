import readmeRouter from "@/app/router/READMEROUTER.md?raw";
import CoreComponentGuidePage from "../CoreComponentGuidePage";

export default function PreviewRouter() {
  return (
    <CoreComponentGuidePage
      title="Router Guide"
      description="Hướng dẫn sử dụng cấu hình Router cho các thành phần core của ứng dụng."
      readme={readmeRouter}
    >
      <div style={{ color: "#667085" }}>
        Tài liệu đầy đủ nằm ở phần README bên dưới.
      </div>
    </CoreComponentGuidePage>
  );
}
