import type { PackageJson } from "type-fest";
import createStore from "zustand";

type PackageState = {
    // todo-higih rename
    foundPackage: string;
} & ({
    loading: true;
    data: null;
} | {
    loading: false;
    data: Pick<PackageJson, "version" | "dependencies" | "devDependencies" | "peerDependencies" | "optionalDependencies">;
});

type State = {
    foundPackage: null;
} | PackageState;

export const useAppState = createStore((): State => ({
    foundPackage: null
}));
