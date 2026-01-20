import CSButton from "@/components/core/CSButton/CSButton";
import CSInput from "@/components/core/CSInput/CSInput";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("VNĐ");

  return (
    <>
      <CSButton>
        <Link to="/users" style={{ color: "#FFF" }}>
          Vào user
        </Link>
      </CSButton>

      <CSInput
        label="Giá bán"
        required
        type="number"
        value={price}
        onChange={setPrice}
        placeholder="Nhập giá"
        formatNumber
        units={["VNĐ", "USD", "JPY"]}
        selectedUnit={unit}
        onChangeUnit={setUnit}
        // variant="warning"
      />
    </>
  );
}
