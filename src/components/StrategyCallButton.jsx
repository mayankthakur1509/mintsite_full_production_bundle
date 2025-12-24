export default function StrategyCallButton() {
  const handleClick = () => {
    alert("Redirecting to schedule a strategy call...");
    window.location.href = "/schedule-call";
  };

  return (
    <div className="form-free-strategy-call">
      <button onClick={handleClick}>Request a Strategy Call</button>
    </div>
  );
}
