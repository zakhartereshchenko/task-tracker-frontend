import { useSearchParams } from "react-router-dom";
import { Input } from "../components/ui/input";
import { useDebounce } from "./useDebounce";
import { useEffect, useState } from "react";

export const useSearchFilter = (placeholder?: string) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState<string>(searchParams.get("search") || "")
    const debouncedSearch = useDebounce(search, 500);

    const onChange = (value: string) => {
        setSearch(value);
    };

    useEffect(() => {
        setSearchParams(prev => {
            if (debouncedSearch) {
                prev.set("search", debouncedSearch);
            } else {
                prev.delete("search");
            }
            return prev;
        });
    }, [debouncedSearch]);

    const component = <Input 
        placeholder={placeholder || "Search..."}
        className="w-70"
        value={search}
        onChange={(e) => onChange(e.target.value)}
    />

    return {
        Input: component
    }
}