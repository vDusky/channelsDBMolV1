// import { Tunnel } from "../DataInterface";

// // import Transform = LiteMol.Bootstrap.Tree.Transform;

// function createProfileToLayerByCenterDistanceMapping(channel: Tunnel){
//     let map = new Map<number,number>();
//     let layers = channel.Layers.LayersInfo;
//     let profile = channel.Profile;
//     let maxProfileDistance = profile[profile.length-1].Distance;
//     let maxLayerDistance = layers[layers.length-1].LayerGeometry.EndDistance;

//     let lUnit = maxLayerDistance/100;
//     let pUnit = maxProfileDistance/100;
//     let layerSpaceToProfileSpace = (layerVal:number) => {
//         return (layerVal/lUnit)*pUnit;
//     };

//     let inRange = (profileVal:number, layerStartDistance:number, layerEndDistance:number) => {
//         return profileVal>=layerSpaceToProfileSpace(layerStartDistance) 
//             && profileVal<layerSpaceToProfileSpace(layerEndDistance);
//     };

//     for(let pIdx=0,lIdx=0;pIdx<profile.length;){
        
//         if(inRange(profile[pIdx].Distance,
//             layers[lIdx].LayerGeometry.StartDistance,
//             layers[lIdx].LayerGeometry.EndDistance)
//             ){
//             map.set(pIdx,lIdx);
//             pIdx++;
//         }
//         else{
//             if(lIdx+1 == layers.length){
//                 map.set(pIdx,lIdx);
//                 pIdx++;
//             }
//             else{
//                 lIdx++;
//             }
//         }
//     }

//     return map;
// };

// function sphereSpaceToPercent(profileVal:number, sphereRadius:number){
//     let sUnit = sphereRadius*2/100;
//     return profileVal/sUnit;
// };

// function layerSpaceToPercent(val:number, layerLength:number){
//     let unit = layerLength/100;
//     return val/unit;
// };

// function layerSpaceToProfileSpace(layerVal:number,lUnit:number,pUnit:number){
//     return (layerVal/lUnit)*pUnit;
// };

// function percentCover(profileCenter:number, profileRadius:number, 
//     layerStartDistance:number, layerEndDistance:number, lUnit:number, pUnit:number){
    
//     let sD_p = layerSpaceToProfileSpace(layerStartDistance,lUnit,pUnit);
//     let eD_p = layerSpaceToProfileSpace(layerEndDistance,lUnit,pUnit);
    
//     let sk = profileCenter;//-profileRadius;
//     let ek = profileCenter;//+profileRadius*2;
//     let sv = sD_p;
//     let ev = eD_p;

//     let S = Math.max(sk,sv);
//     let E = Math.min(ek,ev);

//     if(E-S !== 0){
//         return 0;
//     }
//     else{
//         return 100;
//     }

//     //return sphereSpaceToPercent(E-S,profileRadius);
//     //return layerSpaceToPercent(E-S,layerEndDistance-layerStartDistance);
//     /*
//     //stred koule vlevo od vrstvy
//     let case1 = () => {
//         //koule mimo vrstvu celym profilem
//         if((profileCenter + profileRadius)-sD_p < 0){
//             return 0;
//         }
//         //koule zasahuje svou casti do vrstvy zleva
//         if((profileCenter + profileRadius)-sD_p > 0
//             && (profileCenter + profileRadius)-eD_p < 0){
//             return sphereSpaceToPercent((profileCenter+profileRadius)-sD_p,profileRadius);
//         }
//         //koule obsahuje celou vrstvu a vrstva je umistena vpravo od stredu koule
//         if((profileCenter+profileRadius)-sD_p > 0 
//             && (profileCenter+profileRadius)-eD_p > 0){
//             return sphereSpaceToPercent(eD_p-sD_p,profileRadius);
//         }

//         throw new Error("InvalidState - unrecognized state");
//     };

//     //stred koule uvnitr vrstvy
//     let case2 = () => {
//         //koule je cela ve vrstve
//         if((profileCenter-profileRadius)-sD_p >= 0 
//             && eD_p-(profileCenter+profileRadius) >= 0){
//             return 100;
//         }
//         //koule presahuje vrstvu vlevo
//         if((profileCenter-profileRadius)-sD_p <= 0
//             && eD_p-(profileCenter+profileRadius) >= 0){
//             return sphereSpaceToPercent((profileCenter+profileRadius)-sD_p,profileRadius);
//         }
//         //koule presahuje vrstvu zprava
//         if((profileCenter-profileRadius)-sD_p >= 0
//             && eD_p-(profileCenter+profileRadius) <= 0){
//             return sphereSpaceToPercent(eD_p-(profileCenter-profileRadius),profileRadius);
//         }
//         //koule presahuje vlevo i vpravo a obsahuje celou vrstvu
//         if((profileCenter-profileRadius)-sD_p <= 0
//             && eD_p-(profileCenter+profileRadius) <= 0){
//             return sphereSpaceToPercent(eD_p-sD_p,profileRadius);
//         }

//         throw new Error("InvalidState - unrecognized state");
//     };

//     //stred koule vpravo od vrstvy
//     let case3 = () => {
//         //koule nezasahuje do vrstvy
//         if((profileCenter-profileRadius)-eD_p > 0){
//             return 0;
//         }
//         //koule zasahuje levou pulkou do vrstvy, ale nepresahuje
//         if((profileCenter-profileRadius)-sD_p > 0
//             && (profileCenter-profileRadius)-eD_p < 0){
//             return sphereSpaceToPercent(eD_p-(profileCenter-profileRadius),profileRadius);
//         }
//         //koule obsahuje celou vrstvu v prave polovine
//         if((profileCenter-profileRadius)-sD_p < 0
//             && (profileCenter+profileRadius)-eD_p > 0){
//             return sphereSpaceToPercent(eD_p-sD_p,profileRadius);
//         }

//         throw new Error("InvalidState - unrecognized state");
//     };

//     if(profileCenter < sD_p){
//         return case1();
//     }
    
//     if(profileCenter >= sD_p && profileCenter <= eD_p){
//         return case2();
//     }

//     if(profileCenter > eD_p){
//         return case3();
//     }

//     throw new Error("InvalidState - unrecognized state");
//     */
// };

// function createProfileColorMapByRadiusAndCenterDistance(channel: Tunnel, layerIdx:number){
//     console.log("mappingbyradiusandcenter");
//     /*let layerColors:LiteMol.Visualization.Color[] = [];*/
//     let layers = channel.Layers.LayersInfo;
//     let profile = channel.Profile;
//     let maxProfileDistance = profile[profile.length-1].Distance;
//     let maxLayerDistance = layers[layers.length-1].LayerGeometry.EndDistance;

//     let activeColor = LiteMol.Visualization.Color.fromRgb(255,0,0);
//     let inactiveColor = LiteMol.Visualization.Color.fromRgb(255,255,255);
//     /*
//     for(let i=0;i<layers.length;i++){
//         if(i===layerIdx){
//             layerColors.push(activeColor);
//         }
//         else{
//             layerColors.push(inactiveColor);
//         }
//     }
//     */

//     let lUnit = maxLayerDistance/100;
//     let pUnit = lUnit;//maxProfileDistance/100;

//     let colorMap = new Map<number,LiteMol.Visualization.Color>();
//     //let profileToColorMap = new Map<number,number>();
//     //let colors:LiteMol.Visualization.Color[] = [];
//     for(let pIdx=0;pIdx<profile.length;pIdx++){
//         let layerCover:{layerIdx:number, percent:number}[] = [];
//         for(let lIdx=0;lIdx<layers.length;lIdx++){
//             let sphere = profile[pIdx];
//             let layerGeometry = layers[lIdx].LayerGeometry;
//             let percent = percentCover(
//                 sphere.Distance,
//                 sphere.Radius,
//                 layerGeometry.StartDistance,
//                 layerGeometry.EndDistance,
//                 lUnit,
//                 pUnit
//             );
            
//             if(percent>0){
//                 layerCover.push({layerIdx:lIdx,percent});
//             }
//         }

//         /*
//         layerCover.sort((a:{layerIdx:number,percent:number},b:{layerIdx:number,percent:number})=>{
//             return a.percent-b.percent;
//         });
//         */

//         /*
//         if(layerCover.length<2){
//             colorMap.set(pIdx,layerColors[layerCover[0].layerIdx]);
//             //profileToColorMap.set(pIdx,pIdx);
//             //colors.push(layerColors[layerCover[0].layerIdx]);
//             continue;
//         }*/

//         /*
//         let color = layerColors[layerCover[0].layerIdx];
//         let lc = layerCover[0];
//         let currentPercent = lc.percent;
//         for(let lcIdx=1;lcIdx<layerCover.length;lcIdx++){
//             let lc2 = layerCover[lcIdx];
//             let color2 = layerColors[lc2.layerIdx];

//             let totalPercent = currentPercent+lc2.percent;
//             let p = (currentPercent/totalPercent)*100;

//             color = {
//                 r:(1-(p/100)) * color.r + (p/100) * color2.r,
//                 g:(1-(p/100)) * color.g + (p/100) * color2.g,
//                 b:(1-(p/100)) * color.b + (p/100) * color2.b
//             };
//             currentPercent = totalPercent;
//         }
//         */

//         let color = inactiveColor;
//         let semiactiveColor = LiteMol.Visualization.Color.fromRgb(0,0,122);
//         for(let lcIdx=0;lcIdx<layerCover.length;lcIdx++){
//             let p = layerCover[lcIdx].percent;
//             if(layerCover[lcIdx].layerIdx === layerIdx){
//                 console.log(`Profile[${pIdx}] -> Layer[${layerIdx}] => cover: ${p}`);
//                 /*
//                 color = {
//                     r:(1-(p/100)) * semiactiveColor.r + (p/100) * activeColor.r,
//                     g:(1-(p/100)) * semiactiveColor.g + (p/100) * activeColor.g,
//                     b:(1-(p/100)) * semiactiveColor.b + (p/100) * activeColor.b
//                 };*/
//                 //LiteMol.Visualization.Color.interpolate(semiactiveColor,activeColor,p,color);
//                 color = activeColor;
//                 break;
//             }
//         }

//         /*
//         let lc1 = layerCover[layerCover.length-1];
//         let lc2 = layerCover[layerCover.length-2];

//         let color1 = layerColors[lc1.layerIdx];
//         let color2 = layerColors[lc2.layerIdx];

//         let color = {
//             r:(1-(lc1.percent/100)) * color1.r + (lc1.percent/100) * color2.r,
//             g:(1-(lc1.percent/100)) * color1.g + (lc1.percent/100) * color2.g,
//             b:(1-(lc1.percent/100)) * color1.b + (lc1.percent/100) * color2.b
//         };
        
//         console.log(color1);
//         console.log(color2);
//         console.log(color);
//         console.log("-");
//         console.log(lc1);
//         console.log(lc2);
//         console.log("---!---");
//         */
//         colorMap.set(pIdx,color);
//         //profileToColorMap.set(pIdx,pIdx);
//         //colors.push(color);
//     }

//     return colorMap;
// };
// /*
//     generateLayerSelectColorTheme(activeLayerIdx: number){           
//         let colors = new Map<number, LiteMol.Visualization.Color>();
//         let coloringPropertyKey = this.vizualizer.getColoringPropertyKey();
//         for(let layerIdx=0; layerIdx<this.state.data.length; layerIdx++){
//             if(layerIdx === activeLayerIdx){
//                 colors.set(layerIdx, LiteMol.Visualization.Color.fromRgb(255,0,0));
//             }
//             else{
//                 colors.set(layerIdx, LiteMol.Visualization.Color.fromRgb(255,255,255));
//             }
//         }            

//         let channel = (this.props.controller.context.select(this.state.currentTunnelRef)[0] as any).props.model.entity.element as DataInterface.Tunnel;
//         let profilePartsCount = channel.Profile.length;
//         let profileToLayerMapping = this.createProfileToLayerMapping(channel);
//         let max = 0;
//         let theme = LiteMol.Visualization.Theme.createMapping(LiteMol.Visualization.Theme.createColorMapMapping(
//                 (idx:number)=>{
//                     let lIdx = profileToLayerMapping.get(idx);
//                     if(lIdx === void 0)
//                         return void 0;
//                     return lIdx;
//                 },
//                 colors,
//                 LiteMol.Visualization.Color.fromRgb(0,0,0)
//             ));
//         return theme;
//     }*/

//     //applyTheme

// function applyTheme(theme:LiteMol.Visualization.Theme/*(e: any, props?: LiteMol.Visualization.Theme.Props | undefined) => LiteMol.Visualization.Theme*/, plugin:LiteMol.Plugin.Controller, ref: string){
//     let visual = plugin.context.select(ref)[0] as any;
//     console.log(visual);
//     let query = LiteMol.Core.Structure.Query.everything();/*.sequence('1', 'A', { seqNumber: 10 }, { seqNumber: 25 });*/
    
//     let action = Transform.build().add(visual, Transformer.Molecule.CreateSelectionFromQuery, { query, name: 'My name' }, { ref: 'sequence-selection' })
//         // here you can create a custom style using code similar to what's in 'Load Ligand'
//         .then(Transformer.Molecule.CreateVisual, { style: LiteMol.Bootstrap.Visualization.Molecule.Default.ForType.get('BallsAndSticks') });
//     visual = plugin.context.select(ref)[0] as any;
//     console.log(visual);
//     console.log(LiteMol.Bootstrap.Utils.Molecule.findModel(visual));
//     /*let themestatic = theme(visual);*/
//     plugin.applyTransform(action).then(() => {                
//         LiteMol.Bootstrap.Command.Visual.UpdateBasicTheme.dispatch(plugin.context, { visual, theme/*: themestatic*/});
//         LiteMol.Bootstrap.Command.Entity.Focus.dispatch(plugin.context, plugin.context.select('sequence-selection'))
//         // alternatively, you can do this
//         //Command.Molecule.FocusQuery.dispatch(plugin.context, { model: selectNodes('model')[0] as any, query })
//     });
// }

// function generateLayerSelectColorTheme(activeLayerIdx: number, app: App){           
//     /*
//     let colors = new Map<number, LiteMol.Visualization.Color>();
//     let coloringPropertyKey = app.vizualizer.getColoringPropertyKey();
//     for(let layerIdx=0; layerIdx<app.state.data.length; layerIdx++){
//         if(layerIdx === activeLayerIdx){
//             colors.set(layerIdx, LiteMol.Visualization.Color.fromRgb(255,0,0));
//         }
//         else{
//             colors.set(layerIdx, LiteMol.Visualization.Color.fromRgb(255,255,255));
//         }
//     } 
//     */        

//     let channel = (app.props.controller.context.select(app.state.currentTunnelRef)[0] as any).props.model.entity.element as Tunnel;
//     let profilePartsCount = channel.Profile.length;
//     //let profileToLayerMapping = createProfileColorMapByRadiusAndCenterDistance(channel,activeLayerIdx);
//     let max = 0;
//     let colors = createProfileColorMapByRadiusAndCenterDistance(channel,activeLayerIdx);
//     let theme = LiteMol.Visualization.Theme.createMapping(LiteMol.Visualization.Theme.createColorMapMapping(
//             (idx:number)=>{
//                 return idx;
//                 /*
//                 let lIdx = profileToLayerMapping.get(idx);
//                 if(lIdx === void 0)
//                     return void 0;
//                 return lIdx;
//                 */
//             },
//             colors,
//             LiteMol.Visualization.Color.fromRgb(0,0,0)
//         ));
//     return theme;
// }

// //TODO:... vizualizace vrstev ve 3D
// /*
// function generateColorTheme(){
//     let colorSettings = this.props.vizualizer.getCurrentColoringSettings("default");
//     if(colorSettings===void 0 || colorSettings === null){
//         throw Error("No color info available!");
//     }
    
//     let colors = new Map<number, LiteMol.Visualization.Color>();
//     let coloringPropertyKey = this.vizualizer.getColoringPropertyKey();
//     for(let layerIdx=0; layerIdx<this.state.data.length; layerIdx++){
//         let layer = this.state.data[layerIdx];
//         console.log(this.vizualizer.getColor(Number(layer.Properties[coloringPropertyKey]).valueOf(),colorSettings));
//         let color = Colors.parseRGBString(this.vizualizer.getColor(Number(layer.Properties[coloringPropertyKey]).valueOf(),colorSettings));
//         colors.set(layerIdx, LiteMol.Visualization.Color.fromRgb(color.r, color.g, color.b));
//     }            

//     let channel = (this.props.controller.context.select(this.state.currentTunnelRef)[0] as any).props.model.entity.element as DataInterface.Tunnel;
//     let profilePartsCount = channel.Profile.length;
//     let profileToLayerMapping = createProfileToLayerByCenterDistanceMapping(channel);
//     let max = 0;
//     let theme = LiteMol.Visualization.Theme.createMapping(LiteMol.Visualization.Theme.createColorMapMapping(
//             (idx:number)=>{
//                 let lIdx = profileToLayerMapping.get(idx);
//                 if(lIdx === void 0 || lIdx === 0)
//                     return void 0;
//                 return lIdx;
//             },
//             colors,
//             LiteMol.Visualization.Color.fromRgb(0,0,0)
//         ));
    
//         /*
//     theme.setElementColor = (index:number, target:LiteMol.Visualization.Color)=>{
//         console.log(`index: ${index}`);
//     };*/

//     //return theme;
        
//         /*
//     return LiteMol.Visualization.Theme.createMapping(LiteMol.Visualization.Theme.createPalleteMapping(
//             (idx:number)=>{console.log(`Color Idx: ${idx}`);return idx%3;},
//             color_arr
//         ));
//         */
//     /*.createColorMapThemeProvider(
//         // here you can also use m.atoms.residueIndex, m.residues.name/.... etc.
//         // you can also get more creative and use "composite properties"
//         // for this check Bootstrap/Visualization/Theme.ts and Visualization/Base/Theme.ts and it should be clear hwo to do that.
//         //
//         // You can create "validation based" coloring using this approach as it is not implemented in the plugin for now.
//         m => ({ index: m.data.atoms.chainIndex, property: m.data.chains.asymId }),  
//         colors,
//         // this a fallback color used for elements not in the set 
//         LiteMol.Visualization.Color.fromRgb(0, 0, 123))
//         // apply it to the model, you can also specify props, check Bootstrap/Visualization/Theme.ts
//         //(model);*/
// /*
    
// }
// */
