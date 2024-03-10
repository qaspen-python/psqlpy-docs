import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Introduction",
      prefix: "introduction/",
      collapsible: true,
      children: [
        "introduction",
        "lets_start",
        "components_overview",
      ],
    },
    {
      text: "Usage",
      prefix: "usage/",
      collapsible: true,
      children: "structure",
    },
  ],
});
