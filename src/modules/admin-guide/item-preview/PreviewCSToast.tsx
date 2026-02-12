import CSButton from "@/components/core/CSButton";
import { useToast } from "@/components/core/CSToast";
import readmeCSToast from "@/components/core/CSToast/READMECSTOAST.md?raw";
import CoreComponentGuidePage from "../CoreComponentGuidePage";

export default function PreviewCSToast() {
  const { toast } = useToast();

  return (
    <CoreComponentGuidePage
      title="CSToast"
      description="Preview các loại toast hỗ trợ qua hook useToast."
      readme={readmeCSToast}
    >
      <div className="core-guide-page__row">
        <CSButton
          color="success"
          onClick={() => toast("Thành công", "success")}
        >
          Success
        </CSButton>
        <CSButton
          color="danger"
          onClick={() => toast("Có lỗi xảy ra", "error")}
        >
          Error
        </CSButton>
        <CSButton color="warning" onClick={() => toast("Cảnh báo", "warning")}>
          Warning
        </CSButton>
        <CSButton color="info" onClick={() => toast("Đang xử lý", "loading")}>
          Loading
        </CSButton>
        <CSButton
          variant="outline"
          onClick={() =>
            toast("Toast dạng object", {
              type: "info",
              description: "Có thể truyền options đầy đủ từ Sonner.",
            })
          }
        >
          Object options
        </CSButton>
      </div>
    </CoreComponentGuidePage>
  );
}
