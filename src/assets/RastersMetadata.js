
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
  groups: [{
    name: '1_Mean_year_month_climatic_charactreristic',
    alias: 'Средние многолетние климатические характеристики',
    indicators: [{
      alias: 'Продолжительность залегания снежного покрова',
      desc: 'Трпрпрпрррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррр',
      name: 'Day_with_show',
      periods: ['year'],
      style: 'ucc:Day_with_snow',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: 'Среднемноголетнeе парциальное давление водяного пара  (влажность воздуха) по месяцам',
      desc: '',
      name: 'Hum_average_monthly',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep'],
      style: 'ucc:Humidity',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: 'Среднемноголетнее годовое парциальное давление водяного пара (влажность воздуха)',
      desc: '',
      name: 'Hum_average_year',
      periods: ['year'],
      style: 'ucc:Humidity',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: 'Среднемноголетнее давление по месяцам',
      desc: '',
      name: 'Mean_pressure_monthly',
      periods: ['apr', 'jan', 'jul', 'oct'],
      style: '',
      years: ['1971_2000', '1981_2010']
    },
    {
      alias: 'Среднемноголетнее давление',
      desc: '',
      name: 'Mean_pressure_year',
      periods: ['year'],
      style: '',
      years: ['1971_2000', '1981_2010']
    },
    {
      alias: 'Средняя многолетняя годовая скорость ветра',
      desc: '',
      name: 'Mean_wind',
      periods: ['apr', 'jan', 'jul', 'oct', 'year'],
      style: '',
      years: ['1971_2000', '1981_2010']
    },
    {
      alias: 'Среднемноголетняя сумма  осадков холодного периода',
      desc: '',
      name: 'Prec_average_cold',
      periods: ['cold'],
      style: '',
      years: ['1966_1995', '1971_2000', '1976_2005', '1981_2010', '1986_2015']
    },
    {
      alias: 'Среднемноголетняя сумма  осадков теплого периода',
      desc: '',
      name: 'Prec_average_warm',
      periods: ['warm'],
      style: '',
      years: ['1966_1995', '1971_2000', '1976_2005', '1981_2010', '1986_2015']
    },
    {
      alias: 'Среднемноголетняя годовая сумма  осадков',
      desc: '',
      name: 'Prec_average_year',
      periods: ['year'],
      style: '',
      years: ['1966_1995', '1971_2000', '1976_2005', '1981_2010', '1986_2015']
    },
    {
      alias: 'Среднемесячная температура воздуха',
      desc: '',
      name: 'T_average_monthly',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep'],
      style: '',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: 'Среднегодова температура воздуха',
      desc: '',
      name: 'T_average_year',
      periods: ['year'],
      style: '',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    }]
  },
  {
    name: '2_Extremal_climatic_charactreristic',
    alias: 'Экстремальные климатические характеристики',
    indicators: [{
      alias: 'Повторяемость экстремальных значений (1% повторяемости) суточных сумм осадков (дней/10 лет)',
      desc: '',
      name: 'Extr_prec_day_count_1_proc_10years',
      periods: ['none', 'year'],
      style: '',
      years: ['1966_1995', '1976_2005', '1986_2015']
    },
    {
      alias: 'Повторяемость экстремальных значений (1% повторяемости) суммы осадков холодного периода (дней/10 лет) ',
      desc: '',
      name: 'Extr_prec_winter_day_count_1_proc_10years',
      periods: ['none', 'year'],
      style: '',
      years: ['1966_1995', '1976_2005', '1986_2015']
    },
    {
      alias: 'Средний многолетний максимум осадков за 12 ч.',
      desc: '',
      name: 'Max_prec_df',
      periods: ['none'],
      style: '',
      years: ['1966_1995', '1971_2000', '1976_2005', '1981_2010', '1986_2015']
    },
    {
      alias: 'Средний многолетний максимум высоты снежного покрова ',
      desc: '',
      name: 'Max_snow_mean',
      periods: ['none'],
      style: '',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: '',
      desc: '',
      name: 'NoPrec_mean_summer',
      periods: ['none'],
      style: '',
      years: ['1966_1995', '1976_2005', '1986_2015']
    },
    {
      alias: '',
      desc: '',
      name: 'Prec_1_proc',
      periods: ['none'],
      style: '',
      years: ['1966_1995', '1976_2005', '1986_2015']
    },
    {
      alias: '',
      desc: '',
      name: 'Prec_huge_10years',
      periods: ['none', 'year'],
      style: '',
      years: ['1966_1995', '1976_2005', '1986_2015']
    },
    {
      alias: '',
      desc: '',
      name: 'Prec_mean_max_day',
      periods: ['none'],
      style: '',
      years: ['1966_1995', '1976_2005', '1986_2015']
    },
    {
      alias: '',
      desc: '',
      name: 'Prec_winter_1_proc',
      periods: ['none'],
      style: '',
      years: ['1966_1995', '1976_2005', '1986_2015']
    },
    {
      alias: '',
      desc: '',
      name: 'T_count_max_year_10years',
      periods: ['none', 'year'],
      style: '',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: '',
      desc: '',
      name: 'T_count_min_year_10years',
      periods: ['none', 'year'],
      style: '',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: '',
      desc: '',
      name: 'T_max_sum_1_proc',
      periods: ['none'],
      style: '',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: '',
      desc: '',
      name: 'T_max_sum_day_count_1_proc_10years',
      periods: ['none', 'year'],
      style: '',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: '',
      desc: '',
      name: 'T_mean_max_year',
      periods: ['none', 'year'],
      style: '',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: '',
      desc: '',
      name: 'T_mean_min_year',
      periods: ['none', 'year'],
      style: '',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: '',
      desc: '',
      name: 'T_min_win_1_proc',
      periods: ['none'],
      style: '',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: '',
      desc: '',
      name: 'T_min_win_day_count_1_proc_10years',
      periods: ['none', 'year'],
      style: '',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    }]
  },
  {
    name: '3_USSR_climat_guide',
    alias: 'Данные из научно-прикладного справочника по климату CCCР',
    indicators: [{
      alias: '',
      desc: '',
      name: 'Average_max_snow_depth',
      periods: ['none'],
      style: '',
      years: ['1951_1980']
    },
    {
      alias: '',
      desc: '',
      name: 'Blizzard',
      periods: ['none'],
      style: '',
      years: ['1951_1980']
    },
    {
      alias: '',
      desc: '',
      name: 'Cloud_cover',
      periods: ['apr', 'jan', 'jul', 'oct', 'year'],
      style: '',
      years: ['1951_1980']
    },
    {
      alias: '',
      desc: '',
      name: 'Hail_days',
      periods: ['none'],
      style: '',
      years: ['1951_1980']
    },
    {
      alias: '',
      desc: '',
      name: 'Ice_accum_days',
      periods: ['none'],
      style: '',
      years: ['1951_1980']
    },
    {
      alias: '',
      desc: '',
      name: 'Prec_days_more_30mm_10years',
      periods: ['none', 'year'],
      style: '',
      years: ['1951_1980']
    },
    {
      alias: '',
      desc: '',
      name: 'Prec_max_day_year_1_perc',
      periods: ['none', 'year'],
      style: '',
      years: ['1951_1980']
    },
    {
      alias: '',
      desc: '',
      name: 'Prec_max_day_year_5_perc',
      periods: ['none', 'year'],
      style: '',
      years: ['1951_1980']
    },
    {
      alias: '',
      desc: '',
      name: 'Relative_humidity',
      periods: ['apr', 'jan', 'jul', 'oct', 'year'],
      style: '',
      years: ['1951_1980']
    },
    {
      alias: '',
      desc: '',
      name: 'Snow_cover_days',
      periods: ['none'],
      style: '',
      years: ['1951_1980']
    },
    {
      alias: '',
      desc: '',
      name: 'SWE_with_h',
      periods: ['none'],
      style: '',
      years: ['1951_1980']
    },
    {
      alias: '',
      desc: '',
      name: 'Thunderstorm_days',
      periods: ['none'],
      style: '',
      years: ['1951_1980']
    }]
  },
  {
    name: '4_Agro_atlas',
    alias: 'Данные из агроэкологического атласа РФ',
    indicators: [{
      alias: '',
      desc: '',
      name: 'ABS_MIN_T',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: '',
      years: ['before1965']
    },
    {
      alias: '',
      desc: '',
      name: 'GTK',
      periods: ['aug', 'jul', 'jun'],
      style: '',
      years: ['before1965']
    },
    {
      alias: '',
      desc: '',
      name: 'Humidity_relative',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: '',
      years: ['before1965']
    },
    {
      alias: '',
      desc: '',
      name: 'Precipitation_avg_cold',
      periods: ['cold'],
      style: '',
      years: ['before1965']
    },
    {
      alias: '',
      desc: '',
      name: 'Precipitation_avg_warm',
      periods: ['warm'],
      style: '',
      years: ['before1965']
    },
    {
      alias: '',
      desc: '',
      name: 'Snow_begin',
      periods: ['none'],
      style: '',
      years: ['before1965']
    },
    {
      alias: '',
      desc: '',
      name: 'Snow_days',
      periods: ['none'],
      style: '',
      years: ['before1965']
    },
    {
      alias: '',
      desc: '',
      name: 'Snow_end',
      periods: ['none'],
      style: '',
      years: ['before1965']
    },
    {
      alias: '',
      desc: '',
      name: 'Snow_maxim',
      periods: ['none'],
      style: '',
      years: ['before1965']
    },
    {
      alias: '',
      desc: '',
      name: 'Temperature_avg',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: '',
      years: ['before1965']
    },
    {
      alias: '',
      desc: '',
      name: 'Temperature_max',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: '',
      years: ['before1965']
    },
    {
      alias: '',
      desc: '',
      name: 'Temperature_min',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: '',
      years: ['before1965']
    }]
  },
  {
    name: '5_World_clim_data',
    alias: 'Данные проекта WorldClim 2.0',
    indicators: [{
      alias: '',
      desc: '',
      name: 'Prec',
      periods: ['cold', 'warm', 'year'],
      style: '',
      years: ['1971_2000']
    },
    {
      alias: '',
      desc: '',
      name: 'Srad',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: '',
      years: ['1971_2000']
    },
    {
      alias: '',
      desc: '',
      name: 'T_average',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: '',
      years: ['1971_2000']
    },
    {
      alias: '',
      desc: '',
      name: 'T_max',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: '',
      years: ['1971_2000']
    },
    {
      alias: '',
      desc: '',
      name: 'T_min',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: '',
      years: ['1971_2000']
    },
    {
      alias: '',
      desc: '',
      name: 'V_apr',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: '',
      years: ['1971_2000']
    },
    {
      alias: '',
      desc: '',
      name: 'Wind',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: '',
      years: ['1971_2000']
    }]
  }]
}
export default allMetadata
