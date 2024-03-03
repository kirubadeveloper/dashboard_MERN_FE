import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { Cell, Pie, PieChart } from "recharts";
import React, { useMemo } from "react";

const Row3 = () => {
  const pieColors = ["#076050", "#12efc8"];

  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
  }, [kpiData]);

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          overflow="auto"
          sx={{
            color: "#FFFF",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#12efc8",
              borderRadius: "4px",
            },
            "& .MuiTypography-root": {
              flex: "1",
              textAlign: "center",
            },
            "& .row": {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: 1,
              borderBottom: `1px solid #48494e`,
            },
            "& .heading": {
              fontWeight: "bold",
            },
          }}
        >
          <Box className="row">
            <Typography variant="subtitle1" className="heading">
              Product ID
            </Typography>
            <Typography variant="subtitle1" className="heading">
              Expense
            </Typography>
            <Typography variant="subtitle1" className="heading">
              Price
            </Typography>
          </Box>
          {productData?.map((product, index) => (
            <Box key={index} className="row">
              <Typography>{product._id}</Typography>
              <Typography>${product.expense}</Typography>
              <Typography>${product.price}</Typography>
            </Box>
          ))}
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} latest transactions`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          overflow="auto"
          sx={{
            color: "#FFFF",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#12efc8",
              borderRadius: "4px",
            },
            "& .row": {
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              alignItems: "center",
              py: 1,
              borderBottom: `1px solid #48494e`,
            },
            "& .heading": {
              fontWeight: "bold",
            },
            "& .row > *:not(:first-child)": {
              paddingLeft: "1rem",
            },
          }}
        >
          <Box className="row">
            <Typography variant="subtitle1" className="heading">
              ID
            </Typography>
            <Typography variant="subtitle1" className="heading">
              Buyer
            </Typography>
            <Typography variant="subtitle1" className="heading">
              Amount
            </Typography>
            <Typography variant="subtitle1" className="heading">
              Count
            </Typography>
          </Box>
          {transactionData?.map((transaction, index) => (
            <Box key={index} className="row">
              <Typography>{transaction._id}</Typography>
              <Typography>{transaction.buyer}</Typography>
              <Typography>${transaction.amount}</Typography>
              <Typography>
                {(transaction.productIds as Array<string>).length}
              </Typography>
            </Box>
          ))}
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        <FlexBetween
          mt="1rem"
          gap="0.5rem"
          p="0 1rem"
          textAlign="center"
          sx={{
            "& > div": {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            },
          }}
        >
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`} sx={{ textAlign: "center" }}>
              <PieChart width={110} height={70}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={15}
                  outerRadius={30}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>

      <DashboardBox gridArea="j">
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sideText="+15%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor="#076050"
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor="#0ebfa0"
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Successfully completed my side project. Hope you got the insight from
          this financial data visualisation.
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;
