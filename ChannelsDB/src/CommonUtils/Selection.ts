import { Tunnel, Layers } from "../DataInterface";
import { Context } from "../Context";
import { Representation } from "molstar/lib/mol-repr/representation";
import { Loci } from "molstar/lib/mol-model/loci";
import { ShapeGroup } from "molstar/lib/mol-model/shape";
import { ChannelSourceData } from "../MolViewer/primitives";

export interface LightResidueInfo{
    authSeqNumber: number, 
    chain:{
        authAsymId:string
    }
};

export interface SelectionObject{
    elements: number[]
};
export interface ResidueLight{type:"light", info:LightResidueInfo};

export class SelectionHelper{
    private static selectedChannelRef: string|undefined;

    private static selectedChannelData: Layers|undefined;
    private static selectedChannelLoci: ShapeGroup.Loci|undefined;

    private static onSelectionHandlers:{handler:(label:string)=>void}[];
    private static onChannelSelectHandlers:{handler:(data:Layers)=>void}[];

    public static attachOnSelect(handler:(label: string)=>void) {
        if(this.onSelectionHandlers===void 0){
            this.onSelectionHandlers = [];
        }

        this.onSelectionHandlers.push({handler});
    }

    private static invokeOnSelectionHandlers(label:string){
        if(this.onSelectionHandlers === void 0){
            return;
        }

        for(let h of this.onSelectionHandlers){
            h.handler(label);
        }
    }

    public static attachOnChannelSelectHandler(handler:(data:Layers)=>void){
        if(this.onChannelSelectHandlers===void 0){
            this.onChannelSelectHandlers = [];
        }

        this.onChannelSelectHandlers.push({handler});
    }
    private static invokeOnChannelSelectHandlers(data: Layers){
        if(this.onChannelSelectHandlers === void 0){
            return;
        }

        for(let h of this.onChannelSelectHandlers){
            h.handler(data);
        }
    }

    public static getSelectedChannelData(){
        return (this.selectedChannelData===void 0)?null:this.selectedChannelData;
    }

    public static getSelectedChannelRef(){
        return (this.selectedChannelRef===void 0)?"":this.selectedChannelRef;
    }

    public static attachClearSelectionToEventHandler(plugin: Context){
        plugin.plugin.behaviors.interaction.click.subscribe(({current, button, modifiers}) => {
            this.objectSelected(current, plugin);
        })
        plugin.plugin.managers.structure.focus.behaviors.current.subscribe((selected) => {
            if (selected?.label) this.invokeOnSelectionHandlers(selected.label);
        })
    }

    public static getSelectedChannelLoci(): ShapeGroup.Loci | undefined {
        return this.selectedChannelLoci;
    }

    private static objectSelected(current: Representation.Loci<Loci>, plugin: Context) {
        if (current.loci.kind == "group-loci") {
            const loci = current.loci as ShapeGroup.Loci;
            this.selectedChannelLoci = loci;
            const data = loci.shape.sourceData as ChannelSourceData;
            const channelsData = plugin.data.Channels;
            if (channelsData) {
                Object.values(channelsData).forEach(channels => {
                    const array = channels as Tunnel[];
                    array.forEach(tunnel => {
                        if (tunnel.Id === data.id && tunnel.Type === data.type) {
                            this.selectedChannelData = tunnel.Layers;
                            this.invokeOnSelectionHandlers(tunnel.Type + " " + tunnel.Id);
                            this.invokeOnChannelSelectHandlers(this.selectedChannelData);
                            return;
                        }
                    })
                })
            }
        } else {
            this.invokeOnSelectionHandlers("");
        }
    }
}
