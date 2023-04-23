# Serverless Skin Renderer

A serverless 3D Minecraft skin previewer, designed for [Deno Deploy](https://deno.com/deploy). Inspired by [Crafatar](https://crafatar.com/), built using [deno-canvas](https://deno.land/x/canvas@v1.4.1).

## URL Parameters

-   `hash` - The SHA256 hash of the texture on `textures.minecraft.net`. For info on fetching a player's current skin hash, see [wiki.vg](https://wiki.vg/Mojang_API#UUID_to_Profile_and_Skin.2FCape).
-   `slim` - If `true` the skin will be rendered with 3 pixel wide arms.
-   `scale` - The scale at which to render the skin.

## Examples

![Dr_ec_'s Skin](https://raw.githubusercontent.com/NimajnebEC/serverless-skin-renderer/main/examples/bad3e40bd340555fadefd36b6d83b4e086d14a90ea4eb3fd599593cadde408e6.png) ![sectum_sempra's Skin](https://raw.githubusercontent.com/NimajnebEC/serverless-skin-renderer/main/examples/3da702dd5d7508fba2bebe5154f4820e57787d9e672e506482cfa7b4b788f2b.png) ![Aefar's Skin](https://raw.githubusercontent.com/NimajnebEC/serverless-skin-renderer/main/examples/86e531cd7a83d8028bd807c67dd40b5b5ea7b32a4e99bf344bf75c6a33d5fd79.png) ![jeb_'s Skin](https://raw.githubusercontent.com/NimajnebEC/serverless-skin-renderer/main/examples/7fd9ba42a7c81eeea22f1524271ae85a8e045ce0af5a6ae16c6406ae917e68b5.png)
