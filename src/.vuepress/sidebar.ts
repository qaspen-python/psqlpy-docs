import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Introduction",
      prefix: "introduction/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "Usage",
      prefix: "usage/",
      collapsible: true,
      children: "structure",
    },
  ],
});
