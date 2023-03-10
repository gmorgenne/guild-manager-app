import { useRouter } from "next/router";

export type FacetProps = {
    FacetName: string;
    FacetValues: string[];
}
type FacetValue = {
    selected: boolean;
    value: string;
}

const Facet = (props: FacetProps): JSX.Element => {
    const facetValues = props.FacetValues.map((value) => { return { selected: false, value: value}});
    const router = useRouter();
    const queryContainsFacetName = Object.keys(router.query).indexOf(props.FacetName) !== -1;
    if (queryContainsFacetName) {
        let selectedFilterValues: string[] = [];
        Object.entries(router.query).forEach(([key, value]) => {
            if (key === props.FacetName) {
                if (value) {
                    selectedFilterValues = selectedFilterValues.concat(value);
                }
            }
        });
        facetValues.filter((f) => {
            if (selectedFilterValues.indexOf(f.value) !== -1) {
                f.selected = true;
            }
        });
    }

    const updateQueryString = (facetValue: FacetValue) => {
        facetValue.selected = !facetValue.selected;
        const selectedFilters = facetValues.filter((f) => f.selected).map((v) => v.value);
        router.push({
            query: {
                ...router.query,
                [props.FacetName]: selectedFilters
            }
        });
    };

    const clearSelectedFacetValues = () => {
        const selectedFilters = facetValues.filter((f) => { f.selected });
        selectedFilters.forEach((f) => f.selected = false);
        router.push({
            query: {
                ...router.query,
                [props.FacetName]: ""
            }
        });
    };

    return (
        <div className="text-center">
            <h5>Filter By {props.FacetName}</h5>
            <form className="grid grid-cols-3 gap-2 text-left">
                {facetValues.map((facetValue, i) => {
                    return (
                    <fieldset key={i}>
                        <input type="checkbox" id={`BasicFacet-${facetValue.value}`} checked={facetValue.selected} name={facetValue.value} onChange={() => updateQueryString(facetValue) } />
                        <label htmlFor={`BasicFacet-${facetValue.value}`} className="ml-2">{facetValue.value}</label>
                    </fieldset>
                    )
                })}
            </form>
            {facetValues.some((facet) => facet.selected) && <button className="btn" onClick={() => clearSelectedFacetValues()}>Clear {props.FacetName} Selections</button>}
        </div>
    )
};
export default Facet;