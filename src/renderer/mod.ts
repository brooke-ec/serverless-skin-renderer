import Canvas, { EmulatedCanvas2D, Image } from "https://deno.land/x/canvas@v1.4.1/mod.ts";
import { RenderPlayerSettings, render_legacy_player, render_player } from "./player.ts";
import { cutout, has_transparency } from "./helpers.ts";

export const frontfaces: FaceReference[] = ["l", "f", "u"];
export const backfaces: FaceReference[] = ["r", "b", "d"];
export const all_faces: FaceReference[] = frontfaces.concat(backfaces);
export type FaceReference = "l" | "f" | "r" | "b" | "u" | "d";

export type Vector2 = [x: number, y: number];
export type Vector3 = [x: number, y: number, z: number];

const CLASSIC_SIZE: [number, number] = [21.2, 46.6];
const SLIM_SIZE: [number, number] = [19.2, 46.6];

export default function render(src: Image, slim: boolean, scale: number): EmulatedCanvas2D {
	let size = slim ? SLIM_SIZE : CLASSIC_SIZE;
	size = [Math.round(size[0] * scale), Math.round(size[1] * scale)];
	const canvas = Canvas.MakeCanvas(...size);
	const ctx = canvas.getContext("2d")!;

	ctx.imageSmoothingEnabled = false;
	const src_height = src.height();
	const legacy = src_height == 32;

	const settings: RenderPlayerSettings = {
		scale,
		arm_width: slim ? 3 : 4,
		offset: [scale * 0.6, scale * (slim ? -1.1 : -1.6)],
		render_overlay: has_transparency(cutout(src, 0, 0, 64, src_height)),
	};

	if (legacy) render_legacy_player(ctx, src, settings);
	else render_player(ctx, src, settings);

	return canvas;
}
