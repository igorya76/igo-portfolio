import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { CardWrapper } from "../card";
import { useBoolean } from "../../hooks";
const CORE: tCard[] = [
  {
    src: "https://res.cloudinary.com/dwawh39gc/image/upload/v1735614713/ts_prgw0v.png",
    href: "https://www.typescriptlang.org/",
    name: "typescript",
  },
  {
    src: "https://res.cloudinary.com/dwawh39gc/image/upload/v1735614161/1_bc9pmTiyKR0WNPka2w3e0Q_tdzcei.png",
    href: "https://nodejs.org/en",
    name: "Node Js",
  },
  {
    src: "https://res.cloudinary.com/dwawh39gc/image/upload/v1735615350/react-1-logo-svg-vector_ck11k2.svg",
    href: "https://react.com/",
    name: "react",
  },
];
const DATABASES: tCard[] = [
  {
    src: "https://res.cloudinary.com/dwawh39gc/image/upload/v1735614309/mongodb_pafaeg.gif",
    href: "https://mongodb.com/",
    name: "Mongodb",
  },
  {
    src: "https://res.cloudinary.com/dwawh39gc/image/upload/v1735614361/prisma_xagmlt.jpg",
    href: "https://www.prisma.io/",
    name: "Prisma",
  },
  {
    src: "https://res.cloudinary.com/dwawh39gc/image/upload/v1735643873/MySQL-Logo.wine_apogz1.svg",
    href: "https://www.mysql.com/",
    name: "MySql",
  },
  {
    src: "https://res.cloudinary.com/dwawh39gc/image/upload/v1735644011/microsoft-sql-server-logo-svgrepo-com_j41oxm.svg",
    href: "https://www.microsoft.com/en-us/sql-server",
    name: "Microsoft SQL Server",
  },
];
const SERVER: tCard[] = [
  {
    src: "https://res.cloudinary.com/dwawh39gc/image/upload/v1735643541/images_fbajbf.png",
    href: "https://expressjs.com/",
    name: "Express",
  },
  {
    src: "https://res.cloudinary.com/dwawh39gc/image/upload/v1735614571/fastify_ntun7k.svg",
    href: "https://fastify.dev/",
    name: "fastify",
  },
  {
    src: "https://res.cloudinary.com/dwawh39gc/image/upload/v1735643708/bullmq_ko8gkx.png",
    href: "https://docs.bullmq.io/",
    name: "BullMq",
  },
];
const BUILD: tCard[] = [
  {
    src: "https://res.cloudinary.com/dwawh39gc/image/upload/v1735615156/tuborepo_joez2q.png",
    href: "https://turbo.build/repo/docs",
    name: "turbo repo",
  },
  {
    src: "https://res.cloudinary.com/dwawh39gc/image/upload/c_crop,w_170,h_96,ar_16:9/v1735614792/sb_jp5vcq.png",
    href: "https://storybook.js.org/",
    name: "Storybook",
  },
  {
    src: "https://res.cloudinary.com/dwawh39gc/image/upload/v1735644759/105628281-b86efa80-5e44-11eb-821c-87d5fddb9f8a_4x_hvs8ye.png",
    href: "https://vite.dev/",
    name: "Vite",
  },
];
const REACT: tCard[] = [
  {
    src: "https://res.cloudinary.com/dwawh39gc/image/upload/v1735643483/mui-react-component-library_telqyg.png",
    href: "https://mui.com/",
    name: "mui",
  },
  {
    src: "https://res.cloudinary.com/dwawh39gc/image/upload/v1735615046/rr_ghqfm9.png",
    href: "https://reactrouter.com/",
    name: "React Router",
  },
  {
    src: "https://res.cloudinary.com/dwawh39gc/image/upload/v1735614635/zod_g7x8tb.svg",
    href: "https://zod.dev/",
    name: "Zod",
  },
  {
    src: "https://res.cloudinary.com/dwawh39gc/image/upload/v1735614878/pdfmake_icn1nq.png",
    href: "http://pdfmake.org/#/",
    name: "PdfMake",
  },
  {
    src: "https://res.cloudinary.com/dwawh39gc/image/upload/v1735614984/ts_tvnf6v.jpg",
    href: "https://tanstack.com/",
    name: "Tanstack",
  },
];
export function TabTechnologies() {
  return (
    <Box>
      <Grouping name="Core" items={CORE} />
      <Grouping name="Databases" items={DATABASES} />
      <Grouping name="Server" items={SERVER} />
      <Grouping name="React" items={REACT} />
      <Grouping name="Build" items={BUILD} />
    </Box>
  );
}

function Grouping(p: { name: string; items: tCard[] }) {
  return (
    <Box>
      <Typography variant="h6" sx={{ paddingTop: "10px" }}>
        {p.name}
      </Typography>
      <Box
        sx={{ display: "grid", gap: "5px", gridTemplateColumns: "1fr 1fr 1fr" }}
      >
        {p.items.map((t, k) => (
          <ImageCard {...t} key={k} />
        ))}
      </Box>
    </Box>
  );
}

type tCard = { src: string; href: string; name: string };
function ImageCard(p: tCard) {
  const toggle = useBoolean(false);

  return (
    <Card sx={{ height: "250px" }} variant="outlined">
      <div>
        <CardActionArea
          onClick={() => {
            window.open(p.href, "_blank");
          }}
        >
          {toggle.value ? (
            <Typography>x</Typography>
          ) : (
            <img
              src={p.src}
              style={{
                alignItems: "center",
                height: "250px",
                width: "100%",
                objectFit: "contain",
              }}
            />
          )}
        </CardActionArea>
        <CardHeader title={p.name} />
      </div>
    </Card>
  );
}
