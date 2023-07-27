import { Box, Flex, Heading } from "@chakra-ui/react";
import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { format, parseISO } from "date-fns";
import Head from "next/head";
import React from "react";
import { Line } from "react-chartjs-2";
import { siteDescription } from "../constants/SEO";
import { getJobCount } from "../controllers/jobs";

const title = "Statistics | Kerja IT";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export const getStaticProps = async () => {
  const { jobCount } = await getJobCount();

  return {
    props: {
      jobCount,
    },
    // revalidate every 10 minutes
    revalidate: 60 * 10,
  };
};

function Stats({ jobCount }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily New Jobs",
      },
    },
  };

  const labels = jobCount.map((j) =>
    format(parseISO(j.createdAt), "dd-MM-yyyy")
  );

  const data = {
    labels,
    datasets: [
      {
        label: "New Jobs",
        data: jobCount.map((j) => j.count),
        borderColor: "#a855f7",
        backgroundColor: "#a855f7",
      },
    ],
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={siteDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content="https://kerja-it.com/og.png" />
        <meta property="og:url" content="https://kerja-it.com" />
        <meta property="og:site_name" content="Kerja IT" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" maxW="4xl" mx="auto" p="4">
        <Flex
          flexDirection="column"
          w="full"
          alignItems="center"
          textAlign="center"
          mt="4"
        >
          <Heading>Kerja IT Statistics 📊</Heading>

          <Box mt="4" as={Line} options={options} data={data} />
        </Flex>
      </Flex>
    </div>
  );
}

export default Stats;
