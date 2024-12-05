import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://links.devtrung.tech",
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: "https://links.devtrung.tech/dashboard",
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
  ];
}
