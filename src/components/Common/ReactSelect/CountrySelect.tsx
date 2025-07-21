import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Combobox from "./Combobox";
import {
    getGroupedCountryOptions,
    loadGroupedCountryOptions,
} from "../../../utils/countries";

export const CountrySelect = ({
    value,
    onChange,
    title,
    placeholder,
}: {
    value: CategoryOption | null;
    onChange: (val: CategoryOption | null) => void;
    title?: string;
    placeholder?: string;
}) => {
    const { t } = useTranslation();

    const defaultOptions = useMemo(() => getGroupedCountryOptions(t), [t]);

    const handleChange = useCallback(
        (option: CategoryOption | null) => {
            onChange(option?.value === "__divider__" ? null : option);
        },
        [onChange]
    );

    return (
        <Combobox
            title={title ?? t("country_select.country")}
            placeholder={placeholder ?? t("country_select.select_country")}
            loadOptions={(inputValue) => loadGroupedCountryOptions(inputValue, t)}
            defaultOptions={defaultOptions}
            value={value}
            onChange={handleChange}
            isClearable
        />
    );
};
