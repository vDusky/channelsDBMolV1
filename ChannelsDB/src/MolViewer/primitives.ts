import { Mesh } from "molstar/lib/mol-geo/geometry/mesh/mesh";
import { Vec3 } from "molstar/lib/mol-math/linear-algebra";
import { Shape } from "molstar/lib/mol-model/shape";
import { PluginStateObject } from "molstar/lib/mol-plugin-state/objects";
import { StateTransformer } from "molstar/lib/mol-state";
import { Color } from "molstar/lib/mol-util/color";
import { ParamDefinition as PD } from "molstar/lib/mol-util/param-definition";
import { MeshBuilder } from "molstar/lib/mol-geo/geometry/mesh/mesh-builder";
import { addSphere } from "molstar/lib/mol-geo/geometry/mesh/builder/sphere";
import { addCylinder } from "molstar/lib/mol-geo/geometry/mesh/builder/cylinder";
import { WebGLContext } from "molstar/lib/mol-gl/webgl/context";

export type Sphere = {
  kind: "sphere";
  center: number[];
  radius: number;
  label: string;
  color: number;
  group: number;
  id?: string;
  type?: string;
};
export type Cylinder = {
  kind: "cylinder";
  radiusTop: number;
  radiusBottom: number;
  start: number[];
  end: number[];
  label: string;
  color: number;
  distance: number;
  group: number;
};

export type ChannelSourceData = {
  id: string,
  type: string
}

export type PrimitivesData = {
  spheres: Sphere[] | Cylinder[],
  id?: string,
  type?: string
};

const Transform = StateTransformer.builderFactory("namespace-id");
export const CreateSpheresProvider = Transform({
  name: "name-id",
  // display: { name: "some cool name" },
  from: PluginStateObject.Root,
  to: PluginStateObject.Shape.Provider,
  params: {
    data: PD.Value<PrimitivesData>({spheres: []}, { isHidden: false }),
    webgl: PD.Value<WebGLContext | null>(null),
  },
})({
  apply({ params }) {
    return new PluginStateObject.Shape.Provider({
      label: params.data.id && params.data.type ? `${params.data.type} ${params.data.id}` : "Channels",
      data: params,
      params: Mesh.Params,
      geometryUtils: Mesh.Utils,
      getShape: (_, data) => createSpheresShape(data.data, data.webgl),
    });
  },
});

async function createSpheresShape(data: PrimitivesData, webgl: WebGLContext) {
  const builder = MeshBuilder.createState(512, 512);

  for (let i = 0; i < data.spheres.length; i += 1) {
    const p = data.spheres[i];
    builder.currentGroup = p.group;
    switch (p.kind) {
      case "sphere":
        addSphere(builder, p.center as Vec3, p.radius, 2);
        break;
      case "cylinder":
        addCylinder(builder, p.start as Vec3, p.end as Vec3, 1, {
          radiusTop: p.radiusTop,
          radiusBottom: p.radiusBottom,
          bottomCap: true,
          topCap: true,
        });
        break;
    }
  }

  let mesh = MeshBuilder.getMesh(builder);

  return Shape.create(
    "Spheres",
    {id: data.id, type: data.type},
    mesh,
    (g) => Color(data.spheres[g].color),
    // () => Color(0xff0000),
    () => 1,
    (g) => data.spheres[g].label
  );
}
