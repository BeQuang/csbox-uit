import React, { useState, useMemo, useCallback, forwardRef } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Check, ChevronDown, Search, X, CheckSquare } from "lucide-react";
import "./styles.scss";

export type CSSelectVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface CSSelectOption {
  label: string;
  value: string;
}

export interface CSSelectGroup {
  group: string;
  items: CSSelectOption[];
}

export interface CSSelectProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange" | "value"
> {
  label?: string;
  required?: boolean;
  options: CSSelectOption[] | CSSelectGroup[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  error?: string;
  multiple?: boolean;
  isSearchable?: boolean;
  maxTagDisplay?: number;
  showClearAll?: boolean;
  showSelectAll?: boolean;
  isLoading?: boolean;
  variant?: CSSelectVariant;
}

const OptionItem = React.memo(
  ({
    opt,
    isSelected,
    onClick,
  }: {
    opt: CSSelectOption;
    isSelected: boolean;
    onClick: (val: string) => void;
  }) => (
    <div
      className={`cs-select__item ${isSelected ? "is-selected" : ""}`}
      onClick={(e) => {
        e.stopPropagation(); // Ngăn sự kiện click làm ảnh hưởng đến các lớp bọc ngoài
        onClick(opt.value);
      }}
    >
      <span className="cs-select__item-label">{opt.label}</span>
      {isSelected && <Check size={16} className="cs-select__item-check" />}
    </div>
  ),
);

const CSSelect = forwardRef<HTMLButtonElement, CSSelectProps>(
  (
    {
      label,
      required,
      options = [],
      value,
      onChange,
      placeholder = "Chọn...",
      error,
      disabled = false,
      className = "",
      multiple = false,
      isSearchable = false,
      maxTagDisplay = 3,
      showClearAll = false,
      showSelectAll = false,
      isLoading = false,
      variant = "default",
      style,
      ...rest
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    /**
     * LOGIC 1: Làm phẳng dữ liệu (Flattening)
     * Vì dữ liệu đầu vào có thể là mảng phẳng hoặc mảng có Group (nhóm).
     * useMemo này giúp ta luôn có một mảng duy nhất để tìm kiếm nhãn (label) dựa trên giá trị (value).
     */
    const allFlatOptions = useMemo(() => {
      if (!options || options.length === 0) return [];
      if ("items" in options[0]) {
        return (options as CSSelectGroup[]).flatMap((g) => g.items);
      }
      return options as CSSelectOption[];
    }, [options]);

    /**
     * LOGIC 2: Tìm kiếm (Filtering)
     * Xử lý tìm kiếm cho cả 2 cấu trúc dữ liệu:
     * - Nếu là Group: Lọc item trong từng group, group nào không có item thỏa mãn thì ẩn cả group.
     * - Nếu là mảng phẳng: Lọc bình thường.
     */
    const filteredData = useMemo(() => {
      const term = searchTerm.toLowerCase().trim();
      if (!term) return options;
      if (options.length > 0 && "items" in options[0]) {
        return (options as CSSelectGroup[])
          .map((g) => ({
            ...g,
            items: g.items.filter((i) => i.label.toLowerCase().includes(term)),
          }))
          .filter((g) => g.items.length > 0);
      }
      return (options as CSSelectOption[]).filter((i) =>
        i.label.toLowerCase().includes(term),
      );
    }, [options, searchTerm]);

    /**
     * LOGIC 3: Xử lý chọn (Selection)
     * - Multiple: Thêm vào mảng nếu chưa có, xóa khỏi mảng nếu đã có.
     * - Single: Ghi đè giá trị và tự động đóng menu (setOpen(false)).
     */
    const handleSelect = useCallback(
      (val: string) => {
        if (multiple) {
          const currentValues = Array.isArray(value) ? value : [];
          const nextValues = currentValues.includes(val)
            ? currentValues.filter((v) => v !== val)
            : [...currentValues, val];
          onChange?.(nextValues);
        } else {
          onChange?.(val);
          setOpen(false);
        }
      },
      [multiple, value, onChange],
    );

    /**
     * LOGIC 4: Hiển thị nhãn (Display Label)
     * - Chế độ Tags: Hiển thị tối đa `maxTagDisplay`, phần còn lại gộp vào Tooltip "+N".
     * - Chế độ Single: Tìm label tương ứng với value hiện tại.
     */
    const getDisplayText = () => {
      if (multiple && Array.isArray(value)) {
        if (value.length === 0)
          return <span className="cs-select__placeholder">{placeholder}</span>;

        const visibleTags = value.slice(0, maxTagDisplay);
        const hiddenValues = value.slice(maxTagDisplay);

        return (
          <div className="cs-select__tags">
            {visibleTags.map((v) => {
              const option = allFlatOptions.find((opt) => opt.value === v);
              return option ? (
                <span key={v} className="cs-select__tag">
                  {option.label}
                  <X
                    size={12}
                    className="cs-select__tag-x"
                    onClick={(e) => {
                      e.stopPropagation(); // Không cho mở/đóng popover khi nhấn xóa tag
                      handleSelect(v);
                    }}
                  />
                </span>
              ) : null;
            })}
            {/* Tooltip hiển thị danh sách các item bị ẩn khi vượt quá giới hạn */}
            {hiddenValues.length > 0 && (
              <Tooltip.Provider delayDuration={200}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <span className="cs-select__tag-more">
                      +{hiddenValues.length}
                    </span>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="cs-select__tooltip" side="top">
                      <div className="cs-select__tooltip-list">
                        {hiddenValues.map((v) => (
                          <div key={v} className="cs-select__tooltip-item">
                            {allFlatOptions.find((o) => o.value === v)?.label}
                          </div>
                        ))}
                      </div>
                      <Tooltip.Arrow className="cs-select__tooltip-arrow" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            )}
          </div>
        );
      }
      const selectedOption = allFlatOptions.find((opt) => opt.value === value);
      return selectedOption ? (
        <span className="cs-select__single-text">{selectedOption.label}</span>
      ) : (
        <span className="cs-select__placeholder">{placeholder}</span>
      );
    };

    /**
     * LOGIC 5: Trạng thái "Chọn tất cả"
     * Chỉ xuất hiện khi `multiple={true}` và không trong quá trình search.
     */
    const isAllSelected =
      multiple &&
      Array.isArray(value) &&
      value.length === allFlatOptions.length &&
      allFlatOptions.length > 0;

    return (
      <div
        style={style}
        className={[
          "cs-select",
          `cs-select--${variant}`,
          error && "cs-select--error",
          disabled && "cs-select--disabled",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {label && (
          <label className="cs-input__label">
            {label} {required && <span>*</span>}
          </label>
        )}

        {/* Radix UI Popover: Quản lý vị trí hiển thị dropdown (portal) */}
        <Popover.Root
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            if (!v) setSearchTerm(""); // Reset tìm kiếm khi đóng menu
          }}
        >
          <Popover.Trigger asChild>
            <button
              {...rest}
              ref={ref}
              type="button"
              className="cs-select__trigger"
              disabled={disabled || isLoading}
            >
              <div className="cs-select__value">{getDisplayText()}</div>
              <div className="cs-select__actions">
                {/* Nút Clear nhanh toàn bộ giá trị */}
                {showClearAll &&
                  (multiple
                    ? Array.isArray(value) && value.length > 0
                    : value) && (
                    <X
                      size={14}
                      className="cs-select__clear"
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange?.(multiple ? [] : "");
                      }}
                    />
                  )}
                <ChevronDown
                  size={16}
                  className={`cs-select__chevron ${open ? "is-open" : ""}`}
                />
              </div>
            </button>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              className={`cs-select__content cs-select--${variant}`}
              align="start"
              sideOffset={4}
            >
              {/* Ô Search: Luôn focus khi mở menu nhờ thuộc tính autoFocus */}
              {isSearchable && (
                <div className="cs-select__search-wrapper">
                  <Search size={14} className="cs-select__search-icon" />
                  <input
                    className="cs-select__search-input"
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                </div>
              )}

              <div className="cs-select__viewport">
                {isLoading ? (
                  <div className="cs-select__loading">Đang tải dữ liệu...</div>
                ) : (
                  <>
                    {/* Logic Render "Chọn tất cả" */}
                    {multiple &&
                      showSelectAll &&
                      !searchTerm &&
                      allFlatOptions.length > 0 && (
                        <div
                          className={`cs-select__item cs-select__item--select-all ${isAllSelected ? "is-selected" : ""}`}
                          onClick={() =>
                            onChange?.(
                              isAllSelected
                                ? []
                                : allFlatOptions.map((o) => o.value),
                            )
                          }
                        >
                          <div className="cs-select__item-content">
                            <CheckSquare size={16} />
                            <span>Chọn tất cả</span>
                          </div>
                          {isAllSelected && <Check size={16} />}
                        </div>
                      )}

                    {/* Render List Options: Chia trường hợp Group và Single */}
                    {filteredData.length > 0 ? (
                      filteredData.map((node, index) => {
                        if ("group" in node) {
                          return (
                            <div
                              key={`group-${index}`}
                              className="cs-select__group"
                            >
                              <div className="cs-select__group-label">
                                {node.group}
                              </div>
                              {node.items.map((opt) => (
                                <OptionItem
                                  key={opt.value}
                                  opt={opt}
                                  isSelected={
                                    multiple
                                      ? Array.isArray(value) &&
                                        value.includes(opt.value)
                                      : value === opt.value
                                  }
                                  onClick={handleSelect}
                                />
                              ))}
                            </div>
                          );
                        }
                        const opt = node as CSSelectOption;
                        return (
                          <OptionItem
                            key={opt.value}
                            opt={opt}
                            isSelected={
                              multiple
                                ? Array.isArray(value) &&
                                  value.includes(opt.value)
                                : value === opt.value
                            }
                            onClick={handleSelect}
                          />
                        );
                      })
                    ) : (
                      <div className="cs-select__empty">
                        Không tìm thấy kết quả
                      </div>
                    )}
                  </>
                )}
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
        {error && <div className="cs-select__error-msg">{error}</div>}
      </div>
    );
  },
);

CSSelect.displayName = "CSSelect";
export default React.memo(CSSelect);
