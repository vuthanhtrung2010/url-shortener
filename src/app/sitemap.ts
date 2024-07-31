import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://links.trung.is-a.dev",
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: "https://links.trung.is-a.dev/dashboard",
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
  ];
}
