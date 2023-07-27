import { Box, Flex, Heading, Input } from "@chakra-ui/react";
import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { format, isAfter, isBefore, parseISO } from "date-fns";
import Head from "next/head";
import React, { useEffect, useState } from "react";
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

const initialStartDate = "2022-12-17";

const getDatesArrayFromPastToToday = () => {
  const today = new Date();
  const pastDate = new Date(initialStartDate); // Replace this with your desired past date

  const datesArray = [];
  while (pastDate <= today) {
    const formattedDate = new Date(pastDate).toISOString();
    datesArray.push(formattedDate);

    pastDate.setDate(pastDate.getDate() + 1);
  }

  return datesArray;
};

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
  const labels = getDatesArrayFromPastToToday();

  const [range, setRange] = useState({
    startDate: initialStartDate,
    endDate: format(new Date(), "yyyy-MM-dd"),
  });

  const [dataset, setDataset] = useState(
    labels.map((l) => format(parseISO(l), "dd-MM-yyyy"))
  );

  useEffect(() => {
    const newRange = labels
      .filter((l) => {
        const afterStart = isAfter(parseISO(l), parseISO(range.startDate));
        const beforeEnd = isBefore(parseISO(l), parseISO(range.endDate));
        return afterStart && beforeEnd;
      })
      .map((l) => format(parseISO(l), "dd-MM-yyyy"));

    setDataset(newRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  const data = {
    labels: dataset,
    datasets: [
      {
        label: "New Jobs",
        data: dataset.map((l) => {
          const dayCount = jobCount.find(
            (j) => format(parseISO(j.createdAt), "dd-MM-yyyy") === l
          );

          if (!dayCount) {
            return 0;
          }
          return dayCount.count;
        }),
        borderColor: "#6b7280",
        backgroundColor: "#6b7280",
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

          <Input
            placeholder="Start date"
            size="md"
            type="date"
            value={range.startDate}
            onChange={(e) => setRange({ ...range, startDate: e.target.value })}
          />
          <Input
            placeholder="End date"
            size="md"
            type="date"
            value={range.endDate}
            onChange={(e) => setRange({ ...range, endDate: e.target.value })}
          />
          <Box
            mt="4"
            as={Line}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Daily New Jobs",
                },
              },
            }}
            data={data}
          />
        </Flex>
      </Flex>
    </div>
  );
}

export default Stats;
