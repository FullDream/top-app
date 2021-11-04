import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface Pprops extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
    size?: 'normal' | 'big' | 'small';
    children: ReactNode;
}