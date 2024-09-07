export function RedirectPathForm({
  required_form,
}: {
  readonly required_form: boolean;
}) {
  return (
    <div className="form-input mb-4">
      <input
        type="text"
        name="alias"
        className="w-full text-sm"
        required={required_form}
      />
      <label>
        <span style={{ transitionDelay: "0ms" }}>R</span>
        <span style={{ transitionDelay: "50ms" }}>e</span>
        <span style={{ transitionDelay: "100ms" }}>d</span>
        <span style={{ transitionDelay: "150ms" }}>i</span>
        <span style={{ transitionDelay: "200ms" }}>r</span>
        <span style={{ transitionDelay: "250ms" }}>e</span>
        <span style={{ transitionDelay: "300ms" }}>c</span>
        <span style={{ transitionDelay: "350ms" }}>t</span>
        <span style={{ transitionDelay: "400ms" }}> </span>
        <span style={{ transitionDelay: "450ms" }}>P</span>
        <span style={{ transitionDelay: "500ms" }}>a</span>
        <span style={{ transitionDelay: "550ms" }}>t</span>
        <span style={{ transitionDelay: "600ms" }}>h</span>
      </label>
      <span className="input-border"></span>
    </div>
  );
}
