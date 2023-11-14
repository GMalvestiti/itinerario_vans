"use server";

import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

const BASE_URL_STORE = "http://127.0.0.1:8000";

type RouteResponse = {
  route: Array<Array<{ y: number; x: number; street_count: number }>>;
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  // Do something
  const api = axios.create({
    baseURL: BASE_URL_STORE,
  });

  let response = await api.post<RouteResponse>("/getRoute/", body);

  return NextResponse.json(
    { data: response.data },
    { status: response.status }
  );
};
