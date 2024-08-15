import Link from "next/link";
import Image from "next/image";

interface Props {
  readonly title: string;
  readonly target: string;
  readonly description: string;
  readonly icon: string;
}

export function MainPage({ title, target, description, icon }: Props) {
  return (
    <Link
      href={target}
      className="bg-backgroundAccent my-1 h-24 text-primaryText flex-row flex rounded-link hover:bg-backgroundAccentLighter mx-auto sm:mx-auto md:mx-0"
    >
      <div className="py-2 px-2 md:flex">
        <Image
          src={icon}
          className="sm:hidden md:inline"
          alt={title}
          width={80}
          height={80}
        />
      </div>
      <div className="flex flex-col py-4 px-6">
        <h3 className="text-xl text-primaryText text-center sm:text-center md:text-left">
          {title}
        </h3>
        <span className="text-base text-secondaryText pt-1 text-center sm:text-center md:text-left">
          {description}
        </span>
      </div>
    </Link>
  );
}
