import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.govindrajwatch.shop";

  const staticRoutes = [
    "",
    "/shop",
    "/shop/watches",
    "/shop/men",
    "/shop/women",
    "/shop/kids",
    "/shop/couple",
    "/shop/smart-watches",
    "/shop/clocks",
    "/shop/belts",
    "/shop/wallets",
    "/shop/goggles",
    "/shop/gifts",
    "/brands",
    "/brands/titan",
    "/brands/fastrack",
    "/brands/casio",
    "/brands/fossil",
    "/brands/sonata",
    "/brands/wildhorn",
    "/gift-finder",
    "/repair",
    "/repair/book",
    "/repair/track",
    "/about",
    "/contact",
    "/blog",
    "/privacy",
    "/terms",
    "/shipping-policy",
    "/return-policy",
    "/cancellation-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return staticRoutes;
}
