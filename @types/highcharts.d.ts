import { Options as HC_Options } from 'highcharts';

declare module 'highcharts' {
  export interface Options extends HC_Options {
    /**
     * Highcharts 초기 옵션 설정 완료에 대한 여부
     */
    _isSet?: boolean;
  }
}
