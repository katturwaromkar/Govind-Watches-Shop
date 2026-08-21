import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/account/", "/checkout/", "/cart/", "/api/"],
    },
    sitemap: "https://www.govindrajwatch.shop/sitemap.xml",
  };
}
