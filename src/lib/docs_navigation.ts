
import React from "react";
import { useTranslations } from "next-intl";

export interface CollectionItemProps {
  id: string;
  name: string;
  desc: string;
  tag?: string;
}

export interface CollectionGroupProps {
  title: string;
  links: Array<CollectionItemProps>;
}


export function useCollectionData() {
  const t = useTranslations("docs");
  const collectionList: CollectionGroupProps[] = [
    {
      title: t("group.ai"),
      links: [
        {
          id: "sd-ecology",
          name: t("sd-ecology.title"),
          desc: t("sd-ecology.desc"),
        },
        {
          id: "diffuseum",
          name: t("diffuseum.title"),
          desc: t("diffuseum.desc"),
        },
        {
          id: "transformer-papers",
          name: t("transformer-papers.title"),
          desc: t("transformer-papers.desc"),
          tag: "WIP",
        },
        {
          id: "image-datasets",
          name: t("image-datasets.title"),
          desc: t("image-datasets.desc"),
        },
        {
          id: "awesome-ai-products",
          name: t("awesome-ai-products.title"),
          desc: t("awesome-ai-products.desc"),
        },
      ]
    },
    {
      title: t("group.art"),
      links: [
        {
          id: "digital-art-tools",
          name: t("digital-art-tools.title"),
          desc: t("digital-art-tools.desc"),
        },
        {
          id: "digital-artists",
          name: t("digital-artists.title"),
          desc: t("digital-artists.desc"),
          tag: "WIP",
        },
        {
          id: "midi-controllers",
          name: t("midi-controllers.title"),
          desc: t("midi-controllers.desc"),
          tag: "WIP",
        },
        {
          id: "gen-art-algorithm",
          name: t("gen-art-algorithm.title"),
          desc: t("gen-art-algorithm.desc"),
          tag: "WIP",
        },
      ]
    },
    {
      title: t("group.design"),
      links: [
        {
          id: "design-resources",
          name: t("design-resources.title"),
          desc: t("design-resources.desc"),
          tag: "WIP",
        },
        {
          id: "open-source-fonts",
          name: t("open-source-fonts.title"),
          desc: t("open-source-fonts.desc"),
        },
      ]
    },
    {
      title: t("group.web"),
      links: [
        {
          id: "awesome-web3d",
          name: t("awesome-web3d.title"),
          desc: t("awesome-web3d.desc"),
        },
      ]
    },
    {
      title: t("group.dev"),
      links: [
        {
          id: "latent-cat-stack",
          name: t("latent-cat-stack.title"),
          desc: t("latent-cat-stack.desc"),
        },
        {
          id: "python-5-libs",
          name: t("python-5-libs.title"),
          desc: t("python-5-libs.desc"),
          tag: "WIP",
        },
      ]
    },
    {
      title: t("group.game"),
      links: [
        {
          id: "awesome-unity",
          name: t("awesome-unity.title"),
          desc: t("awesome-unity.desc"),
        },
      ]
    },
    {
      title: t("group.vis"),
      links: [
        {
          id: "vis-tools",
          name: t("vis-tools.title"),
          desc: t("vis-tools.desc"),
          tag: "WIP",
        },
        {
          id: "vis-websites",
          name: t("vis-websites.title"),
          desc: t("vis-websites.desc"),
          tag: "WIP",
        },
      ]
    },
    {
      title: t("group.miscellaneous"),
      links: [
        {
          id: "edu-free",
          name: t("edu-free.title"),
          desc: t("edu-free.desc"),
        },
        {
          id: "awesome-resource-sites",
          name: t("awesome-resource-sites.title"),
          desc: t("awesome-resource-sites.desc"),
        },
      ]
    },
  ] as const;
  return {
    collectionList,
  };
}

export interface NavGroup {
  title: string;
  links: Array<{
    title: string;
    href: string;
    tag?: string
  }>;
}


export function useNavData() {
  const t = useTranslations();
  const { collectionList } = useCollectionData();
  const navigation: NavGroup[] = [
    {
      title: t("nav.getting_started"),
      links: [
        { title: t("docs.introduction.title"), href: "/docs" },
        { title: t("docs.follow-us.title"), href: "/docs/follow-us" },
        { title: t("docs.contributing.title"), href: "/docs/contributing" },
        { title: t("docs.collections.title"), href: "/docs/collections" },
      ],
    },
    ...collectionList.map((group, groupIndex) => (
      {
        title: group.title,
        links: [
          ...group.links.map((item, index) => ({
            title: item.name,
            href: "/" + item.id,
            tag: item.tag
          })),
        ],
      }
    )),
  ] as const;
  return {
    navigation,
  };
}
