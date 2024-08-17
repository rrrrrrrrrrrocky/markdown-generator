import React, { ComponentProps, createElement, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ReactTextTagName = keyof Pick<
  React.JSX.IntrinsicElements,
  "p" | "h1" | "h2" | "h3" | "span" | "label"
>;

declare const Typo: <TTag extends ReactTextTagName>(
  // eslint-disable-next-line no-unused-vars
  props: Omit<ComponentProps<TTag>, "children"> & {
    component?: TTag;
    children?: ReactNode;
  }
) => React.JSX.Element;

export const Typography: typeof Typo = ({
  children,
  component = "span",
  color,
  ...props
}) => {
  return createElement(
    component,
    {
      ...props,
      className: twMerge(props.className),
    },
    children
  );
};
