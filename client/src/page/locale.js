// 对应课程参考代码中的 src/page/locale.js
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { DatePicker, LocaleProvider } from 'antd';
import {
  FormattedMessage,
  IntlProvider,
  addLocaleData,
} from 'react-intl';
import zhData from 'react-intl/locale-data/zh';

addLocaleData(zhData);

export default () => {
  return (
    <IntlProvider locale="zh">
      <LocaleProvider locale={zhCN}>
        <div>
          <DatePicker />
        </div>
      </LocaleProvider>
    </IntlProvider>
  )
}
