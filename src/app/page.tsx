import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-backgroundColor">
      <section
        id="header"
        className="w-10/12 bg-backgroundAccent flex flex-col mx-auto rounded-md mt-10 md:w-8/12 lg:w-4/12"
      >
        {/* Profile picture */}
        <div className="flex flex-col mx-auto my-6">
          <Image
            className="rounded-full"
            src="/assets/pfp.webp"
            alt="Profile Picture"
            unoptimized
            width={128}
            height={128}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col mx-auto mb-6">
          <h1 className="text-primaryText text-3xl font-bold text-center">
            Trung
          </h1>
        </div>
      </section>

      {/* Links */}
      <section
        id="links"
        className="w-10/12 flex flex-col mx-auto mb-10 mt-1 md:w-8/12 lg:w-4/12"
      >
        {/* Personal website */}
        <Link
          href="/website"
          id="dev"
          className="bg-backgroundAccent my-1 h-24 text-primaryText flex-row flex rounded-link hover:bg-backgroundAccentLighter mx-auto sm:mx-auto md:mx-0"
        >
          <div className="py-2 px-2 hidden md:flex">
            <Image
              src="/assets/links/dev.png"
              className="rounded-website hidden sm:hidden md:inline"
              alt="Developer Website"
              width={80}
              height={80}
            />
          </div>
          <div className="flex flex-col py-4 px-6">
            <h3 className="text-xl text-primaryText text-center sm:text-center md:text-left">
              Personal Website
            </h3>
            <span className="text-base text-secondaryText pt-1 text-center sm:text-center md:text-left">
              trung.is-a.dev
            </span>
          </div>
        </Link>

        {/* Bots list */}
        <Link
          href="/botlist"
          id="botlist"
          className="bg-backgroundAccent my-1 h-24 text-primaryText flex-row flex rounded-link hover:bg-backgroundAccentLighter mx-auto sm:mx-auto md:mx-0"
        >
          <div className="py-2 px-2 hidden md:flex">
            <Image
              src="/assets/links/dev.png"
              className="rounded-website hidden sm:hidden md:inline"
              alt="Developer Website"
              width={80}
              height={80}
            />
          </div>
          <div className="flex flex-col py-4 px-6">
            <h3 className="text-xl text-primaryText text-center sm:text-center md:text-left">
              Bots List
            </h3>
            <span className="text-base text-secondaryText pt-1 text-center sm:text-center md:text-left">
              bots.trung.is-a.dev
            </span>
          </div>
        </Link>

        {/* Discord */}
        <Link
          href="/discord"
          id="discord"
          className="bg-backgroundAccent my-1 h-24 text-primaryText flex-row flex rounded-link hover:bg-backgroundAccentLighter mx-auto sm:mx-auto md:mx-0"
        >
          <div className="py-2 px-2 hidden md:flex">
            <Image
              src="/assets/links/discord.png"
              className="rounded-full hidden sm:hidden md:inline"
              alt="Discord"
              width={80}
              height={80}
            />
          </div>
          <div className="flex flex-col py-4 px-6">
            <h3 className="text-xl text-primaryText text-center sm:text-center md:text-left">
              Discord
            </h3>
            <span className="text-base text-secondaryText pt-1 text-center sm:text-center md:text-left">
              trungisreal
            </span>
          </div>
        </Link>

        {/* Discord Server */}
        <Link
          href="/discordserver"
          id="discordserver"
          className="bg-backgroundAccent my-1 h-24 text-primaryText flex-row flex rounded-link hover:bg-backgroundAccentLighter mx-auto sm:mx-auto md:mx-0"
        >
          <div className="py-2 px-2 hidden md:flex">
            <Image
              src="/assets/links/discord.png"
              className="rounded-full hidden sm:hidden md:inline"
              alt="Discord"
              width={80}
              height={80}
            />
          </div>
          <div className="flex flex-col py-4 px-6">
            <h3 className="text-xl text-primaryText text-center sm:text-center md:text-left">
              Discord Server
            </h3>
            <span className="text-base text-secondaryText pt-1 text-center sm:text-center md:text-left">
              Trung Development
            </span>
          </div>
        </Link>

        {/* Github */}
        <Link
          href="/github"
          id="github"
          className="bg-backgroundAccent my-1 h-24 text-primaryText flex-row flex rounded-link hover:bg-backgroundAccentLighter mx-auto sm:mx-auto md:mx-0"
        >
          <div className="py-2 px-2 hidden md:flex">
            <Image
              src="/assets/links/github.png"
              className="rounded-full hidden sm:hidden md:inline"
              alt="GitHub"
              width={80}
              height={80}
            />
          </div>
          <div className="flex flex-col py-4 px-6">
            <h3 className="text-xl text-primaryText text-center sm:text-center md:text-left">
              GitHub
            </h3>
            <span className="text-base text-secondaryText pt-1 text-center sm:text-center md:text-left">
              vuthanhtrung2010
            </span>
          </div>
        </Link>

        {/* Status */}
        <Link
          href="/status"
          id="status"
          className="bg-backgroundAccent my-1 h-24 text-primaryText flex-row flex rounded-link hover:bg-backgroundAccentLighter mx-auto sm:mx-auto md:mx-0"
        >
          <div className="py-2 px-2 hidden md:flex">
            <Image
              src="/assets/links/status.png"
              className="rounded-full hidden sm:hidden md:inline"
              alt="Status"
              width={80}
              height={80}
            />
          </div>
          <div className="flex flex-col py-4 px-6">
            <h3 className="text-xl text-primaryText text-center sm:text-center md:text-left">
              Status
            </h3>
            <span className="text-base text-secondaryText pt-1 text-center sm:text-center md:text-left">
              uptime.trung.is-a.dev
            </span>
          </div>
        </Link>
      </section>
    </div>
  );
}