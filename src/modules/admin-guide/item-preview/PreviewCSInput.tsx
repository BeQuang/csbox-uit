import CSInput from "@/components/core/CSInput";
import readmeCSInput from "@/components/core/CSInput/READMECSINPUT.md?raw";
import { Col } from "antd";
import { DollarSign, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import CoreComponentGuidePage from "../CoreComponentGuidePage";

export default function PreviewCSInput() {
  const [price, setPrice] = useState("1500000");
  const [balance, setBalance] = useState("1500000");
  const [unit, setUnit] = useState("VNĐ");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("admin_test");
  const [phone, setPhone] = useState("");

  return (
    <CoreComponentGuidePage
      title="CSInput"
      description="Preview đầy đủ các trạng thái input, number formatter, icon, password."
      readme={readmeCSInput}
    >
      <Col>
        <div style={{ display: "flex", gap: "24px" }}>
          <CSInput
            label="Giá sản phẩm (Format Number)"
            required
            value={price}
            onChange={setPrice}
            formatNumber
            prependIcon={<DollarSign size={16} />}
            units={["VNĐ", "USD", "EUR"]}
            selectedUnit={unit}
            onChangeUnit={setUnit}
            variant="info"
          />
          <CSInput
            label="Số dư tài khoản (Thập phân)"
            value={balance}
            onChange={setBalance}
            formatNumber
            decimalSeparator="."
            unit="USD"
          />
          <CSInput
            label="Email liên hệ"
            value={email}
            onChange={setEmail}
            prependIcon={<Mail size={16} />}
          />
        </div>

        <div style={{ display: "flex", gap: "24px", marginTop: "24px" }}>
          <CSInput
            label="Mật khẩu"
            type="password"
            value={password}
            onChange={setPassword}
            prependIcon={<Lock size={16} />}
          />
          <CSInput
            label="Số điện thoại"
            value={phone}
            onChange={setPhone}
            error="Số điện thoại không hợp lệ"
            variant="danger"
          />
          <CSInput
            label="Tên đăng nhập (Disabled)"
            value={username}
            onChange={setUsername}
            prependIcon={<User size={16} />}
            disabled
          />
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          <CSInput label="Mã giảm giá" variant="success" unit="Apply" />
        </div>
      </Col>
    </CoreComponentGuidePage>
  );
}
