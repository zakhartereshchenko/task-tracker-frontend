import type { FC } from "react";
import { Badge } from "./ui/badge"
import { Spinner } from "./ui/spinner"
import { Skeleton } from "./ui/skeleton";

interface IProps {
    label?: string;
    isLoading?: boolean;
    badgeCount?: number;
    subTitle?: string;
}

export const Title: FC<IProps> = ({label, isLoading, badgeCount, subTitle}) => {
    if (isLoading) {
        return (
            <div className="space-y-2">
                <Skeleton className="h-7 w-40" />
                <Skeleton className="h-4 w-64" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-row items-center gap-2">
                <h2 className="text-2xl">{label}</h2>
                {badgeCount && <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                    {isLoading ? <Spinner /> : badgeCount}
                </Badge>}
            </div>
            {subTitle && <p className="text-gray-500">{subTitle}</p>}
        </div>
    )
}