import useAuthStore from "../store/authStore";

export function useUserStorageKey(): {
  getKey: (base: string) => string;
  uid: string;
  isAnonymous: boolean;
} {
  const user = useAuthStore((state) => state.user);

  const uid = user?.uid ?? "anonymous";
  const isAnonymous = !user?.uid;

  const getKey = (base: string): string => {
    return `${base}_${uid}`;
  };

  return { getKey, uid, isAnonymous };
}
