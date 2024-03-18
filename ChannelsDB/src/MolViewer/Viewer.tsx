import type { Context } from "../Context";
import { Plugin } from "molstar/lib/mol-plugin-ui/plugin";
import { GlobalRouter } from "../SimpleRouter";

export function Viewer ({ context }: { context: Context }) {

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
