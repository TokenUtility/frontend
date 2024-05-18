/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
  generateRobotsTxt: true, // (optional)
  exclude: process.env.NEXT_PUBLIC_SHOW_COMING_SOON !== "1" && "/coming-soon",
  // ...other options
};
