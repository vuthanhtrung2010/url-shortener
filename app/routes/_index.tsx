import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-backgroundColor">
      <section id="header" className="w-10/12 bg-backgroundAccent flex flex-col mx-auto rounded-md mt-10 md:w-8/12 lg:w-4/12">
        {/* Profile picture */}
        <div className="flex flex-col mx-auto my-6">
          <img className="rounded-full h-32 w-32" src="/assets/pfp.gif" alt="Profile Picture" />
        </div>

        {/* Info */}
        <div className="flex flex-col mx-auto mb-6">
          <h1 className="text-primaryText text-3xl font-bold text-center">Trung</h1>
        </div>
      </section>

      {/* Links */}
      <section id="links" className="w-10/12 flex flex-col mx-auto mb-10 mt-1 md:w-8/12 lg:w-4/12">
        {/* Websites */}
        <a href="/website" id="website" className="bg-backgroundAccent my-1 h-24 text-primaryText flex-row flex rounded-link hover:bg-backgroundAccentLighter mx-auto sm:mx-auto md:mx-0">
          <div className="py-2 px-2 hidden md:flex">
            <img src="/assets/links/website.png" className="rounded-website h-20 w-20 hidden sm:hidden md:inline" alt="Website" />
          </div>
          <div className="flex flex-col py-4 px-6">
            <h3 className="text-xl text-primaryText text-center sm:text-center md:text-left">Personal Website</h3>
            <span className="text-base text-secondaryText pt-1 text-center sm:text-center md:text-left">info.trung.is-a.dev</span>
          </div>
        </a>

        {/* Developer website */}
        <a href="/dev" id="dev" className="bg-backgroundAccent my-1 h-24 text-primaryText flex-row flex rounded-link hover:bg-backgroundAccentLighter mx-auto sm:mx-auto md:mx-0">
          <div className="py-2 px-2 hidden md:flex">
            <img src="/assets/links/dev.png" className="rounded-website h-20 w-20 hidden sm:hidden md:inline" alt="Developer Website" />
          </div>
          <div className="flex flex-col py-4 px-6">
            <h3 className="text-xl text-primaryText text-center sm:text-center md:text-left">Developer Website</h3>
            <span className="text-base text-secondaryText pt-1 text-center sm:text-center md:text-left">info.trung.is-a.dev</span>
          </div>
        </a>

        {/* Bots list */}
        <a href="/botlist" id="botlist" className="bg-backgroundAccent my-1 h-24 text-primaryText flex-row flex rounded-link hover:bg-backgroundAccentLighter mx-auto sm:mx-auto md:mx-0">
          <div className="py-2 px-2 hidden md:flex">
            <img src="/assets/links/dev.png" className="rounded-website h-20 w-20 hidden sm:hidden md:inline" alt="Developer Website" />
          </div>
          <div className="flex flex-col py-4 px-6">
            <h3 className="text-xl text-primaryText text-center sm:text-center md:text-left">Bots List</h3>
            <span className="text-base text-secondaryText pt-1 text-center sm:text-center md:text-left">bots.trung.is-a.dev</span>
          </div>
        </a>

        {/* Discord */}
        <a href="/discord" id="discord" className="bg-backgroundAccent my-1 h-24 text-primaryText flex-row flex rounded-link hover:bg-backgroundAccentLighter mx-auto sm:mx-auto md:mx-0">
          <div className="py-2 px-2 hidden md:flex">
            <img src="/assets/links/discord.png" className="rounded-full h-20 w-20 hidden sm:hidden md:inline" alt="Discord" />
          </div>
          <div className="flex flex-col py-4 px-6">
            <h3 className="text-xl text-primaryText text-center sm:text-center md:text-left">Discord</h3>
            <span className="text-base text-secondaryText pt-1 text-center sm:text-center md:text-left">trungisreal</span>
          </div>
        </a>

        {/* Discord Server */}
        <a href="/discordserver" id="discordserver" className="bg-backgroundAccent my-1 h-24 text-primaryText flex-row flex rounded-link hover:bg-backgroundAccentLighter mx-auto sm:mx-auto md:mx-0">
          <div className="py-2 px-2 hidden md:flex">
            <img src="/assets/links/discord.png" className="rounded-full h-20 w-20 hidden sm:hidden md:inline" alt="Discord" />
          </div>
          <div className="flex flex-col py-4 px-6">
            <h3 className="text-xl text-primaryText text-center sm:text-center md:text-left">Discord Server</h3>
            <span className="text-base text-secondaryText pt-1 text-center sm:text-center md:text-left">Mystic Support</span>
          </div>
        </a>

        {/* Github */}
        <a href="/github" id="github" className="bg-backgroundAccent my-1 h-24 text-primaryText flex-row flex rounded-link hover:bg-backgroundAccentLighter mx-auto sm:mx-auto md:mx-0">
          <div className="py-2 px-2 hidden md:flex">
            <img src="/assets/links/github.png" className="rounded-full h-20 w-20 hidden sm:hidden md:inline" alt="GitHub" />
          </div>
          <div className="flex flex-col py-4 px-6">
            <h3 className="text-xl text-primaryText text-center sm:text-center md:text-left">GitHub</h3>
            <span className="text-base text-secondaryText pt-1 text-center sm:text-center md:text-left">vuthanhtrung2010</span>
          </div>
        </a>

        {/* Status */}
        <a href="/status" id="status" className="bg-backgroundAccent my-1 h-24 text-primaryText flex-row flex rounded-link hover:bg-backgroundAccentLighter mx-auto sm:mx-auto md:mx-0">
          <div className="py-2 px-2 hidden md:flex">
            <img src="/assets/links/status.png" className="rounded-full h-20 w-20 hidden sm:hidden md:inline" alt="Status" />
          </div>
          <div className="flex flex-col py-4 px-6">
            <h3 className="text-xl text-primaryText text-center sm:text-center md:text-left">Status</h3>
            <span className="text-base text-secondaryText pt-1 text-center sm:text-center md:text-left">uptime.trung.is-a.dev</span>
          </div>
        </a>
      </section>
    </div>
  )
}
