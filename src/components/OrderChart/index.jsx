import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

const OrderChat = () => {
  const { orderList } = useSelector((state) => state.orderReducer);
  const [ordersByDate, setOrdersByDate] = useState([]);

  useEffect(() => {
    if (orderList.length > 0) {
      // Tao mot mang thoi gian time tu orderList
      let timeList = [...orderList.map((el) => el.time.toDate())].map(
        (day) => ({
          date: day.getDate(),
          month: day.getMonth(),
          year: day.getFullYear(),
        })
      );
      timeList.reverse();

      //   Loai bo nhung phan tu giong nhau (cung ngay cung thang cung nam)
      let finalList = [...timeList].filter((day, i) => {
        return (
          i ===
          timeList.findIndex(
            (e) =>
              e.date === day.date &&
              e.month === day.month &&
              e.year === day.year
          )
        );
      });
      finalList = [...finalList].map((el) => ({ time: el, count: 0 }));
      for (let i = 0; i < finalList.length; i++) {
        let count = 0;
        const current = finalList[i].time;
        for (let j = 0; j < timeList.length; j++) {
          if (
            current.date === timeList[j].date &&
            current.month === timeList[j].month &&
            current.year === timeList[j].year
          ) {
            count++;
          }
        }
        finalList[i].count = count;
      }
      setOrdersByDate(finalList);
    }
  }, [orderList]);

  const renderChart = () => {
    const timeArr = ordersByDate.map(
      (el) => `${el.time.date}/${el.time.month}/${el.time.year}`
    );
    const countArr = ordersByDate.map((el) => el.count);
    console.log(timeArr);
    console.log(countArr);
    const chartData = {
      labels: timeArr,
      datasets: [
        {
          label: "Sales",
          data: countArr,
          borderColor: "#04b7d9",
          backgroundColor: "transparent",
        },
      ],
    };
    return <Line data={chartData} />;
  };

  // const arr = [1, 2, 1, 3, 5, 5, 6, 6, 1, 7];
  //   const timeList = arr.filter((el, i) => i === arr.indexOf(el));
  return (
    <div className="mt-10 bg-white p-5 rounded shadow-sm ">
      {ordersByDate.length > 0 && renderChart()}
    </div>
  );
};

export default OrderChat;
