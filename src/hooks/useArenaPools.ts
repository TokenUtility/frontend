import useSWRInfinite from "swr/infinite";
import { networkConnectors } from "@/provider/networkConnectors";
import { PAGE_SIZE } from "@/constants";
// import qs, { StringifiableRecord } from "query-string";
import { ArenaPoolDataBackend } from "@/utils/types";

interface FilterOptionProps {
  chain?: any;
}

interface FilterProps extends FilterOptionProps {
  pageId: number;
  pageSize: number;
}

interface KeyProps extends FilterOptionProps {
  pageIndex: number;
  previousPageData: any;
}

const getKey = ({ chain, pageIndex, previousPageData }: KeyProps) => {
  const baseUrl = networkConnectors.getAPIUrl(chain);

  if (!baseUrl) return null;

  if (pageIndex && !previousPageData?.docs) {
    // return a falsy value if this is the last page
    return null;
  }

  // let filterParams: FilterProps = {
  //   pageId: pageIndex + 1,
  //   pageSize: PAGE_SIZE.HOME,
  // };

  return (
    baseUrl + `/tokens`
    // qs.stringify(filterParams as unknown as StringifiableRecord)
  );
};

const useArenaPools = (
  filterOptions = {}
): {
  data: any[];
  arenaPools: ArenaPoolDataBackend[];
  total: number;
  isLoading: boolean;
  isError: any;
  isValidating: boolean;
  size: number;
  setSize: (size: number | ((_size: number) => number)) => Promise<any>;
} => {
  let skip = false;

  if (!filterOptions) {
    skip = true;
  }

  const { data, error, size, setSize, isValidating, isLoading } =
    useSWRInfinite(
      skip
        ? null
        : (pageIndex, previousPageData) =>
            getKey({ pageIndex, previousPageData, ...filterOptions })
    );

  const arenaPools: { docs: any[]; totalDocs: number }[] = data as unknown as {
    docs: any[];
    totalDocs: number;
  }[];

  return {
    data,
    arenaPools: arenaPools?.reduce((result, item) => {
      return result.concat(item?.docs);
    }, []),
    total: arenaPools?.[0].totalDocs,
    isLoading,
    isError: error,
    isValidating: isValidating,
    size: size,
    setSize: setSize,
  };
};

export default useArenaPools;
