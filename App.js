import * as __SNOWPACK_ENV__ from './_snowpack/env.js';

import React from "./_snowpack/pkg/react.js";
import {css} from "./_snowpack/pkg/@emotion/css.js";
import {CircularProgress, CssBaseline, List, ListItem, ListItemText, Typography} from "./_snowpack/pkg/@material-ui/core.js";
import {getPackageJsonUrl} from "./remote.js";
import SearchField from "./SearchField.js";
import {useAppState} from "./state.js";
const linkClass = css`
    color: grey;   
`;
const Footer = () => {
  return /* @__PURE__ */ React.createElement("div", {
    className: css`
            display: flex;
            width: 100%;
            padding: 5px;
            justify-content: space-between;
        `
  }, /* @__PURE__ */ React.createElement("div", null), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("a", {
    className: linkClass,
    href: __SNOWPACK_ENV__.SNOWPACK_PUBLIC_GITHUB_REPO
  }, "GitHub repo")));
};
const objHasKeys = (obj) => {
  return !!obj && Object.keys(obj).length !== 0;
};
const DependencyList = ({deps}) => {
  return /* @__PURE__ */ React.createElement(List, null, Object.entries(deps).map(([dep, version]) => {
    return /* @__PURE__ */ React.createElement(ListItem, {
      key: dep,
      divider: true
    }, /* @__PURE__ */ React.createElement(ListItemText, {
      primary: dep
    }));
  }));
};
const PackageInfoContent = () => {
  const data = useAppState((s) => "data" in s ? s.data : null);
  const packageName = useAppState((s) => s.foundPackage);
  const bundlePhobiaUrl = `https://bundlephobia.com/result?p=${packageName}`;
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", null, [
    {
      img: `https://badgen.net/npm/dw/${packageName}`,
      url: `https://npmjs.com/${packageName}`
    },
    {
      img: `https://badgen.net/packagephobia/install/${packageName}`,
      url: `https://packagephobia.com/result?p=${packageName}`
    },
    {
      img: `https://badgen.net/bundlephobia/minzip/${packageName}`,
      url: bundlePhobiaUrl
    },
    {
      img: `https://badgen.net/bundlephobia/tree-shaking/${packageName}`,
      url: bundlePhobiaUrl
    }
  ].map(({img, url}) => {
    return /* @__PURE__ */ React.createElement("a", {
      href: url,
      key: img
    }, /* @__PURE__ */ React.createElement("img", {
      src: img
    }));
  })), /* @__PURE__ */ React.createElement(Typography, null, "Version: ", data.version, " ·", /* @__PURE__ */ React.createElement("a", {
    href: getPackageJsonUrl(packageName)
  }, "Show package.json")), objHasKeys(data.peerDependencies) && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h3",
    color: "primary"
  }, "Peer Dependencies"), /* @__PURE__ */ React.createElement(DependencyList, {
    deps: data.peerDependencies
  })), objHasKeys(data.dependencies) ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h3",
    color: "secondary"
  }, "Dependencies"), /* @__PURE__ */ React.createElement(DependencyList, {
    deps: data.dependencies
  })) : /* @__PURE__ */ React.createElement(Typography, {
    variant: "h3",
    color: "textSecondary"
  }, "No Dependencies"));
};
let App = () => {
  const foundPackage = useAppState();
  return /* @__PURE__ */ React.createElement("div", {
    className: css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            min-height: 100vh;
        `
  }, /* @__PURE__ */ React.createElement(CssBaseline, null), /* @__PURE__ */ React.createElement("div", null), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h2",
    className: css`
                margin-bottom: 20px;
            `
  }, "Package Info", /* @__PURE__ */ React.createElement("sub", {
    className: css`
                    color: orange;
                    font-size: 0.4em;
                    font-style: italic;
                `
  }, "by Zardoy")), /* @__PURE__ */ React.createElement(SearchField, null), foundPackage.foundPackage === null ? /* @__PURE__ */ React.createElement("div", null) : foundPackage.loading ? /* @__PURE__ */ React.createElement(CircularProgress, null) : /* @__PURE__ */ React.createElement(PackageInfoContent, null)), /* @__PURE__ */ React.createElement(Footer, null));
};
export default App;
