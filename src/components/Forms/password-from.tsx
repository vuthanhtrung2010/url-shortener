export function PasswordForm() {
  return (
    <div className="form-input mb-4">
      <input
        type="password"
        name="password"
        className="w-full text-sm"
        required
      />
      <label>
        <span style={{ transitionDelay: "0ms" }}>P</span>
        <span style={{ transitionDelay: "50ms" }}>a</span>
        <span style={{ transitionDelay: "100ms" }}>s</span>
        <span style={{ transitionDelay: "150ms" }}>s</span>
        <span style={{ transitionDelay: "200ms" }}>w</span>
        <span style={{ transitionDelay: "250ms" }}>o</span>
        <span style={{ transitionDelay: "300ms" }}>r</span>
        <span style={{ transitionDelay: "350ms" }}>d</span>
      </label>
      <span className="input-border"></span>
    </div>
  );
}
