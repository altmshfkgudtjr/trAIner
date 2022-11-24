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
    ['2022.02', 122, 223],
    ['2022.03', 132, 222],
    ['2022.04', 143, 222],
    ['2022.05', 83, 222],
    ['2022.06', 52, 222],
    ['2022.07', 32, 222],
    ['2022.08', 123, 223],
    ['2022.09', 153, 223],
    ['2022.10', 283, 223],
    ['2022.11', 192, 223],
  ];

  return (
    <Wrapper>
      <Title>추천 대비 클릭률</Title>
      <Chart chartType="ColumnChart" width="100%" height="200px" data={data} options={options} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  flex: 1 1 auto;
  position: relative;
  width: 50%;
`;

const Title = styled.h1`
  ${typo.headline3};
  font-weight: 800;
  color: ${({ theme }) => theme.text.f3};
`;

export default CTR_Chart;
