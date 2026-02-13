import readmeValidation from "@/utils/READMEVALIDATION.md?raw";
import CoreComponentGuidePage from "../CoreComponentGuidePage";

export default function PreviewValidation() {
  return (
    <CoreComponentGuidePage
      title="Validation Guide"
      description="Hướng dẫn sử dụng bộ hàm validate dùng chung cho form, business logic, file và bảo mật."
      readme={readmeValidation}
    >
      <div style={{ color: "#667085" }}>
        Tài liệu đầy đủ nằm ở phần README bên dưới.
      </div>
    </CoreComponentGuidePage>
  );
}
