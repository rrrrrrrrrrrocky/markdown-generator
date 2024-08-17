import React from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

type ReactLayoutTagName = Pick<
  React.JSX.IntrinsicElements,
  "section" | "article" | "main" | "form" | "header" | "footer" | "nav"
>;

type ReactTag = keyof ReactLayoutTagName | React.JSXElementConstructor<unknown>;

type PropsOf<TTag extends ReactTag> = TTag extends React.ElementType
  ? React.ComponentProps<TTag>
  : never;

type Props<TTag extends ReactTag = keyof ReactLayoutTagName> = Omit<
  PropsOf<TTag>,
  "children" | "className"
> & {
  component?: TTag;
  children?: React.ReactNode;
  className?: ClassNameValue;
};

declare let ContainerType: <TTag extends ReactTag = keyof ReactLayoutTagName>(
  // eslint-disable-next-line no-unused-vars
  props: Props<TTag> & { ref?: React.ForwardedRef<HTMLElement> }
) => React.JSX.Element;

export const Container = React.forwardRef<HTMLElement, Props<ReactTag>>(
  ({ children, component = "div", className = "", ...props }, ref) => {
    return React.createElement(
      component,
      {
        ...props,
        className: twMerge(className),
        ref,
      },
      children
    );
  }
) as typeof ContainerType;
