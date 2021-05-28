import React from "react";

import { css } from "@emotion/css";
import { CircularProgress, CssBaseline, List, ListItem, ListItemText, Typography } from "@material-ui/core";

import { getPackageJsonUrl } from "./remote";
import SearchField from "./SearchField";
import { useAppState } from "./state";

interface ComponentProps {
}

const linkClass = css`
    color: grey;   
`;

const Footer: React.FC = () => {

    return <div
        className={css`
            display: flex;
            width: 100%;
            padding: 5px;
            justify-content: space-between;
        `}
    >
        <div></div>
        <div>
            <a className={linkClass} href={import.meta.env.SNOWPACK_PUBLIC_GITHUB_REPO}>GitHub repo</a>
        </div>
    </div>;
};

const objHasKeys = (obj?: object): obj is object => {
    return !!obj && Object.keys(obj).length !== 0;
};

const DependencyList: React.FC<{ deps: Record<string, string>; }> = ({ deps }) => {
    return <List>
        {Object.entries(deps).map(([dep, version]) => {
            return <ListItem key={dep} divider>
                <ListItemText
                    primary={dep}
                // secondary={version}
                />
            </ListItem>;
        })}
    </List>;
};

const PackageInfoContent: React.FC = () => {
    const data = useAppState(s => "data" in s ? s.data : null)!;
    const packageName = useAppState(s => s.foundPackage)!;

    const bundlePhobiaUrl = `https://bundlephobia.com/result?p=${packageName}`;

    return <div>
        <div >
            {
                ([
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
                    },
                ] as Array<Record<"img" | "url", string>>).map(({ img, url }) => {
                    return <a href={url} key={img}><img src={img} /></a>;
                })
            }
        </div>
        <Typography>
            Version: {data.version} &middot;
            <a href={getPackageJsonUrl(packageName)}>Show package.json</a>
        </Typography>
        {
            objHasKeys(data.peerDependencies) && <>
                <Typography variant="h3" color="primary">Peer Dependencies</Typography>
                <DependencyList deps={data.peerDependencies} />
            </>
        }
        {
            objHasKeys(data.dependencies) ? <>
                <Typography variant="h3" color="secondary">Dependencies</Typography>
                <DependencyList deps={data.dependencies} />
            </> : <Typography variant="h3" color="textSecondary">No Dependencies</Typography>
        }
    </div>;
};

let App: React.FC<ComponentProps> = () => {
    const foundPackage = useAppState();

    return <div
        className={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            min-height: 100vh;
        `}
    >
        <CssBaseline />
        <div />
        <div>
            <Typography variant="h2" className={css`
                margin-bottom: 20px;
            `}>
                Package Info
                <sub className={css`
                    color: orange;
                    font-size: 0.4em;
                    font-style: italic;
                `}>by Zardoy</sub>
            </Typography>
            <SearchField />
            {foundPackage.foundPackage === null ? <div /> :
                foundPackage.loading ? <CircularProgress /> : <PackageInfoContent />
            }
        </div>
        <Footer />
    </div>;
};

export default App;
