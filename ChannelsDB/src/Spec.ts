// /*
// * Copyright (c) 2016 - now David Sehnal, licensed under Apache 2.0, See LICENSE file for more info.
// */
// import LiteMol from "litemol";
// import { AnnotationDataProvider } from "./AnnotationDataProvider";
// import { Tunnels } from "./CommonUtils/Tunnels";
// import { Tunnel } from "./DataInterface";
// import { SurfaceTag } from "./State";


// /**
//  * We don't want the default behaviour of the plugin for our example.
//  */

// const Views = LiteMol.Plugin.Views;
// const Bootstrap = LiteMol.Bootstrap;
// const Interactivity = Bootstrap.Interactivity;
// const Transformer = Bootstrap.Entity.Transformer;    
// const LayoutRegion = Bootstrap.Components.LayoutRegion;

// /**
//  * Support for custom highlight tooltips.
//  */
// export function HighlightCustomElements(context: LiteMol.Bootstrap.Context) {        
//     context.highlight.addProvider(info => {
//         if  (Interactivity.isEmpty(info) || info.source.type !== Bootstrap.Entity.Visual.Surface) return void 0;
        
//         let tag = (info.source as LiteMol.Bootstrap.Entity.Visual.Surface).props.tag as SurfaceTag;
//         let e = tag.element;
//         switch (tag.type) {
//             case 'Cavity': return `<b>${e.Type} ${e.Id}</b>, Volume: ${e.Volume | 0} Å`;
//             case 'Path':
//             case 'Pore':
//             case 'MergedPore':
//             case 'Tunnel': {
//                 let tunnel = e as Tunnel;
//                 let len = Tunnels.getLength(tunnel);
//                 let bneck = Tunnels.getBottleneck(tunnel);
//                 let annotation = AnnotationDataProvider.getChannelAnnotation(tunnel.Id);

//                 if(annotation===null || annotation === void 0){
//                     return `<b>${tunnel.Type}</b>, Length: ${len} Å | Bottleneck: ${bneck} Å`;
//                 }
//                 else{
//                     return `<b>${annotation.text}</b>, Length: ${len} Å | Bottleneck: ${bneck} Å`;    
//                 }
//             }
//             case 'Origins': {
//                 let o = e.Points[info.elements[0]];
//                 return `<b>Origin</b> (${e.Type}) at (${o.X}, ${o.Y}, ${o.Z})`;
//             }
//             default: return void 0;
//         }
//     });        
// }

// export const PluginSpec: LiteMol.Plugin.Specification = {
//     settings: {
//         'molecule.model.defaultQuery': `residuesByName('GLY', 'ALA')`,
//         'molecule.model.defaultAssemblyName': '1'
//     },
//     transforms: [
//         // Molecule(model) transforms
//         { transformer: Transformer.Molecule.CreateModel, view: Views.Transform.Molecule.CreateModel, initiallyCollapsed: true },
//         { transformer: Transformer.Molecule.CreateSelection, view: Views.Transform.Molecule.CreateSelection, initiallyCollapsed: true },        
                        
//         { transformer: Transformer.Molecule.CreateAssembly, view: Views.Transform.Molecule.CreateAssembly, initiallyCollapsed: true },
//         { transformer: Transformer.Molecule.CreateSymmetryMates, view: Views.Transform.Molecule.CreateSymmetryMates, initiallyCollapsed: true },
        
//         { transformer: Transformer.Molecule.CreateMacromoleculeVisual, view: Views.Transform.Empty },
//         { transformer: Transformer.Molecule.CreateVisual, view: Views.Transform.Molecule.CreateVisual }
//     ],
//     behaviours: [
//         // you will find the source of all behaviours in the Bootstrap/Behaviour directory
        
//         Bootstrap.Behaviour.SetEntityToCurrentWhenAdded,
//         Bootstrap.Behaviour.FocusCameraOnSelect,
        
//         // this colors the visual when a selection is created on it.
//         Bootstrap.Behaviour.ApplySelectionToVisual,
        
//         // this colors the visual when it's selected by mouse or touch
//         Bootstrap.Behaviour.ApplyInteractivitySelection,
        
//         // this shows what atom/residue is the pointer currently over
//         Bootstrap.Behaviour.Molecule.HighlightElementInfo,

//         // when the same element is clicked twice in a row, the selection is emptied
//         //Bootstrap.Behaviour.UnselectElementOnRepeatedClick,
        
//         // distance to the last "clicked" element
//         Bootstrap.Behaviour.Molecule.DistanceToLastClickedElement,
        
//         // this tracks what is downloaded and some basic actions. Does not send any private data etc. Source in Bootstrap/Behaviour/Analytics 
//         Bootstrap.Behaviour.GoogleAnalytics('UA-77062725-1'),

//         HighlightCustomElements
//     ],            
//     components: [
//         LiteMol.Plugin.Components.Visualization.HighlightInfo(LayoutRegion.Main, true),               
//         LiteMol.Plugin.Components.Entity.Current('LiteMol', LiteMol.Plugin.VERSION.number)(LayoutRegion.Right, true),
//         LiteMol.Plugin.Components.Transform.View(LayoutRegion.Right),
//         LiteMol.Plugin.Components.Context.Log(LayoutRegion.Bottom, true),
//         LiteMol.Plugin.Components.Context.Overlay(LayoutRegion.Root),
//         LiteMol.Plugin.Components.Context.Toast(LayoutRegion.Main, true),
//         LiteMol.Plugin.Components.Context.BackgroundTasks(LayoutRegion.Main, true)
//     ],
//     viewport: { 
//         view: Views.Visualization.Viewport,
//         controlsView: Views.Visualization.ViewportControls
//     },
//     layoutView: Views.Layout, 
//     tree: {
//         region: LayoutRegion.Left,
//         view: Views.Entity.Tree
//     }
// };