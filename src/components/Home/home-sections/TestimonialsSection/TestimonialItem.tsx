import { TestimonialItemProps } from "../../../../types/props";

export default function TestimonialItem({
  quote,
  name,
  age,
  country,
  image,
}: TestimonialItemProps) {
  return (
    <div className="border border-primary p-6 rounded-lg text-left flex flex-col">
      <p className="text-gray-400 mb-4">&ldquo;{quote}&rdquo;</p>
      <div className="flex flex-col justify-end flex-1">
        <div className="flex items-center">
          <img
            height={40}
            width={40}
            src={image}
            alt={name}
            className="rounded-full w-10 h-10 border-2 border-primary mr-4"
          />
          <div>
            <h6 className="font-medium text-gray-900">{name}</h6>
            <p className="text-sm text-gray-600">
              {age}, {country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
