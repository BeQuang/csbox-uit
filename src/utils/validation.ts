import { AppRoute } from "@/app/router/routes";
import { findRouteConfig } from "@/utils/router.helper";
import { ROLES, Role } from "@/utils/role";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const PHONE_REGEX = /^0\d{9,10}$/;
const URL_REGEX = /^https?:\/\/.+/i;
const IDENTITY_CARD_REGEX = /^(\d{9}|\d{12})$/;
const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9]+$/;
const HAS_LOWERCASE_REGEX = /[a-z]/;
const HAS_UPPERCASE_REGEX = /[A-Z]/;
const HAS_NUMBER_REGEX = /\d/;
const HAS_SPECIAL_CHAR_REGEX = /[^A-Za-z0-9]/;
const SQL_INJECTION_PATTERN =
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|TRUNCATE|EXEC)\b|--|;|\/\*|\*\/|')/i;
const DANGEROUS_SCRIPT_PATTERN = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
const DANGEROUS_HTML_TAG_PATTERN = /<[^>]+>/g;

const toTrimmedString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

/** Required: không null/undefined/rỗng/chỉ khoảng trắng */
export const isRequired = (value: unknown): boolean => {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return true;
};

/** Type checks */
export const isString = (value: unknown): value is string =>
  typeof value === "string";

export const isNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";

export const isDateValue = (value: unknown): value is Date =>
  value instanceof Date && !Number.isNaN(value.getTime());

export const isArray = <T = unknown>(value: unknown): value is T[] =>
  Array.isArray(value);

/** Regex / format checks */
export const isEmail = (value: string): boolean =>
  EMAIL_REGEX.test(toTrimmedString(value));

export const isGmail = (value: string): boolean =>
  GMAIL_REGEX.test(toTrimmedString(value));

export const isPhoneNumberVN = (value: string): boolean =>
  PHONE_REGEX.test(toTrimmedString(value));

export const isHttpUrl = (value: string): boolean =>
  URL_REGEX.test(toTrimmedString(value));

export const isIdentityCardNumber = (value: string): boolean =>
  IDENTITY_CARD_REGEX.test(toTrimmedString(value));

export const isAlphaNumeric = (value: string): boolean =>
  ALPHA_NUMERIC_REGEX.test(toTrimmedString(value));

/** Length / range */
export const hasMinLength = (value: string, min: number): boolean =>
  toTrimmedString(value).length >= min;

export const hasMaxLength = (value: string, max: number): boolean =>
  toTrimmedString(value).length <= max;

export const isLengthInRange = (
  value: string,
  min: number,
  max: number,
): boolean => {
  const length = toTrimmedString(value).length;
  return length >= min && length <= max;
};

export const hasMinValue = (value: number, min: number): boolean =>
  isNumber(value) && value >= min;

export const hasMaxValue = (value: number, max: number): boolean =>
  isNumber(value) && value <= max;

export const isNumberInRange = (
  value: number,
  min: number,
  max: number,
): boolean => isNumber(value) && value >= min && value <= max;

/** Business validations */
export const isValidRole = (value: unknown): value is Role =>
  Object.values(ROLES).includes(value as Role);

export const isValidRoutePath = (
  routes: AppRoute[],
  pathname: string,
): boolean => Boolean(findRouteConfig(routes, toTrimmedString(pathname)));

export const isConfirmedValue = (
  value: string,
  confirmation: string,
): boolean => toTrimmedString(value) === toTrimmedString(confirmation);

export const hasForbiddenWord = (
  value: string,
  forbiddenWords: string[],
): boolean => {
  const normalized = toTrimmedString(value).toLowerCase();
  return forbiddenWords.some((word) =>
    normalized.includes(toTrimmedString(word).toLowerCase()),
  );
};

export const isAllowedByBlacklist = (
  value: string,
  forbiddenWords: string[],
): boolean => !hasForbiddenWord(value, forbiddenWords);

export const isUniqueValue = async (
  value: string,
  checkUniqueFn: (normalizedValue: string) => Promise<boolean>,
): Promise<boolean> => checkUniqueFn(toTrimmedString(value));

export const isExistingEntity = async (
  id: string,
  checkExistFn: (id: string) => Promise<boolean>,
): Promise<boolean> => checkExistFn(toTrimmedString(id));

/** Date & time */
export const isPastDate = (value: Date): boolean =>
  isDateValue(value) && value.getTime() < Date.now();

export const isFutureDate = (value: Date): boolean =>
  isDateValue(value) && value.getTime() > Date.now();

export const isDateRangeValid = (startDate: Date, endDate: Date): boolean =>
  isDateValue(startDate) &&
  isDateValue(endDate) &&
  endDate.getTime() >= startDate.getTime();

export const getAge = (birthday: Date): number => {
  if (!isDateValue(birthday)) {
    return NaN;
  }

  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const monthDiff = today.getMonth() - birthday.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthday.getDate())
  ) {
    age -= 1;
  }

  return age;
};

export const isMinAge = (birthday: Date, minAge: number): boolean => {
  const age = getAge(birthday);
  return Number.isFinite(age) && age >= minAge;
};

/** File validations */
export const hasAllowedFileExtension = (
  fileName: string,
  allowedExtensions: string[],
): boolean => {
  const normalized = toTrimmedString(fileName).toLowerCase();
  return allowedExtensions.some((extension) =>
    normalized.endsWith(extension.toLowerCase()),
  );
};

export const hasAllowedMimeType = (
  file: Pick<File, "type">,
  allowedMimeTypes: string[],
): boolean => allowedMimeTypes.includes(file.type);

export const hasMaxFileSize = (
  file: Pick<File, "size">,
  maxSizeInBytes: number,
): boolean => file.size <= maxSizeInBytes;

export const hasMinImageDimension = async (
  file: Blob,
  minWidth: number,
  minHeight: number,
): Promise<boolean> => {
  const imageBitmap = await createImageBitmap(file);
  const valid =
    imageBitmap.width >= minWidth && imageBitmap.height >= minHeight;
  imageBitmap.close();
  return valid;
};

/** Security validations */
export const sanitizeHtml = (value: string): string =>
  toTrimmedString(value)
    .replace(DANGEROUS_SCRIPT_PATTERN, "")
    .replace(DANGEROUS_HTML_TAG_PATTERN, "")
    .trim();

export const hasSqlInjectionRisk = (value: string): boolean =>
  SQL_INJECTION_PATTERN.test(toTrimmedString(value));

export const isSafeInput = (value: string): boolean =>
  !hasSqlInjectionRisk(value);

export const hasStrongPasswordPattern = (value: string): boolean => {
  const trimmed = toTrimmedString(value);

  return (
    HAS_LOWERCASE_REGEX.test(trimmed) &&
    HAS_UPPERCASE_REGEX.test(trimmed) &&
    HAS_NUMBER_REGEX.test(trimmed) &&
    HAS_SPECIAL_CHAR_REGEX.test(trimmed)
  );
};

export type RegisterValidationPayload = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: Date;
  role: unknown;
};

/**
 * Bộ validate tổng hợp cho form đăng ký người dùng.
 */
export const validateRegisterPayload = (
  payload: RegisterValidationPayload,
) => ({
  username:
    isRequired(payload.username) &&
    isLengthInRange(payload.username, 6, 20) &&
    isAlphaNumeric(payload.username),
  email: isRequired(payload.email) && isEmail(payload.email),
  password:
    isRequired(payload.password) &&
    hasMinLength(payload.password, 8) &&
    hasStrongPasswordPattern(payload.password),
  confirmPassword: isConfirmedValue(payload.password, payload.confirmPassword),
  birthday:
    isDateValue(payload.birthday) &&
    isPastDate(payload.birthday) &&
    isMinAge(payload.birthday, 13),
  role: isValidRole(payload.role),
});
