export type FieldRule = "letters" | "digits" | "decimal" | "free";

const LETTERS = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]*$/;
const DIGITS = /^\d*$/;
const DECIMAL = /^\d*(\.\d{0,2})?$/;


export function getInputError(rule: FieldRule, value: string): string {
  switch (rule) {
    case "letters":
      return LETTERS.test(value) ? "" : "Este campo solo acepta letras, no números ni símbolos";
    case "digits":
      return DIGITS.test(value) ? "" : "Este campo solo acepta números";
    case "decimal":
      return DECIMAL.test(value) ? "" : "Ingresa un número válido (máximo 2 decimales)";
    default:
      return "";
  }
}

export const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const hasErrors = (errors: Record<string, string | undefined>) =>
  Object.values(errors).some(Boolean);