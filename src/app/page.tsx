"use client";

import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import InformationForm from "./components/info/info-form";
import { useState } from "react";
import GoogleMapReact from "google-map-react";

const GOOGLE_MAPS_API_KEY = "AIzaSyA19tuCYvlRI_8giKfjffDuyB8DLVQQowQ";

const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 11,
};

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResult] = useState(null);

  async function getRoute(
    orig: Array<Number>,
    dest: Array<Number>,
    steps: Array<Array<Number>>
  ) {
    setIsLoading(true);
    const bodyR = { orig: orig, dest: dest, steps: steps };

    const response = await fetch("/api/request-route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyR),
    });

    const { data, status } = await response.json();
    let places: Array<{ lat: number; lng: number }> = [];

    if (data) {
      try {
        let nRoutes = data.length;
        let totalLength = 0;
        data.map(
          (coords: Array<{ y: number; x: number; street_count: number }>) => {
            totalLength += coords.length;
          }
        );

        let max_points_per_route = Math.floor(25 / nRoutes);

        if (max_points_per_route < 2) {
          alert("Não é possível plotar essa rota");
          return;
        }

        data.map(
          (coords: Array<{ y: number; x: number; street_count: number }>) => {
            let max_points_route =
              coords.length < max_points_per_route
                ? coords.length
                : max_points_per_route;

            for (
              let index = 0;
              index < coords.length - 1;
              index += Math.ceil(coords.length / max_points_route)
            ) {
              console.log(index);
              places.push({
                lat: coords[index].y,
                lng: coords[index].x,
              });
            }

            places.push({
              lat: coords[coords.length - 1].y,
              lng: coords[coords.length - 1].x,
            });
            console.log(places.length);
          }
        );
      } catch (error) {}
    }

    setResult(places);
    setIsLoading(false);
  }

  const handleApiLoaded = (map: any, maps: any) => {
    var rendererOptions = { map: map };
    var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    if (results != null) {
      let places: Array<{ lat: number; lng: number }> = [];
      places = results;
      let orig = new google.maps.LatLng(places[0].lat, places[0].lng);
      places.splice(0, 1);
      let dest = new google.maps.LatLng(
        places[places.length - 1].lat,
        places[places.length - 1].lng
      );
      places.splice(places.length - 1, 1);
      let steps: google.maps.DirectionsWaypoint[] = [];
      places.map((place) => {
        steps.push({
          location: new google.maps.LatLng(place.lat, place.lng),
        });
      });
      var request: google.maps.DirectionsRequest = {
        origin: orig,
        destination: dest,
        waypoints: steps,
        travelMode: google.maps.TravelMode.DRIVING,
      };
      let directionsService = new google.maps.DirectionsService();
      directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else alert("failed to get directions");
      });
    }
  };

  return (
    <Box component="main" sx={{ display: "flex", flexGrow: 1, p: 2 }}>
      <Container component="main" maxWidth="xl" disableGutters sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Grid item xs={12}>
                <Typography variant="h6">Informações:</Typography>
              </Grid>
              <Grid item xs={12}>
                <InformationForm getRoute={getRoute} isLoading={isLoading} />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper variant="outlined" sx={{ p: 3 }} className="map">
              {isLoading || results == null ? (
                <div>loading...</div>
              ) : (
                <GoogleMapReact
                  bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
                  defaultCenter={defaultProps.center}
                  defaultZoom={defaultProps.zoom}
                  yesIWantToUseGoogleMapApiInternals
                  onGoogleApiLoaded={({ map, maps }) =>
                    handleApiLoaded(map, maps)
                  }
                ></GoogleMapReact>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
