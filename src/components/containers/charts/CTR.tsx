import styled from 'styled-components';
import Chart from 'react-google-charts';
import { useTheme } from 'styled-components';
import type { GoogleChartOptions } from 'react-google-charts';
// styles
import { typo } from 'tds';

const CTR_Chart = () => {
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
      position: 'none',
    },
    fontColor: currentTheme.text.f2,
    colors: ['#4f0eb0', '#8655cf'],
  };

  const data = [
    ['Date', '문제 클릭 수', '추천 피든 노출수'],
    ['2022.01', 12, 223],
    ['2022.02', 12, 223],
    ['2022.03', 13, 222],
    ['2022.04', 13, 222],
    ['2022.05', 13, 222],
    ['2022.06', 12, 222],
    ['2022.07', 12, 222],
    ['2022.08', 13, 223],
    ['2022.09', 13, 223],
    ['2022.10', 13, 223],
    ['2022.11', 13, 223],
  ];

  return (
    <Wrapper>
      <Title>추천 대비 클릭률</Title>
      <Chart chartType="ColumnChart" width="100%" height="200px" data={data} options={options} />
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

export default CTR_Chart;
