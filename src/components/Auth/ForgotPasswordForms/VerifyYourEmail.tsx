interface verifyProps {
  title: string;
  message: string;
}

export default function VerifyYourEmail({ title, message }: verifyProps) {
  return (
    <div className="text-center">
      <h1 className="font-semibold text-2xl mb-4">{title}</h1>
      <p>{message}</p>
    </div>
  );
}
