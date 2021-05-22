import React, { useState } from "react";

import { useFormik } from "formik";

import { TextField } from "@material-ui/core";

import { useModalState } from "./react-util";
import { getPackageJsonUrl } from "./remote";
import { useAppState } from "./state";

import type { PackageJson } from "type-fest";
const testPackages = [
    ""
];

const getPackageSuggestions = async (searchString: string) => {
    return new Promise<string[]>(resolve =>
        setTimeout(() =>
            resolve(testPackages.filter(s => s.includes(searchString))),
            1000
        )
    );
};

const npmNameRegex = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

const SearchField: React.FC = () => {
    const autoCompletionState = useModalState();
    const [options, setOptions] = useState(null as string[] | null);

    const { values, handleSubmit, setFieldValue, handleChange } = useFormik({
        initialValues: {
            npmPackage: "",
        },
        async onSubmit({ npmPackage }) {
            if (!npmPackage.match(npmNameRegex)) {
                alert("Invalid package name");
                return;
            }
            // use async!!!
            useAppState.setState({ foundPackage: npmPackage, loading: true, data: null });
            // thank you skypack for the global caching. Speed is amazing
            // todo-high check version of cached version!!!
            try {
                const request = await fetch(
                    getPackageJsonUrl(npmPackage)
                );
                if (request.status === 404) throw new Error(await request.text());
                const packageJson: PackageJson = await request.json();
                useAppState.setState({ foundPackage: npmPackage, loading: false, data: packageJson });
            } catch (err) {
                alert(err.message);
                console.error(err);
                useAppState.setState({ foundPackage: null });
            }
        }
    });

    // const updateSuggestionsList = useCallback(async (value: string, fromOpen = false) => {
    //     console.log("Request", value, fromOpen);
    //     setOptions(null);
    //     if (value.length < 2) {
    //         autoCompletionState.close();
    //         return;
    //     }
    //     autoCompletionState.open();
    //     setOptions(
    //         await getPackageSuggestions(value)
    //     );
    // }, []);

    return <form
        onSubmit={handleSubmit}
    >
        {/* <Autocomplete
            // autoComplete
            // autoHighlight
            openOnFocus
            // getOptionSelected={}
            options={options || []}
            // loading={}
            noOptionsText="No packages"
            freeSolo
            inputValue={values.package}
            onInputChange={(_e, value) => (setFieldValue("package", value), updateSuggestionsList(value))}
            renderInput={params => {
                return <TextField
                    {...params}
                    label="Search NPM package"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        // hide open arrow
                    }}
                />;
            }}
        /> */}
        <TextField
            autoFocus
            style={{ width: "100%" }}
            label="Search NPM package"
            variant="outlined"
            value={values.npmPackage}
            name="npmPackage"
            onChange={handleChange}
        />
    </form>;
};

export default SearchField;
