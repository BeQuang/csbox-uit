import CSButton from "@/components/core/CSButton";
import CSDatePicker, {
  DatePickerColor,
} from "@/components/core/CSDatePicker/CSDatePicker";
import CSRangePicker from "@/components/core/CSDatePicker/CSRangerPicker";
import readmeCSDatePicker from "@/components/core/CSDatePicker/READMECSDATEPICKER.md?raw";
import { useDateUtils } from "@/hooks/useDateUtils";
import {
  Badge,
  Card,
  Col,
  Descriptions,
  Divider,
  Row,
  Segmented,
  Select,
  Space,
  Switch,
  Tag,
  Typography,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CoreComponentGuidePage from "../CoreComponentGuidePage";

// Kích hoạt plugin để dùng hàm .fromNow()
dayjs.extend(relativeTime);

const { Title, Text } = Typography;

type PickerType = "date" | "time" | "week" | "month" | "quarter" | "year";

export default function PreviewCSDatePicker() {
  const { id } = useParams<{ id: string }>();
  const { formatPickerValue, formatRangeValue, toApiPayload } = useDateUtils();

  // --- States điều khiển tương tác ---
  const [activeType, setActiveType] = useState<PickerType>("date");
  const [activeColor, setActiveColor] = useState<DatePickerColor>("primary");
  const [activeVal, setActiveVal] = useState<Dayjs | null>(dayjs());
  const [activeRangeVal, setActiveRangeVal] = useState<
    [Dayjs | null, Dayjs | null] | null
  >([dayjs(), dayjs().add(7, "day")]);

  // --- States giả lập môi trường ---
  const [globalDisabled, setGlobalDisabled] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const colors: DatePickerColor[] = [
    "primary",
    "success",
    "warning",
    "danger",
    "info",
  ];

  return (
    <CoreComponentGuidePage
      title="CSDatePicker"
      description="Preview CSDatePicker và CSRangePicker theo đúng API hiện tại."
      readme={readmeCSDatePicker}
    >
      <div className="lab-container">
        {/* 1. TOP HEADER & GLOBAL CONTROLS */}
        <div className="lab-header">
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={2} style={{ margin: 0 }}>
                🧪 Date Engine Lab
              </Title>
              <Text type="secondary">
                Module: <Tag color="blue">{id}</Tag> | Standard: Enterprise
                Design System
              </Text>
            </Col>
            <Col>
              <Space size="large">
                <Space>
                  <Text>Disabled Mode</Text>
                  <Switch
                    size="small"
                    checked={globalDisabled}
                    onChange={setGlobalDisabled}
                  />
                </Space>
                <CSButton
                  color="primary"
                  loading={isSyncing}
                  onClick={() => {
                    setIsSyncing(true);
                    setTimeout(() => setIsSyncing(false), 800);
                    console.log("Payload:", toApiPayload(activeRangeVal));
                  }}
                >
                  Sync to Server
                </CSButton>
              </Space>
            </Col>
          </Row>
        </div>

        <Row gutter={[24, 24]}>
          {/* 2. LIVE PLAYGROUND CARD */}
          <Col xs={24} lg={16}>
            <Card
              title={<Badge status="processing" text="Live Playground" />}
              className="main-lab-card"
            >
              <Row gutter={[24, 24]}>
                <Col span={14}>
                  <Text strong className="d-block mb-2">
                    Picker Mode Selector
                  </Text>
                  <Segmented
                    block
                    value={activeType}
                    onChange={(v) => setActiveType(v as PickerType)}
                    options={["date", "time", "week", "month", "year"]}
                  />
                </Col>
                <Col span={10}>
                  <Text strong className="d-block mb-2">
                    Active Branding
                  </Text>
                  <Select
                    style={{ width: "100%" }}
                    value={activeColor}
                    onChange={setActiveColor}
                    options={colors.map((c) => ({
                      label: c.toUpperCase(),
                      value: c,
                    }))}
                  />
                </Col>

                <Col span={12}>
                  <CSDatePicker
                    label="Single Interface"
                    picker={activeType}
                    color={activeColor}
                    value={activeVal}
                    disabled={globalDisabled}
                    onChange={setActiveVal}
                    fullWidth
                  />
                </Col>
                <Col span={12}>
                  <CSRangePicker
                    label="Range Interface"
                    picker={activeType === "time" ? "date" : activeType}
                    color={activeColor}
                    value={activeRangeVal}
                    disabled={globalDisabled}
                    onChange={setActiveRangeVal}
                    fullWidth
                  />
                </Col>
              </Row>

              <Divider orientation="left">Visual Hooks Preview</Divider>
              <div className="output-grid">
                <div className="output-item">
                  <Text type="secondary">FORMATTED DISPLAY</Text>
                  <div className="val">{formatPickerValue(activeVal)}</div>
                </div>
                <div className="output-item">
                  <Text type="secondary">RANGE COMBINED</Text>
                  <div className="val">
                    {formatRangeValue(activeRangeVal).combined}
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          {/* 3. TECHNICAL SPECS CARD */}
          <Col xs={24} lg={8}>
            <Card title="Technical Specs" className="specs-card">
              <Descriptions column={1} size="small" bordered>
                <Descriptions.Item label="SQL Date">
                  <Text code>{formatPickerValue(activeVal, "YYYY-MM-DD")}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Humanized">
                  {activeVal ? activeVal.fromNow() : "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="API Payload">
                  <pre className="payload-box">
                    {JSON.stringify(toApiPayload(activeRangeVal), null, 2)}
                  </pre>
                </Descriptions.Item>
              </Descriptions>

              <div className="dev-note">
                <Text
                  strong
                  style={{ fontSize: "10px", color: "var(--color-primary)" }}
                >
                  DEVELOPER NOTE
                </Text>
                <p style={{ fontSize: "12px", margin: "4px 0 0" }}>
                  Hàm <code>toApiPayload</code> tự động chuyển đổi Range thành
                  object
                  <code>{`{ fromDate, toDate }`}</code> chuẩn ISO.
                </p>
              </div>
            </Card>
          </Col>
        </Row>

        <Divider>🔍 System Variants Matrix</Divider>

        {/* 4. MATRIX OVERVIEW (THE PRO PART) */}
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card title="Color Palette Comparison" size="small">
              <div className="matrix-stack">
                {colors.map((color) => (
                  <CSDatePicker
                    key={color}
                    label={`${color.toUpperCase()} Theme`}
                    color={color}
                    value={dayjs()}
                  />
                ))}
              </div>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title="States & Edge Cases" size="small">
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="middle"
              >
                <CSDatePicker
                  label="Error & Required State"
                  error="Bắt buộc chọn ngày này"
                  color="danger"
                  required
                />
                <CSRangePicker
                  label="Presets Interface (Reporting)"
                  color="info"
                  presets={[
                    { label: "Hôm nay", value: [dayjs(), dayjs()] },
                    {
                      label: "7 ngày trước",
                      value: [dayjs().subtract(7, "d"), dayjs()],
                    },
                  ]}
                />
                <Row gutter={12}>
                  <Col span={12}>
                    <CSDatePicker
                      label="Small Size"
                      size="small"
                      color="primary"
                      value={dayjs()}
                    />
                  </Col>
                  <Col span={12}>
                    <CSDatePicker
                      label="Disabled State"
                      disabled
                      color="primary"
                      value={dayjs()}
                    />
                  </Col>
                </Row>
              </Space>
            </Card>
          </Col>
        </Row>

        <style>{`
        .lab-container { padding: 32px; background: #f0f2f5; min-height: 100vh; }
        .lab-header { margin-bottom: 24px; padding: 0 8px; }
        .main-lab-card { border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .specs-card { border-radius: 12px; }
        
        .output-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; }
        .output-item { background: #fafafa; padding: 12px; border-radius: 8px; border: 1px solid #f0f0f0; }
        .output-item .val { font-family: 'Monaco', monospace; font-size: 13px; margin-top: 4px; color: var(--color-primary); }
        
        .payload-box { background: #2d3436; color: #fab1a0; padding: 12px; border-radius: 6px; font-size: 11px; margin: 0; }
        .dev-note { margin-top: 16px; padding: 12px; background: #e6f7ff; border-radius: 8px; border: 1px solid #91d5ff; }
        
        .matrix-stack { display: flex; flex-direction: column; gap: 16px; }
        .d-block { display: block; }
        .mb-2 { margin-bottom: 8px; }
        
        .ant-descriptions-label { background: #fafafa !important; width: 100px; font-weight: 600 !important; }
      `}</style>
      </div>
    </CoreComponentGuidePage>
  );
}
