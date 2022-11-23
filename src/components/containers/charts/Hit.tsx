import styled from 'styled-components';
import Chart from 'react-google-charts';
import { useTheme } from 'styled-components';
import type { GoogleChartOptions } from 'react-google-charts';
// styles
import { typo } from 'tds';

const Hit_Chart = () => {
  const currentTheme = useTheme();

  const options: GoogleChartOptions = {
    chartArea: {
      left: 0,
      top: 20,
      width: '100%',
      height: '200',
    },
    backgroundColor: 'transparent',
    isStacked: true,
    lineWidth: 10,
    legend: {
      posdition: 'none',
    },
    fontColor: currentTheme.text.f2,
    colors: ['#4f0eb0', '#8655cf'],
  };

  const data = [
    ['Date', '문제를 맞춘 수', '총 취약점 문제 시도수'],
    ['2022.01', 12, 223],
    ['2022.02', 12, 123],
    ['2022.03', 13, 322],
    ['2022.04', 13, 222],
    ['2022.05', 13, 227],
  ];

  return (
    <Wrapper>
      <Title>취약 문제 시도 대비 적중률 </Title>
      <Chart chartType="BarChart" width="100%" height="200px" data={data} options={options} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
`;

const Title = styled.h1`
  ${typo.headline3};
  color: ${({ theme }) => theme.text.f3};
`;

export default Hit_Chart;
