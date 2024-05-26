import { useStores } from "@/contexts/storesContext";

interface handleAuthProps {
  onlyCheck?: boolean;
}

export default function useCheckAuth(): (params?: handleAuthProps) => boolean {
  const {
    root: { dropdownStore, providerStore, userStore, notificationStore },
  } = useStores();

  function handleAuth({ onlyCheck = false }: handleAuthProps): boolean {
    if (!providerStore.isConnect) {
      if (onlyCheck) {
        notificationStore.showWaringNotification("Please login first");
      } else {
        dropdownStore.toggleWalletDropdown();
      }
      return false;
    }
    if (!userStore.accessToken) {
      if (onlyCheck) {
        notificationStore.showWaringNotification("Please login first");
      } else {
        userStore.handleLoginWallet();
      }
      return false;
    }
    return true;
  }
  return handleAuth;
}
