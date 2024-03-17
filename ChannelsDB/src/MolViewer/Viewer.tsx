
import { useEffect, useState } from "react";
import type { Context } from "../Context";
import { Plugin } from "molstar/lib/mol-plugin-ui/plugin";
import { Cylinder, PrimitivesData, Sphere } from "./primitives";
import { ColorGenerator } from "molstar/lib/extensions/meshes/mesh-utils";
import { GlobalRouter } from "../SimpleRouter";

export function Viewer ({ context }: { context: Context }) {
  // const [channels, setChannels] = useState<PrimitivesData>({spheres: []});

  // const pdbids = ["1ymg", "5mrw", "4nm9", "1jj2", "3tbg"];
  // const pdbid = pdbids[0];
  // let pid = GlobalRouter.getCurrentPid();
  // let subDB = GlobalRouter.getCurrentDB();

  // useEffect(() => {
  //   async function fetchSpheres() {
  //     const response = await fetch(
  //       `https://webchem.ncbr.muni.cz/API/ChannelsDB/PDB/${pid}`
  //     );
  //     const json = await response.json();
  //     const channels: PrimitivesData = {spheres: []};
  //     let id = 0;
  //     json.Channels.ReviewedChannels.forEach((channel: any, i: any) => {
  //       const color = ColorGenerator.next().value;
  //       const c: Sphere[] = [];
  //       for (let j = 0; j < channel.Profile.length; j += 1) {
  //         const entry = channel.Profile[j];
  //         c.push({
  //           kind: "sphere",
  //           center: [entry.X, entry.Y, entry.Z],
  //           radius: entry.Radius,
  //           color,
  //           label: `Channel ${i} | Ball ${j}`,
  //           group: 1,
  //         });

  //         id += 1;
  //       }
  //       channels.spheres = c;
  //     });
  //     setChannels(channels);
  //   }

  //   async function fetchCylinders() {
  //     const response = await fetch(
  //       `https://webchem.ncbr.muni.cz/API/ChannelsDB/PDB/${pid}`
  //     );
  //     const json = await response.json();
  //     const channels: PrimitivesData = {spheres: []};

  //     json.Channels.ReviewedChannels.forEach((channel: any, i: any) => {
  //       const color = ColorGenerator.next().value;
  //       const c: Cylinder[] = [];
  //       for (let j = 1; j < channel.Profile.length; j += 1) {
  //         const prev = channel.Profile[j - 1];
  //         const current = channel.Profile[j];
  //         c.push({
  //           kind: "cylinder",
  //           color,
  //           start: [prev.X, prev.Y, prev.Z],
  //           end: [current.X, current.Y, current.Z],
  //           label: `Channel ${i} | Ball ${j}`,
  //           radiusBottom: prev.Radius,
  //           radiusTop: current.Radius,
  //           distance: current.Distance,
  //           group: i,
  //         });
  //       }
  //       channels.spheres = c;
  //     });
  //     setChannels(channels);
  //   }
    
  //   context.load(`https://models.rcsb.org/v1/${pid}/full?copy_all_categories=true`)
  // }, []);
  let pid = GlobalRouter.getCurrentPid();
  let subDB = GlobalRouter.getCurrentDB();
  if (subDB === 'pdb') {
    context.load(`https://models.rcsb.org/v1/${pid}/full?copy_all_categories=true`);
  } else {
    context.load(`https://alphafill.eu/v1/aff/${pid}`);
  }

  return (
    <div className="chdb-panel plugin" id="plugin">
    <div
      className=""
      style={{
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        // style={{
        //   // inset: "100px 0px 0px 100px",
        //   position: "relative",
        //   height: "720px",
        //   width: "1080px",
        // }}
      >
        <Plugin plugin={context.plugin} />
      </div>
    </div>
    </div>
  );
}
