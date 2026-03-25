import { Image, dataURLtoFile, loadImage } from "https://deno.land/x/canvas@v1.4.2/mod.ts";
import { serve } from "https://deno.land/std@0.184.0/http/server.ts";
import render from "./renderer/mod.ts";

const BASE_PROFILE_URL = "https://sessionserver.mojang.com/session/minecraft/profile/";
const BASE_TEXTURE_URL = "https://textures.minecraft.net/texture/";

const RE_UUID = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/;
const RE_HASH = /^[a-f\d]+$/;

const base_headers = {
	"Cache-Control": "max-age=31536000, immutable, public",
	"Access-Control-Allow-Origin": "*",
};

function error(status: number, reason: string) {
	return new Response(JSON.stringify({ error: reason }), {
		status: status,
		headers: { ...base_headers, "Content-Type": "application/json" },
	});
}

serve(async (request) => {
	const url = new URL(request.url);
	const uuid = url.searchParams.get("uuid");
	const hash = url.searchParams.get("hash");
	const scale = Number(url.searchParams.get("scale") ?? 10);

	if (isNaN(scale)) return error(400, "Search parameter 'scale' must be a valid number.");

	if (scale > 10) return error(400, "Value of 'scale' must not be greater than 10.");

	let skin_url: string;
	let slim = false;

	if (uuid) {
		if (!RE_UUID.test(uuid)) return error(400, "The provided UUID is invalid.");
		const clean_uuid = uuid.replace(/-/g, "");

		let profile: { properties: { name: string; value: string }[] };

		try {
			const response = await fetch(BASE_PROFILE_URL + clean_uuid);
			profile = await response.json();
		} catch {
			return error(500, "Could not fetch profile.");
		}

		const texture_property = profile.properties.find((prop) => prop.name === "textures");

		if (!texture_property) return error(500, "Could not find skin of the provided UUID.");

		const decoded = JSON.parse(atob(texture_property.value));

		if (!decoded.textures || !decoded.textures.SKIN || !decoded.textures.SKIN.url)
			return error(500, "Could not find skin of the provided UUID.");

		skin_url = decoded.textures.SKIN.url;
		slim = decoded.textures.SKIN.metadata?.model === "slim";
	} else if (hash) {
		if (!RE_HASH.test(hash)) return error(400, "The provided hash is invalid.");
		slim = url.searchParams.get("slim") == "true";
		skin_url = BASE_TEXTURE_URL + hash;
	} else return error(400, "Required either 'hash' or 'uuid' search parameters.");

	let src: Image | undefined;
	try {
		src = await loadImage(skin_url);
	} catch {
		return error(500, "Could not fetch texture.");
	}

	// render to canvas
	const canvas = render(src, slim, scale);
	const data = dataURLtoFile(canvas.toDataURL());

	return new Response(new Blob([Uint8Array.from(data)]), {
		status: 200,
		headers: {
			...base_headers,
			"Content-Type": "image/png",
		},
	});
});
