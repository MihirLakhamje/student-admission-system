export function ErrorLabel({ message }) {
  return (
    <div className="label">
      <span className="label-text-alt text-error font-medium">{message}</span>
    </div>
  );
}

export function SuccessLabel({ message }) {
  return (
    <div className="label">
      <span className="label-text-alt text-success">{message}</span>
    </div>
  );
}

export function InfoLabel({ message }) {
  return (
    <div className="label">
      <span className="label-text-alt text-info">{message}</span>
    </div>
  );
}

export function WarningLabel({ message }) {
  return (
    <div className="label">
      <span className="label-text-alt text-warning">{message}</span>
    </div>
  );
}
