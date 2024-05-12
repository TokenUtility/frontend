import { useRouter } from "next/navigation";
import { useStores } from "@/contexts/storesContext";

export default function usePushWithAuth(): (page: string) => void {
  const {
    root: { dropdownStore, userStore, providerStore },
  } = useStores();
  const { push } = useRouter();

  function pushWithAuth(page: string) {
    if (providerStore.isConnect) {
      if (userStore.accessToken) {
        push(page);
      } else {
        push("/login");
      }
    } else {
      dropdownStore.toggleWalletDropdown();
    }
  }
  return pushWithAuth;
}
