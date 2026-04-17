import { useSearchParams } from "react-router-dom";
import { Input } from "../components/ui/input";

export const useSearchFilter = (placeholder?: string) => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const search = searchParams.get("search") || "";

    const onChange = (value: string) => {
        setSearchParams({ search: value });
    };

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