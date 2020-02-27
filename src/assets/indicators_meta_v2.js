
/* 1. group - is logical grop for union indicators
group contains one or more climatic indicators
group have name and alias it changes in code
2. this inforamtioin is used in lister component
for build list of avivable indicators
indicators is objest that desribes one climatic
3. link with data on geoserver is throw name of raster file

name_of_indicator_period_month_postfix.tif

T_mean_min_year_1981_2010_month_with_curv_foc.tif

|T_mean_min|_|1981_2010|_|year|_|with_curv_foc|.tif

indicator sample object
// {
        name: "Имя идникатора"  "Mean_pressure" так как написано в имени файла
        alias: "Псевдоним" "Среднее давление" так как показатель будет отображаться в списке
        periods: "Доступыне периоды" "['jul', 'year', 'oct', 'apr', 'jan']" доступные периоды для показатаеля
                сооствествующие растры должны быть опубликованы
                на геосервере. В коде пишутся правила перехода к нормальному виду (jan -> Январь)
                компонент Lister, вычисляемое свойство aviable_months
                доступные месяцы доступны пользователю для выбора
                может быть None
        style: "ucc:mean_wind" стиль на геосервере для отображения растра
        postfix_in_file: "with_h_focal.tif" окончание растрового файла (указывает нарахные методы построения)
    }

*/

export const allMetadata = {
  groups: [
    {
      name: 'climatic_extremum',
      alias: 'Экстремальные климатические характеристики',
      indicators: [
        {
          name: 'T_mean_min_year',
          alias: 'Средняя минимальная температура',
          periods: ['1951_1980', '1961_1990', '1971_2000', '1981_2010'],
          months: ['jan', 'jul'],
          style: 'ucc:T_mean_min_year',
          desc: 'Средняя минимальная годовая температура воздуха за выбранный промежуток времени'

        },
        {
          name: 'T_mean_max_year',
          alias: 'Средняя максимальная температура',
          periods: ['1959_1980', '1961_1990', '1971_2000', '1981_2010'],
          months: ['None'],
          style: 'ucc:T_mean_min_year',
          desc: 'Средняя минимальная годовая температура воздуха за выбранный промежуток времени'

        }
      ]
    },
    {
      name: 'Climate_terms_3hours_data_focal',
      alias: 'Средние многолетние климатические характеристики',
      indicators: [
        {
          name: 'Prec_average',
          alias: 'Среднее количество осадков',
          periods: ['1966_1995', '1971_2000', '1976_2005', '1981_2010', '1986_2015'],
          months: ['jan'],
          style: 'ucc:Prec_average',
          desc: 'Среднее количество осадков в среднем за год'
        },
        {
          name: 'Mean_pressure',
          alias: 'Среднее давление',
          periods: ['1981_2010'],
          months: ['jan'],
          style: 'ucc:Mean_pressure',
          desc: 'Среднее давление'
        }
      ]
    }
  ]
}
export default allMetadata
