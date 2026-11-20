import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  EarthTextureSet,
  loadEarthTexturesWithFallback,
} from './earthProceduralTextures';

interface Earth3DCanvasProps {
  onReady?: () => void;
  onFallback?: () => void;
}

const EARTH_VERTEX_SHADER = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const EARTH_FRAGMENT_SHADER = `
  uniform sampler2D uDayMap;
  uniform sampler2D uNightMap;
  uniform sampler2D uBumpMap;
  uniform sampler2D uSpecularMap;
  uniform vec3 uSunDir;

  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3 N = normalize(vWorldNormal);
    vec3 V = normalize(cameraPosition - vWorldPos);
    vec3 L = normalize(uSunDir);

    // Subtle relief perturbation from bump map
    float bump = texture2D(uBumpMap, vUv).r;
    float bumpDx = dFdx(bump);
    float bumpDy = dFdy(bump);
    vec3 perturbedN = normalize(N - vec3(bumpDx * 1.4, bumpDy * 1.4, 0.0));

    float ndotl = dot(perturbedN, L);
    float diffuse = smoothstep(-0.14, 0.42, ndotl);

    vec3 dayColor = texture2D(uDayMap, vUv).rgb;
    vec3 nightColor = texture2D(uNightMap, vUv).rgb;
    float specMask = texture2D(uSpecularMap, vUv).r;

    // Ocean specular highlight
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(perturbedN, H), 0.0), 34.0) * specMask * max(ndotl, 0.0) * 0.42;

    // Warm city lights exclusively on night hemisphere
    float nightMask = smoothstep(0.10, -0.22, ndotl);
    vec3 litSurface = dayColor * (0.025 + 1.08 * diffuse) + vec3(0.75, 0.88, 1.0) * spec;
    vec3 darkSurface = nightColor * nightMask * 1.35 + dayColor * 0.015;

    // Subtle electric blue / cyan atmospheric limb scatter on day side
    float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.6);
    float sunRim = smoothstep(-0.25, 0.55, dot(N, L));
    vec3 limbScatter = mix(vec3(0.086, 0.467, 1.0), vec3(0.208, 0.835, 0.949), fresnel) * fresnel * (0.18 + 0.65 * sunRim);

    vec3 color = litSurface + darkSurface + limbScatter;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const CLOUDS_VERTEX_SHADER = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;

  void main() {
    vUv = uv;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const CLOUDS_FRAGMENT_SHADER = `
  uniform sampler2D uCloudsMap;
  uniform vec3 uSunDir;

  varying vec2 vUv;
  varying vec3 vWorldNormal;

  void main() {
    vec4 cloudSample = texture2D(uCloudsMap, vUv);
    float ndotl = dot(normalize(vWorldNormal), normalize(uSunDir));
    float lit = smoothstep(-0.18, 0.45, ndotl);
    vec3 color = cloudSample.rgb * (0.04 + 0.96 * lit);
    float alpha = cloudSample.a * (0.12 + 0.72 * lit);
    gl_FragColor = vec4(color, alpha);
  }
`;

const ATMOSPHERE_VERTEX_SHADER = `
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const ATMOSPHERE_FRAGMENT_SHADER = `
  uniform vec3 uSunDir;

  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3 N = normalize(vWorldNormal);
    vec3 V = normalize(cameraPosition - vWorldPos);
    vec3 L = normalize(uSunDir);

    // BackSide outer shell rim fresnel: strongest near the grazing horizon edge
    float viewDot = dot(-N, V);
    float rim = pow(clamp(1.0 - viewDot, 0.0, 1.0), 4.2);
    float edgeFade = smoothstep(0.0, 0.35, viewDot);
    float sunSide = smoothstep(-0.35, 0.65, dot(N, L));

    // Electric Blue (#1677FF) fading to Cyan (#35D5F2)
    vec3 electricBlue = vec3(0.086, 0.467, 1.0);
    vec3 cyan = vec3(0.208, 0.835, 0.949);
    vec3 glowColor = mix(electricBlue, cyan, clamp(rim * 1.1, 0.0, 1.0));

    float intensity = rim * (0.28 + 0.72 * edgeFade) * (0.14 + 0.92 * sunSide);
    gl_FragColor = vec4(glowColor * intensity, intensity * 0.9);
  }
`;

function detectSoftwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) ?? '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export const Earth3DCanvas: React.FC<Earth3DCanvasProps> = ({ onReady, onFallback }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const callbacksRef = useRef({ onReady, onFallback });
  callbacksRef.current = { onReady, onFallback };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      callbacksRef.current.onFallback?.();
      return;
    }

    // Verify WebGL availability
    let testGl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    try {
      const probe = document.createElement('canvas');
      testGl = probe.getContext('webgl2') || probe.getContext('webgl');
      testGl?.getExtension('WEBGL_lose_context')?.loseContext();
    } catch {
      testGl = null;
    }
    if (!testGl) {
      callbacksRef.current.onFallback?.();
      return;
    }

    const isSoftwareGl = detectSoftwareWebGL();
    const isMobile = window.innerWidth < 768;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      callbacksRef.current.onFallback?.();
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);

    const maxDpr = isSoftwareGl ? 1 : isMobile ? 1.25 : 1.5;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));

    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 12);

    const earthGroup = new THREE.Group();
    // Slight axial tilt for realistic orientation
    earthGroup.rotation.z = THREE.MathUtils.degToRad(-12);
    scene.add(earthGroup);

    // Upper-left sun direction creating bright thin lit limb & lower-right shadow
    const sunDir = new THREE.Vector3(-0.74, 0.56, 0.36).normalize();

    let disposed = false;
    let textureSet: EarthTextureSet | null = null;
    let earthMesh: THREE.Mesh | null = null;
    let cloudMesh: THREE.Mesh | null = null;
    let atmoMesh: THREE.Mesh | null = null;

    const pointerTarget = { x: 0, y: 0 };
    const pointerCurrent = { x: 0, y: 0 };

    const updateLayout = () => {
      if (disposed) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      const aspect = w / Math.max(1, h);

      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);

      // Compute visible frustum height & width at z = 0
      const halfFovRad = THREE.MathUtils.degToRad(camera.fov * 0.5);
      const visibleHeight = 2 * camera.position.z * Math.tan(halfFovRad);
      const visibleWidth = visibleHeight * aspect;

      const mobileNow = w < 768;
      // Desktop: ~78% viewport width, top edge ~49% hero height
      // Mobile: ~138% viewport width, top edge ~57% hero height
      const targetDiameter = mobileNow ? visibleWidth * 1.38 : visibleWidth * 0.80;
      const radius = targetDiameter * 0.5;
      const topFracFromCenter = mobileNow ? 0.07 : -0.01; // top edge at 57% mobile, 49% desktop
      const topY = -topFracFromCenter * visibleHeight;

      earthGroup.scale.setScalar(radius);
      earthGroup.position.set(0, topY - radius, 0);
    };

    updateLayout();

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    let frameId = 0;
    let isHeroVisible = true;
    let isTabVisible = document.visibilityState === 'visible';
    let lastTime = performance.now();
    let firstFrameNotified = false;

    const renderFrame = (now: number) => {
      if (disposed) return;
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      if (earthMesh && cloudMesh) {
        // ~150s per full turn -> 2*PI / 150 rad/s
        const rotSpeed = (Math.PI * 2) / 150;
        earthMesh.rotation.y += rotSpeed * dt;
        cloudMesh.rotation.y += rotSpeed * 1.24 * dt;

        // Gentle ~3-degree pointer tilt
        pointerCurrent.x = THREE.MathUtils.damp(pointerCurrent.x, pointerTarget.x, 4.5, dt);
        pointerCurrent.y = THREE.MathUtils.damp(pointerCurrent.y, pointerTarget.y, 4.5, dt);
        earthGroup.rotation.x = pointerCurrent.y;
        earthGroup.rotation.y = pointerCurrent.x;
      }

      renderer.render(scene, camera);

      if (!firstFrameNotified) {
        firstFrameNotified = true;
        callbacksRef.current.onReady?.();
      }
    };

    const scheduleNext = () => {
      if (disposed || !isHeroVisible || !isTabVisible) return;
      if (isSoftwareGl) {
        frameId = window.setTimeout(() => {
          renderFrame(performance.now());
          scheduleNext();
        }, 85);
      } else {
        frameId = window.requestAnimationFrame((t) => {
          renderFrame(t);
          scheduleNext();
        });
      }
    };

    const stopLoop = () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);
    };

    const startLoop = () => {
      stopLoop();
      if (!disposed && isHeroVisible && isTabVisible && earthMesh) {
        lastTime = performance.now();
        scheduleNext();
      }
    };

    // Build meshes once procedural or team textures are ready
    loadEarthTexturesWithFallback(isMobile, maxAnisotropy).then((textures) => {
      if (disposed) {
        textures.dispose();
        return;
      }
      textureSet = textures;

      const sphereGeo = new THREE.SphereGeometry(1, isMobile ? 48 : 72, isMobile ? 36 : 54);
      const earthMat = new THREE.ShaderMaterial({
        uniforms: {
          uDayMap: { value: textures.dayMap },
          uNightMap: { value: textures.nightMap },
          uBumpMap: { value: textures.bumpMap },
          uSpecularMap: { value: textures.specularMap },
          uSunDir: { value: sunDir },
        },
        vertexShader: EARTH_VERTEX_SHADER,
        fragmentShader: EARTH_FRAGMENT_SHADER,
      });

      earthMesh = new THREE.Mesh(sphereGeo, earthMat);
      earthMesh.rotation.y = THREE.MathUtils.degToRad(-28);
      earthGroup.add(earthMesh);

      const cloudGeo = new THREE.SphereGeometry(1.007, isMobile ? 40 : 64, isMobile ? 32 : 48);
      const cloudMat = new THREE.ShaderMaterial({
        uniforms: {
          uCloudsMap: { value: textures.cloudsMap },
          uSunDir: { value: sunDir },
        },
        vertexShader: CLOUDS_VERTEX_SHADER,
        fragmentShader: CLOUDS_FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
      });

      cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
      earthGroup.add(cloudMesh);

      const atmoGeo = new THREE.SphereGeometry(1.042, isMobile ? 40 : 64, isMobile ? 32 : 48);
      const atmoMat = new THREE.ShaderMaterial({
        uniforms: {
          uSunDir: { value: sunDir },
        },
        vertexShader: ATMOSPHERE_VERTEX_SHADER,
        fragmentShader: ATMOSPHERE_FRAGMENT_SHADER,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      });

      atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
      earthGroup.add(atmoMesh);

      if (!isSoftwareGl) {
        renderer.compile(scene, camera);
      }

      renderFrame(performance.now());
      startLoop();
    });

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      const ny = (e.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
      const maxTilt = THREE.MathUtils.degToRad(3);
      pointerTarget.x = nx * maxTilt;
      pointerTarget.y = ny * maxTilt * 0.65;
    };

    const onVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
      if (isTabVisible) startLoop();
      else stopLoop();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isHeroVisible = entries[0]?.isIntersecting ?? true;
        if (isHeroVisible) startLoop();
        else stopLoop();
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    window.addEventListener('resize', updateLayout, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      disposed = true;
      stopLoop();
      observer.disconnect();
      window.removeEventListener('resize', updateLayout);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      earthMesh?.geometry.dispose();
      (earthMesh?.material as THREE.Material | undefined)?.dispose();
      cloudMesh?.geometry.dispose();
      (cloudMesh?.material as THREE.Material | undefined)?.dispose();
      atmoMesh?.geometry.dispose();
      (atmoMesh?.material as THREE.Material | undefined)?.dispose();
      textureSet?.dispose();
      renderer.dispose();
      if (canvas.parentElement === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
};
