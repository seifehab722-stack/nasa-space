import * as THREE from 'three';

export interface EarthTextureSet {
  dayMap: THREE.Texture;
  nightMap: THREE.Texture;
  cloudsMap: THREE.Texture;
  bumpMap: THREE.Texture;
  specularMap: THREE.Texture;
  dispose: () => void;
}

/** Fast deterministic 3D value noise for seamless equirectangular sphere textures */
function hash3(ix: number, iy: number, iz: number): number {
  let n = (ix * 374761393 + iy * 668265263 + iz * 2147483647) | 0;
  n = (n ^ (n >> 13)) * 1274126177;
  return ((n ^ (n >> 16)) >>> 0) / 4294967295;
}

function fade(t: number): number {
  return t * t * (3 - 2 * t);
}

function noise3(x: number, y: number, z: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const iz = Math.floor(z);

  const fx = fade(x - ix);
  const fy = fade(y - iy);
  const fz = fade(z - iz);

  const c000 = hash3(ix, iy, iz);
  const c100 = hash3(ix + 1, iy, iz);
  const c010 = hash3(ix, iy + 1, iz);
  const c110 = hash3(ix + 1, iy + 1, iz);
  const c001 = hash3(ix, iy, iz + 1);
  const c101 = hash3(ix + 1, iy, iz + 1);
  const c011 = hash3(ix, iy + 1, iz + 1);
  const c111 = hash3(ix + 1, iy + 1, iz + 1);

  const x00 = c000 + (c100 - c000) * fx;
  const x10 = c010 + (c110 - c010) * fx;
  const x01 = c001 + (c101 - c001) * fx;
  const x11 = c011 + (c111 - c011) * fx;

  const y0 = x00 + (x10 - x00) * fy;
  const y1 = x01 + (x11 - x01) * fy;

  return y0 + (y1 - y0) * fz;
}

function fbm3(x: number, y: number, z: number, octaves: number): number {
  let value = 0;
  let amp = 0.5;
  let freq = 1.0;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    value += amp * noise3(x * freq, y * freq, z * freq);
    norm += amp;
    amp *= 0.5;
    freq *= 2.08;
  }
  return value / norm;
}

function createCanvasTexture(
  canvas: HTMLCanvasElement,
  isColor: boolean,
  maxAnisotropy: number
): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.colorSpace = isColor ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.anisotropy = Math.min(maxAnisotropy, 8);
  tex.needsUpdate = true;
  return tex;
}

export function generateProceduralEarthTextures(
  width: number,
  height: number,
  maxAnisotropy: number
): EarthTextureSet {
  const dayCanvas = document.createElement('canvas');
  dayCanvas.width = width;
  dayCanvas.height = height;
  const dayCtx = dayCanvas.getContext('2d')!;
  const dayImg = dayCtx.createImageData(width, height);

  const nightCanvas = document.createElement('canvas');
  nightCanvas.width = width;
  nightCanvas.height = height;
  const nightCtx = nightCanvas.getContext('2d')!;
  const nightImg = nightCtx.createImageData(width, height);

  const cloudCanvas = document.createElement('canvas');
  cloudCanvas.width = width;
  cloudCanvas.height = height;
  const cloudCtx = cloudCanvas.getContext('2d')!;
  const cloudImg = cloudCtx.createImageData(width, height);

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bumpCtx = bumpCanvas.getContext('2d')!;
  const bumpImg = bumpCtx.createImageData(width, height);

  const specCanvas = document.createElement('canvas');
  specCanvas.width = width;
  specCanvas.height = height;
  const specCtx = specCanvas.getContext('2d')!;
  const specImg = specCtx.createImageData(width, height);

  const dayData = dayImg.data;
  const nightData = nightImg.data;
  const cloudData = cloudImg.data;
  const bumpData = bumpImg.data;
  const specData = specImg.data;

  for (let py = 0; py < height; py++) {
    const v = py / (height - 1);
    const lat = (0.5 - v) * Math.PI; // +PI/2 north pole to -PI/2 south pole
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);
    const absLat = Math.abs(sinLat);

    for (let px = 0; px < width; px++) {
      const u = px / width;
      const lon = (u - 0.5) * Math.PI * 2;
      const nx = cosLat * Math.cos(lon);
      const ny = sinLat;
      const nz = cosLat * Math.sin(lon);

      const idx = (py * width + px) * 4;

      // Continental height field
      const warp = fbm3(nx * 1.4 + 3.1, ny * 1.4 - 1.7, nz * 1.4 + 0.8, 3) * 0.42;
      const continent =
        fbm3(nx * 2.1 + warp, ny * 2.1 + warp * 0.6, nz * 2.1 - warp, 4) * 0.85 +
        fbm3(nx * 6.5, ny * 6.5, nz * 6.5, 2) * 0.15;

      const seaLevel = 0.51;
      const isLand = continent > seaLevel;
      const elev = Math.max(0, (continent - seaLevel) / (1 - seaLevel));

      // Polar ice cap blend
      const polarThreshold = 0.86 + (continent - 0.5) * 0.18;
      const isIce = absLat > polarThreshold;

      let r = 10;
      let g = 45;
      let b = 88;
      let spec = 215;
      let bump = 35;

      if (isIce) {
        r = 224;
        g = 236;
        b = 246;
        spec = 40;
        bump = 135;
      } else if (!isLand) {
        const depth = Math.min(1, (seaLevel - continent) / 0.25);
        // Deep natural ocean blue with lighter turquoise coastal shelves
        r = Math.round(22 - depth * 14);
        g = Math.round(92 - depth * 56);
        b = Math.round(148 - depth * 64);
        spec = 220;
        bump = 24;
      } else {
        // Natural continents: humid green forests vs warm arid plains/mountains
        const moisture = fbm3(nx * 3.4 + 9.2, ny * 3.4 + 2.4, nz * 3.4 - 4.1, 3);
        const aridity = Math.max(0, 1 - Math.abs(absLat - 0.36) * 2.8) * (1 - moisture * 0.7);

        if (elev > 0.42) {
          // Highland / mountain brown-gray
          const t = Math.min(1, (elev - 0.42) / 0.4);
          r = Math.round(108 + t * 75);
          g = Math.round(100 + t * 72);
          b = Math.round(86 + t * 75);
        } else if (aridity > 0.38) {
          // Warm ochre / desert terrain
          r = Math.round(164 + moisture * 22);
          g = Math.round(136 + moisture * 16);
          b = Math.round(92 + moisture * 12);
        } else {
          // Lush natural forest & grassland greens
          r = Math.round(38 + elev * 52 + (1 - moisture) * 28);
          g = Math.round(88 + moisture * 34 + elev * 24);
          b = Math.round(44 + elev * 20);
        }
        spec = 22;
        bump = Math.min(255, Math.round(90 + elev * 165));
      }

      dayData[idx] = r;
      dayData[idx + 1] = g;
      dayData[idx + 2] = b;
      dayData[idx + 3] = 255;

      bumpData[idx] = bump;
      bumpData[idx + 1] = bump;
      bumpData[idx + 2] = bump;
      bumpData[idx + 3] = 255;

      specData[idx] = spec;
      specData[idx + 1] = spec;
      specData[idx + 2] = spec;
      specData[idx + 3] = 255;

      // Night city lights on habitable non-ice land near coasts/lowlands
      let light = 0;
      if (isLand && !isIce && elev < 0.36 && absLat < 0.78) {
        const urbanCluster = fbm3(nx * 14.0 + 4.3, ny * 14.0 - 2.1, nz * 14.0 + 7.6, 2);
        const fineGrid = hash3(Math.round(nx * 190), Math.round(ny * 190), Math.round(nz * 190));
        if (urbanCluster > 0.61 && fineGrid > 0.48) {
          const coastalBoost = elev < 0.14 ? 1.0 : 0.55;
          light = Math.min(1, ((urbanCluster - 0.61) / 0.28) * coastalBoost);
        }
      }
      nightData[idx] = Math.round(light * 255);
      nightData[idx + 1] = Math.round(light * 192);
      nightData[idx + 2] = Math.round(light * 104);
      nightData[idx + 3] = 255;

      // Swirling cloud layer
      const swirl = fbm3(nx * 3.1 - 2.0, ny * 4.5 + 1.2, nz * 3.1 + 5.4, 3);
      const cloudVal = fbm3(
        nx * 5.2 + swirl * 1.4,
        ny * 6.0 + swirl * 0.5,
        nz * 5.2 - swirl * 1.1,
        3
      );
      const cloudAlpha = Math.max(0, Math.min(1, (cloudVal - 0.49) / 0.27));
      cloudData[idx] = 242;
      cloudData[idx + 1] = 248;
      cloudData[idx + 2] = 255;
      cloudData[idx + 3] = Math.round(cloudAlpha * 215);
    }
  }

  dayCtx.putImageData(dayImg, 0, 0);
  nightCtx.putImageData(nightImg, 0, 0);
  cloudCtx.putImageData(cloudImg, 0, 0);
  bumpCtx.putImageData(bumpImg, 0, 0);
  specCtx.putImageData(specImg, 0, 0);

  const dayMap = createCanvasTexture(dayCanvas, true, maxAnisotropy);
  const nightMap = createCanvasTexture(nightCanvas, true, maxAnisotropy);
  const cloudsMap = createCanvasTexture(cloudCanvas, true, maxAnisotropy);
  const bumpMap = createCanvasTexture(bumpCanvas, false, maxAnisotropy);
  const specularMap = createCanvasTexture(specCanvas, false, maxAnisotropy);

  return {
    dayMap,
    nightMap,
    cloudsMap,
    bumpMap,
    specularMap,
    dispose: () => {
      dayMap.dispose();
      nightMap.dispose();
      cloudsMap.dispose();
      bumpMap.dispose();
      specularMap.dispose();
    },
  };
}

/**
 * Attempts to load optional team-supplied NASA Blue Marble / Visible Earth textures
 * from /public/textures/earth/. Falls back seamlessly to procedural textures when absent.
 */
export async function loadEarthTexturesWithFallback(
  isMobile: boolean,
  maxAnisotropy: number
): Promise<EarthTextureSet> {
  const tier = isMobile ? '1k' : '2k';
  const dayUrl = `/textures/earth/day-${tier}.jpg`;

  try {
    const res = await fetch(dayUrl, { method: 'HEAD' });
    const contentType = res.headers.get('content-type') ?? '';
    if (res.ok && contentType.startsWith('image/')) {
      const loader = new THREE.TextureLoader();
      const loadOpt = (url: string, isColor: boolean): Promise<THREE.Texture | null> =>
        new Promise((resolve) => {
          loader.load(
            url,
            (tex) => {
              tex.colorSpace = isColor ? THREE.SRGBColorSpace : THREE.NoColorSpace;
              tex.anisotropy = Math.min(maxAnisotropy, 8);
              resolve(tex);
            },
            undefined,
            () => resolve(null)
          );
        });

      const [dayTex, nightTex, cloudsTex, bumpTex, specTex] = await Promise.all([
        loadOpt(dayUrl, true),
        loadOpt(`/textures/earth/night-${tier}.jpg`, true),
        loadOpt(`/textures/earth/clouds-${tier}.png`, true),
        loadOpt(`/textures/earth/bump-${tier}.jpg`, false),
        loadOpt(`/textures/earth/specular-${tier}.jpg`, false),
      ]);

      if (dayTex) {
        const proc = generateProceduralEarthTextures(
          isMobile ? 512 : 1024,
          isMobile ? 256 : 512,
          maxAnisotropy
        );
        const dayMap = dayTex;
        const nightMap = nightTex ?? proc.nightMap;
        const cloudsMap = cloudsTex ?? proc.cloudsMap;
        const bumpMap = bumpTex ?? proc.bumpMap;
        const specularMap = specTex ?? proc.specularMap;

        if (nightTex) proc.nightMap.dispose();
        if (cloudsTex) proc.cloudsMap.dispose();
        if (bumpTex) proc.bumpMap.dispose();
        if (specTex) proc.specularMap.dispose();
        proc.dayMap.dispose();

        return {
          dayMap,
          nightMap,
          cloudsMap,
          bumpMap,
          specularMap,
          dispose: () => {
            dayMap.dispose();
            nightMap.dispose();
            cloudsMap.dispose();
            bumpMap.dispose();
            specularMap.dispose();
          },
        };
      }
    }
  } catch {
    // Expected when team textures have not been placed in /public/textures/earth/ yet
  }

  const procWidth = isMobile ? 512 : 1024;
  const procHeight = isMobile ? 256 : 512;
  return generateProceduralEarthTextures(procWidth, procHeight, maxAnisotropy);
}
