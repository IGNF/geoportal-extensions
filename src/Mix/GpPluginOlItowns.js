export * from "../OpenLayers/GpPluginOpenLayers.js"
export * from "../Itowns/GpPluginItowns.js"
import Pkg from "../../package.json";

// Rajout des propriétés de l'extension dans le namespace Gp
export const olItownsExtVersion = Pkg.olItownsExtVersion;
export const olItownsExtDate = new Date().toISOString().split("T")[0];
