import { Cookies } from "react-cookie";

const cookies = new Cookies();

const useGetCookie = (name: string) => {
  if (cookies.get(name)) {
    return cookies.get(name);
  }
  return null;
};

const useSetCookie = (name: string, value: string, duration: string) => {
  document.cookie = `${name}=${value}; max-age=${duration}; path=/; secure; samesite=none`;
}; // 604800 일주일

const useDeleteCookie = (name: string) => {
  const date = new Date("2020-01-01").toUTCString();
  document.cookie = `${name}=; expires=${date}; path=/`;
  window.location.reload();
};

export { useGetCookie, useSetCookie, useDeleteCookie };
