import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { mesRegistroDoctores } from "../../controller/Doctor_controller";


export function Estadisticas() {
  const [chartState, setChartState] = useState({
    series: [{
      name: 'Registros',
      data: []
    }],
    options: {
      title: {
        text: 'Doctores Registrados',
        floating: true,
        offsetY: -5,
        align: 'center',
        style: {
          color: '#444',
        }
      },
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + " r ";
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          }
        }
      }
    },
  });

  useEffect(() => {
    const obtenerMeses = async () => {
      const resultado = await mesRegistroDoctores();
      
      setChartState(prevState => ({
        ...prevState,
        series: [{
          ...prevState.series[0],
          data: resultado
        }]
      }));
    };

    obtenerMeses();
  }, []);

  return (
    <div id="chart">
      <ReactApexChart options={chartState.options} series={chartState.series} type="bar" height={350} />
    </div>
  );
}
