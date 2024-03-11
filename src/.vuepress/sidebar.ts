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
        {
          text: "Components Overview",
          prefix: "components/",
          collapsible: true,
          children: [
            "components_overview",
            "connection_pool",
            "connection",
            "transaction",
            "cursor",
          ],
        }
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
