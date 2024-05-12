import { useEffect, useRef, createElement, Fragment } from "react";
import { createRoot } from "react-dom/client";
import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
import algoliasearch from "algoliasearch/lite";
import { styled, alpha } from "@mui/material/styles";
import type { AutocompleteComponents } from "@algolia/autocomplete-js";
import type { Hit } from "@algolia/client-search";
import type { Root } from "react-dom/client";
import "@algolia/autocomplete-theme-classic";
import "./search.scss";
import Link from "next/link";
import { networkConnectors } from "@/provider/networkConnectors";

function debouncePromise(fn, time) {
  let timerId = undefined;

  return function debounced(...args) {
    if (timerId) {
      clearTimeout(timerId);
    }

    return new Promise((resolve) => {
      timerId = setTimeout(() => resolve(fn(...args)), time);
    });
  };
}
const debounced = debouncePromise((items) => Promise.resolve(items), 300);

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("md")]: {
    fontSize: "16px",
    width: "200px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "16px",
    width: "340px",
  },
  [theme.breakpoints.up("xl")]: {
    width: "400px",
    "&:focus": {
      width: "483px",
    },
  },
}));

const appId = process.env.NEXT_PUBLIC_ALGOLIA_ID;
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API;
const searchClient = algoliasearch(appId, apiKey);

type DonationHit = Hit<{
  title: string;
  description: string;
  ownerAddress: string;
  targetAmount: string;
  raisedAmount: string;
  ownerAvatar: string;
  contributorsCount: string;
  createdAt: string;
}>;

export default function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRootRef = useRef<Root | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const indexSearch = networkConnectors.getIndexAlgolia();

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete<DonationHit>({
      container: containerRef.current,
      placeholder: "Enter Search",
      // @ts-ignore
      getSources({ query }) {
        return debounced([
          {
            sourceId: "donations",
            getItems() {
              return getAlgoliaResults<DonationHit>({
                searchClient,
                queries: [
                  {
                    indexName: indexSearch,
                    query,
                  },
                ],
              });
            },
            templates: {
              item({ item, components }) {
                return <DonationItem hit={item} components={components} />;
              },
              noResults() {
                return "No donations matching.";
              },
            },
          },
        ]);
      },
      renderer: { createElement, Fragment, render: () => {} },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
      detachedMediaQuery: "none",
    });

    return () => {
      search.destroy();
    };
  }, [indexSearch]);

  return (
    <div>
      <Search id="donation-search" ref={containerRef} />
    </div>
  );
}

type DonationItemProps = {
  hit: DonationHit;
  components: AutocompleteComponents;
};

function DonationItem({ hit, components }: DonationItemProps) {
  return (
    <Link href={`/donations/${hit.objectID}`} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemContentBody">
          <div className="aa-ItemContentTitle">
            <components.Highlight hit={hit} attribute="title" />
          </div>
          <div className="aa-ItemContentDescription">
            <components.Highlight hit={hit} attribute="description" />
          </div>
        </div>
      </div>
    </Link>
  );
}
