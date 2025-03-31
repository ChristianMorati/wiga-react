import { ReactNode } from "react";

type ConditionalViewWrapperProps = {
    isVisible: boolean;
    children: ReactNode;
    className?: string;
};

const ConditionalViewWrapper = ({ isVisible, children, className }: ConditionalViewWrapperProps) => {
    if (!isVisible) return null;
    return <div className={className}>{children}</div>;
};

export default ConditionalViewWrapper;