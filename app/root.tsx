import { captureRemixErrorBoundaryError } from "@sentry/remix";
import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import "./styles.css";
import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  {
    rel: "icon",
    href: "/favicon.ico",
    type: "image/x-icon",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Trung's Spotify Status" },
    {
      property: "og:title",
      content: "Trung's URL Shortener",
    },
    {
      name: "description",
      content: "A website which displays all my shorten links.",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    // {
    //   property: "og:image",
    //   content: "/assets/banner.png",
    // },
    {
      name: "twitter:title",
      content: "Trung's URL Shortener",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:description",
      content: "A website which displays all my shorten links.",
    },
    {
      charset: "UTF-8",
    },
  ];
};

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-backgroundColor">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  return <div>Something went wrong</div>;
};

export default function App() {
  return <Outlet />;
}