export function RedirectURLForm() {
  return (
    <div className="form-input mb-4">
      <input type="url" name="url" className="w-full text-sm" required />
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
        <span style={{ transitionDelay: "450ms" }}>U</span>
        <span style={{ transitionDelay: "500ms" }}>R</span>
        <span style={{ transitionDelay: "550ms" }}>L</span>
      </label>
      <span className="input-border"></span>
    </div>
  );
}
