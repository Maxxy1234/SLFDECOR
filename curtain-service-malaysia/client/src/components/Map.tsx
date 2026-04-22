/**
 * Design reminder for this file: utility-only support for the Tropical Editorial Heritage site.
 * Keep behavior reliable and calm behind the scenes; avoid redundant script loads and visual flicker.
 */
/// <reference types="@types/google.maps" />

import { useEffect, useRef } from "react";
import { usePersistFn } from "@/hooks/usePersistFn";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    google?: typeof google;
  }
}

const API_KEY = import.meta.env.VITE_FRONTEND_FORGE_API_KEY;
const FORGE_BASE_URL =
  import.meta.env.VITE_FRONTEND_FORGE_API_URL ||
  "https://forge.butterfly-effect.dev";
const MAPS_PROXY_URL = `${FORGE_BASE_URL}/v1/maps/proxy`;
const GOOGLE_MAPS_SCRIPT_ID = "manus-google-maps-script";

let googleMapsScriptPromise: Promise<void> | null = null;

function loadMapScript() {
  if (window.google?.maps) {
    return Promise.resolve();
  }

  if (googleMapsScriptPromise) {
    return googleMapsScriptPromise;
  }

  const existingScript = document.getElementById(
    GOOGLE_MAPS_SCRIPT_ID,
  ) as HTMLScriptElement | null;

  if (existingScript) {
    googleMapsScriptPromise = new Promise((resolve, reject) => {
      if (window.google?.maps || existingScript.dataset.loaded === "true") {
        resolve();
        return;
      }

      existingScript.addEventListener(
        "load",
        () => {
          existingScript.dataset.loaded = "true";
          resolve();
        },
        { once: true },
      );
      existingScript.addEventListener(
        "error",
        () => {
          googleMapsScriptPromise = null;
          reject(new Error("Failed to load Google Maps script"));
        },
        { once: true },
      );
    });

    return googleMapsScriptPromise;
  }

  googleMapsScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.src = `${MAPS_PROXY_URL}/maps/api/js?key=${API_KEY}&v=weekly&libraries=marker,places,geocoding,geometry`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => {
      googleMapsScriptPromise = null;
      reject(new Error("Failed to load Google Maps script"));
    };
    document.head.appendChild(script);
  });

  return googleMapsScriptPromise;
}

interface MapViewProps {
  className?: string;
  initialCenter?: google.maps.LatLngLiteral;
  initialZoom?: number;
  onMapReady?: (map: google.maps.Map) => void;
}

export function MapView({
  className,
  initialCenter = { lat: 37.7749, lng: -74.0060 },
  initialZoom = 12,
  onMapReady,
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);

  const init = usePersistFn(async () => {
    await loadMapScript();

    if (!mapContainer.current || !window.google?.maps) {
      console.error("Map container or Google Maps API not available");
      return;
    }

    map.current = new window.google.maps.Map(mapContainer.current, {
      zoom: initialZoom,
      center: initialCenter,
      mapTypeControl: true,
      fullscreenControl: true,
      zoomControl: true,
      streetViewControl: true,
      mapId: "DEMO_MAP_ID",
    });

    if (onMapReady) {
      onMapReady(map.current);
    }
  });

  useEffect(() => {
    init().catch((error) => {
      console.error(error);
    });
  }, [init]);

  return <div ref={mapContainer} className={cn("h-[500px] w-full", className)} />;
}
