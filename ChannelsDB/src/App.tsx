/*
* Copyright (c) 2016 - now David Sehnal, licensed under Apache 2.0, See LICENSE file for more info.
*/
import { GlobalRouter } from "./SimpleRouter";
import UI from "./UI";
import AglomeredParameters from "./AglomeredParameters/UI";
import ChannelsDescriptions from "./ChannelsDescriptions/UI";
import LayerProperties from "./LayerProperties/UI";
import LayerVizualizer from "./LayerVizualizer/UI";
import LayerResidues from "./LayerResidues/UI";
import LiningResidues from "./LiningResidues/UI";
import ResidueAnnotations from "./ResidueAnnotations/UI";
import ProteinAnnotations from "./ProteinAnnotations/UI";
import PdbIdSign from "./PdbIdSign/UI";
import DownloadReport from "./DownloadReport/UI";
import MolViewer from "./MolViewer/MolViewer";
import { createRoot } from 'react-dom/client';
import { Context } from "./Context";
import {
    DefaultPluginUISpec,
    PluginUISpec,
  } from "molstar/lib/mol-plugin-ui/spec";
import { PluginLayoutControlsDisplay } from "molstar/lib/mol-plugin/layout";
import { SbNcbrPartialCharges } from "molstar/lib/extensions/sb-ncbr";
import { DefaultPluginSpec, PluginSpec } from "molstar/lib/mol-plugin/spec";
import { SelectionHelper } from "./CommonUtils/Selection";
import { LayersVizualizerSettings, Vizualizer } from "./LayerVizualizer/Vizualizer";

const MySpec: PluginUISpec = {
    ...DefaultPluginUISpec(),
    layout: {
      initial: {
        isExpanded: false,
        showControls: false,
        controlsDisplay: 'landscape' as PluginLayoutControlsDisplay,
        regionState: {
          bottom: "full",
          left: "full",
          right: "full",
          top: "full",
        },
      },
    },
    behaviors: [
      PluginSpec.Behavior(SbNcbrPartialCharges),
      ...DefaultPluginUISpec().behaviors,
      ...DefaultPluginSpec().behaviors,
    
    ],
  };

const root = createRoot(
    document.getElementById("root") as HTMLElement
);

const ROUTING_OPTIONS:any = {
    "local":{defaultContextPath: "/detail", defaultPid:"3tbg", defaultDB: "pdb", useParameterAsPid:true},
    "chdb-test":{defaultContextPath: "/detail", defaultPid:"3tbg", defaultDB: "pdb", useLastPathPartAsPid:true},
    "test":{defaultContextPath: "/test/detail", defaultPid:"3tbg", defaultDB: "pdb", useLastPathPartAsPid:true},
    // "chdb-prod":{defaultContextPath: "/detail", defaultPid:"1ymg", defaultDB: "pdb", useParameterAsPid: true},
    "chdb-prod":{defaultContextPath: "/detail", defaultPid:"3tbg", defaultDB: "pdb", useParameterAsPid: true},
};
const ROUTING_MODE = "chdb-prod";

GlobalRouter.init(ROUTING_OPTIONS[ROUTING_MODE]);

const App = () => {

    const lvSettings: LayersVizualizerSettings = {
        coloringProperty: "Hydropathy",
        useColorMinMax: true,
        skipMiddleColor: false,
        topMargin: 0, //15,
        customRadiusProperty: "MinRadius"
    }
    
    const layerVizualizer = new Vizualizer('layer-vizualizer-ui', lvSettings);

    const plugin = new Context(MySpec);
    SelectionHelper.attachClearSelectionToEventHandler(plugin);

    return(
        <div>
         <div className="home-button" title="Home"><a href="/"><span className="glyphicon glyphicon-home" /></a></div>
         <PdbIdSign />
         <DownloadReport />
         <MolViewer context={plugin}/>
         <div className="chdb-panel bottom-panel">
             <div className="left-tabs">
                 <div id="left-tabs">
                     <ul className="nav nav-tabs">
                         <li className="active"><a data-toggle="tab" href="#left-tabs-1">Channel profile</a></li>
                         <li><a data-toggle="tab" href="#left-tabs-2">Channels properties</a></li>
                         <li><a data-toggle="tab" href="#left-tabs-3">Channels descriptions</a></li>
                     </ul>
                     <div className="tab-content">
                         <div id="left-tabs-1" className="tab-pane fade in active">
                             <div className="layerVizualizer" id="layer-vizualizer-ui">
                                <LayerVizualizer vizualizer={layerVizualizer} controller={plugin}/>
                            </div>
                         </div>
                         <div id="left-tabs-2" className="tab-pane fade">
                             <AglomeredParameters controller={plugin} />
                         </div>
                         <div id="left-tabs-3" className="tab-pane fade">
                             <ChannelsDescriptions controller={plugin} />
                         </div>
                     </div>
                 </div>
                 <div id="bottom-tabs-toggler" className="toggler glyphicon glyphicon-resize-horizontal"></div>
             </div>
             <div className="right-tabs">
                 <div id="right-tabs">
                     <ul className="nav nav-tabs">
                         <li className="active"><a data-toggle="tab" href="#right-tabs-1">Layer</a></li>
                         <li><a data-toggle="tab" href="#right-tabs-2">Lining residues</a></li>
                         <li><a data-toggle="tab" href="#right-tabs-3">Residue annotations</a></li>
                     </ul>
                     <div className="tab-content">
                        <div id="right-tabs-1" className="tab-pane fade in active">
                            <LayerResidues controller={plugin}/>
                            <LayerProperties controller={plugin}/>
                        </div>
                        <LiningResidues controller={plugin}/>
                        <ResidueAnnotations controller={plugin}/>
                     </div>
                 </div>
             </div>
             <div id="bottom-panel-toggler" className="toggler glyphicon glyphicon-resize-vertical"></div>
         </div>
         <div className="chdb-panel right-panel">
             <div id="ui" className="ui toggled">
                 <UI plugin={plugin}/>
            </div>
             <div className="bottom toggled">
                 <div id="right-panel-tabs">
                     <ul className="nav nav-tabs">
                         <li className="active"><a data-toggle="tab" href="#right-panel-tabs-1">Protein annotations</a></li>
                     </ul>
                     <div className="tab-content">
                        <ProteinAnnotations controller={plugin}/>
                     </div>
                 </div>
                 <div id="right-panel-toggler" className="toggler glyphicon glyphicon-resize-vertical"></div>
             </div>
         </div>
    </div>
    )
};

root.render(<App />)