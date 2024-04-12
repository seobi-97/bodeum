import React from "react";
import { RecoilRoot } from "recoil";
import ReactQueryProvider from "./ReactQueryProvider";

export default function RootComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </RecoilRoot>
  );
}
