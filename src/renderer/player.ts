import { FaceReference, Vector2, Vector3 } from "./mod.ts";
import render_bodypart from "./bodypart.ts";
import {
	CanvasImageSource,
	CanvasRenderingContext2D,
} from "https://deno.land/x/canvas@v1.4.1/mod.ts";

export type RenderPlayerSettings = {
	render_overlay: boolean;
	arm_width: number;
	offset: Vector2;
	scale: number;
};

type BodypartReference = "left_leg" | "right_leg" | "left_arm" | "right_arm" | "body" | "head";

function get_settings(
	part: BodypartReference,
	{ arm_width, offset: [x_offset, y_offset], scale }: RenderPlayerSettings,
): { scale: number; size: Vector3; position: Vector2; rendered_faces?: FaceReference[] } {
	switch (part) {
		case "left_leg":
			return {
				scale,
				size: [4, 12, 4],
				rendered_faces: ["f", "r", "d"],
				position: [x_offset + scale * (arm_width + 4), y_offset + scale * 21],
			};
		case "right_leg":
			return {
				scale,
				size: [4, 12, 4],
				rendered_faces: ["f", "l", "d", "b"],
				position: [x_offset + scale * arm_width, y_offset + scale * 25],
			};
		case "left_arm":
			return {
				scale,
				size: [arm_width, 12, 4],
				rendered_faces: ["f", "r", "u", "d"],
				position: [x_offset + scale * (8 + arm_width), y_offset + scale * 5],
			};
		case "right_arm":
			return {
				scale,
				size: [arm_width, 12, 4],
				rendered_faces: ["b", "l", "f", "u", "d"],
				position: [x_offset, y_offset + scale * (16 - (3 - arm_width))],
			};
		case "body": {
			return {
				scale,
				size: [8, 12, 4],
				rendered_faces: ["f", "u"],
				position: [x_offset + scale * arm_width, y_offset + scale * 13],
			};
		}
		case "head": {
			return {
				scale,
				size: [8, 8, 8],
				position: [x_offset + scale * (arm_width - 2), y_offset + scale * 5],
			};
		}
	}
}

function render_head(
	ctx: CanvasRenderingContext2D,
	src: CanvasImageSource,
	settings: RenderPlayerSettings,
) {
	// head
	render_bodypart(ctx, src, {
		...get_settings("head", settings),
		overlay_origin: settings.render_overlay ? [32, 0] : undefined,
		texture_origin: [0, 0],
	});
}

export function render_player(
	ctx: CanvasRenderingContext2D,
	src: CanvasImageSource,
	settings: RenderPlayerSettings,
) {
	const render_overlay = settings.render_overlay;

	// left leg
	render_bodypart(ctx, src, {
		...get_settings("left_leg", settings),
		overlay_origin: render_overlay ? [0, 48] : undefined,
		texture_origin: [16, 48],
	});

	// right leg
	render_bodypart(ctx, src, {
		...get_settings("right_leg", settings),
		overlay_origin: render_overlay ? [0, 32] : undefined,
		texture_origin: [0, 16],
	});

	// left arm
	render_bodypart(ctx, src, {
		...get_settings("left_arm", settings),
		overlay_origin: render_overlay ? [48, 48] : undefined,
		texture_origin: [32, 48],
	});

	// body
	render_bodypart(ctx, src, {
		...get_settings("body", settings),
		overlay_origin: render_overlay ? [16, 32] : undefined,
		texture_origin: [16, 16],
	});

	// right arm
	render_bodypart(ctx, src, {
		...get_settings("right_arm", settings),
		overlay_origin: render_overlay ? [40, 32] : undefined,
		texture_origin: [40, 16],
	});

	render_head(ctx, src, settings);
}

export function render_legacy_player(
	ctx: CanvasRenderingContext2D,
	src: CanvasImageSource,
	settings: RenderPlayerSettings,
) {
	// left leg
	render_bodypart(ctx, src, {
		...get_settings("left_leg", settings),
		texture_origin: [0, 16],
		flipped: true,
	});

	// right leg
	render_bodypart(ctx, src, {
		...get_settings("right_leg", settings),
		texture_origin: [0, 16],
	});

	// left arm
	render_bodypart(ctx, src, {
		...get_settings("left_arm", settings),
		texture_origin: [40, 16],
		flipped: true,
	});

	// body
	render_bodypart(ctx, src, {
		...get_settings("body", settings),
		texture_origin: [16, 16],
	});

	// right arm
	render_bodypart(ctx, src, {
		...get_settings("right_arm", settings),
		texture_origin: [40, 16],
	});

	render_head(ctx, src, settings);
}
