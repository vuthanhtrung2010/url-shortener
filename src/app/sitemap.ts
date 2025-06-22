import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://links.trunghsgs.edu.vn",
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: "https://links.trunghsgs.edu.vn/dashboard",
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
  ];
}
