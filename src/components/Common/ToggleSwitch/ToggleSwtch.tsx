interface ToggleSwitchProps {
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  isChecked,
  onChange,
  disabled = false,
}) => {

  const handleToggleChange = () => {
    if (!disabled) {
      onChange(!isChecked);
    }
  };

  return (
    <div className="inline-flex items-center gap-3 w-[fit-content]">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isChecked}
          onChange={handleToggleChange}
          disabled={disabled}
        />
        <div
          className="
        w-11 h-6 rounded-full bg-gray-200 peer-checked:bg-primary-400
        transition-colors peer-focus:ring-4 peer-focus:ring-blue-300
      "
        >
          <div
            className="
          absolute top-0.5 left-[2px] w-5 h-5 bg-white rounded-full transition-all
          peer-checked:translate-x-full
        "
          ></div>
        </div>
      </label>
      <span className="font-medium">{label}</span>
    </div>

  );
};

export default ToggleSwitch;
