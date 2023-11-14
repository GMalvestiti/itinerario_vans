"use client";

import { Box, Button, InputLabel } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import GoogleMapsAutocomplete from "./google-autcomplete";
import { PlaceType } from "@/app/lib/interfaces";
import { useEffect, useState } from "react";
import Link from "next/link";
import ListaParadas from "./lista-paradas";

const GOOGLE_MAPS_API_KEY = "AIzaSyA19tuCYvlRI_8giKfjffDuyB8DLVQQowQ";

const initialData: PlaceType = {
  place_id: "",
  description: "",
  structured_formatting: null,
};

interface FunctionProps {
  getRoute: (
    orig: Array<number>,
    dest: Array<number>,
    steps: Array<Array<number>>
  ) => Promise<void>;

  isLoading: boolean;
}

async function getLatLngFromPlaceId(
  placeId: any
): Promise<{ lat: number; lng: number } | null> {
  return new Promise((resolve) => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ placeId }, (results: any, status: any) => {
      if (status === "OK" && results[0]?.geometry?.location) {
        const latLng = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        resolve(latLng);
      } else {
        resolve(null);
      }
    });
  });
}

export default function InformationForm({
  getRoute,
  isLoading,
}: Readonly<FunctionProps>) {
  const [origin, setOrigin] = useState<PlaceType>(initialData);
  const [end, setEnd] = useState<PlaceType>(initialData);
  const [ponto, setPonto] = useState<PlaceType>(initialData);
  const [pontos, setPontos] = useState<PlaceType[]>([]);

  useEffect(() => {
    if (ponto != initialData && ponto != undefined && ponto != null) {
      const newPontos = [...pontos, ponto];
      setPontos(newPontos);
    }
  }, [ponto]);

  const handleSubmit = async function () {
    const [origem, fim] = await Promise.all([
      getLatLngFromPlaceId(origin.place_id),
      getLatLngFromPlaceId(end.place_id),
    ]);
    let paradas: ({ lat: number; lng: number } | null)[] = [];
    pontos.forEach(async (ponto) => {
      const newParada = await getLatLngFromPlaceId(ponto.place_id);
      if (newParada) {
        paradas.push({ lat: newParada.lat, lng: newParada.lng });
      }
    });

    while (paradas.length <= 0) {
      await new Promise((r) => setTimeout(r, 1000));
    }

    //Convert object To Array
    let org: Array<number> = [];
    org.push(origem?.lat == undefined ? 0 : origem?.lat);
    org.push(origem?.lng == undefined ? 0 : origem?.lng);

    let dest: Array<number> = [];
    dest.push(fim?.lat == undefined ? 0 : fim?.lat);
    dest.push(fim?.lng == undefined ? 0 : fim?.lng);

    let steps: Array<Array<number>> = [];

    paradas.map((parada) => {
      steps.push([
        parada?.lat == undefined ? 0 : parada?.lat,
        parada?.lng == undefined ? 0 : parada?.lng,
      ]);
    });

    /*steps.push([
      origem?.lat == undefined ? 0 : origem?.lat - 0.01,
      origem?.lng == undefined ? 0 : origem?.lng - 0.01,
    ]);*/

    getRoute(org, dest, steps);
  };

  return (
    <Box component="form" action={handleSubmit}>
      <Grid container spacing={2}>
        <Grid xs={12} sx={{ mt: 2 }}>
          <InputLabel htmlFor="origin">
            <b>Origem:</b>
          </InputLabel>
          <GoogleMapsAutocomplete
            GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY}
            required={true}
            value={origin}
            setValue={setOrigin}
          />
        </Grid>
        <Grid xs={12} sx={{ mt: 1 }}>
          <InputLabel htmlFor="end">
            <b>Destino Final:</b>
          </InputLabel>
          <GoogleMapsAutocomplete
            GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY}
            required={true}
            value={end}
            setValue={setEnd}
          />
        </Grid>
        <Grid xs={12} sx={{ mt: 1 }}>
          <InputLabel htmlFor="end">
            <b>Paradas:</b>
          </InputLabel>
          <GoogleMapsAutocomplete
            GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY}
            required={false}
            value={ponto}
            setValue={setPonto}
          />
        </Grid>
        <Grid xs={12} sx={{ mt: 1 }}>
          <ListaParadas pontos={pontos} setPontos={setPontos} />
        </Grid>
        <Grid xs={12} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            size="large"
            LinkComponent={Link}
            disabled={
              isLoading != undefined ? (isLoading ? true : false) : false
            }
          >
            Calcular Rota
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
