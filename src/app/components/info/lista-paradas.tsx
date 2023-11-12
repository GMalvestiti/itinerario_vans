"use client";

import { ListProps } from "@/app/lib/interfaces";
import { Box, Button } from "@mui/material";

export default function ListaParadas({ pontos, setPontos }: Readonly<ListProps>) {

  const handleClick = function (index: number) {
    setPontos(pontos.filter((item, i) => i !== index));
  }

  return (
    <Box>
      {
        pontos.map((item, index) => (
          <Button key={index} variant="outlined" sx={{ mt: 1 }} onClick={() => handleClick(index)}>
            {item.description}
          </Button>
        ))}
    </Box>
  );
}
