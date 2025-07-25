import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: "/dashboard",
      },
      {
        userAgent: "Applebot",
        disallow: ["/", "/dashboard"],
      },
    ],
    sitemap: "https://links.trunghsgs.edu.vn/sitemap.xml",
  };
}
