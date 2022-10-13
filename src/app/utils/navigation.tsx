import React from "react";

export const navigationRef: any = React.createRef();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export const goBack = (item?: string) => navigationRef.current?.goBack(item);
export const getCurrentRouteName = () => {
  return navigationRef.current.getCurrentRoute().name;
};
