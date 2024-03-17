/*
* Copyright (c) 2016 - now David Sehnal, licensed under Apache 2.0, See LICENSE file for more info.
*/

import { Tunnel, TunnelMetaInfo } from "./DataInterface";
import { Context } from "./Context";
import { PluginCommands } from 'molstar/lib/mol-plugin/commands';
import { UUID } from 'molstar/lib/mol-util/uuid'
import { Sphere } from "./MolViewer/primitives";
import { ColorGenerator } from "molstar/lib/extensions/meshes/mesh-utils";

export interface SurfaceTag { type: string, element?: any }

export function showDefaultVisuals(plugin: Context, data: any, channelCount: number) {
    return new Promise((res, rej) => {
        let toShow = [];
        if(data.ReviewedChannels_MOLE.length > 0){
            toShow = data.ReviewedChannels_MOLE;
        }
        else if(data.ReviewedChannels_Caver.length > 0){
            toShow = data.ReviewedChannels_Caver;
        }
        else if(data.CSATunnels_MOLE.length > 0){
            toShow = data.CSATunnels_MOLE;
        }
        else if(data.CSATunnels_Caver.length > 0){
            toShow = data.CSATunnels_Caver;
        }
        else if(data.TransmembranePores_MOLE.length > 0){
            toShow = data.TransmembranePores_MOLE;
        }
        else if(data.TransmembranePores_Caver.length > 0){
            toShow = data.TransmembranePores_Caver;
        }
        else if(data.CofactorTunnels_MOLE.length > 0){
            toShow = data.CofactorTunnels_MOLE;
        }
        else if(data.CofactorTunnels_Caver.length > 0){
            toShow = data.CofactorTunnels_Caver;
        }
        else if(data.ProcognateTunnels_MOLE.length > 0){
            toShow = data.ProcognateTunnels_MOLE;
        }
        else if(data.ProcognateTunnels_Caver.length > 0){
            toShow = data.ProcognateTunnels_Caver;
        }
        else if(data.AlphaFillTunnels_MOLE.length > 0){
            toShow = data.AlphaFillTunnels_MOLE;
        }
        else if(data.AlphaFillTunnels_Caver.length > 0){
            toShow = data.AlphaFillTunnels_Caver;
        }
        
        return showChannelVisuals(plugin, toShow/*.slice(0, channelCount)*/, true).then(() => {
            if(data.Cavities === void 0){
                res(null);
                return;
            }
            let cavity = data.Cavities.Cavities[0];
            if (!cavity) {
                res(null);
                return;
            }
            showCavityVisuals(plugin, [cavity ], true).then(() => res(null));
        })});
}

function showSurfaceVisuals(plugin: Context, elements: any[], visible: boolean, type: string, label: (e: any) => string, alpha: number): Promise<any> {
    // I am modifying the original JSON response. In general this is not a very good
    // idea and should be avoided in "real" apps.

    // let t = plugin.createTransform();
    // let needsApply = false;

    // for (let element of elements) {
    //     if (!element.__id) element.__id = Bootstrap.Utils.generateUUID();
    //     //console.log(!!element.__isVisible);
    //     if (!!element.__isVisible === visible) continue;
    //     //console.log("for 1");
    //     element.__isVisible = visible;
    //     if (!element.__color) {
    //         // the colors should probably be initialized when the data is loaded
    //         // so that they are deterministic...
    //         element.__color = nextColor();
    //         //console.log("got new color");
    //     }

    //     if (!visible) {
    //         //console.log("node removed");
    //         plugin.command(Bootstrap.Command.Tree.RemoveNode, element.__id);
    //     } else {
    //         //console.log("creating surface from mesh");
    //         //console.log(element.Mesh);
    //         let surface = createSurface(element.Mesh);
    //         t.add('channelsDB-data', CreateSurface, {
    //             label: label(element),
    //             tag: { type, element },
    //             surface,
    //             color: element.__color as Visualization.Color,
    //             isInteractive: true,
    //             transparency: { alpha }
    //         }, { ref: element.__id, isHidden: true });
    //         needsApply = true;
    //     }
    // }

    // if (needsApply) {
    //     //console.log("needs apply = true");
    //     return new Promise<any>((res, rej) => {
    //         plugin.applyTransform(t).then(() => {
    //             for (let element of elements) {
    //                 element.__isBusy = false;
    //             }
    //             res(null);
    //         }).catch(e => rej(e));
    //     });
    // }
    // else {
    //     //console.log("needs apply = false");
    //     return new Promise<any>((res, rej) => {
    //         for (let element of elements) {
    //             element.__isBusy = false;
    //         }
    //         res(null);
    //     });
    // }
    return new Promise<any>((res, rej) => { res(null) });
}

export function showCavityVisuals(plugin: Context, cavities: any[], visible: boolean): Promise<any> {
    return showSurfaceVisuals(plugin, cavities, visible, 'Cavity', (cavity: any) => `${cavity.Type} ${cavity.Id}`, 0.33);
}

//Modified
export async function showChannelVisuals(plugin: Context, channels: Tunnel[]&TunnelMetaInfo[], visible: boolean): Promise<any> {
    let label = (channel: any) => `${channel.Type} ${channel.Id + 1}`;
    let alpha = 1.0;

    let promises = [];
    for (let channel of channels) {

        if (!channel.__id) channel.__id = UUID.create22();
        if (!!channel.__isVisible === visible) continue;

        channel.__isVisible = visible;
        if (!channel.__color) {
            channel.__color = ColorGenerator.next().value;
        }

        if (!visible) {
            await PluginCommands.State.RemoveObject(plugin.plugin, { state: plugin.plugin.state.data, ref: channel.__ref });
            if (channel.__parent_ref) await PluginCommands.State.RemoveObject(plugin.plugin, { state: plugin.plugin.state.data, ref: channel.__parent_ref });
        } else {            
            const sphereArray: Sphere[] = [];
            for (let j = 0; j < channel.Profile.length; j += 1) {
                const entry = channel.Profile[j];
                sphereArray.push({
                  kind: "sphere",
                  center: [entry.X, entry.Y, entry.Z],
                  radius: entry.Radius,
                  color: channel.__color,
                  label: label(channel),
                  group: 1,
                  id: channel.Id,
                  type: channel.Type
                });
            }
            const ref = await plugin.renderSpheres({spheres: sphereArray, id: channel.Id, type: channel.Type});
            channel.__ref = ref.ref;
            channel.__parent_ref = ref.state?.cells.get(ref.ref)?.sourceRef;
            if (ref.data?.repr.getAllLoci()[0]) channel.__loci = ref.data?.repr.getAllLoci()[0];


            // promises.push(new Promise<any>((res,rej) => {
            //     //Zpracování úspěšně vygenerovného povrchu tunelu
            //     sphereSurfacePromise.then((val) => {
            //         let surface = val;
            //         /*
            //         if(surface.surface.annotation !== void 0){
            //             console.log("---");
            //             console.log(`annotations length: ${surface.surface.annotation.length}`);
            //             console.log(`profile parts count: ${channel.Profile.length}`);
            //             console.log("---");
            //             for(let i=0;i<surface.surface.annotation.length;i++){                                
            //                 surface.surface.annotation[i] = 0;
            //                 //console.log(`surface.annotation: ${surface.surface.annotation[i]}`);
            //             }
            //         }
            //         */
                    
            //         // let t = plugin.createTransform();
            //         // t.add('channelsDB-data', CreateSurface, {
            //         //     label: label(channel),
            //         //     tag: { type:channel.Type, element: channel },
            //         //     surface: surface.surface,
            //         //     color: channel.__color as Visualization.Color,
            //         //     isInteractive: true,
            //         //     transparency: { alpha },
            //         // }, { ref: channel.__id, isHidden: true });

            //         // plugin.applyTransform(t)
            //         //     .then(()=>{
            //         //         res(null);
            //         //     })
            //         //     .catch((err)=>{
            //         //         rej(err)
            //         //     });
            //     }).catch((err)=>{
            //         rej(err)
            //     });
            // }));
        }
    }

    return Promise.resolve().then(()=>{
        for(let channel of channels){
            channel.__isBusy = false;
        }
    });
}