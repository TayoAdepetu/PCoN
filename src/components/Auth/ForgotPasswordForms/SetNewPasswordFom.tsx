import Spinner from "../../Common/Spinner/Spinner";
import { SetNewPasswordFormProps } from "../../../types/props";

export default function SetNewPasswordForm({
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  loading,
}: SetNewPasswordFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-light"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-light"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="confirm-password"
          className="block text-gray-700 font-bold mb-2"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm-password"
          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-light"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-primary-light hover:bg-[#2196F3] text-white font-bold w-full py-2 px-4 rounded focus:outline-primary-light mb-2"
      >
        {loading ? <Spinner /> : "Submit"}
      </button>
    </form>
  );
}
