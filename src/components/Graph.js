import React, { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import moment from "moment"
import "../build/Graph.css"

function Graph({ country }) {
  // initial data from API
  const [data, setData] = useState({
    timeline: {
      cases: [],
      deaths: [],
      recovered: []
    }
  })

  // data for the graph
  const [graphData, setGraphData] = useState({
    casesDate: [],
    casesTotal: [],
    deathsTotal: [],
    recoveredTotal: []
  })

  let url = `https://corona.lmao.ninja/v2/historical/${country}?lastdays=40`

  // fetch data from the API
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setData(res)
      })
      .catch(err => console.log(err))
    // eslint-disable-next-line
  }, [])

  // return array of data whenever the data from the API changes
  useEffect(() => {
    setGraphData({
      casesDate: Object.keys(data.timeline.cases),
      casesTotal: Object.values(data.timeline.cases),
      deathsTotal: Object.values(data.timeline.deaths),
      recoveredTotal: Object.values(data.timeline.recovered)
    })
  }, [data])

  return (
    <div className="graph">
      <div className="graph__title">Grafik perkembangan</div>
      <hr />
      <div className="graph__canvas">
        <Line
          data={{
            labels: graphData.casesDate.map(date =>
              moment(date).format("DD MMM YY")
            ),
            datasets: [
              {
                label: "Jumlah Kasus",
                data: graphData.casesTotal,
                backgroundColor: "rgba(64, 120, 242, 1)",
                hoverBackgroundColor: "rgba(64, 120, 242, 1)",
                borderColor: "rgba(64, 120, 242, 1)",
                borderWidth: 2,
                fill: false,
                lineTension: 0.1,
                pointRadius: 0.75
              },
              {
                label: "Jumlah Kematian",
                data: graphData.deathsTotal,
                backgroundColor: "rgba(235, 87, 87, 1)",
                hoverBackgroundColor: "rgba(235, 87, 87, 1)",
                borderColor: "rgba(235, 87, 87, 1)",
                borderWidth: 2,
                fill: false,
                lineTension: 0.1,
                pointRadius: 0.75
              },
              {
                label: "Jumlah Pulih",
                data: graphData.recoveredTotal,
                backgroundColor: "rgba(88, 203, 177, 1)",
                hoverBackgroundColor: "rgba(88, 203, 177, 1)",
                borderColor: "rgba(88, 203, 177, 1)",
                borderWidth: 2,
                fill: false,
                lineTension: 0.1,
                pointRadius: 0.75
              }
            ]
          }}
          width={100}
          height={400}
          options={{
            maintainAspectRatio: false,
            tooltips: { mode: "nearest" }
          }}
        />
      </div>
    </div>
  )
}

export default Graph
