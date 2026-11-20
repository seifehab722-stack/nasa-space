Place Earth equirectangular textures here (e.g., from NASA Blue Marble / Visible Earth):

Desktop (2K):
- /public/textures/earth/day-2k.jpg
- /public/textures/earth/night-2k.jpg
- /public/textures/earth/clouds-2k.png
- /public/textures/earth/bump-2k.jpg (optional)
- /public/textures/earth/specular-2k.jpg (optional)

Mobile (1K):
- /public/textures/earth/day-1k.jpg
- /public/textures/earth/night-1k.jpg
- /public/textures/earth/clouds-1k.png
- /public/textures/earth/bump-1k.jpg (optional)
- /public/textures/earth/specular-1k.jpg (optional)

Until these files are added, the 3D Earth component automatically renders high-resolution procedural equirectangular textures with oceans, continents, clouds, and night city lights, and falls back to the static Earth horizon poster when WebGL is unavailable or reduced motion is preferred.
