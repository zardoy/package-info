import React, {useState} from "./_snowpack/pkg/react.js";
import {useFormik} from "./_snowpack/pkg/formik.js";
import {TextField} from "./_snowpack/pkg/@material-ui/core.js";
import {useModalState} from "./react-util.js";
import {getPackageJsonUrl} from "./remote.js";
import {useAppState} from "./state.js";
const testPackages = [
  ""
];
const getPackageSuggestions = async (searchString) => {
  return new Promise((resolve) => setTimeout(() => resolve(testPackages.filter((s) => s.includes(searchString))), 1e3));
};
const npmNameRegex = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
const SearchField = () => {
  const autoCompletionState = useModalState();
  const [options, setOptions] = useState(null);
  const {values, handleSubmit, setFieldValue, handleChange} = useFormik({
    initialValues: {
      npmPackage: ""
    },
    async onSubmit({npmPackage}) {
      if (!npmPackage.match(npmNameRegex)) {
        alert("Invalid package name");
        return;
      }
      useAppState.setState({foundPackage: npmPackage, loading: true, data: null});
      try {
        const request = await fetch(getPackageJsonUrl(npmPackage));
        if (request.status === 404)
          throw new Error(await request.text());
        const packageJson = await request.json();
        useAppState.setState({foundPackage: npmPackage, loading: false, data: packageJson});
      } catch (err) {
        alert(err.message);
        console.error(err);
        useAppState.setState({foundPackage: null});
      }
    }
  });
  return /* @__PURE__ */ React.createElement("form", {
    onSubmit: handleSubmit
  }, /* @__PURE__ */ React.createElement(TextField, {
    autoFocus: true,
    style: {width: "100%"},
    label: "Search NPM package",
    variant: "outlined",
    value: values.npmPackage,
    name: "npmPackage",
    onChange: handleChange
  }));
};
export default SearchField;
