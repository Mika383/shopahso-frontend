type AuthFieldProps = {
  autoComplete?: string;
  error?: string;
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
};

export function AuthField({
  autoComplete,
  error,
  label,
  name,
  onChange,
  placeholder,
  type = "text",
  value,
}: AuthFieldProps) {
  const inputId = `auth-field-${name}`;

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full border border-border bg-white px-4 text-sm outline-none transition-colors focus:border-primary"
      />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
