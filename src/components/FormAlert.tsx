import { CheckCircle2, AlertCircle } from "lucide-react";

interface FormAlertProps {
  type: "success" | "error";
  message: string;
}

export const FormAlert = ({ type, message }: FormAlertProps) => {
  if (!message) return null;
  const isSuccess = type === "success";
  return (
    <div
      role="alert"
      className={`flex items-start gap-2 rounded-lg border px-4 py-3 text-sm ${
        isSuccess
          ? "border-green-200 bg-green-50 text-green-700"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
      ) : (
        <AlertCircle size={18} className="mt-0.5 shrink-0" />
      )}
      <span>{message}</span>
    </div>
  );
};

export const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="mt-1.5 text-xs font-medium text-red-600">{message}</p> : null;